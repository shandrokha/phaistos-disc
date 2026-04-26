import { LANGUAGES, RASMUSSEN_PHONETIC, HITTITE_WORDS, PHONETIC, LINEAR_A_WORDS, LINEAR_A_WORDS_NO_PD_INSPIRED, LINEAR_A_EXCLUDED } from "./data.mjs";
import { phoneticValue, syllabify, ngramsOf } from "./phonetics.mjs";
import { hypergeomSf } from "./stats.mjs";
import { mulberry32 } from "./prng.mjs";

// Shared bigram builder — single code path for all PD bigram construction.
// `includeDet`: if false (default), strip Sign 02 determinative.
// `valueMap`: custom sign→value map; if null, uses the default PHONETIC lookup.
//
// Adjacency-breaking semantics: signs whose phonetic value is unknown
// (Sign 17 → `?17`, damaged readings → `null`/`??`, missing entries → `?N`)
// split the word into sub-segments rather than being silently filtered.
// Filtering would splice non-adjacent signs together and create artificial
// bigrams that do not exist on the disc.
function isUnknownValue(v) {
  return v == null || (typeof v === "string" && v.length > 0 && v[0] === "?");
}

function buildPdBigramsFromWords(allWords, { includeDet = false, valueMap = null } = {}) {
  const bigrams = new Set();
  const wordLens = [];
  const pv = valueMap
    ? (s) => (s == null ? null : valueMap.get(s) ?? null)
    : (s) => {
        if (s == null) return null;
        const p = PHONETIC.get(s);
        return p ? p.v : null;
      };

  for (const w of allWords) {
    let signs = w.signs;
    const hasDet = !includeDet && signs.length > 0 && signs[0] === 2;
    if (hasDet) signs = signs.slice(1);

    let segment = [];
    const flushSegment = () => {
      if (segment.length === 0) return;
      for (const bg of ngramsOf(segment, 2)) bigrams.add(bg);
      // Each segment is an independent bigram-generating unit in the MC null,
      // so its length is appended separately. A word with one unknown sign in
      // the middle thus contributes two shorter "words" to pdWordLens.
      wordLens.push(segment.length);
      segment = [];
    };
    for (const s of signs) {
      const v = pv(s);
      if (v == null || isUnknownValue(v)) flushSegment();
      else segment.push(v);
    }
    flushSegment();
  }
  return { bigrams, wordLens };
}

function mergeAllWords(sideA, sideB) {
  return [
    ...sideA.words.map(w => ({ ...w, side: "A" })),
    ...sideB.words.map(w => ({ ...w, side: "B" })),
  ];
}

function buildTargetBigrams(langWords) {
  const bigrams = new Set();
  for (const tw of langWords) {
    for (const bg of ngramsOf(syllabify(tw.w), 2)) bigrams.add(bg);
  }
  return bigrams;
}

function buildSylFreqMap(words, extractSyls) {
  const freq = new Map();
  for (const w of words) {
    for (const s of extractSyls(w)) {
      freq.set(s, (freq.get(s) ?? 0) + 1);
    }
  }
  return freq;
}

function runMcForLang(targetBigrams, overlap, allSyls, pdWordLens, rng, iterations) {
  let exc = 0;
  for (let i = 0; i < iterations; i++) {
    const fake = new Set();
    for (const len of pdWordLens) {
      const fw = [];
      for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
      for (const bg of ngramsOf(fw, 2)) fake.add(bg);
    }
    if ([...fake].filter(b => targetBigrams.has(b)).length >= overlap) exc++;
  }
  return exc / iterations;
}

function runWeightedMcForLang(targetBigrams, overlap, weightedPool, pdWordLens, rng, iterations) {
  let exc = 0;
  for (let i = 0; i < iterations; i++) {
    const fake = new Set();
    for (const len of pdWordLens) {
      const fw = [];
      for (let j = 0; j < len; j++) fw.push(weightedPool[Math.floor(rng() * weightedPool.length)]);
      for (const bg of ngramsOf(fw, 2)) fake.add(bg);
    }
    if ([...fake].filter(b => targetBigrams.has(b)).length >= overlap) exc++;
  }
  return exc / iterations;
}

function fisherYatesShuffle(arr, rng) {
  const shuffled = [...arr];
  for (let j = shuffled.length - 1; j > 0; j--) {
    const k = Math.floor(rng() * (j + 1));
    [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]];
  }
  return shuffled;
}

// Even-out partition that distributes N items across T tiers as evenly as possible.
// When N is not divisible by T, the leading (N mod T) tiers receive one extra item.
// Avoids zero-size trailing tiers that the naive ceil-based partition produces
// (e.g. T=10 over 43 items: ceil → [5,5,5,5,5,5,5,5,3,0]; here → [5,5,5,4,4,4,4,4,4,4]).
// Special case: T=3 uses the legacy ceil-based [15,15,13] split for backward
// compatibility with the canonical Spearman/FW circularity values.
// Lifted to module scope so circularityBiasTest and fwPowerAnalysis partition identically.
// Exported for unit testing. The T=3 branch preserves the legacy [⌈n/3⌉, ⌈n/3⌉, rest]
// split that anchors canonical p-values; other tier counts use even-out distribution
// so no tier ends up empty (a naive ceil split silently freezes the largest signs
// when T·⌈n/T⌉ > n + ⌈n/T⌉).
export function partitionTiers(sortedArr, T, key = x => x) {
  const tiers = [];
  const N = sortedArr.length;
  if (T === 3) {
    const sz = Math.ceil(N / 3);
    tiers.push(sortedArr.slice(0, sz).map(key));
    tiers.push(sortedArr.slice(sz, sz * 2).map(key));
    tiers.push(sortedArr.slice(sz * 2).map(key));
    return tiers;
  }
  const base = Math.floor(N / T);
  const extras = N % T;
  let start = 0;
  for (let t = 0; t < T; t++) {
    const size = base + (t < extras ? 1 : 0);
    tiers.push(sortedArr.slice(start, start + size).map(key));
    start += size;
  }
  return tiers;
}

// Extract the disc word's known-phonetic-value segments.
// Mirrors buildPdBigramsFromWords' adjacency-breaking semantics: a word containing
// an unknown sign (?17, ??, null) is split into multiple segments rather than being
// silently spliced. Exported so UI sections can display per-word bigrams/trigrams
// without re-implementing the adjacency-breaking policy.
//
// valueMap (optional): Map<sign, syllableValue>. When provided, the function
// resolves phonetic values from this map instead of the global PHONETIC table,
// which is how the Rasmussen-reading callers (Hittite pipeline) build their
// own segment streams. Unknown / damaged signs still split segments so that
// adjacency-breaking semantics apply identically across reading systems.
export function extractKnownPdSegments(allWords, { includeDet = false, valueMap = null } = {}) {
  const segments = [];
  const resolveValue = valueMap
    ? (s) => valueMap.get(s) ?? null
    : (s) => {
        const p = PHONETIC.get(s);
        return p ? p.v : `?${s}`;
      };
  for (const w of allWords) {
    let signs = w.signs;
    const hasDet = !includeDet && signs.length > 0 && signs[0] === 2;
    if (hasDet) signs = signs.slice(1);
    let segment = [];
    for (const s of signs) {
      if (s == null) {
        if (segment.length > 0) segments.push(segment);
        segment = [];
        continue;
      }
      const v = resolveValue(s);
      if (isUnknownValue(v)) {
        if (segment.length > 0) segments.push(segment);
        segment = [];
      } else {
        segment.push(v);
      }
    }
    if (segment.length > 0) segments.push(segment);
  }
  return segments;
}

// ---------------------------------------------------------------------------
// Lightweight overlap counter (no MC, deterministic)
// ---------------------------------------------------------------------------
export function computeOverlapCount(sideA, sideB, langWords, { includeDet = false, valueMap = null } = {}) {
  const allWords = [...sideA.words, ...sideB.words];
  const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords, { includeDet, valueMap });
  const targetBigrams = buildTargetBigrams(langWords);
  return [...pdBigrams].filter(b => targetBigrams.has(b)).length;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function singleLanguageMC(sideA, sideB, langWords, {
  iterations = 100000, seed = 314159, includeDet = false,
  valueOverrides = null,
} = {}) {
  const allWords = mergeAllWords(sideA, sideB);

  let valueMap = null;
  if (valueOverrides) {
    valueMap = new Map();
    for (const [sign, entry] of PHONETIC) valueMap.set(sign, entry.v);
    for (const [sign, val] of valueOverrides) valueMap.set(sign, val);
  }

  const { bigrams: pdBigrams, wordLens: pdWordLens } =
    buildPdBigramsFromWords(allWords, { includeDet, valueMap });

  const targetBigrams = buildTargetBigrams(langWords);
  const overlap = [...pdBigrams].filter(b => targetBigrams.has(b)).length;
  const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap(b => b.split("-")))];

  const rng = mulberry32(seed);
  let exc = 0;
  for (let i = 0; i < iterations; i++) {
    const fake = new Set();
    for (const len of pdWordLens) {
      const fw = [];
      for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
      for (const bg of ngramsOf(fw, 2)) fake.add(bg);
    }
    if ([...fake].filter(b => targetBigrams.has(b)).length >= overlap) exc++;
  }

  return { overlap, pValue: exc / iterations, pdBigrams: pdBigrams.size, targetSize: targetBigrams.size };
}

// ---------------------------------------------------------------------------
// Leave-PD-inspired-out ablation
// Re-runs the Minoan / Linear A bigram-overlap MC against the 24 LA entries that
// do NOT carry a `cf. PD …` note (i.e., that were not curated against the
// Phaistos Disc itself). Quantifies how much of the headline Minoan signal
// depends on the 10 PD-inspired LA entries (~29% curation overlap).
// ---------------------------------------------------------------------------
export function leavePdInspiredOut(sideA, sideB, { iterations = 100000, seed = 314159 } = {}) {
  const fullLA = LINEAR_A_WORDS;
  const filteredLA = LINEAR_A_WORDS_NO_PD_INSPIRED;
  const full = singleLanguageMC(sideA, sideB, fullLA, { iterations, seed });
  const filtered = singleLanguageMC(sideA, sideB, filteredLA, { iterations, seed });
  return {
    full: {
      overlap: full.overlap,
      pValue: full.pValue,
      corpusSize: fullLA.length,
      pdBigrams: full.pdBigrams,
      targetSize: full.targetSize,
    },
    filtered: {
      overlap: filtered.overlap,
      pValue: filtered.pValue,
      corpusSize: filteredLA.length,
      pdBigrams: filtered.pdBigrams,
      targetSize: filtered.targetSize,
    },
    droppedCount: fullLA.length - filteredLA.length,
    droppedFraction: (fullLA.length - filteredLA.length) / fullLA.length,
  };
}

export function circularityBiasTest(sideA, sideB, langWords, { iterations = 100000, seed = 414159, tierCounts = [2, 3, 5, 10] } = {}) {
  const allWords = [...sideA.words, ...sideB.words];

  const phonSignNums = [];
  const phonSignVals = [];
  for (const [sign, entry] of PHONETIC) {
    if (entry.c === "det" || entry.c === "none") continue;
    phonSignNums.push(sign);
    phonSignVals.push(entry.v);
  }

  const realValueMap = new Map();
  for (const [sign, entry] of PHONETIC) realValueMap.set(sign, entry.v);

  const readDiscBigrams = (vm) => buildPdBigramsFromWords(allWords, { valueMap: vm }).bigrams;

  const pdBigrams = readDiscBigrams(realValueMap);
  const laBigrams = buildTargetBigrams(langWords);
  const realOverlap = [...pdBigrams].filter(b => laBigrams.has(b)).length;

  // Disc token frequencies per sign. Sign 02 (the determinative) and Sign 17
  // (the unknown-value sign) are NOT excluded here; they are filtered later
  // when we build `phonSignNums` from PHONETIC entries with c !== "det" and
  // c !== "none".
  const signTokenFreq = new Map();
  for (const w of allWords) {
    for (const s of w.signs.filter(x => x != null)) {
      signTokenFreq.set(s, (signTokenFreq.get(s) ?? 0) + 1);
    }
  }

  // LA syllable frequencies
  const laSylFreq = new Map();
  for (const tw of langWords) {
    for (const s of syllabify(tw.w)) {
      laSylFreq.set(s, (laSylFreq.get(s) ?? 0) + 1);
    }
  }

  // Sort signs by PD token freq desc; sort values by LA syllable freq desc.
  // Ties are broken with a per-element random salt drawn from a dedicated
  // seed-derived PRNG so partition boundaries among equal-frequency signs/values
  // are random-yet-reproducible. Without this, ties would resolve in PHONETIC
  // Map insertion order — an arbitrary artefact of the data file — and would
  // inject non-random structure into the FW null partition.
  // Salt PRNG offset (seed + 7777) does not collide with per-tier-count offsets
  // used below (seed + 1 and seed + 1 + 1000*T_).
  const tieRng = mulberry32(seed + 7777);
  const sortedSigns = phonSignNums
    .map(s => ({ sign: s, freq: signTokenFreq.get(s) ?? 0, salt: tieRng() }))
    .sort((a, b) => (b.freq - a.freq) || (a.salt - b.salt));
  const sortedValues = phonSignVals
    .map(v => ({ val: v, freq: laSylFreq.get(v) ?? 0, salt: tieRng() }))
    .sort((a, b) => (b.freq - a.freq) || (a.salt - b.salt));

  // Spearman rho with average ranks for ties (allograph duplicates share values)
  const n = sortedSigns.length;
  const avgRank = (sorted, keyFn) => {
    const ranks = new Array(sorted.length);
    let i = 0;
    while (i < sorted.length) {
      let j = i;
      while (j < sorted.length && keyFn(sorted[j]) === keyFn(sorted[i])) j++;
      const avg = (i + j - 1) / 2;
      for (let k = i; k < j; k++) ranks[k] = avg;
      i = j;
    }
    return ranks;
  };
  const signRanks = avgRank(sortedSigns, s => s.freq);
  const valRankArr = avgRank(sortedValues, v => v.freq);
  const valRankByName = new Map();
  for (let i = 0; i < sortedValues.length; i++) {
    const v = sortedValues[i].val;
    if (!valRankByName.has(v)) valRankByName.set(v, []);
    valRankByName.get(v).push(valRankArr[i]);
  }
  for (const [v, rs] of valRankByName) valRankByName.set(v, rs.reduce((a, b) => a + b) / rs.length);
  // Pearson correlation on rank vectors (tie-aware Spearman). The
  // 1 - 6·ΣD²/[n(n²-1)] closed form assumes no ties and biases ρ when LA
  // syllables share frequencies, so we use Pearson-on-ranks instead.
  const xRanks = new Array(n);
  const yRanks = new Array(n);
  for (let i = 0; i < n; i++) {
    const assignedVal = PHONETIC.get(sortedSigns[i].sign).v;
    if (!valRankByName.has(assignedVal)) {
      throw new Error(
        `circularityBiasTest: phonetic value "${assignedVal}" assigned to sign ${sortedSigns[i].sign} is not in the value-rank table. ` +
        `Every phonetic value used by an active sign must appear in phonSignVals; check PHONETIC.c classification ` +
        `(values from "det" or "none" signs are intentionally excluded).`,
      );
    }
    xRanks[i] = signRanks[i];
    yRanks[i] = valRankByName.get(assignedVal);
  }
  const meanX = xRanks.reduce((a, b) => a + b, 0) / n;
  const meanY = yRanks.reduce((a, b) => a + b, 0) / n;
  let cov = 0, varX = 0, varY = 0;
  for (let i = 0; i < n; i++) {
    const dx = xRanks[i] - meanX;
    const dy = yRanks[i] - meanY;
    cov += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }
  const rho = (varX > 0 && varY > 0) ? cov / Math.sqrt(varX * varY) : 0;

  // Uniform reshuffling (fresh PRNG from seed)
  const uniformRng = mulberry32(seed);
  let uniformExc = 0;
  for (let i = 0; i < iterations; i++) {
    const shuffled = fisherYatesShuffle(phonSignVals, uniformRng);
    const fakeMap = new Map(realValueMap);
    phonSignNums.forEach((sign, idx) => fakeMap.set(sign, shuffled[idx]));
    const fakeOverlap = [...readDiscBigrams(fakeMap)].filter(b => laBigrams.has(b)).length;
    if (fakeOverlap >= realOverlap) uniformExc++;
  }

  // Frequency-weighted reshuffling for an arbitrary tier count (T).
  // Signs are partitioned into T tiers by PD token freq, values into T tiers by LA syllable freq;
  // values are shuffled within tier so the macro frequency correlation is preserved.
  // Each tier count uses an independent PRNG offset so its p-value is reproducible standalone.
  // Partition uses the module-scoped `partitionTiers` helper (even-out distribution
  // with the legacy [ceil, ceil, rest] preserved at T=3 only).

  // Seed scheme: T=3 reuses the legacy seed (seed + 1) to preserve canonical p-value.
  // Other tier counts use a non-overlapping offset (seed + 1 + 1000*T) so they don't collide
  // with each other or the legacy 3-tier draw.
  const computeFwForTierCount = (T) => {
    const T_ = Math.max(1, Math.min(T, n));
    const signTiers = partitionTiers(sortedSigns, T_, s => s.sign);
    const valueTiers = partitionTiers(sortedValues, T_, v => v.val);
    const tierSizes = signTiers.map(arr => arr.length);
    const fwSeed = T_ === 3 ? seed + 1 : seed + 1 + 1000 * T_;
    const fwRng = mulberry32(fwSeed);
    let exc = 0;
    for (let i = 0; i < iterations; i++) {
      const fwMap = new Map();
      for (let t = 0; t < T_; t++) {
        const shuffledVals = fisherYatesShuffle(valueTiers[t], fwRng);
        signTiers[t].forEach((sign, j) => fwMap.set(sign, shuffledVals[j]));
      }
      for (const [sign, val] of realValueMap) {
        if (!fwMap.has(sign)) fwMap.set(sign, val);
      }
      const fakeOverlap = [...readDiscBigrams(fwMap)].filter(b => laBigrams.has(b)).length;
      if (fakeOverlap >= realOverlap) exc++;
    }
    return { tierCount: T_, freqWeightedP: exc / iterations, tierSizes, exceedances: exc };
  };

  // Always include T=3 (legacy default) and de-duplicate while preserving order.
  const requested = Array.isArray(tierCounts) && tierCounts.length > 0 ? tierCounts : [3];
  const tierSet = [...new Set([...requested, 3])].filter(t => Number.isInteger(t) && t >= 1);
  const tierSweep = tierSet.map((T) => computeFwForTierCount(T));
  const t3 = tierSweep.find(e => e.tierCount === 3);

  return {
    realOverlap,
    uniformP: uniformExc / iterations,
    freqWeightedP: t3.freqWeightedP,
    spearmanRho: rho,
    tierSweep,
    iterations,
  };
}

export function fullNineLanguageComparison(sideA, sideB, { iterations = 100000, uniformSeed = 314159, fwSeed = 271828, onProgress = null } = {}) {
  const allWords = mergeAllWords(sideA, sideB);
  const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);

  // Per-syllable frequency map for the FW (frequency-weighted) null
  // sampler. We use the canonical adjacency-broken pipeline so that
  // `?17` / `??` are removed entirely instead of leaking into the
  // FW pool as if they were real syllables (Sign-17 regression class).
  const pdSegmentsForFreq = extractKnownPdSegments(allWords);
  const pdSylFreq = new Map();
  for (const seg of pdSegmentsForFreq) {
    for (const s of seg) pdSylFreq.set(s, (pdSylFreq.get(s) ?? 0) + 1);
  }

  const results = [];

  for (let li = 0; li < LANGUAGES.length; li++) {
    const lang = LANGUAGES[li];
    const langUniformRng = mulberry32(uniformSeed + li);
    const langFwRng = mulberry32(fwSeed + li);
    const targetBigrams = buildTargetBigrams(lang.words);
    const overlap = [...pdBigrams].filter(b => targetBigrams.has(b)).length;
    const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap(b => b.split("-")))];
    const possibleBigrams = allSyls.length * allSyls.length;
    const hyperP = hypergeomSf(possibleBigrams, targetBigrams.size, pdBigrams.size, overlap);

    const refSylFreq = buildSylFreqMap(lang.words, (tw) => syllabify(tw.w));
    const combinedFreq = new Map();
    for (const s of allSyls) {
      combinedFreq.set(s, (pdSylFreq.get(s) ?? 0) + (refSylFreq.get(s) ?? 0));
    }
    const weightedPool = [];
    for (const [s, f] of combinedFreq) {
      for (let k = 0; k < f; k++) weightedPool.push(s);
    }

    const pValue = runMcForLang(targetBigrams, overlap, allSyls, pdWordLens, langUniformRng, iterations);
    const fwPValue = runWeightedMcForLang(targetBigrams, overlap, weightedPool, pdWordLens, langFwRng, iterations);

    const effectiveSize = lang.words.filter(tw => syllabify(tw.w).length >= 2).length;
    results.push({
      id: lang.id, name: lang.name, corpusSize: lang.words.length, effectiveSize,
      overlap, targetSize: targetBigrams.size, pValue, fwPValue, hyperP,
    });

    if (onProgress) onProgress({ done: li + 1, total: LANGUAGES.length + 1, lang: lang.name });
  }

  // Hittite (Rasmussen reading) — normalized through the same pipeline.
  // Rasmussen's reading treats Sign 02 phonetically as "is" (includeDet: true).
  const rasmusValueMap = new Map();
  for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);

  const { bigrams: rasmusBigrams, wordLens: rasWordLens } =
    buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });

  const hitBigrams = buildTargetBigrams(HITTITE_WORDS);
  const hitOverlap = [...rasmusBigrams].filter(b => hitBigrams.has(b)).length;
  const hitAllSyls = [...new Set([...rasmusBigrams, ...hitBigrams].flatMap(b => b.split("-")))];
  const hitPossible = hitAllSyls.length * hitAllSyls.length;
  const hitHyperP = hypergeomSf(hitPossible, hitBigrams.size, rasmusBigrams.size, hitOverlap);

  // Rasmussen-reading per-syllable token frequencies for the Hittite FW null.
  // Uses the canonical adjacency-breaking helper (`extractKnownPdSegments` with
  // the Rasmussen value map and `includeDet: true`) instead of a join+syllabify
  // chain, so a `??` (damaged) sign splits the surrounding signs into two
  // independent segments rather than splicing them. This keeps the Daidalika
  // and Rasmussen frequency-pipelines structurally aligned.
  const rasSegments = extractKnownPdSegments(allWords, { includeDet: true, valueMap: rasmusValueMap });
  const rasSylFreq = new Map();
  for (const seg of rasSegments) {
    for (const s of seg) rasSylFreq.set(s, (rasSylFreq.get(s) ?? 0) + 1);
  }
  const hitRefSylFreq = buildSylFreqMap(HITTITE_WORDS, (tw) => syllabify(tw.w));
  const hitCombinedFreq = new Map();
  for (const s of hitAllSyls) {
    hitCombinedFreq.set(s, (rasSylFreq.get(s) ?? 0) + (hitRefSylFreq.get(s) ?? 0));
  }
  const hitWeightedPool = [];
  for (const [s, f] of hitCombinedFreq) {
    for (let k = 0; k < f; k++) hitWeightedPool.push(s);
  }

  const hitUniformRng = mulberry32(uniformSeed + LANGUAGES.length);
  const hitFwRng = mulberry32(fwSeed + LANGUAGES.length);
  const hitPValue = runMcForLang(hitBigrams, hitOverlap, hitAllSyls, rasWordLens, hitUniformRng, iterations);
  const hitFwPValue = runWeightedMcForLang(hitBigrams, hitOverlap, hitWeightedPool, rasWordLens, hitFwRng, iterations);

  const hitEffectiveSize = HITTITE_WORDS.filter(tw => syllabify(tw.w).length >= 2).length;
  results.push({
    id: "hittite", name: "Hittite (Rasmussen)", corpusSize: HITTITE_WORDS.length, effectiveSize: hitEffectiveSize,
    overlap: hitOverlap, targetSize: hitBigrams.size, pValue: hitPValue, fwPValue: hitFwPValue, hyperP: hitHyperP,
  });

  if (onProgress) onProgress({ done: LANGUAGES.length + 1, total: LANGUAGES.length + 1, lang: "Hittite (Rasmussen)" });

  // Holm-Bonferroni correction
  const sorted = [...results].sort((a, b) => a.pValue - b.pValue);
  const k = sorted.length;
  let maxSoFar = 0;
  for (let i = 0; i < k; i++) {
    const adj = Math.min(1, sorted[i].pValue * (k - i));
    maxSoFar = Math.max(maxSoFar, adj);
    sorted[i].holmP = maxSoFar;
  }
  for (const s of sorted) {
    const r = results.find(x => x.id === s.id);
    r.holmP = s.holmP;
  }

  results.sort((a, b) => a.pValue - b.pValue);
  return { results, significant: results.filter(r => r.holmP < 0.05), iterations };
}

// ---------------------------------------------------------------------------
// Extended Analysis functions
// ---------------------------------------------------------------------------

export function fwPowerAnalysis(sideA, sideB, langWords, { iterations = 100000, seed = 514159, tierCount = 3 } = {}) {
  const allWords = [...sideA.words, ...sideB.words];

  const phonSignNums = [];
  const phonSignVals = [];
  for (const [sign, entry] of PHONETIC) {
    if (entry.c === "det" || entry.c === "none") continue;
    phonSignNums.push(sign);
    phonSignVals.push(entry.v);
  }

  const realValueMap = new Map();
  for (const [sign, entry] of PHONETIC) realValueMap.set(sign, entry.v);

  const readDiscBigrams = (vm) => buildPdBigramsFromWords(allWords, { valueMap: vm }).bigrams;
  const pdBigrams = readDiscBigrams(realValueMap);
  const laBigrams = buildTargetBigrams(langWords);
  const observedOverlap = [...pdBigrams].filter(b => laBigrams.has(b)).length;

  const signTokenFreq = new Map();
  for (const w of allWords) {
    for (const s of w.signs.filter(x => x != null))
      signTokenFreq.set(s, (signTokenFreq.get(s) ?? 0) + 1);
  }
  const laSylFreq = new Map();
  for (const tw of langWords) {
    for (const s of syllabify(tw.w))
      laSylFreq.set(s, (laSylFreq.get(s) ?? 0) + 1);
  }

  const n = phonSignNums.length;
  // Tie-breaking via seed-derived salt; see circularityBiasTest for rationale.
  // Salt PRNG offset (seed + 7777) matches circularityBiasTest so the same
  // tie-order is produced when both helpers run with the same outer seed.
  const tieRng = mulberry32(seed + 7777);
  const sortedSigns = phonSignNums
    .map(s => ({ sign: s, freq: signTokenFreq.get(s) ?? 0, salt: tieRng() }))
    .sort((a, b) => (b.freq - a.freq) || (a.salt - b.salt));
  const sortedValues = phonSignVals
    .map(v => ({ val: v, freq: laSylFreq.get(v) ?? 0, salt: tieRng() }))
    .sort((a, b) => (b.freq - a.freq) || (a.salt - b.salt));

  // Honor tierCount param (default 3) and partition identically to
  // circularityBiasTest via the shared `partitionTiers` helper. A naive
  // ceil-based slice produces an empty trailing tier whenever T·⌈n/T⌉ > n + ⌈n/T⌉
  // (e.g. T=10 over n=43 gives tier 9 = []), silently freezing the largest
  // signs and skipping ~7% of the phonetic-sign space.
  const T = Math.max(2, Math.floor(tierCount));
  const T_ = Math.min(T, n);
  const signTiers = partitionTiers(sortedSigns, T_, s => s.sign);
  const valueTiers = partitionTiers(sortedValues, T_, v => v.val);

  const histogram = new Map();
  const fwRng = mulberry32(seed);
  let fwExc = 0;
  for (let i = 0; i < iterations; i++) {
    const fwMap = new Map();
    for (let t = 0; t < T_; t++) {
      const sv = fisherYatesShuffle(valueTiers[t], fwRng);
      signTiers[t].forEach((sign, j) => fwMap.set(sign, sv[j]));
    }
    for (const [sign, val] of realValueMap) {
      if (!fwMap.has(sign)) fwMap.set(sign, val);
    }
    const ov = [...readDiscBigrams(fwMap)].filter(b => laBigrams.has(b)).length;
    histogram.set(ov, (histogram.get(ov) ?? 0) + 1);
    if (ov >= observedOverlap) fwExc++;
  }

  const maxOverlap = Math.max(...histogram.keys());
  let tailCount = 0;
  let criticalValue = maxOverlap + 1;
  for (let k = maxOverlap; k >= 0; k--) {
    tailCount += histogram.get(k) ?? 0;
    if (tailCount / iterations <= 0.05) criticalValue = k;
    else break;
  }

  const histKeys = [...histogram.keys()].sort((a, b) => a - b);
  return {
    observedOverlap,
    criticalValue,
    histogram: histKeys.map(k => ({ overlap: k, count: histogram.get(k) })),
    fwPValue: fwExc / iterations,
  };
}

export function positiveControlCalibration(sideA, sideB, { iterations = 10000, seed = 614159 } = {}) {
  const greekLang = LANGUAGES.find(l => l.id === "greek");
  const greekWords = greekLang.words;

  // Seeded shuffle before splitting: the source list groups thematically (place
  // names early, common nouns late), so a deterministic 0/34/end slice would
  // make the "fake disc" half non-exchangeable with the "reference" half.
  const shuffleRng = mulberry32(seed ^ 0x9e3779b9);
  const shuffled = fisherYatesShuffle(greekWords, shuffleRng);
  const discWords = shuffled.slice(0, 34);
  const refWords = shuffled.slice(34);

  const discBigrams = new Set();
  const discWordLens = [];
  for (const tw of discWords) {
    const syls = syllabify(tw.w);
    discWordLens.push(syls.length);
    for (const bg of ngramsOf(syls, 2)) discBigrams.add(bg);
  }

  const refBigrams = new Set();
  for (const tw of refWords) {
    for (const bg of ngramsOf(syllabify(tw.w), 2)) refBigrams.add(bg);
  }

  const selfOverlap = [...discBigrams].filter(b => refBigrams.has(b)).length;
  const selfAllSyls = [...new Set([...discBigrams, ...refBigrams].flatMap(b => b.split("-")))];
  const selfP = runMcForLang(refBigrams, selfOverlap, selfAllSyls, discWordLens, mulberry32(seed), iterations);

  const results = [];
  let langIdx = 0;
  for (const lang of LANGUAGES) {
    if (lang.id === "greek") { langIdx++; continue; }
    const targetBigrams = buildTargetBigrams(lang.words);
    const overlap = [...discBigrams].filter(b => targetBigrams.has(b)).length;
    const allSyls = [...new Set([...discBigrams, ...targetBigrams].flatMap(b => b.split("-")))];
    const pValue = runMcForLang(targetBigrams, overlap, allSyls, discWordLens, mulberry32(seed + 1 + langIdx), iterations);
    results.push({ id: lang.id, name: lang.name, overlap, pValue });
    langIdx++;
  }

  const hitBigrams = buildTargetBigrams(HITTITE_WORDS);
  const hitOverlap = [...discBigrams].filter(b => hitBigrams.has(b)).length;
  const hitAllSyls = [...new Set([...discBigrams, ...hitBigrams].flatMap(b => b.split("-")))];
  const hitP = runMcForLang(hitBigrams, hitOverlap, hitAllSyls, discWordLens, mulberry32(seed + 1 + LANGUAGES.length), iterations);
  results.push({ id: "hittite", name: "Hittite (Rasmussen)", overlap: hitOverlap, pValue: hitP });

  results.sort((a, b) => a.pValue - b.pValue);

  return {
    greekSelf: { overlap: selfOverlap, pValue: selfP },
    results,
    discSize: discWords.length,
    refSize: refWords.length,
  };
}

export function corpusSizeEqualization(sideA, sideB, { subsamples = 50, seed = 714159 } = {}) {
  const allWords = [...sideA.words, ...sideB.words];
  const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords);

  const rasmusValueMap = new Map();
  for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
  const { bigrams: rasmusBigrams } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });

  const targetSize = 34;
  const results = [];

  // Each language draws its subsamples from an independent, deterministic
  // PRNG stream (`seed + offset`). This keeps results reproducible while
  // making each row independent of how many random draws preceding languages
  // have consumed — adding/reordering a language no longer perturbs the
  // others' min/median/max.
  function subsampleOverlaps(words, discBigrams, langSeed) {
    if (words.length <= targetSize) {
      const tb = buildTargetBigrams(words);
      const ov = [...discBigrams].filter(b => tb.has(b)).length;
      return { median: ov, min: ov, max: ov };
    }
    const rng = mulberry32(langSeed);
    const overlaps = [];
    for (let s = 0; s < subsamples; s++) {
      const sample = fisherYatesShuffle(words, rng).slice(0, targetSize);
      const tb = buildTargetBigrams(sample);
      overlaps.push([...discBigrams].filter(b => tb.has(b)).length);
    }
    overlaps.sort((a, b) => a - b);
    return {
      median: overlaps[Math.floor(overlaps.length / 2)],
      min: overlaps[0],
      max: overlaps[overlaps.length - 1],
    };
  }

  LANGUAGES.forEach((lang, idx) => {
    const { median, min, max } = subsampleOverlaps(lang.words, pdBigrams, seed + 1 + idx);
    results.push({
      id: lang.id, name: lang.name, fullCorpusSize: lang.words.length,
      medianOverlap: median, minOverlap: min, maxOverlap: max,
    });
  });

  const hitEq = subsampleOverlaps(HITTITE_WORDS, rasmusBigrams, seed + 1 + LANGUAGES.length);
  results.push({
    id: "hittite", name: "Hittite (Rasmussen)", fullCorpusSize: HITTITE_WORDS.length,
    medianOverlap: hitEq.median, minOverlap: hitEq.min, maxOverlap: hitEq.max,
  });

  return results;
}

export function confidenceThresholdSweep(sideA, sideB, langWords, { iterations = 100000, seed = 814159 } = {}) {
  const tiers = [
    { label: "HIGH only", levels: new Set(["HIGH"]) },
    { label: "HIGH + med-hi", levels: new Set(["HIGH", "med-hi"]) },
    { label: "HIGH + med-hi + med", levels: new Set(["HIGH", "med-hi", "med"]) },
    { label: "All confidence levels", levels: new Set(["HIGH", "med-hi", "med", "low-med", "low"]) },
  ];

  return tiers.map((tier, ti) => {
    const excluded = new Set();
    let signCount = 0;
    for (const [sign, entry] of PHONETIC) {
      if (entry.c === "det" || entry.c === "none") continue;
      if (tier.levels.has(entry.c)) signCount++;
      else excluded.add(sign);
    }

    // Treat excluded (low-confidence) signs as adjacency-breaking boundaries:
    // split each word into sub-segments at every excluded position instead of
    // filtering the excluded signs out (which would splice non-adjacent signs
    // together and create artificial bigrams that do not exist on the disc).
    const dropExcluded = (side) => {
      const newWords = [];
      for (const w of side.words) {
        const segments = [[]];
        for (const s of w.signs) {
          if (excluded.has(s)) segments.push([]);
          else segments[segments.length - 1].push(s);
        }
        for (const seg of segments) {
          if (seg.length > 0) newWords.push({ ...w, signs: seg });
        }
      }
      return { ...side, words: newWords };
    };

    const mc = singleLanguageMC(dropExcluded(sideA), dropExcluded(sideB), langWords, {
      iterations,
      seed: seed + ti,
    });

    return { tier: tier.label, signCount, overlap: mc.overlap, pValue: mc.pValue };
  });
}

// ---------------------------------------------------------------------------
// Leave-one-out stability test
// Removes each disc word one at a time and recomputes Minoan overlap.
// ---------------------------------------------------------------------------
export function leaveOneOutStability(sideA, sideB, langWords) {
  const allWords = mergeAllWords(sideA, sideB);
  const targetBigrams = buildTargetBigrams(langWords);
  const { bigrams: fullBigrams } = buildPdBigramsFromWords(allWords);
  const baseOverlap = [...fullBigrams].filter(b => targetBigrams.has(b)).length;

  const results = [];
  for (let i = 0; i < allWords.length; i++) {
    const subset = allWords.filter((_, idx) => idx !== i);
    const { bigrams: subBigrams } = buildPdBigramsFromWords(subset);
    const overlap = [...subBigrams].filter(b => targetBigrams.has(b)).length;
    const w = allWords[i];
    const signs = w.signs.filter(x => x != null);
    const hasDet = signs[0] === 2;
    const phonSigns = hasDet ? signs.slice(1) : signs;
    const reading = /* canonical-pipeline-allowed: display-only; this string is shown to users and never re-parsed for bigram counts */ phonSigns.map(phoneticValue).join("-");
    results.push({
      index: i, side: w.side, reading, overlap, delta: overlap - baseOverlap,
    });
  }

  return { baseOverlap, results };
}

// ---------------------------------------------------------------------------
// Rasmussen reading full 9-language comparison
// Applies Rasmussen's phonetic values to the disc and compares against all
// 9 reference languages (uniform MC only).
// ---------------------------------------------------------------------------
export function rasmussenFullComparison(sideA, sideB, { iterations = 100000, seed = 1014159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);
  const rasmusValueMap = new Map();
  for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);

  const { bigrams: pdBigrams, wordLens: pdWordLens } =
    buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });

  const allLangs = [
    ...LANGUAGES.map(l => ({ id: l.id, name: l.name, words: l.words })),
    { id: "hittite", name: "Hittite", words: HITTITE_WORDS },
  ];

  const results = [];
  for (let li = 0; li < allLangs.length; li++) {
    const lang = allLangs[li];
    const targetBigrams = buildTargetBigrams(lang.words);
    const overlap = [...pdBigrams].filter(b => targetBigrams.has(b)).length;
    const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap(b => b.split("-")))];
    const rng = mulberry32(seed + li);
    const pValue = runMcForLang(targetBigrams, overlap, allSyls, pdWordLens, rng, iterations);
    results.push({ id: lang.id, name: lang.name, overlap, pValue });
  }

  results.sort((a, b) => a.pValue - b.pValue);
  return results;
}

// ---------------------------------------------------------------------------
// Word-length distribution comparison
// Compares PD word lengths (in syllables) against each language's word lengths.
// ---------------------------------------------------------------------------
export function wordLengthDistribution(sideA, sideB) {
  const allWords = mergeAllWords(sideA, sideB);

  // Per-language disc lengths.
  //
  // (a) Damaged signs (`??`) occupy a physical syllable slot on the disc and
  //     so are counted in the word length. Filtering them out artificially
  //     shortens the disc's distribution against every reference language.
  //     Equivalent: we use `w.signs.length` rather than
  //     `signs.filter(x => x != null).length`.
  //
  // (b) Sign 02 is treated as a determinative under the Linear-B/Daidalika
  //     hypothesis but as the phonetic syllable "is" under the Hittite
  //     (Rasmussen) hypothesis. Stripping it unconditionally subtracts a
  //     syllable from 19 disc words even when comparing against Hittite,
  //     making the disc's KS distance to Hittite mathematically inconsistent
  //     with the hypothesis under test. We keep Sign 02 in the disc's length
  //     distribution when (and only when) the comparison language is Hittite.
  function pdLenForLang(langId) {
    const stripDet = langId !== "hittite";
    return allWords.map(w => {
      const signs = w.signs;
      const hasDet = stripDet && signs.length > 0 && signs[0] === 2;
      return hasDet ? signs.length - 1 : signs.length;
    });
  }

  // Default ("display") disc histogram uses the determinative-stripped
  // lengths, matching the convention used elsewhere in the workbench.
  const pdWordLens = pdLenForLang("default");

  function histogram(lens) {
    const counts = new Map();
    for (const l of lens) counts.set(l, (counts.get(l) ?? 0) + 1);
    const maxLen = Math.max(...counts.keys());
    const result = [];
    for (let i = 1; i <= maxLen; i++) result.push(counts.get(i) ?? 0);
    return result;
  }

  function mean(lens) { return lens.reduce((a, b) => a + b, 0) / lens.length; }

  const pdHist = histogram(pdWordLens);
  const pdMean = mean(pdWordLens);

  const allLangs = [
    ...LANGUAGES.map(l => ({ id: l.id, name: l.name, words: l.words })),
    { id: "hittite", name: "Hittite (Rasmussen)", words: HITTITE_WORDS },
  ];

  const langResults = allLangs.map(lang => {
    const lens = lang.words.map(tw => syllabify(tw.w).length);
    return {
      id: lang.id, name: lang.name,
      meanLen: mean(lens),
      histogram: histogram(lens),
      corpusSize: lang.words.length,
    };
  });

  // Kolmogorov-Smirnov D statistic (two-sample) between PD and each language.
  // The PD lengths used here are the *language-appropriate* lengths from
  // pdLenForLang(), not the global pdWordLens, to keep the comparison
  // mathematically consistent with each hypothesis (see comment above).
  function ksD(lens1, lens2) {
    const all = [...new Set([...lens1, ...lens2])].sort((a, b) => a - b);
    let maxD = 0;
    for (const x of all) {
      const f1 = lens1.filter(v => v <= x).length / lens1.length;
      const f2 = lens2.filter(v => v <= x).length / lens2.length;
      maxD = Math.max(maxD, Math.abs(f1 - f2));
    }
    return maxD;
  }

  for (const lr of langResults) {
    const langLens = allLangs.find(l => l.id === lr.id).words.map(tw => syllabify(tw.w).length);
    const pdLens = pdLenForLang(lr.id);
    lr.ksD = ksD(pdLens, langLens);
  }

  langResults.sort((a, b) => a.ksD - b.ksD);

  return { pdMean, pdHistogram: pdHist, pdWordCount: allWords.length, languages: langResults };
}

// ---------------------------------------------------------------------------
// Split-half reliability: test Side A and Side B independently
// ---------------------------------------------------------------------------
export function splitHalfReliability(sideA, sideB, langWords, { iterations = 100000, seed = 1114159 } = {}) {
  function testSide(words, label, seedOffset) {
    const { bigrams, wordLens } = buildPdBigramsFromWords(words);
    const targetBigrams = buildTargetBigrams(langWords);
    const overlap = [...bigrams].filter(b => targetBigrams.has(b)).length;
    const allSyls = [...new Set([...bigrams, ...targetBigrams].flatMap(b => b.split("-")))];
    const rng = mulberry32(seed + seedOffset);
    const pValue = runMcForLang(targetBigrams, overlap, allSyls, wordLens, rng, iterations);
    return { side: label, wordCount: words.length, bigramCount: bigrams.size, overlap, pValue };
  }

  const aWords = sideA.words.map(w => ({ ...w, side: "A" }));
  const bWords = sideB.words.map(w => ({ ...w, side: "B" }));
  const allWords = [...aWords, ...bWords];

  const { bigrams: fullBigrams } = buildPdBigramsFromWords(allWords);
  const targetBigrams = buildTargetBigrams(langWords);
  const fullOverlap = [...fullBigrams].filter(b => targetBigrams.has(b)).length;

  const sideAResult = testSide(aWords, "A", 0);
  const sideBResult = testSide(bWords, "B", 1);

  return { full: { overlap: fullOverlap, wordCount: allWords.length }, sideA: sideAResult, sideB: sideBResult };
}

// ---------------------------------------------------------------------------
// Unigram-only baseline: bag-of-syllables (ignoring ordering)
// Tests whether bigram ordering adds discriminative power vs unigrams alone.
// ---------------------------------------------------------------------------
export function unigramBaseline(sideA, sideB, { iterations = 100000, seed = 1214159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);

  // Use the adjacency-breaking pipeline: each known-phonetic-value run inside
  // a word is one segment, and unknown values (?17, ??, null) split segments.
  // A `signs.map(phoneticValue).join("-")` path would let "?17" / "??" leak
  // into pdSyls and into the null pool, so the MC could draw "?17" as if it
  // were a real syllable.
  const pdSegments = extractKnownPdSegments(allWords);
  const pdSyls = new Set();
  const pdWordLens = [];
  for (const seg of pdSegments) {
    if (seg.length === 0) continue;
    pdWordLens.push(seg.length);
    for (const s of seg) pdSyls.add(s);
  }

  const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords);

  // Rasmussen-reading parallel pipeline for Hittite. Hittite uses an
  // independent set of phonetic values (Rasmussen 2010) and includeDet=true,
  // so its disc syllable inventory and bigram set differ from the Daidalika
  // reading. HITTITE_WORDS must therefore be tested against `rasmusBigrams` /
  // `rasmusSyls`, not the Daidalika `pdBigrams` / `pdSyls`.
  const rasmusValueMap = new Map();
  for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
  const rasSegments = extractKnownPdSegments(allWords, { includeDet: true, valueMap: rasmusValueMap });
  const rasmusSyls = new Set();
  const rasWordLens = [];
  for (const seg of rasSegments) {
    if (seg.length === 0) continue;
    rasWordLens.push(seg.length);
    for (const s of seg) rasmusSyls.add(s);
  }
  const { bigrams: rasmusBigrams } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });

  const allLangs = [
    ...LANGUAGES.map(l => ({ id: l.id, name: l.name, words: l.words })),
    { id: "hittite", name: "Hittite (Rasmussen)", words: HITTITE_WORDS },
  ];

  const totalDraws = pdWordLens.reduce((s, n) => s + n, 0);
  const rasTotalDraws = rasWordLens.reduce((s, n) => s + n, 0);

  const results = [];
  for (let li = 0; li < allLangs.length; li++) {
    const lang = allLangs[li];
    const isHittite = lang.id === "hittite";
    const discSyls = isHittite ? rasmusSyls : pdSyls;
    const discBigrams = isHittite ? rasmusBigrams : pdBigrams;
    const discWordLens = isHittite ? rasWordLens : pdWordLens;

    const langSyls = new Set();
    for (const tw of lang.words) for (const s of syllabify(tw.w)) langSyls.add(s);
    const unigramOverlap = [...discSyls].filter(s => langSyls.has(s)).length;

    const targetBigrams = buildTargetBigrams(lang.words);
    const bigramOverlap = [...discBigrams].filter(b => targetBigrams.has(b)).length;

    const allSyls = [...new Set([...discSyls, ...langSyls])];
    const rng = mulberry32(seed + li);
    let uniExc = 0;
    let satCount = 0;
    let fakeOverlapSum = 0;
    for (let i = 0; i < iterations; i++) {
      const fakeSyls = new Set();
      for (const len of discWordLens) {
        for (let j = 0; j < len; j++) fakeSyls.add(allSyls[Math.floor(rng() * allSyls.length)]);
      }
      if (fakeSyls.size === allSyls.length) satCount++;
      const fakeOv = [...fakeSyls].filter(s => langSyls.has(s)).length;
      fakeOverlapSum += fakeOv;
      if (fakeOv >= unigramOverlap) uniExc++;
    }

    // Saturation diagnostic: with totalDraws (~222) draws from a pool of ~|allSyls| (~50)
    // and aggregation into a Set, the simulated unigram set saturates the entire pool with
    // overwhelming probability (coupon-collector regime). When that happens, the simulated
    // set-overlap with langSyls is always |langSyls|, so any observed overlap <= |langSyls|
    // returns p = 1.0 by construction. The diagnostic exposes this so downstream UI / paper
    // claims do not over-interpret the per-language p-values.
    const saturationRate = satCount / iterations;
    const meanFakeOverlap = fakeOverlapSum / iterations;

    results.push({
      id: lang.id, name: lang.name,
      unigramOverlap, unigramP: uniExc / iterations,
      bigramOverlap,
      poolSize: allSyls.length,
      langSylSize: langSyls.size,
      pdSylSize: discSyls.size,
      totalDraws: isHittite ? rasTotalDraws : totalDraws,
      saturationRate,
      meanFakeOverlap,
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// Random reading baseline: draw arbitrary phonetic values from a broad pool
// and test how often they produce Minoan overlap >= our real overlap.
// ---------------------------------------------------------------------------
export function randomReadingBaseline(sideA, sideB, langWords, { permutations = 1000, seed = 1314159 } = {}) {
  const allWords = [...sideA.words, ...sideB.words];
  const targetBigrams = buildTargetBigrams(langWords);

  const realValueMap = new Map();
  for (const [sign, entry] of PHONETIC) realValueMap.set(sign, entry.v);
  const { bigrams: realBigrams } = buildPdBigramsFromWords(allWords, { valueMap: realValueMap });
  const realOverlap = [...realBigrams].filter(b => targetBigrams.has(b)).length;

  const phonSignNums = [];
  for (const [sign, entry] of PHONETIC) {
    if (entry.c === "det" || entry.c === "none") continue;
    phonSignNums.push(sign);
  }

  // Pool: unique syllables across all 9 reference languages, restricted to
  // those that end in a vowel (LA-orthography shape). Including VC/CVC
  // Rasmussen syllables (e.g. ar, is, hut, isk) would let the random null
  // draw shapes that cannot match any LA bigram by construction, mechanically
  // biasing every fake reading toward zero overlap and inflating the apparent
  // significance of the real Daidalika reading.
  const VOWELS = new Set(["a", "e", "i", "o", "u"]);
  const isLaShape = (s) => s.length > 0 && VOWELS.has(s[s.length - 1]);
  const broadPool = new Set();
  for (const lang of LANGUAGES) {
    for (const tw of lang.words) for (const s of syllabify(tw.w)) {
      if (isLaShape(s)) broadPool.add(s);
    }
  }
  for (const tw of HITTITE_WORDS) for (const s of syllabify(tw.w)) {
    if (isLaShape(s)) broadPool.add(s);
  }
  const poolArr = [...broadPool];

  const rng = mulberry32(seed);
  let exceeding = 0;
  const overlapHist = new Map();

  for (let p = 0; p < permutations; p++) {
    const fakeMap = new Map(realValueMap);
    for (const sign of phonSignNums) {
      fakeMap.set(sign, poolArr[Math.floor(rng() * poolArr.length)]);
    }
    const { bigrams: fakeBigrams } = buildPdBigramsFromWords(allWords, { valueMap: fakeMap });
    const ov = [...fakeBigrams].filter(b => targetBigrams.has(b)).length;
    overlapHist.set(ov, (overlapHist.get(ov) ?? 0) + 1);
    if (ov >= realOverlap) exceeding++;
  }

  const histKeys = [...overlapHist.keys()].sort((a, b) => a - b);
  const totalPerms = permutations;
  let nullSum = 0, nullSumSq = 0;
  for (const [ov, count] of overlapHist) { nullSum += ov * count; nullSumSq += ov * ov * count; }
  const nullMean = nullSum / totalPerms;
  const nullSD = Math.sqrt(nullSumSq / totalPerms - nullMean * nullMean);

  return {
    realOverlap,
    permutations,
    fractionExceeding: exceeding / permutations,
    nullMean,
    nullSD,
    histogram: histKeys.map(k => ({ overlap: k, count: overlapHist.get(k) })),
    poolSize: poolArr.length,
  };
}

// Effect size analysis: z-score for the main Minoan MC result. Cohen's d is
// not currently reported (the function returns `observed`, `nullMean`,
// `nullSD`, `zScore`, `pValue`).
export function effectSizeAnalysis(sideA, sideB, langWords, { iterations = 100000, seed = 1414159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);
  const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);
  const targetBigrams = buildTargetBigrams(langWords);
  const observed = [...pdBigrams].filter(b => targetBigrams.has(b)).length;
  const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap(b => b.split("-")))];

  const rng = mulberry32(seed);
  let sum = 0, sumSq = 0, exc = 0;
  for (let i = 0; i < iterations; i++) {
    const fake = new Set();
    for (const len of pdWordLens) {
      const fw = [];
      for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
      for (const bg of ngramsOf(fw, 2)) fake.add(bg);
    }
    const ov = [...fake].filter(b => targetBigrams.has(b)).length;
    sum += ov;
    sumSq += ov * ov;
    if (ov >= observed) exc++;
  }

  const nullMean = sum / iterations;
  const nullSD = Math.sqrt(sumSq / iterations - nullMean * nullMean);
  const zScore = nullSD > 0 ? (observed - nullMean) / nullSD : 0;

  return { observed, nullMean, nullSD, zScore, pValue: exc / iterations };
}

// ---------------------------------------------------------------------------
// Positional bigram analysis: word-initial, word-medial, word-final
// ---------------------------------------------------------------------------
export function positionalBigramAnalysis(sideA, sideB, langWords, { iterations = 100000, seed = 1514159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);

  // Adjacency-breaking semantics: each phonetic segment (a maximal run between
  // unknown signs) is treated as an independent positional unit. This keeps
  // the disc's positional statistics consistent with the rest of the engine
  // and prevents `?17`-style placeholders from masquerading as real
  // initial/medial/final bigrams. Reference Linear A words are tokenised by
  // syllabify() with no breaks (their text is fully known), so each becomes a
  // single positional unit.
  function classifyBigramsFromSegments(segments) {
    const initial = new Set(), medial = new Set(), final_ = new Set();
    for (const seg of segments) {
      const bgs = ngramsOf(seg, 2);
      if (bgs.length === 0) continue;
      initial.add(bgs[0]);
      if (bgs.length > 1) final_.add(bgs[bgs.length - 1]);
      else final_.add(bgs[0]);
      for (let i = 1; i < bgs.length - 1; i++) medial.add(bgs[i]);
    }
    return { initial, medial, final: final_ };
  }

  const pdSegments = extractKnownPdSegments(allWords);
  const pdPos = classifyBigramsFromSegments(pdSegments);
  const laSegments = langWords.map(tw => syllabify(tw.w));
  const laPos = classifyBigramsFromSegments(laSegments);

  const positions = [
    { label: "Word-initial", pd: pdPos.initial, la: laPos.initial },
    { label: "Word-medial", pd: pdPos.medial, la: laPos.medial },
    { label: "Word-final", pd: pdPos.final, la: laPos.final },
  ];

  // Lengths are per-segment so the MC null draws "fake sub-words" at the same
  // distribution of segment sizes the disc actually exhibits after
  // adjacency-breaking.
  const pdWordLens = pdSegments.map(seg => seg.length);

  const allSyls = [...new Set([
    ...pdPos.initial, ...pdPos.medial, ...pdPos.final,
    ...laPos.initial, ...laPos.medial, ...laPos.final,
  ].flatMap(b => b.split("-")))];

  const results = positions.map((pos, pi) => {
    const overlap = [...pos.pd].filter(b => pos.la.has(b)).length;
    const rng = mulberry32(seed + pi);

    let exc = 0;
    for (let i = 0; i < iterations; i++) {
      const fakeInit = new Set(), fakeMed = new Set(), fakeFin = new Set();
      for (const len of pdWordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
        const bgs = ngramsOf(fw, 2);
        if (bgs.length === 0) continue;
        fakeInit.add(bgs[0]);
        if (bgs.length > 1) fakeFin.add(bgs[bgs.length - 1]);
        else fakeFin.add(bgs[0]);
        for (let k = 1; k < bgs.length - 1; k++) fakeMed.add(bgs[k]);
      }
      const fakeSet = pi === 0 ? fakeInit : pi === 1 ? fakeMed : fakeFin;
      if ([...fakeSet].filter(b => pos.la.has(b)).length >= overlap) exc++;
    }

    return {
      position: pos.label,
      pdCount: pos.pd.size,
      laCount: pos.la.size,
      overlap,
      pValue: exc / iterations,
    };
  });

  return results;
}

// ---------------------------------------------------------------------------
// Bootstrap confidence intervals on the Minoan overlap count
// ---------------------------------------------------------------------------
export function bootstrapOverlapCI(sideA, sideB, langWords, { bootstraps = 10000, seed = 1614159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);
  const targetBigrams = buildTargetBigrams(langWords);
  const { bigrams: fullBigrams } = buildPdBigramsFromWords(allWords);
  const observed = [...fullBigrams].filter(b => targetBigrams.has(b)).length;

  const rng = mulberry32(seed);
  const overlaps = [];

  for (let b = 0; b < bootstraps; b++) {
    const sample = [];
    for (let i = 0; i < allWords.length; i++) {
      sample.push(allWords[Math.floor(rng() * allWords.length)]);
    }
    const { bigrams } = buildPdBigramsFromWords(sample);
    overlaps.push([...bigrams].filter(bg => targetBigrams.has(bg)).length);
  }

  overlaps.sort((a, b) => a - b);
  const lo = Math.floor(bootstraps * 0.025);
  const hi = Math.floor(bootstraps * 0.975);
  const mean = overlaps.reduce((s, v) => s + v, 0) / bootstraps;

  const hist = new Map();
  for (const ov of overlaps) hist.set(ov, (hist.get(ov) ?? 0) + 1);
  const histKeys = [...hist.keys()].sort((a, b) => a - b);

  return {
    observed,
    mean: mean,
    ci95: [overlaps[lo], overlaps[hi]],
    min: overlaps[0],
    max: overlaps[overlaps.length - 1],
    bootstraps,
    histogram: histKeys.map(k => ({ overlap: k, count: hist.get(k) })),
  };
}

// ---------------------------------------------------------------------------
// Trigram overlap test
// ---------------------------------------------------------------------------
export function trigramOverlapTest(sideA, sideB, langWords, { iterations = 100000, seed = 1714159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);

  // Adjacency-breaking semantics: trigrams are formed only within phonetic
  // segments (the same convention buildPdBigramsFromWords uses for bigrams),
  // so an unknown-value sign such as Sign 17 cuts the word into independent
  // sub-segments and never contributes to a fake trigram in the MC null.
  const pdTrigrams = new Set();
  const pdWordLens = [];
  const pdSegments = extractKnownPdSegments(allWords);
  for (const seg of pdSegments) {
    pdWordLens.push(seg.length);
    for (const tg of ngramsOf(seg, 3)) pdTrigrams.add(tg);
  }

  const laTrigrams = new Set();
  for (const tw of langWords) {
    for (const tg of ngramsOf(syllabify(tw.w), 3)) laTrigrams.add(tg);
  }

  const overlap = [...pdTrigrams].filter(t => laTrigrams.has(t)).length;
  const matchingTrigrams = [...pdTrigrams].filter(t => laTrigrams.has(t));

  const allSyls = [...new Set([...pdTrigrams, ...laTrigrams].flatMap(t => t.split("-")))];

  const rng = mulberry32(seed);
  let exc = 0;
  for (let i = 0; i < iterations; i++) {
    const fake = new Set();
    for (const len of pdWordLens) {
      const fw = [];
      for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
      for (const tg of ngramsOf(fw, 3)) fake.add(tg);
    }
    if ([...fake].filter(t => laTrigrams.has(t)).length >= overlap) exc++;
  }

  return {
    pdTrigramCount: pdTrigrams.size,
    laTrigramCount: laTrigrams.size,
    overlap,
    matchingTrigrams,
    pValue: exc / iterations,
  };
}

// ---------------------------------------------------------------------------
// Helpers: syllable phonetic feature parsing
// ---------------------------------------------------------------------------
function parseSyllable(syl) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  for (let i = syl.length - 1; i >= 0; i--) {
    if (vowels.has(syl[i])) return { onset: syl.slice(0, i), vowel: syl.slice(i) };
  }
  return { onset: syl, vowel: "" };
}

function syllableDistance(s1, s2) {
  if (s1 === s2) return 0;
  const p1 = parseSyllable(s1);
  const p2 = parseSyllable(s2);
  return (p1.onset !== p2.onset ? 1 : 0) + (p1.vowel !== p2.vowel ? 1 : 0);
}

// ---------------------------------------------------------------------------
// 16. Entropy analysis — unigram and bigram entropy for disc vs all languages
// ---------------------------------------------------------------------------
export function entropyAnalysis(sideA, sideB) {
  function computeEntropy(freqMap) {
    let total = 0;
    for (const c of freqMap.values()) total += c;
    if (total === 0) return { entropy: 0, types: 0, tokens: 0 };
    let h = 0;
    for (const c of freqMap.values()) { const p = c / total; if (p > 0) h -= p * Math.log2(p); }
    return { entropy: h, types: freqMap.size, tokens: total };
  }

  function corpusEntropy(words, extractSyls) {
    const uniFreq = new Map(), biFreq = new Map();
    for (const w of words) {
      const syls = extractSyls(w);
      for (const s of syls) uniFreq.set(s, (uniFreq.get(s) ?? 0) + 1);
      for (const bg of ngramsOf(syls, 2)) biFreq.set(bg, (biFreq.get(bg) ?? 0) + 1);
    }
    return { unigram: computeEntropy(uniFreq), bigram: computeEntropy(biFreq) };
  }

  const allWords = mergeAllWords(sideA, sideB);
  // Use adjacency-breaking segments instead of raw `phoneticValue` strings.
  // A `signs.map(phoneticValue).join("-")` + syllabify path forms bigrams
  // like `[?17, ti]` and `[A, ??]` whose frequencies pollute the bigram
  // entropy. Each segment contributes its own unigram + bigram counts;
  // unknown signs split the word and never form a syllable on their own.
  const pdSegments = extractKnownPdSegments(allWords);
  const pdUniFreq = new Map();
  const pdBiFreq = new Map();
  for (const seg of pdSegments) {
    for (const s of seg) pdUniFreq.set(s, (pdUniFreq.get(s) ?? 0) + 1);
    for (const bg of ngramsOf(seg, 2)) pdBiFreq.set(bg, (pdBiFreq.get(bg) ?? 0) + 1);
  }
  const pd = { unigram: computeEntropy(pdUniFreq), bigram: computeEntropy(pdBiFreq) };

  const allLangs = [
    ...LANGUAGES.map(l => ({ id: l.id, name: l.name, words: l.words })),
    { id: "hittite", name: "Hittite (Rasmussen)", words: HITTITE_WORDS },
  ];
  const languages = allLangs.map(lang => ({
    id: lang.id, name: lang.name,
    ...corpusEntropy(lang.words, tw => syllabify(tw.w)),
  }));

  return { pd, languages };
}

// ---------------------------------------------------------------------------
// 17. Minimum Bayes factors (Sellke, Bayarri & Berger 2001)
// Pure formula — takes p-values, returns BF and posterior probability.
// ---------------------------------------------------------------------------
export function bayesFactors(langPValues, { iterations = 100000 } = {}) {
  // Sellke-Bayarri-Berger (2001) bound: -e·p·ln(p) is a LOWER bound on BF₀₁
  // (equivalently, an UPPER bound on BF₁₀) under any reasonable proper prior on
  // the alternative. It is NOT a posterior odds: the true BF₁₀ can be anywhere
  // in (0, this bound]. The strength labels below describe the maximum evidence
  // against H₀ that the bound permits; `postH1Bound` is flagged as a bound.
  //
  // pFloor: when a Monte Carlo p-value is exactly 0 (no exceedances out of N
  // iterations), the true tail is bounded above by ~1/N rather than literally
  // zero. Floor p at `pFloor` so the bound cannot diverge to Infinity off MC noise.
  const pFloor = iterations > 0 ? 1 / iterations : 1e-12;
  return langPValues.map(({ id, name, pValue: p }) => {
    const pEff = Math.max(p, pFloor);
    let bf01Lower;
    if (pEff <= 1 / Math.E) bf01Lower = -Math.E * pEff * Math.log(pEff);
    else bf01Lower = 1;
    const bf10Upper = bf01Lower > 0 ? 1 / bf01Lower : 1 / pFloor;
    const postH1Bound = 1 / (1 + bf01Lower);
    let maxEvidence;
    if (bf10Upper >= 100) maxEvidence = "at most decisive";
    else if (bf10Upper >= 30) maxEvidence = "at most very strong";
    else if (bf10Upper >= 10) maxEvidence = "at most strong";
    else if (bf10Upper >= 3) maxEvidence = "at most moderate";
    else if (bf10Upper >= 1) maxEvidence = "at most anecdotal";
    else maxEvidence = "favors null";
    return {
      id,
      name,
      pValue: p,
      pEffective: pEff,
      bf10Upper,
      bf01Lower,
      postH1Bound,
      maxEvidence,
      // Backward-compatible aliases (deprecated; UI may still read these)
      bfH1: bf10Upper,
      postH1: postH1Bound,
      strength: maxEvidence,
    };
  });
}

// ---------------------------------------------------------------------------
// 18. Phonetic distance-weighted overlap (Minoan only)
// ---------------------------------------------------------------------------
export function phoneticDistanceOverlap(sideA, sideB, langWords, { iterations = 10000, seed = 1914159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);
  const { bigrams: pdBgSet, wordLens } = buildPdBigramsFromWords(allWords);
  const pdBgs = [...pdBgSet];
  const targetBgs = [...buildTargetBigrams(langWords)];
  const allSyls = [...new Set([...pdBgs, ...targetBgs].flatMap(b => b.split("-")))];

  const dCache = new Map();
  for (const s1 of allSyls) for (const s2 of allSyls)
    dCache.set(s1 + "|" + s2, syllableDistance(s1, s2));

  function bgSim(bg1, bg2) {
    const [a1, b1] = bg1.split("-");
    const [a2, b2] = bg2.split("-");
    const ss = d => d === 0 ? 1 : d === 1 ? 0.5 : 0;
    return (ss(dCache.get(a1 + "|" + a2) ?? 2) + ss(dCache.get(b1 + "|" + b2) ?? 2)) / 2;
  }

  function score(bgs) {
    let total = 0, exact = 0, near = 0;
    for (const dbg of bgs) {
      let best = 0;
      for (const tbg of targetBgs) {
        const s = bgSim(dbg, tbg);
        if (s > best) best = s;
        if (s === 1) break;
      }
      total += best;
      if (best === 1) exact++;
      else if (best >= 0.5) near++;
    }
    return { total, exact, near };
  }

  const observed = score(pdBgs);
  const rng = mulberry32(seed);
  let exc = 0;
  for (let i = 0; i < iterations; i++) {
    const fake = new Set();
    for (const len of wordLens) {
      const fw = [];
      for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
      for (const bg of ngramsOf(fw, 2)) fake.add(bg);
    }
    if (score([...fake]).total >= observed.total) exc++;
  }

  return {
    exactMatches: observed.exact, nearMisses: observed.near,
    weightedScore: observed.total, pValue: exc / iterations,
    pdBigramCount: pdBgs.length, laBigramCount: targetBgs.length,
  };
}

// ---------------------------------------------------------------------------
// 19. Reverse direction test — read disc words backwards, retest Minoan
// ---------------------------------------------------------------------------
// Seed alignment: `seed = 314159` matches the headline `fullNineLanguageComparison`
// uniformSeed, so the forward leg reproduces the canonical Minoan p-value
// exactly rather than differing by Monte Carlo noise from a separate seed.
export function reverseDirectionTest(sideA, sideB, langWords, { iterations = 100000, seed = 314159 } = {}) {
  const fwd = singleLanguageMC(sideA, sideB, langWords, { iterations, seed });
  // Apples-to-apples reversal: strip the Sign 02 determinative BEFORE reversing,
  // otherwise Sign 02 ends up word-final and singleLanguageMC's det-strip (which
  // only fires on signs[0] === 2) would silently elongate every ex-determinative
  // word by one syllable, contaminating the null-pool with the "°" determinative
  // marker and shifting the null mean.
  //
  // Preserve `null` damaged-sign placeholders during reversal so adjacency-breaking
  // applies symmetrically. Filtering nulls before reversing would turn a
  // forward-direction word `[a, null, b]` (which contributes 0 bigrams) into a
  // reversed word `[b, a]` (which contributes the bigram `b-a`).
  //
  // The det-strip condition fires on `signs[0] === 2` only when the very first
  // sign is Sign 02, NOT when the first non-null sign is Sign 02. We replicate
  // the same condition here before reversing the remaining signs.
  const stripAndReverse = (w) => {
    let signs = w.signs;
    if (signs.length > 0 && signs[0] === 2) {
      signs = signs.slice(1);
    }
    return { ...w, signs: signs.slice().reverse() };
  };
  const revA = { words: sideA.words.map(stripAndReverse) };
  const revB = { words: sideB.words.map(stripAndReverse) };
  const rev = singleLanguageMC(revA, revB, langWords, { iterations, seed: seed + 1, includeDet: true });
  return {
    forward: { overlap: fwd.overlap, pValue: fwd.pValue, pdBigrams: fwd.pdBigrams },
    reversed: { overlap: rev.overlap, pValue: rev.pValue, pdBigrams: rev.pdBigrams },
  };
}

// ---------------------------------------------------------------------------
// 20. Minimal-pair phonetic plausibility
// ---------------------------------------------------------------------------
export function minimalPairPlausibility(sideA, sideB) {
  const allWords = mergeAllWords(sideA, sideB);

  function phonSigns(w) {
    const signs = w.signs.filter(x => x != null);
    return signs[0] === 2 ? signs.slice(1) : signs;
  }

  const pairs = [];
  const seen = new Set();
  for (let i = 0; i < allWords.length; i++) {
    const s1 = phonSigns(allWords[i]);
    for (let j = i + 1; j < allWords.length; j++) {
      const s2 = phonSigns(allWords[j]);
      if (s1.length !== s2.length || s1.length < 2) continue;
      let diffs = 0, dPos = -1;
      for (let k = 0; k < s1.length; k++) if (s1[k] !== s2[k]) { diffs++; dPos = k; }
      if (diffs !== 1) continue;

      const r1 = /* canonical-pipeline-allowed: dedup hash key, not a bigram pipeline */ s1.map(phoneticValue).join("-");
      const r2 = /* canonical-pipeline-allowed: dedup hash key, not a bigram pipeline */ s2.map(phoneticValue).join("-");
      const key = [r1, r2].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);

      const v1 = phoneticValue(s1[dPos]), v2 = phoneticValue(s2[dPos]);
      const p1 = parseSyllable(v1), p2 = parseSyllable(v2);
      // Allograph case: distinct sign tokens whose phonetic values are
      // identical. This indicates a script-level allograph rather than a
      // minimal pair.
      let rel;
      if (p1.onset === p2.onset && p1.vowel === p2.vowel) rel = "allograph";
      else if (p1.onset === p2.onset && p1.vowel !== p2.vowel) rel = "same-C";
      else if (p1.onset !== p2.onset && p1.vowel === p2.vowel) rel = "same-V";
      else rel = "unrelated";

      pairs.push({ word1: r1, word2: r2, position: dPos, val1: v1, val2: v2, relationship: rel });
    }
  }

  return {
    pairs,
    sameConsonant: pairs.filter(p => p.relationship === "same-C").length,
    sameVowel: pairs.filter(p => p.relationship === "same-V").length,
    allograph: pairs.filter(p => p.relationship === "allograph").length,
    unrelated: pairs.filter(p => p.relationship === "unrelated").length,
    total: pairs.length,
  };
}

// ---------------------------------------------------------------------------
// 21. Two-sided elimination — tests both tails for all 9 languages
// ---------------------------------------------------------------------------
export function twoSidedElimination(sideA, sideB, { iterations = 10000, seed = 2114159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);
  const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);

  // Rasmussen-reading parallel bigram set / word-length stream for Hittite.
  // HITTITE_WORDS must be tested against `rasmusBigrams`, not the Daidalika
  // `pdBigrams`: Hittite's `lang.words` are pre-syllabified under Rasmussen's
  // value system, so a Daidalika-bigram comparison would mix readings.
  const rasmusValueMap = new Map();
  for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
  const { bigrams: rasmusBigrams, wordLens: rasWordLens } =
    buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });

  const allLangs = [
    ...LANGUAGES.map(l => ({ id: l.id, name: l.name, words: l.words })),
    { id: "hittite", name: "Hittite", words: HITTITE_WORDS },
  ];

  return allLangs.map((lang, li) => {
    const isHittite = lang.id === "hittite";
    const discBigrams = isHittite ? rasmusBigrams : pdBigrams;
    const wordLens = isHittite ? rasWordLens : pdWordLens;

    const targetBigrams = buildTargetBigrams(lang.words);
    const overlap = [...discBigrams].filter(b => targetBigrams.has(b)).length;
    const allSyls = [...new Set([...discBigrams, ...targetBigrams].flatMap(b => b.split("-")))];
    const rng = mulberry32(seed + li);
    let excUp = 0, excLow = 0, sum = 0;
    for (let i = 0; i < iterations; i++) {
      const fake = new Set();
      for (const len of wordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
        for (const bg of ngramsOf(fw, 2)) fake.add(bg);
      }
      const ov = [...fake].filter(b => targetBigrams.has(b)).length;
      sum += ov;
      if (ov >= overlap) excUp++;
      if (ov <= overlap) excLow++;
    }
    return {
      id: lang.id, name: lang.name, overlap,
      nullMean: sum / iterations,
      upperP: excUp / iterations,
      lowerP: excLow / iterations,
    };
  });
}

// ---------------------------------------------------------------------------
// 22. Formal power curve — min detectable effect at 80% power per corpus size
// ---------------------------------------------------------------------------
export function formalPowerCurve(sideA, sideB, { iterations = 10000, seed = 2214159 } = {}) {
  const allWords = [...sideA.words, ...sideB.words];
  const { bigrams: pdBigrams, wordLens } = buildPdBigramsFromWords(allWords);

  // Seeded shuffle so the per-size subsamples are nested random draws from
  // LINEAR_A_WORDS, not the declaration-order prefix `slice(0, size)`. A
  // declaration-order prefix entangles the curve with curation order: the
  // PD-inspired ratio at size=15 was 4/15, at size=20 was 6/20, etc., drifting
  // non-monotonically with size. The shuffle is independent of the MC RNG so
  // null draws remain reproducible.
  const subsetRng = mulberry32(seed ^ 0x517cc1b7);
  const shuffledLA = fisherYatesShuffle(LINEAR_A_WORDS, subsetRng);

  const corpusSizes = [15, 20, 25, 30, 34, 40, 50, 60, 72];
  const results = [];
  const rng = mulberry32(seed);

  for (const size of corpusSizes) {
    const langWords = shuffledLA.slice(0, Math.min(size, shuffledLA.length));
    const targetBigrams = buildTargetBigrams(langWords);
    const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap(b => b.split("-")))];

    const nullDist = [];
    for (let i = 0; i < iterations; i++) {
      const fake = new Set();
      for (const len of wordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
        for (const bg of ngramsOf(fw, 2)) fake.add(bg);
      }
      nullDist.push([...fake].filter(b => targetBigrams.has(b)).length);
    }
    nullDist.sort((a, b) => a - b);

    const mean = nullDist.reduce((s, v) => s + v, 0) / iterations;
    const sd = Math.sqrt(nullDist.reduce((s, v) => s + (v - mean) ** 2, 0) / iterations);
    const crit95 = nullDist[Math.floor(iterations * 0.95)];

    // Empirical 80th percentile of the null distribution.
    // This is NOT a textbook minimum-detectable-effect at 80% power against a fixed alternative;
    // it is an exploratory heuristic threshold (P(null < ov) >= 0.80). The UI labels it accordingly.
    let minDetectable = null;
    for (let ov = crit95; ov <= crit95 + 20; ov++) {
      const below = nullDist.filter(v => v < ov).length / iterations;
      if (below >= 0.80) { minDetectable = ov; break; }
    }

    results.push({
      corpusSize: size,
      effectiveSize: langWords.filter(tw => syllabify(tw.w).length >= 2).length,
      nullMean: mean,
      nullSD: sd,
      critical95: crit95,
      minDetectable80: minDetectable ?? crit95 + 1,
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// 23. Token-weighted bigram overlap — report token counts for shared bigrams
// ---------------------------------------------------------------------------
export function tokenWeightedOverlap(sideA, sideB, langWords) {
  const allWords = [...sideA.words, ...sideB.words];
  const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords);
  const targetBigrams = buildTargetBigrams(langWords);
  const shared = [...pdBigrams].filter(b => targetBigrams.has(b));

  // Token counts use the same adjacency-breaking semantics as the type-level
  // bigram engine: bigrams are counted within phonetic segments only, so
  // unknown signs (e.g. `?17`) cannot inflate a disc-side token count.
  const pdBigramTokens = new Map();
  for (const seg of extractKnownPdSegments(allWords)) {
    for (const bg of ngramsOf(seg, 2)) {
      pdBigramTokens.set(bg, (pdBigramTokens.get(bg) ?? 0) + 1);
    }
  }

  const laBigramTokens = new Map();
  for (const tw of langWords) {
    for (const bg of ngramsOf(syllabify(tw.w), 2)) {
      laBigramTokens.set(bg, (laBigramTokens.get(bg) ?? 0) + 1);
    }
  }

  const details = shared.map(bg => ({
    bigram: bg,
    pdTokens: pdBigramTokens.get(bg) ?? 0,
    laTokens: laBigramTokens.get(bg) ?? 0,
  })).sort((a, b) => (b.pdTokens + b.laTokens) - (a.pdTokens + a.laTokens));

  const totalPdTokens = details.reduce((s, d) => s + d.pdTokens, 0);
  const totalLaTokens = details.reduce((s, d) => s + d.laTokens, 0);

  return {
    sharedCount: shared.length,
    details,
    totalPdTokens,
    totalLaTokens,
  };
}

// ---------------------------------------------------------------------------
// 24. Corpus curation sensitivity — randomly include/exclude borderline words
// ---------------------------------------------------------------------------
export function corpusCurationSensitivity(sideA, sideB, { trials = 200, seed = 2314159, mcIter = 10000 } = {}) {
  const allWords = [...sideA.words, ...sideB.words];
  const { bigrams: pdBigrams, wordLens } = buildPdBigramsFromWords(allWords);
  const rng = mulberry32(seed);
  const excluded = LINEAR_A_EXCLUDED;
  const base = LINEAR_A_WORDS;
  const n = excluded.length;

  const overlaps = [];
  const pValues = [];

  for (let t = 0; t < trials; t++) {
    const subset = [...base];
    for (let i = 0; i < n; i++) {
      if (rng() < 0.5) subset.push(excluded[i]);
    }
    const targetBigrams = buildTargetBigrams(subset);
    const overlap = [...pdBigrams].filter(b => targetBigrams.has(b)).length;
    const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap(b => b.split("-")))];

    // Inner MC iteration count is caller-controllable (default 10k) so the
    // UI's global iteration setting scales this routine.
    const mcRng = mulberry32(seed + 1 + t);
    let exc = 0;
    for (let i = 0; i < mcIter; i++) {
      const fake = new Set();
      for (const len of wordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(mcRng() * allSyls.length)]);
        for (const bg of ngramsOf(fw, 2)) fake.add(bg);
      }
      if ([...fake].filter(b => targetBigrams.has(b)).length >= overlap) exc++;
    }
    const p = exc / mcIter;
    overlaps.push(overlap);
    pValues.push(p);
  }

  overlaps.sort((a, b) => a - b);
  pValues.sort((a, b) => a - b);

  const meanOv = overlaps.reduce((s, v) => s + v, 0) / trials;
  const meanP = pValues.reduce((s, v) => s + v, 0) / trials;
  const minP = pValues[0];
  const maxP = pValues[pValues.length - 1];
  const sigFraction = pValues.filter(p => p < 0.05).length / trials;

  return {
    trials,
    mcIter,
    excludedCount: n,
    overlapRange: [overlaps[0], overlaps[overlaps.length - 1]],
    meanOverlap: meanOv,
    pValueRange: [minP, maxP],
    meanPValue: meanP,
    fractionSignificant: sigFraction,
  };
}

// ---------------------------------------------------------------------------
// 25. Fixed-pool comparison (M2) — uniform syllable pool across languages
// ---------------------------------------------------------------------------
function collectSyllablesFromBigrams(bigrams, into) {
  for (const b of bigrams) {
    for (const s of b.split("-")) into.add(s);
  }
}

function buildUniversalSyllablePool(allWords) {
  const { bigrams: pdB } = buildPdBigramsFromWords(allWords);
  const rasmusValueMap = new Map();
  for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
  const { bigrams: rasB } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });

  const syls = new Set();
  collectSyllablesFromBigrams(pdB, syls);
  collectSyllablesFromBigrams(rasB, syls);
  for (const lang of LANGUAGES) {
    collectSyllablesFromBigrams(buildTargetBigrams(lang.words), syls);
  }
  collectSyllablesFromBigrams(buildTargetBigrams(HITTITE_WORDS), syls);
  return [...syls];
}

export function fixedPoolComparison(sideA, sideB, { iterations = 10000, seed = 2414159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);
  const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);
  const rasmusValueMap = new Map();
  for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
  const { bigrams: rasmusBigrams, wordLens: rasWordLens } =
    buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });

  const universalPool = buildUniversalSyllablePool(allWords);
  const results = [];

  for (let li = 0; li < LANGUAGES.length; li++) {
    const lang = LANGUAGES[li];
    const targetBigrams = buildTargetBigrams(lang.words);
    const overlap = [...pdBigrams].filter(b => targetBigrams.has(b)).length;
    const rng = mulberry32(seed + li);
    const pValue = runMcForLang(targetBigrams, overlap, universalPool, pdWordLens, rng, iterations);
    results.push({
      id: lang.id,
      name: lang.name,
      overlap,
      targetSize: targetBigrams.size,
      pValue,
    });
  }

  const hitBigrams = buildTargetBigrams(HITTITE_WORDS);
  const hitOverlap = [...rasmusBigrams].filter(b => hitBigrams.has(b)).length;
  const hitRng = mulberry32(seed + LANGUAGES.length);
  const hitP = runMcForLang(hitBigrams, hitOverlap, universalPool, rasWordLens, hitRng, iterations);
  results.push({
    id: "hittite",
    name: "Hittite (Rasmussen)",
    overlap: hitOverlap,
    targetSize: hitBigrams.size,
    pValue: hitP,
  });

  results.sort((a, b) => a.pValue - b.pValue);
  return results;
}

// ---------------------------------------------------------------------------
// 26. Permutation FWER (M3) — min MC p across 9 under random disc texts
// Hittite uses the Rasmussen reading (includeDet, rasmusValueMap), consistent
// with fullNineLanguageComparison and fixedPoolComparison.
// ---------------------------------------------------------------------------
export function permutationFWER(sideA, sideB, { permutations = 1000, mcPerPerm = 1000, seed = 2514159 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);
  const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);
  const rasmusValueMap = new Map();
  for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
  const { bigrams: rasmusBigrams, wordLens: rasWordLens } =
    buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
  const universalPool = buildUniversalSyllablePool(allWords);

  const allLangs = [
    ...LANGUAGES.map(l => ({ id: l.id, name: l.name, words: l.words })),
    { id: "hittite", name: "Hittite", words: HITTITE_WORDS },
  ];

  const observedPs = [];
  for (let li = 0; li < allLangs.length; li++) {
    const lang = allLangs[li];
    const isHittite = lang.id === "hittite";
    const discBg = isHittite ? rasmusBigrams : pdBigrams;
    const discWl = isHittite ? rasWordLens : pdWordLens;
    const targetBigrams = buildTargetBigrams(lang.words);
    const overlap = [...discBg].filter(b => targetBigrams.has(b)).length;
    const rng = mulberry32(seed + li);
    const p = runMcForLang(targetBigrams, overlap, universalPool, discWl, rng, mcPerPerm);
    observedPs.push(p);
  }
  const observedMinP = Math.min(...observedPs);

  let countLe = 0;
  for (let pi = 0; pi < permutations; pi++) {
    const permRng = mulberry32(seed + 10000 + pi);

    const fake = new Set();
    for (const len of pdWordLens) {
      const fw = [];
      for (let j = 0; j < len; j++) fw.push(universalPool[Math.floor(permRng() * universalPool.length)]);
      for (const bg of ngramsOf(fw, 2)) fake.add(bg);
    }

    const fakeRas = new Set();
    for (const len of rasWordLens) {
      const fw = [];
      for (let j = 0; j < len; j++) fw.push(universalPool[Math.floor(permRng() * universalPool.length)]);
      for (const bg of ngramsOf(fw, 2)) fakeRas.add(bg);
    }

    let minPLoop = 1;
    for (let li = 0; li < allLangs.length; li++) {
      const lang = allLangs[li];
      const isHittite = lang.id === "hittite";
      const fakeBg = isHittite ? fakeRas : fake;
      const discWl = isHittite ? rasWordLens : pdWordLens;
      const targetBigrams = buildTargetBigrams(lang.words);
      const ov = [...fakeBg].filter(b => targetBigrams.has(b)).length;
      const mcRng = mulberry32(seed + 200000 + pi * allLangs.length + li);
      const p = runMcForLang(targetBigrams, ov, universalPool, discWl, mcRng, mcPerPerm);
      if (p < minPLoop) minPLoop = p;
    }
    if (minPLoop <= observedMinP) countLe++;
  }

  return {
    observedMinP,
    fwerP: countLe / permutations,
    permutations,
  };
}

// ---------------------------------------------------------------------------
// 27. Jackknife language stability (M4) — leave-one-out overlap range
// ---------------------------------------------------------------------------
export function jackknifeLangStability(sideA, sideB, { topN = 3 } = {}) {
  const allWords = mergeAllWords(sideA, sideB);
  const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords);
  const rasmusValueMap = new Map();
  for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
  const { bigrams: rasmusBigrams } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });

  let bestThird = null;
  let bestOv = -1;
  for (const lang of LANGUAGES) {
    if (lang.id === "minoan" || lang.id === "luwian") continue;
    const t = buildTargetBigrams(lang.words);
    const ov = [...pdBigrams].filter(b => t.has(b)).length;
    if (ov > bestOv || (ov === bestOv && bestThird && lang.id < bestThird.id)) {
      bestOv = ov;
      bestThird = lang;
    }
  }

  const specs = [
    { id: "hittite", name: "Hittite (Rasmussen)", words: HITTITE_WORDS, pdBigrams: rasmusBigrams },
    { id: "luwian", name: "Luwian (Anatolian)", words: LANGUAGES.find(l => l.id === "luwian").words, pdBigrams },
    { id: bestThird.id, name: bestThird.name, words: bestThird.words, pdBigrams },
  ].slice(0, topN);

  const out = [];
  for (const spec of specs) {
    const targetFull = buildTargetBigrams(spec.words);
    const baseOverlap = [...spec.pdBigrams].filter(b => targetFull.has(b)).length;
    const overlaps = [];
    for (let i = 0; i < spec.words.length; i++) {
      const subset = spec.words.filter((_, j) => j !== i);
      const tb = buildTargetBigrams(subset);
      overlaps.push([...spec.pdBigrams].filter(b => tb.has(b)).length);
    }
    const minOverlap = overlaps.length ? Math.min(...overlaps) : baseOverlap;
    const maxOverlap = overlaps.length ? Math.max(...overlaps) : baseOverlap;
    const meanOverlap = overlaps.length
      ? overlaps.reduce((s, v) => s + v, 0) / overlaps.length
      : baseOverlap;
    const sensitive = minOverlap !== maxOverlap;

    out.push({
      id: spec.id,
      name: spec.name,
      baseOverlap,
      minOverlap,
      maxOverlap,
      meanOverlap,
      sensitive,
    });
  }

  return out;
}

// ---------------------------------------------------------------------------
// 28. Sign 02 / qe binding (exact + permutation)
// Tests whether Sign 02 is followed by Sign 12 ("qe") more often than chance,
// conditional on the empirical sign distribution in non-initial positions.
//
// Setup: of all bigram second-positions on the disc (N), K contain Sign 12.
// Of the n positions that immediately follow Sign 02, k contain Sign 12.
// Under the null "Sign 12 tokens are exchangeable across follower slots",
// k follows Hypergeometric(N, K, n). The exact one-sided upper-tail p is the
// canonical test; an MC permutation is reported as a transparency check.
// ---------------------------------------------------------------------------
export function signZeroTwoQeBinding(sideA, sideB, {
  iterations = 100000,
  seed = 2614159,
  sign02 = 2,
  sign12 = 12,
} = {}) {
  const allWords = mergeAllWords(sideA, sideB);

  let s02InitialCount = 0;
  let s02FollowedByS12 = 0;
  let s12FollowerCount = 0;
  let totalFollowers = 0;

  for (const w of allWords) {
    const signs = w.signs.filter(x => x != null);
    if (signs.length < 2) continue;
    if (signs[0] === sign02) {
      s02InitialCount++;
      if (signs[1] === sign12) s02FollowedByS12++;
    }
    for (let i = 0; i < signs.length - 1; i++) {
      totalFollowers++;
      if (signs[i + 1] === sign12) s12FollowerCount++;
    }
  }

  const expected = totalFollowers > 0
    ? s02InitialCount * (s12FollowerCount / totalFollowers)
    : 0;
  const bindingRate = s02InitialCount > 0
    ? s02FollowedByS12 / s02InitialCount
    : 0;
  const lift = expected > 0 ? s02FollowedByS12 / expected : 0;

  const exactP = hypergeomSf(totalFollowers, s12FollowerCount, s02InitialCount, s02FollowedByS12);

  // MC permutation: place K Sign-12 tokens uniformly at random across N follower slots
  // (Fisher-Yates partial shuffle), then count how often >= k of the n "after-Sign-02" slots
  // hold a Sign 12. The first n indices in the permuted array represent the after-Sign-02 slots.
  const rng = mulberry32(seed);
  const N = totalFollowers;
  const K = s12FollowerCount;
  const n = s02InitialCount;
  let exc = 0;

  if (N > 0 && K > 0 && n > 0) {
    // `idx` is initialized once outside the loop and intentionally NOT reset
    // between iterations. This is correct (not a state-leak bug) because:
    // a partial Fisher-Yates shuffle of length K applied to ANY current
    // permutation of [0..N) yields a uniformly random K-subset of [0..N) in
    // its first K slots, regardless of the array's prior state. Resetting to
    // the identity permutation would cost ≈ N writes per iteration (~38 ms
    // over 100k iters at N≈222) without changing the marginal distribution.
    // We rely on this invariant; do not "fix" it by re-initializing idx.
    const idx = new Array(N);
    for (let i = 0; i < N; i++) idx[i] = i;
    for (let it = 0; it < iterations; it++) {
      // Partial Fisher-Yates: pick K distinct positions to receive Sign 12.
      // We only need the count of those positions that fall in the first n
      // slots (the after-Sign-02 follower slots).
      for (let i = 0; i < K; i++) {
        const r = i + Math.floor(rng() * (N - i));
        const tmp = idx[i]; idx[i] = idx[r]; idx[r] = tmp;
      }
      let hits = 0;
      for (let i = 0; i < K; i++) if (idx[i] < n) hits++;
      if (hits >= s02FollowedByS12) exc++;
    }
  }
  const mcP = N > 0 ? exc / iterations : 1;

  return {
    s02InitialCount,
    s02FollowedByS12,
    s12FollowerCount,
    totalFollowers,
    bindingRate,
    expected,
    lift,
    exactP,
    mcP,
    iterations,
  };
}
