import { el, table, resultCard } from "../dom.mjs";
import { phoneticValue, phoneticWord } from "../engine/phonetics.mjs";

function getPhoneticSigns(w) {
  const signs = w.signs.filter(s => s != null);
  const hasDet = signs[0] === 2;
  return hasDet ? signs.slice(1) : signs;
}

function findMinimalPairs(sideA, sideB) {
  const allWords = [...sideA.words, ...sideB.words];
  const pairs = [];

  for (let i = 0; i < allWords.length; i++) {
    for (let j = i + 1; j < allWords.length; j++) {
      const a = getPhoneticSigns(allWords[i]);
      const b = getPhoneticSigns(allWords[j]);
      if (a.length !== b.length || a.length < 2) continue;

      let diffs = 0;
      let diffPos = -1;
      for (let k = 0; k < a.length; k++) {
        if (phoneticValue(a[k]) !== phoneticValue(b[k])) { diffs++; diffPos = k; }
      }
      if (diffs === 1) {
        pairs.push({
          wordA: phoneticWord(a),
          wordB: phoneticWord(b),
          position: diffPos,
          signA: a[diffPos],
          signB: b[diffPos],
          valA: phoneticValue(a[diffPos]),
          valB: phoneticValue(b[diffPos]),
        });
      }
    }
  }
  return pairs;
}

function analyzePrefixSuffix(sideA, sideB) {
  const allWords = [...sideA.words, ...sideB.words];

  const prefixes = new Map();
  const suffixes = new Map();
  let total = 0;
  let damagedFinal = 0;

  for (const w of allWords) {
    const phonSigns = getPhoneticSigns(w);
    if (phonSigns.length < 2) continue;
    total++;

    const pref = phoneticValue(phonSigns[0]);
    prefixes.set(pref, (prefixes.get(pref) ?? 0) + 1);

    // Suffix counter: words with a damaged (`??` -> null) final sign carry an
    // unknown true suffix; do NOT credit any phonetic value for them. The
    // denominator stays at `total` so percentages are reported against the
    // full 61 word-group corpus.
    const lastRaw = w.signs.length > 0 ? w.signs[w.signs.length - 1] : null;
    if (lastRaw == null) {
      damagedFinal++;
      continue;
    }
    const suf = phoneticValue(phonSigns[phonSigns.length - 1]);
    suffixes.set(suf, (suffixes.get(suf) ?? 0) + 1);
  }

  const sortedPrefixes = [...prefixes.entries()].sort((a, b) => b[1] - a[1]);
  const sortedSuffixes = [...suffixes.entries()].sort((a, b) => b[1] - a[1]);
  return { sortedPrefixes, sortedSuffixes, total, damagedFinal };
}

function wordLengthDist(sideA, sideB) {
  const allWords = [...sideA.words, ...sideB.words];
  const dist = new Map();
  for (const w of allWords) {
    const len = getPhoneticSigns(w).length;
    dist.set(len, (dist.get(len) ?? 0) + 1);
  }
  return [...dist.entries()].sort((a, b) => a[0] - b[0]);
}

export function render(container, ctx) {
  const { sideA, sideB } = ctx;
  const pairs = findMinimalPairs(sideA, sideB);
  const { sortedPrefixes, sortedSuffixes, total, damagedFinal } = analyzePrefixSuffix(sideA, sideB);
  const lenDist = wordLengthDist(sideA, sideB);

  container.appendChild(
    el("div", {},
      el("h2", {}, "Morphology"),
      el("p", {},
        "Morphological analysis examines internal structure: minimal pairs suggest ",
        "phonemic contrast, while recurring prefixes and suffixes suggest productive ",
        "morphological patterns."
      ),

      el("h3", {}, "Minimal Pairs"),
      el("p", {},
        `Found ${pairs.length} minimal pair(s) \u2014 words that differ by exactly one sign `,
        "in the same position. Minimal pairs are strong evidence for phonemic contrast ",
        "in natural language."
      ),
      el("p", { className: "text-hint" },
        "Note: this count includes all attested pairwise contrasts (e.g. the same frame attested twice on different sides ",
        "counts twice). The paper reports seven attested pairs collapsing to five unique phonetic frames. ",
        "Two-syllable pairs are evidentially weaker than 3\u20134-syllable pairs because substituting one syllable in a ",
        "two-syllable word leaves only 50% of the form intact and is more likely to occur by chance."
      ),
      pairs.length > 0
        ? table(
            ["Word A", "Word B", "Position", "Contrast"],
            pairs.map(p => [
              { value: p.wordA, className: "mono" },
              { value: p.wordB, className: "mono" },
              p.position + 1,
              { value: `${p.valA} \u2194 ${p.valB}`, className: "mono" },
            ])
          )
        : el("p", { className: "loading" }, "No minimal pairs found."),

      el("h3", {}, "Word-Initial Syllables (Prefixes)"),
      el("p", {}, `Distribution of initial syllables across ${total} words (excluding determinative):`),
      table(
        ["Syllable", "Count", "% of words"],
        sortedPrefixes.slice(0, 15).map(([syl, count]) => [
          { value: syl, className: "mono" },
          count,
          { value: (count / total * 100).toFixed(1) + "%", className: "mono" },
        ])
      ),

      el("h3", {}, "Word-Final Syllables (Suffixes)"),
      el("p", {},
        `Distribution of final syllables across ${total} word-groups (determinative excluded). `,
        damagedFinal > 0
          ? `${damagedFinal} group(s) with a damaged final sign are excluded from the numerator only — their true suffix is unknown — so percentages are reported against the full ${total}-group corpus, matching the convention used in the paper:`
          : "Each percentage is the share of all word-groups exhibiting that final syllable:"
      ),
      table(
        ["Syllable", "Count", "% of words"],
        sortedSuffixes.slice(0, 15).map(([syl, count]) => [
          { value: syl, className: "mono" },
          count,
          { value: (count / total * 100).toFixed(1) + "%", className: "mono" },
        ])
      ),

      el("h3", {}, "Word-Length Distribution"),
      el("p", {}, "Number of phonetic signs per word (determinative excluded):"),
      table(
        ["Length (signs)", "Count", "% of words"],
        lenDist.map(([len, count]) => [
          len,
          count,
          { value: (count / (sideA.words.length + sideB.words.length) * 100).toFixed(1) + "%", className: "mono" },
        ])
      )
    )
  );
}
