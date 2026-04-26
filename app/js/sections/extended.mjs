import { el, table, resultCard, progressBar } from "../dom.mjs";
import { computeOverlapCount } from "../engine/comparison.mjs";
import { LINEAR_A_WORDS } from "../engine/data.mjs";

function renderPowerCard(power) {
  const obs = power.observedOverlap;
  const crit = power.criticalValue;
  const gap = crit - obs;
  return resultCard("Circularity FW Power Analysis",
    el("p", { className: "mono" },
      `Observed Minoan overlap: ${obs} | FW circularity critical value (\u03B1 = 0.05): ${crit}`),
    el("p", { className: "mono" },
      `FW circularity p-value: ${power.fwPValue.toFixed(4)}`),
    el("p", {},
      gap > 0
        ? `The observed overlap (${obs}) is ${gap} bigram(s) below the threshold (${crit}) needed for significance under the frequency-weighted circularity reshuffle. `
        : `The observed overlap (${obs}) meets or exceeds the critical value (${crit}). `,
      gap > 0
        ? "This quantifies the shortfall: much of the overlap is attributable to frequency correlation in the sign-to-value mapping."
        : "The result would be significant even under frequency-tier reshuffling."
    ),
    el("details", {},
      el("summary", {}, "FW null overlap distribution"),
      table(
        ["Overlap", "Count", "Fraction"],
        (() => {
          const total = power.histogram.reduce((s, x) => s + x.count, 0);
          return power.histogram.map(h => [
            h.overlap,
            h.count,
            { value: (h.count / total * 100).toFixed(2) + "%", className: "mono" },
          ]);
        })()
      )
    )
  );
}

function renderCalibrationCard(cal) {
  return resultCard("Positive-Control Calibration (Greek)",
    el("p", {},
      `Mycenaean Greek corpus split: ${cal.discSize} words as synthetic "disc", `,
      `${cal.refSize} words as reference. If the method works, Greek should rank first.`
    ),
    resultCard("Greek self-overlap (split-corpus)",
      el("p", { className: "mono" },
        `Overlap: ${cal.greekSelf.overlap} | MC p = ${cal.greekSelf.pValue.toFixed(4)}`)
    ),
    el("h4", {}, "Cross-language ranking (Greek disc)"),
    table(
      ["Language", "Overlap", "MC p-value"],
      cal.results.map(r => [
        r.name,
        r.overlap,
        { value: r.pValue.toFixed(4), className: "mono" },
      ])
    ),
    el("p", { className: "text-hint" },
      cal.greekSelf.pValue < 0.05
        ? "The Greek self-test is significant, confirming the method can detect a true match."
        : "The Greek self-test is not significant. The split-corpus design may lack power with only 34/33 words."
    )
  );
}

function renderEqualizationCard(eq) {
  return resultCard("Corpus-Size Equalization (34 words)",
    el("p", {},
      "Each language\u2019s corpus is subsampled to 34 words (matching Minoan) 50 times. ",
      "The table shows the median, min, and max bigram overlap across subsamples."
    ),
    table(
      ["Language", "Full size", "Median overlap", "Range"],
      eq.map(r => [
        r.name,
        r.fullCorpusSize,
        r.medianOverlap,
        r.minOverlap === r.maxOverlap
          ? { value: String(r.minOverlap), className: "mono" }
          : { value: `${r.minOverlap}\u2013${r.maxOverlap}`, className: "mono" },
      ])
    ),
    el("p", { className: "text-hint" },
      "Languages with \u226434 words show no range (no subsampling needed). ",
      "If the ranking is stable across subsamples, corpus-size asymmetry does not drive the result."
    )
  );
}

function renderFullCorpusCard(fc, defaultOverlap) {
  return resultCard("49-Word LA Corpus MC",
    el("p", {},
      "Full Monte Carlo test using all 49 Linear A words (including excluded place names and Greek borrowings), ",
      "compared to the default 34-word result."
    ),
    el("p", { className: "mono" },
      `34-word: overlap = ${defaultOverlap} | 49-word: overlap = ${fc.overlap}`),
    el("p", { className: "mono" },
      `49-word MC p-value: ${fc.pValue.toFixed(4)}`),
    el("p", { className: "text-hint" },
      Math.abs(fc.overlap - defaultOverlap) <= 2
        ? "The marginal overlap change confirms the result is robust to vocabulary curation."
        : "The overlap change is notable; the excluded words affect the result."
    )
  );
}

function renderConfSweepCard(sweep) {
  return resultCard("Confidence-Threshold Sweep",
    el("p", {},
      "Tests which sign-value assignments drive the Minoan overlap. Signs whose phonetic value ",
      "is below each confidence tier act as adjacency-breakers: each excluded sign splits its ",
      "word into separate phonetic segments, so any bigram crossing that sign disappears, but ",
      "the surrounding signs still contribute their own bigrams within their segments. No ",
      "placeholder syllable is injected into the null pool, so the test does not get spuriously ",
      "inflated or deflated by a synthetic \u201Cunknown\u201D token."
    ),
    table(
      ["Tier", "Signs included", "Overlap", "MC p-value"],
      sweep.map(s => [
        s.tier,
        s.signCount,
        s.overlap,
        { value: s.pValue.toFixed(4), className: "mono" },
      ])
    ),
    el("p", { className: "text-hint" },
      "If the overlap drops sharply when restricting to HIGH-only signs, the result depends on ",
      "lower-confidence assignments. If it remains stable, the HIGH-confidence signs carry the signal."
    )
  );
}

function renderLooCard(loo) {
  const affected = loo.results.filter(r => r.delta !== 0);
  const dropped = affected.filter(r => r.delta < 0);
  const gained = affected.filter(r => r.delta > 0);
  return resultCard("Leave-One-Out Stability",
    el("p", { className: "mono" },
      `Baseline overlap: ${loo.baseOverlap} | Words tested: ${loo.results.length}`),
    el("p", {},
      `${affected.length} of ${loo.results.length} words affect the overlap when removed. `,
      dropped.length > 0 ? `${dropped.length} reduce it; ` : "",
      gained.length > 0 ? `${gained.length} increase it.` : ""
    ),
    affected.length > 0
      ? el("details", {},
          el("summary", {}, `Words affecting overlap (${affected.length})`),
          table(
            ["Side", "Word", "Overlap w/o", "\u0394"],
            affected
              .sort((a, b) => a.delta - b.delta)
              .map(r => [
                r.side,
                { value: r.reading, className: "mono" },
                r.overlap,
                { value: (r.delta >= 0 ? "+" : "") + r.delta, className: "mono" },
              ])
          )
        )
      : el("p", { className: "text-hint" }, "No individual word removal changes the overlap."),
    el("p", { className: "text-hint" },
      "A stable result (most words neutral) means no single word drives the finding. ",
      "If many words change the overlap, the result is fragile."
    )
  );
}

function renderRasmussenCard(ras) {
  return resultCard("Rasmussen Reading \u2014 Full 9-Language Comparison",
    el("p", {},
      "Rasmussen\u2019s (2010) independent phonetic values applied to the disc, ",
      "then compared against all 9 reference languages via uniform MC."
    ),
    table(
      ["Rank", "Language", "Overlap", "MC p-value"],
      ras.map((r, i) => [
        i + 1,
        r.name,
        r.overlap,
        { value: r.pValue.toFixed(4), className: "mono" },
      ])
    ),
    el("p", { className: "text-hint" },
      "If Hittite ranks first under Rasmussen\u2019s values (designed to support a Hittite hypothesis), ",
      "it validates the method\u2019s sensitivity to the phonetic mapping."
    )
  );
}

function renderWordLenCard(wl) {
  const maxLen = Math.max(
    wl.pdHistogram.length,
    ...wl.languages.map(l => l.histogram.length)
  );
  const headers = ["Language", "Mean", ...Array.from({ length: maxLen }, (_, i) => `${i + 1}-syl`)];
  const pdRow = [
    { value: `Phaistos Disc (${wl.pdWordCount})`, className: "mono" },
    { value: wl.pdMean.toFixed(2), className: "mono" },
    ...Array.from({ length: maxLen }, (_, i) => wl.pdHistogram[i] ?? 0),
  ];
  const langRows = wl.languages.map(l => [
    `${l.name} (${l.corpusSize})`,
    { value: l.meanLen.toFixed(2), className: "mono" },
    ...Array.from({ length: maxLen }, (_, i) => l.histogram[i] ?? 0),
  ]);

  return resultCard("Word-Length Distribution Comparison",
    el("p", {},
      "Compares the syllable-length distribution of disc words against each reference language. ",
      "Languages encoding the same language should show similar word-length profiles."
    ),
    table(headers, [pdRow, ...langRows]),
    el("h4", {}, "Kolmogorov-Smirnov D (smaller = closer match)"),
    table(
      ["Language", "KS D"],
      wl.languages.map(l => [
        l.name,
        { value: l.ksD.toFixed(4), className: "mono" },
      ])
    ),
    el("p", { className: "text-hint" },
      "The KS D statistic measures the maximum difference between the two cumulative distributions. ",
      "Smaller values indicate a closer match in word-length profile."
    )
  );
}

function renderSplitHalfCard(sh) {
  return resultCard("Split-Half Reliability (Side A vs Side B)",
    el("p", {},
      "Each disc surface tested independently against Minoan/Linear A via MC simulation."
    ),
    table(
      ["", "Words", "PD bigrams", "Minoan overlap", "MC p-value"],
      [
        ["Combined", sh.full.wordCount, "\u2014", sh.full.overlap, "\u2014"],
        ["Side A", sh.sideA.wordCount, sh.sideA.bigramCount, sh.sideA.overlap,
          { value: sh.sideA.pValue.toFixed(4), className: "mono" }],
        ["Side B", sh.sideB.wordCount, sh.sideB.bigramCount, sh.sideB.overlap,
          { value: sh.sideB.pValue.toFixed(4), className: "mono" }],
      ]
    ),
    el("p", { className: "text-hint" },
      sh.sideA.overlap > 0 && sh.sideB.overlap > 0
        ? "Both sides contribute to the Minoan overlap, indicating internal consistency."
        : "One side carries all the overlap — the result may depend on a single surface."
    )
  );
}

function renderUnigramCard(uni) {
  const minoan = uni.find(r => r.id === "minoan");
  // The simulated set-overlap is bounded above by |langSyls| and is dominated by it under
  // this test geometry: drawing ~|totalDraws| (~222) syllables from a combined pool of
  // ~|poolSize| (~50-65) and aggregating into a Set produces a simulated set whose
  // intersection with langSyls converges rapidly toward |langSyls|. We flag the test as
  // "geometry-bounded" when meanFakeOverlap >> unigramOverlap for every language, since
  // in that regime the per-language MC p-values trivially equal 1.0 regardless of any
  // genuine inventory match between PD and the candidate language.
  const allBounded = uni.every(r => (r.meanFakeOverlap ?? 0) - (r.unigramOverlap ?? 0) > 5);
  return resultCard("Unigram-Only Baseline (Bag-of-Syllables) \u2014 test-geometry diagnostic",
    el("p", {},
      "Compares unigram (individual syllable) overlap vs bigram (ordered pair) overlap. ",
      "If unigrams alone discriminate equally well, sequential ordering adds no signal. ",
      "In practice the simulated set saturates the syllable pool under this corpus size, ",
      "so per-language p-values trivially equal 1.0 by construction. We retain the card ",
      "as a test-geometry diagnostic (showing that the saturation regime applies and that ",
      "a unigram-set baseline therefore cannot discriminate languages here), not as a ",
      "substantive language-comparison test. Cross-referenced in `paper_draft.md` \u00a74.6 ",
      "and \u00a76.3."
    ),
    table(
      ["Language", "Unigram overlap", "Unigram MC p", "Bigram overlap", "Mean simulated overlap"],
      uni.map(r => [
        r.name,
        r.unigramOverlap,
        { value: r.unigramP.toFixed(4), className: "mono" },
        r.bigramOverlap,
        { value: (r.meanFakeOverlap ?? 0).toFixed(2), className: "mono" },
      ])
    ),
    minoan
      ? el("p", { className: "mono" },
          `Pool size: ${minoan.poolSize ?? "?"} unique syllables | Draws per iteration: ${minoan.totalDraws ?? "?"} | `,
          `PD syllables: ${minoan.pdSylSize ?? "?"} | Minoan reference syllables: ${minoan.langSylSize ?? "?"}`
        )
      : null,
    el("p", { className: "text-hint" },
      allBounded
        ? "Test-geometry alert: the simulated mean unigram-overlap exceeds the observed overlap for every "
          + "language. Drawing ~222 syllables from a pool of ~50-65 and aggregating into a Set produces a "
          + "simulated set whose intersection with each language inventory converges rapidly toward |langSyls|, "
          + "so the simulated overlap is bounded above by |langSyls| and dominated by it in mean. Under this "
          + "regime any observed unigram-overlap < |langSyls| trivially yields MC p ≈ 1.0 regardless of any "
          + "real inventory match. The per-language p-values therefore reflect the test geometry, not the "
          + "relative role of syllable inventory vs sequential ordering. The substantive evidence that ordering "
          + "matters comes from the direction-reversal test (overlap 9 → 4 under within-word reversal); "
          + "see Reversed Direction below."
        : (minoan && minoan.unigramP > 0.10
            ? "Unigrams alone are not significant — the bigram ordering carries the signal."
            : "Unigrams are also significant — some signal comes from syllable inventory, not just ordering.")
    )
  );
}

function renderRandomReadingCard(rr) {
  return resultCard("Random Reading Baseline",
    el("p", {},
      `${rr.permutations.toLocaleString()} random phonetic mappings tested. `,
      `Each assigns a random syllable (from a pool of ${rr.poolSize} attested syllables) to each of the 43 phonetic signs.`
    ),
    el("p", { className: "mono" },
      `Real Minoan overlap: ${rr.realOverlap} | `,
      `Null mean: ${rr.nullMean.toFixed(2)} \u00B1 ${rr.nullSD.toFixed(2)} | `,
      `Fraction \u2265 real: ${(rr.fractionExceeding * 100).toFixed(1)}%`
    ),
    el("p", {},
      rr.fractionExceeding < 0.01
        ? "Fewer than 1% of random mappings match the real overlap \u2014 the specific sign-value assignments matter."
        : rr.fractionExceeding < 0.05
          ? `Only ${(rr.fractionExceeding * 100).toFixed(1)}% of random mappings achieve this overlap.`
          : `${(rr.fractionExceeding * 100).toFixed(1)}% of random mappings achieve this overlap \u2014 the result may be achievable by chance.`
    ),
    el("details", {},
      el("summary", {}, "Random reading overlap distribution"),
      table(
        ["Overlap", "Count", "Fraction"],
        (() => {
          const total = rr.histogram.reduce((s, x) => s + x.count, 0);
          return rr.histogram.map(h => [
            h.overlap,
            h.count,
            { value: (h.count / total * 100).toFixed(2) + "%", className: "mono" },
          ]);
        })()
      )
    )
  );
}

function renderEffectSizeCard(es) {
  const absZ = Math.abs(es.zScore);
  let magnitude = "negligible";
  if (absZ >= 3.0) magnitude = "large";
  else if (absZ >= 2.0) magnitude = "medium";
  else if (absZ >= 1.0) magnitude = "small";

  return resultCard("Effect Size (Minoan Overlap)",
    el("p", {},
      "Quantifies how far the observed Minoan overlap exceeds the null distribution, ",
      "beyond binary significance."
    ),
    el("p", { className: "mono" },
      `Observed: ${es.observed} | Null mean: ${es.nullMean.toFixed(2)} | Null SD: ${es.nullSD.toFixed(2)}`),
    el("p", { className: "mono" },
      `z-score: ${es.zScore.toFixed(3)} (${magnitude} effect) | MC p = ${es.pValue.toFixed(4)}`),
    el("p", { className: "text-hint" },
      `The observed overlap is ${es.zScore.toFixed(1)} standard deviations above the null mean. `,
      absZ >= 2.0
        ? "This is a substantial departure from random expectation."
        : "This is a modest departure from random expectation."
    )
  );
}

function renderPositionalCard(pos) {
  return resultCard("Positional Bigram Analysis",
    el("p", {},
      "Bigrams classified by position within each word, tested separately against Minoan/Linear A."
    ),
    table(
      ["Position", "PD bigrams", "LA bigrams", "Overlap", "MC p-value"],
      pos.map(p => [
        p.position,
        p.pdCount,
        p.laCount,
        p.overlap,
        { value: p.pValue.toFixed(4), className: "mono" },
      ])
    ),
    el("p", { className: "text-hint" },
      (() => {
        const sig = pos.filter(p => p.pValue < 0.05);
        if (sig.length === 0) return "No single position reaches significance alone — the signal is distributed across positions.";
        return `${sig.map(p => p.position.toLowerCase()).join(" and ")} position${sig.length > 1 ? "s" : ""} reach${sig.length === 1 ? "es" : ""} significance, indicating concentrated signal.`;
      })()
    )
  );
}

function renderBootstrapCard(bs) {
  return resultCard("Bootstrap Confidence Interval (Minoan Overlap)",
    el("p", {},
      `${bs.bootstraps.toLocaleString()} bootstrap resamples of the 61 disc words (with replacement).`
    ),
    el("p", { className: "mono" },
      `Observed: ${bs.observed} | Bootstrap mean: ${bs.mean.toFixed(2)} | `,
      `95% CI: [${bs.ci95[0]}, ${bs.ci95[1]}] | Range: [${bs.min}, ${bs.max}]`
    ),
    el("p", {},
      bs.ci95[0] > 0
        ? `Even at the lower bound of the 95% CI, the overlap is ${bs.ci95[0]} (non-zero). `
        : "The lower bound of the 95% CI reaches 0 — the overlap is not robust to resampling. ",
      `The range [${bs.min}\u2013${bs.max}] shows the full variability.`
    ),
    el("details", {},
      el("summary", {}, "Bootstrap overlap distribution"),
      table(
        ["Overlap", "Count", "Fraction"],
        (() => {
          const total = bs.histogram.reduce((s, x) => s + x.count, 0);
          return bs.histogram.map(h => [
            h.overlap,
            h.count,
            { value: (h.count / total * 100).toFixed(2) + "%", className: "mono" },
          ]);
        })()
      )
    )
  );
}

function renderTrigramCard(tg) {
  return resultCard("Trigram Overlap Test",
    el("p", { className: "mono" },
      `PD trigrams: ${tg.pdTrigramCount} | LA trigrams: ${tg.laTrigramCount} | `,
      `Overlap: ${tg.overlap} | MC p = ${tg.pValue.toFixed(4)}`
    ),
    tg.overlap > 0 && tg.matchingTrigrams.length > 0
      ? el("p", {},
          `Matching trigrams: `,
          el("span", { className: "mono" }, tg.matchingTrigrams.join(", "))
        )
      : el("p", {}, "No trigram overlap found."),
    el("p", { className: "text-hint" },
      tg.overlap === 0
        ? "Zero trigram overlap is expected for a 241-token corpus — trigrams are much sparser than bigrams."
        : tg.pValue < 0.05
          ? "Trigram overlap is significant — the similarity extends beyond bigram-level patterns."
          : "Trigram overlap is present but not significant — the corpus is likely too small for trigram statistics."
    )
  );
}

function renderEntropyCard(ent) {
  return resultCard("Entropy Analysis (Syllable-Level)",
    el("p", {},
      "Shannon entropy of syllable distributions. Higher entropy = more uniform distribution; ",
      "lower = more concentrated on a few syllables."
    ),
    table(
      ["Corpus", "Unigram H (bits)", "Bigram H (bits)", "Unique syllables", "Tokens"],
      [
        [
          { value: "Phaistos Disc", className: "mono" },
          { value: ent.pd.unigram.entropy.toFixed(3), className: "mono" },
          { value: ent.pd.bigram.entropy.toFixed(3), className: "mono" },
          ent.pd.unigram.types,
          ent.pd.unigram.tokens,
        ],
        ...ent.languages.map(l => [
          l.name,
          { value: l.unigram.entropy.toFixed(3), className: "mono" },
          { value: l.bigram.entropy.toFixed(3), className: "mono" },
          l.unigram.types,
          l.unigram.tokens,
        ]),
      ]
    ),
    el("p", { className: "text-hint" },
      "If the disc's entropy profile closely matches a specific language, that suggests similar frequency structure. ",
      "Note: small corpora have inherently higher variance in entropy estimates."
    )
  );
}

function renderBayesCard(bayes) {
  return resultCard("Sellke\u2013Bayarri\u2013Berger Bound on BF\u2081\u2080",
    el("p", {},
      "Converts each p-value to the Sellke\u2013Bayarri\u2013Berger upper bound on BF\u2081\u2080 \u2014 ",
      "i.e. the largest evidence against H\u2080 that any reasonable proper alternative prior could give. ",
      "The actual BF\u2081\u2080 may be anywhere in (0, this bound], so the column is a ceiling, not a posterior odds."
    ),
    table(
      ["Language", "p-value", "Upper bound on BF\u2081\u2080", "Upper bound on P(H\u2081)", "Max evidence"],
      bayes.map(b => {
        const bfDisplay = (b.bf10Upper ?? b.bfH1);
        const postDisplay = (b.postH1Bound ?? b.postH1);
        const maxLabel = b.maxEvidence ?? b.strength;
        return [
          b.name,
          { value: b.pValue.toFixed(4), className: "mono" },
          { value: bfDisplay === Infinity ? "\u221E" : bfDisplay.toFixed(2), className: "mono" },
          { value: postDisplay.toFixed(3), className: "mono" },
          maxLabel,
        ];
      })
    ),
    el("p", { className: "text-hint" },
      "Jeffreys-style ceilings: bound < 1 favors null, 1\u20133 at most anecdotal, 3\u201310 at most moderate, ",
      "10\u201330 at most strong, > 30 at most very strong. The P(H\u2081) column inherits the same caveat: ",
      "it is the largest posterior the bound permits under equal prior odds, not a posterior estimate."
    ),
    el("p", { className: "text-hint" },
      "Note (exploratory): the input is the upper-tail Monte Carlo p from the two-sided elimination test. ",
      "Sellke\u2013Bayarri\u2013Berger calibration is most commonly stated for two-sided p-values, and the bound ",
      "depends only on p, not on sample size. Treat this column as a maximum-evidence ceiling, not a definitive Bayesian quantity."
    )
  );
}

function renderPhonDistCard(pd) {
  return resultCard("Phonetic Distance-Weighted Overlap (Minoan)",
    el("p", {},
      "Scores each disc bigram by its phonetic similarity to the closest Linear A bigram. ",
      "Captures near-misses (one phonetic feature off) that exact matching ignores."
    ),
    el("p", { className: "mono" },
      `PD bigrams: ${pd.pdBigramCount} | LA bigrams: ${pd.laBigramCount}`),
    el("p", { className: "mono" },
      `Exact matches: ${pd.exactMatches} | Near-misses (\u22650.5 sim): ${pd.nearMisses} | `,
      `Weighted score: ${pd.weightedScore.toFixed(2)}`),
    el("p", { className: "mono" },
      `MC p-value (weighted score): ${pd.pValue.toFixed(4)}`),
    el("p", { className: "text-hint" },
      pd.nearMisses > 0
        ? `${pd.nearMisses} near-miss bigram(s) indicate phonetic proximity beyond exact matches.`
        : "No near-misses found beyond the exact matches.",
      pd.pValue < 0.05
        ? " The weighted score is significant \u2014 the phonetic proximity is greater than chance."
        : " The weighted score is not significant at \u03B1 = 0.05."
    )
  );
}

function renderReverseDirCard(rd) {
  const lostSignal = rd.reversed.pValue > 0.10 && rd.forward.pValue < 0.05;
  const keptSignal = rd.reversed.pValue < 0.05;
  return resultCard("Reverse Direction Test (Minoan)",
    el("p", {},
      "The disc words are read with signs in reversed order, then retested against Minoan/Linear A."
    ),
    table(
      ["Direction", "Overlap", "PD bigrams", "MC p-value"],
      [
        ["Forward (standard)", rd.forward.overlap, rd.forward.pdBigrams,
          { value: rd.forward.pValue.toFixed(4), className: "mono" }],
        ["Reversed", rd.reversed.overlap, rd.reversed.pdBigrams,
          { value: rd.reversed.pValue.toFixed(4), className: "mono" }],
      ]
    ),
    el("p", { className: "text-hint" },
      lostSignal
        ? "The Minoan signal disappears when the disc is read backwards \u2014 the result is direction-dependent, supporting the current reading direction."
        : keptSignal
          ? "The signal persists when reversed \u2014 this may reflect shared syllable inventory rather than directional reading."
          : "The reversed overlap is intermediate \u2014 some signal survives but is weakened."
    )
  );
}

function renderMinPairsCard(mp) {
  return resultCard("Minimal-Pair Phonetic Plausibility",
    el("p", {},
      `${mp.total} minimal pairs found (words differing by exactly one phonetic sign).`
    ),
    el("p", { className: "mono" },
      `Same consonant (vowel alternation): ${mp.sameConsonant} | `,
      `Same vowel (consonant alternation): ${mp.sameVowel} | `,
      `Allograph (identical syllable): ${mp.allograph ?? 0} | `,
      `Unrelated: ${mp.unrelated}`),
    mp.total > 0
      ? el("details", {},
          el("summary", {}, `All ${mp.total} minimal pairs`),
          table(
            ["Word 1", "Word 2", "Position", "Change", "Relationship"],
            mp.pairs.map(p => [
              { value: p.word1, className: "mono" },
              { value: p.word2, className: "mono" },
              p.position,
              { value: `${p.val1} \u2194 ${p.val2}`, className: "mono" },
              p.relationship === "same-C" ? "Same consonant"
                : p.relationship === "same-V" ? "Same vowel"
                  : p.relationship === "allograph" ? "Allograph (same syllable)"
                    : "Unrelated",
            ])
          )
        )
      : el("p", {}, "No minimal pairs found."),
    el("p", { className: "text-hint" },
      mp.sameConsonant + mp.sameVowel > mp.unrelated
        ? "Most minimal pairs show systematic phonetic relationships (shared consonant or vowel), suggesting real morphological paradigms."
        : mp.sameConsonant + mp.sameVowel > 0
          ? "Some minimal pairs are phonetically systematic, but others are unrelated."
          : "The minimal pairs do not show phonetic systematicity."
    )
  );
}

function renderTwoSidedCard(ts) {
  const antiCorrelated = ts.filter(r => r.lowerP < 0.05);
  return resultCard("Two-Sided Language Elimination",
    el("p", {},
      "Tests both tails: is the overlap unusually high (upper) OR unusually low (lower)? ",
      "A low lower-P means the language has significantly FEWER matches than chance \u2014 active anti-correlation."
    ),
    table(
      ["Language", "Overlap", "Null mean", "Upper p", "Lower p"],
      ts.map(r => [
        r.name,
        r.overlap,
        { value: r.nullMean.toFixed(2), className: "mono" },
        { value: r.upperP.toFixed(4), className: "mono" },
        { value: r.lowerP.toFixed(4), className: "mono" },
      ])
    ),
    el("p", { className: "text-hint" },
      antiCorrelated.length > 0
        ? `${antiCorrelated.map(r => r.name).join(", ")} show${antiCorrelated.length === 1 ? "s" : ""} significantly low overlap (anti-correlated), strengthening the case that the disc reading is not consistent with these languages under this test.`
        : "No language shows significantly low overlap. The non-significant languages simply fail to exceed chance under this test; we do not interpret this as \u201cruled out.\u201d"
    )
  );
}

function renderFixedPoolCard(fp) {
  return resultCard("Fixed-Pool Cross-Language Comparison",
    el("p", {},
      "All languages compared using the same universal syllable pool, ",
      "enabling direct comparison of p-values without pool-size confounds."
    ),
    table(
      ["Rank", "Language", "Overlap", "Target size", "MC p"],
      fp.map((r, i) => [
        i + 1,
        r.name,
        r.overlap,
        r.targetSize,
        { value: r.pValue.toFixed(4), className: "mono" + (r.pValue < 0.05 ? " sig" : "") },
      ])
    )
  );
}

function renderFwerCard(fw) {
  return resultCard("Permutation-Based FWER",
    el("p", { className: "mono" },
      `Observed minimum p-value across 9 languages: ${fw.observedMinP.toFixed(4)}`),
    el("p", { className: "mono" },
      `FWER-adjusted p = ${fw.fwerP.toFixed(4)} (${fw.permutations} permutations)`),
    el("p", { className: "text-hint" },
      fw.fwerP < 0.05
        ? "The minimum p-value across all 9 languages is significant after permutation-based family-wise correction."
        : "The minimum p-value does not survive permutation-based family-wise correction, consistent with Holm-Bonferroni.")
  );
}

function formatPSci(p) {
  if (!Number.isFinite(p) || p <= 0) return p === 0 ? "< 1e-12" : "n/a";
  if (p < 1e-4) return p.toExponential(2);
  return p.toFixed(4);
}

function renderLeavePdOutCard(lp) {
  const dropPct = (lp.droppedFraction * 100).toFixed(1);
  const deltaP = lp.filtered.pValue - lp.full.pValue;
  const deltaOv = lp.filtered.overlap - lp.full.overlap;
  return resultCard("Leave-PD-Inspired-Out (Linear A Curation Ablation)",
    el("p", {},
      `${lp.droppedCount} of ${lp.full.corpusSize} Linear A entries (${dropPct}%) carry a `,
      el("code", {}, "cf. PD …"),
      " note in the source data, indicating they were curated against Phaistos Disc parallels. ",
      "This test re-runs the Minoan / LA bigram-overlap MC against the ",
      `${lp.filtered.corpusSize} entries that do `,
      el("em", {}, "not"),
      " carry such a note, quantifying how much of the headline Minoan signal depends on the curation overlap."
    ),
    table(
      ["Variant", "LA corpus size", "Bigram overlap", "MC p-value"],
      [
        ["Full Linear A (34 entries)", lp.full.corpusSize, lp.full.overlap, { value: lp.full.pValue.toFixed(4), className: "mono" }],
        ["Without PD-cited entries (24 entries)", lp.filtered.corpusSize, lp.filtered.overlap, { value: lp.filtered.pValue.toFixed(4), className: "mono" + (lp.filtered.pValue < 0.05 ? " sig" : "") }],
      ]
    ),
    el("p", { className: "mono" },
      `\u0394 overlap (filtered \u2212 full) = ${deltaOv >= 0 ? "+" : ""}${deltaOv} | `,
      `\u0394 p-value = ${deltaP >= 0 ? "+" : ""}${deltaP.toFixed(4)}`
    ),
    el("p", { className: "text-hint" },
      lp.filtered.pValue >= 0.05
        ? "After dropping PD-cited LA entries, the Minoan MC p-value rises above α = 0.05. "
          + "A non-trivial fraction of the headline signal therefore depends on entries that were "
          + "themselves curated by reading the disc. Treat the headline result as exploratory rather "
          + "than as evidence independent of LA-corpus curation."
        : "After dropping PD-cited LA entries, the Minoan MC p-value remains below α = 0.05, suggesting "
          + "the curation overlap is not load-bearing for the headline result."
    )
  );
}

function renderQeBindingCard(s02qe) {
  const expectedStr = s02qe.expected.toFixed(2);
  const liftStr = s02qe.lift.toFixed(1);
  const rateStr = (s02qe.bindingRate * 100).toFixed(1);
  return resultCard("Sign 02 / qe Binding (exact + permutation)",
    el("p", {},
      `Sign 02 occurs ${s02qe.s02InitialCount} times word-initially. `,
      `Of those, ${s02qe.s02FollowedByS12} (${rateStr}%) are immediately followed by Sign 12 ("qe"). `,
      `Sign 12 appears ${s02qe.s12FollowerCount} times across ${s02qe.totalFollowers} non-initial positions on the disc.`
    ),
    el("p", { className: "mono" },
      `Expected under the null: ${expectedStr} | Observed: ${s02qe.s02FollowedByS12} | Lift: ${liftStr}\u00D7`
    ),
    el("p", { className: "mono" + (s02qe.exactP < 0.05 ? " sig" : "") },
      `Exact (hypergeometric) p = ${formatPSci(s02qe.exactP)}`
    ),
    el("p", { className: "mono" + (s02qe.mcP < 0.05 ? " sig" : "") },
      s02qe.exactP * s02qe.iterations < 1
        ? `MC permutation p < ${(1 / s02qe.iterations).toExponential(2)} (${s02qe.iterations.toLocaleString()} iterations; exact p ≈ ${formatPSci(s02qe.exactP)} is below the MC resolution floor 1/iterations, so the simulation cannot resolve it numerically)`
        : `MC permutation p = ${formatPSci(s02qe.mcP)} (${s02qe.iterations.toLocaleString()} iterations)`
    ),
    el("p", {},
      "Under the null that Sign 12 tokens are exchangeable across all non-initial positions on the disc, ",
      "the observed concentration in slots immediately following Sign 02 is extreme. ",
      "This is descriptive evidence that Sign 02 binds preferentially to Sign 12 (the °-qe prefix), ",
      "consistent with the morphological reading of Sign 02 as a determinative."
    ),
    el("p", { className: "text-hint" },
      "Caveat: this is a structural test of one specific Sign 02 / Sign 12 contingency, not a language-comparison test. ",
      "It does not by itself support any phonetic decipherment. It is an independent observation about disc structure ",
      "that any decipherment must accommodate."
    ),
    el("p", { className: "text-hint" },
      "Post-hoc multiple-comparisons disclosure: the Sign 02 / Sign 12 ",
      "binding was discovered by visual inspection of the disc, not pre-registered. The Phaistos Disc has 43 phonetic-bearing ",
      "signs, so the family of pairwise sign contingencies that could have been examined is at minimum C(43, 2) = 903. ",
      "Even under a Bonferroni correction across that family, the observed exact p \u2248 2.6 \u00D7 10\u207B\u00B9\u00B2 yields ",
      "an adjusted bound of \u2248 2.4 \u00D7 10\u207B\u2079, which still survives \u03B1 = 10\u207B\u00B3. The result is therefore robust ",
      "to a conservative search-space correction, but readers should treat the unadjusted exact p as a lower bound rather ",
      "than as a single-test p-value."
    )
  );
}

function renderJackknifeCard(jk) {
  return resultCard("Jackknife Stability (Top Competitors)",
    el("p", {},
      "Leave-one-out stability for the top non-Minoan competitors. ",
      "If removing a single word causes overlap to drop substantially, the result depends on that word."
    ),
    table(
      ["Language", "Base overlap", "Min", "Max", "Mean", "Sensitive?"],
      jk.map(r => [
        r.name,
        r.baseOverlap,
        r.minOverlap,
        r.maxOverlap,
        { value: r.meanOverlap.toFixed(2), className: "mono" },
        r.sensitive ? "Yes" : "No",
      ])
    )
  );
}

function renderPowerCurveCard(curve) {
  return resultCard("Null-Distribution 80th Percentile (heuristic detection threshold)",
    el("p", {},
      "Heuristic detection threshold for different corpus sizes: the 80th percentile ",
      "of the null overlap distribution. An observed overlap above this threshold sits in ",
      "the upper 20% of what the null model alone produces. ",
      "This is ", el("em", {}, "not"), " statistical power in the formal sense — true power ",
      "requires an explicit alternative-hypothesis distribution, which we do not specify ",
      "(a Bayesian decipherment likelihood is beyond the scope of this paper)."
    ),
    table(
      ["Corpus size", "Effective", "Null mean", "Null SD", "95th pctl", "80th pctl threshold"],
      curve.map(r => [
        r.corpusSize,
        r.effectiveSize,
        { value: r.nullMean.toFixed(2), className: "mono" },
        { value: r.nullSD.toFixed(2), className: "mono" },
        r.critical95,
        r.minDetectable80,
      ])
    ),
    el("p", { className: "text-hint" },
      "At the actual corpus size of 34 words, the observed overlap of 9 exceeds the 95th percentile (",
      curve.find(r => r.corpusSize === 34)?.critical95 ?? "?",
      "). The 80th-percentile threshold at 34 words is ",
      curve.find(r => r.corpusSize === 34)?.minDetectable80 ?? "?",
      ". Rows above 34 are capped at the actual Linear A corpus (34 words) since synthetic words cannot be generated. ",
      "The threshold is read directly off the empirical null distribution; it makes no claim about Type II error against any specific decipherment alternative.")
  );
}

function renderTokenWeightedCard(tw) {
  return resultCard("Token-Weighted Bigram Overlap",
    el("p", {},
      `${tw.sharedCount} shared bigrams between PD and Minoan/Linear A. `,
      `Total PD tokens in shared bigrams: ${tw.totalPdTokens}. `,
      `Total LA tokens in shared bigrams: ${tw.totalLaTokens}.`
    ),
    table(
      ["Bigram", "PD tokens", "LA tokens", "Combined"],
      tw.details.map(d => [
        { value: d.bigram, className: "mono" },
        d.pdTokens,
        d.laTokens,
        d.pdTokens + d.laTokens,
      ])
    ),
    el("p", { className: "text-hint" },
      "High-frequency shared bigrams (appearing multiple times in both corpora) ",
      "represent stronger evidence than hapax bigrams. Token counts quantify this distinction.")
  );
}

function renderCurationCard(cs) {
  return resultCard("Corpus Curation Sensitivity",
    el("p", {},
      `Randomly included/excluded each of ${cs.excludedCount} borderline LA words across ${cs.trials} trials.`
    ),
    el("p", { className: "mono" },
      `Overlap range: ${cs.overlapRange[0]}\u2013${cs.overlapRange[1]} (mean: ${cs.meanOverlap.toFixed(1)})`),
    el("p", { className: "mono" },
      `p-value range: ${cs.pValueRange[0].toFixed(4)}\u2013${cs.pValueRange[1].toFixed(4)} (mean: ${cs.meanPValue.toFixed(4)})`),
    el("p", { className: "mono" },
      `Fraction of subsets reaching significance (\u03B1 = 0.05): ${(cs.fractionSignificant * 100).toFixed(1)}%`),
    el("p", { className: "text-hint" },
      cs.fractionSignificant > 0.8
        ? "The result is robust to corpus curation — most subsets reach significance."
        : cs.fractionSignificant > 0.5
          ? "The result is moderately sensitive to corpus curation."
          : "The result is sensitive to which borderline words are included.")
  );
}

export function render(container, ctx) {
  let worker = null;
  const defaultOverlap = computeOverlapCount(ctx.sideA, ctx.sideB, LINEAR_A_WORDS);

  const powerDiv = el("div", { id: "ext-power" });
  const calDiv = el("div", { id: "ext-calibration" });
  const eqDiv = el("div", { id: "ext-equalization" });
  const fcDiv = el("div", { id: "ext-fullcorpus" });
  const sweepDiv = el("div", { id: "ext-confsweep" });
  const looDiv = el("div", { id: "ext-loo" });
  const rasDiv = el("div", { id: "ext-rasmussen" });
  const wlDiv = el("div", { id: "ext-wordlen" });
  const shDiv = el("div", { id: "ext-splithalf" });
  const uniDiv = el("div", { id: "ext-unigram" });
  const rrDiv = el("div", { id: "ext-randomreading" });
  const esDiv = el("div", { id: "ext-effectsize" });
  const posDiv = el("div", { id: "ext-positional" });
  const bsDiv = el("div", { id: "ext-bootstrap" });
  const tgDiv = el("div", { id: "ext-trigram" });
  const entDiv = el("div", { id: "ext-entropy" });
  const tsDiv = el("div", { id: "ext-twosided" });
  const bfDiv = el("div", { id: "ext-bayes" });
  const pdDiv = el("div", { id: "ext-phondist" });
  const rdDiv = el("div", { id: "ext-reversedir" });
  const mpDiv = el("div", { id: "ext-minpairs" });
  const pcDiv = el("div", { id: "ext-powercurve" });
  const twDiv = el("div", { id: "ext-tokenweighted" });
  const csDiv = el("div", { id: "ext-curation" });
  const fpDiv = el("div", { id: "ext-fixedpool" });
  const fwDiv = el("div", { id: "ext-fwer" });
  const jkDiv = el("div", { id: "ext-jackknife" });
  const qeDiv = el("div", { id: "ext-qebinding" });
  const pdOutDiv = el("div", { id: "ext-leavepdout" });

  const statusEl = el("p", { className: "loading" });
  const progressEl = el("div");

  const runBtn = el("button", {
    className: "btn-run",
    onClick() {
      runBtn.disabled = true;
      runBtn.setAttribute("aria-busy", "true");
      statusEl.textContent = "Starting extended analysis...";
      const iterations = ctx.getIterations();

      worker = new Worker("dist/mc-worker.bundle.js");

      worker.onerror = (err) => {
        statusEl.textContent = `Error: ${err.message || "Worker failed"}`;
        runBtn.disabled = false;
        runBtn.setAttribute("aria-busy", "false");
        progressEl.replaceChildren();
        worker.terminate();
        worker = null;
      };

      worker.onmessage = (e) => {
        if (e.data.type === "error") {
          statusEl.textContent = `Error: ${e.data.message || "Worker failed"}`;
          runBtn.disabled = false;
          runBtn.setAttribute("aria-busy", "false");
          progressEl.replaceChildren();
          worker.terminate();
          worker = null;
          return;
        }
        if (e.data.type === "progress") {
          statusEl.textContent = `${e.data.step}... (${e.data.done}/${e.data.total})`;
          progressEl.replaceChildren(progressBar(e.data.done / e.data.total));
        }
        if (e.data.type === "extended-result") {
          const { power, calibration, equalization, fullCorpus, confSweep,
                  loo, rasmussen, wordLen,
                  splitHalf, unigram, randomReading, effectSize,
                  positional, bootstrap, trigram,
                  entropyResult, twoSided, bayes, phonDist, reverseDir, minPairs,
                  powerCurve, tokenWeighted, curationSens,
                  fixedPool, fwer, jackknife, s02qe, leavePdOut,
                  iterations: iters } = e.data;

          powerDiv.replaceChildren(renderPowerCard(power));
          calDiv.replaceChildren(renderCalibrationCard(calibration));
          eqDiv.replaceChildren(renderEqualizationCard(equalization));
          fcDiv.replaceChildren(renderFullCorpusCard(fullCorpus, defaultOverlap));
          sweepDiv.replaceChildren(renderConfSweepCard(confSweep));
          looDiv.replaceChildren(renderLooCard(loo));
          rasDiv.replaceChildren(renderRasmussenCard(rasmussen));
          wlDiv.replaceChildren(renderWordLenCard(wordLen));
          shDiv.replaceChildren(renderSplitHalfCard(splitHalf));
          uniDiv.replaceChildren(renderUnigramCard(unigram));
          rrDiv.replaceChildren(renderRandomReadingCard(randomReading));
          esDiv.replaceChildren(renderEffectSizeCard(effectSize));
          posDiv.replaceChildren(renderPositionalCard(positional));
          bsDiv.replaceChildren(renderBootstrapCard(bootstrap));
          tgDiv.replaceChildren(renderTrigramCard(trigram));
          entDiv.replaceChildren(renderEntropyCard(entropyResult));
          tsDiv.replaceChildren(renderTwoSidedCard(twoSided));
          bfDiv.replaceChildren(renderBayesCard(bayes));
          pdDiv.replaceChildren(renderPhonDistCard(phonDist));
          rdDiv.replaceChildren(renderReverseDirCard(reverseDir));
          mpDiv.replaceChildren(renderMinPairsCard(minPairs));
          pcDiv.replaceChildren(renderPowerCurveCard(powerCurve));
          twDiv.replaceChildren(renderTokenWeightedCard(tokenWeighted));
          csDiv.replaceChildren(renderCurationCard(curationSens));
          fpDiv.replaceChildren(renderFixedPoolCard(fixedPool));
          fwDiv.replaceChildren(renderFwerCard(fwer));
          jkDiv.replaceChildren(renderJackknifeCard(jackknife));
          qeDiv.replaceChildren(renderQeBindingCard(s02qe));
          pdOutDiv.replaceChildren(renderLeavePdOutCard(leavePdOut));

          const msg = `Extended analysis complete (${iters.toLocaleString()} iterations).`;
          statusEl.textContent = msg;
          ctx.announce(msg);
          progressEl.replaceChildren();
          runBtn.disabled = false;
          runBtn.setAttribute("aria-busy", "false");
          worker.terminate();
          worker = null;
        }
      };

      worker.postMessage({ type: "run-extended", iterations });
    },
  }, "Run Extended Analysis");

  container.appendChild(
    el("div", {},
      el("h2", {}, "Extended Analysis"),
      el("p", {},
        "Twenty-nine additional analyses that address methodological limitations identified in peer review. ",
        "These are computationally intensive and run on demand."
      ),

      el("div", { className: "result-card" },
        el("div", { className: "run-control" },
          runBtn,
          el("span", { className: "mono text-hint" },
            "Runs all 29 extended analyses")
        ),
        statusEl,
        progressEl
      ),

      el("h3", {}, "1. Circularity FW Power Analysis"),
      el("p", {},
        "Determines the minimum bigram overlap needed for significance under a frequency-weighted circularity reshuffle ",
        "(sign-to-value mappings shuffled within frequency tiers \u2014 tests mapping quality, not the language-comparison FW null). ",
        `If the observed overlap (${defaultOverlap}) falls well below this threshold, the mapping may simply lack `,
        "the statistical power to detect a real signal at this corpus size."
      ),
      powerDiv,

      el("h3", {}, "2. Positive-Control Calibration"),
      el("p", {},
        "Uses Mycenaean Greek words as a synthetic \u201Cdisc\u201D and runs the bigram comparison ",
        "against all other languages. If the method works, Greek should rank first with a low p-value. ",
        "The Greek corpus is split (34 disc / 33 reference) to avoid trivial self-overlap."
      ),
      el("p", { className: "text-hint" },
        "Note: this is a sanity check on a partially arbitrary 34/33 split of a single Linear-B-style word list, ",
        "not a structure-matched mirror of the actual disc (61 word-groups). Treat the result as a directional ",
        "calibration of the pipeline, not as a full positive control at PD scale."
      ),
      calDiv,

      el("h3", {}, "3. Corpus-Size Equalization"),
      el("p", {},
        "Reference vocabularies range from 34 to 72 words. Larger corpora produce more bigrams, ",
        "potentially inflating overlap counts. This test subsamples each language to 34 words and ",
        "checks whether the overlap ranking is stable."
      ),
      eqDiv,

      el("h3", {}, "4. Full 49-Word Linear A Corpus"),
      el("p", {},
        "The default comparison uses a curated 34-word LA corpus. This runs the full Monte Carlo ",
        "test with all 49 words, including excluded place names and probable Greek borrowings."
      ),
      fcDiv,

      el("h3", {}, "5. Confidence-Threshold Sweep"),
      el("p", {},
        "Systematically varies which sign-value assignments are included, from only the 4 ",
        "HIGH-confidence correspondences to the full set of 43 phonetic signs. This reveals ",
        "whether the signal is driven by a few strong correspondences or the full mapping."
      ),
      sweepDiv,

      el("h3", {}, "6. Leave-One-Out Stability"),
      el("p", {},
        "Removes each of the 61 disc words one at a time and recomputes the Minoan bigram overlap. ",
        "If the result depends on just one or two words, the finding is fragile."
      ),
      looDiv,

      el("h3", {}, "7. Rasmussen Reading \u2014 Full 9-Language Comparison"),
      el("p", {},
        "Rasmussen (2010) proposed an independent set of phonetic values for Hittite. ",
        "This test applies his values to the disc and runs the full 9-language comparison ",
        "to check whether Hittite ranks first under his reading."
      ),
      rasDiv,

      el("h3", {}, "8. Word-Length Distribution Comparison"),
      el("p", {},
        "Compares the word-length distribution (in syllables) of disc words against each ",
        "reference language. Languages encoding the same language should have similar profiles."
      ),
      wlDiv,

      el("h3", {}, "9. Split-Half Reliability"),
      el("p", {},
        "Tests Side A (31 words) and Side B (30 words) independently against Minoan/Linear A. ",
        "If both sides show overlap, the finding is internally consistent across the disc."
      ),
      shDiv,

      el("h3", {}, "10. Unigram-Only Baseline (test-geometry diagnostic)"),
      el("p", {},
        "Compares individual syllable overlap (ignoring order) against bigram overlap. ",
        "Under our corpus sizes the simulated set saturates the syllable pool, so per-language ",
        "p-values are 1.0 by construction; this card is retained as a test-geometry diagnostic ",
        "rather than a substantive language test. The substantive evidence that ordering carries ",
        "the signal comes from the direction-reversal test (overlap 9 \u2192 4 under within-word ",
        "reversal; see card #20 below)."
      ),
      uniDiv,

      el("h3", {}, "11. Random Reading Baseline"),
      el("p", {},
        "Generates many random phonetic mappings (drawing from all attested syllables across ",
        "all 9 reference languages) and tests how often they produce Minoan overlap as high as ours. ",
        "Differs from circularity test: uses a broad syllable pool, not just the 43 existing values."
      ),
      rrDiv,

      el("h3", {}, "12. Effect Size"),
      el("p", {},
        "Quantifies how far the observed Minoan overlap exceeds the null distribution in ",
        "standard deviations (z-score). P-values alone can be misleading in small corpora; ",
        "effect size shows the magnitude of the departure."
      ),
      esDiv,

      el("h3", {}, "13. Positional Bigram Analysis"),
      el("p", {},
        "Classifies each bigram by its position within the word (initial, medial, or final) and ",
        "tests each position separately against Minoan/Linear A. Reveals whether the overlap is ",
        "concentrated in specific word positions or distributed evenly."
      ),
      posDiv,

      el("h3", {}, "14. Bootstrap Confidence Interval"),
      el("p", {},
        "Resamples the 61 disc words with replacement to produce a 95% confidence interval on the ",
        "overlap count. Provides an uncertainty range rather than a single point estimate."
      ),
      bsDiv,

      el("h3", {}, "15. Trigram Overlap"),
      el("p", {},
        "Extends the bigram comparison to trigrams (3-syllable sequences). Trigrams are sparser — ",
        "most words produce 0\u20131 trigrams — so statistical power is limited, but any trigram overlap ",
        "would indicate deeper sequential similarity."
      ),
      tgDiv,

      el("h3", {}, "16. Entropy Analysis"),
      el("p", {},
        "Compares the syllable-level Shannon entropy of the disc reading against each reference language. ",
        "Languages with similar entropy profiles share similar frequency structure."
      ),
      entDiv,

      el("h3", {}, "17. Two-Sided Language Elimination"),
      el("p", {},
        "Tests both tails of the null distribution: is the overlap unusually high OR unusually low? ",
        "A language with significantly low overlap is actively anti-correlated with the disc reading."
      ),
      tsDiv,

      el("h3", {}, "18. Minimum Bayes Factors"),
      el("p", {},
        "Converts p-values to the strongest possible Bayesian evidence against the null hypothesis ",
        "(Sellke\u2013Bayarri\u2013Berger 2001). Requires no prior specification. ",
        "Provides a continuous evidence scale beyond binary significance."
      ),
      bfDiv,

      el("h3", {}, "19. Phonetic Distance-Weighted Overlap"),
      el("p", {},
        "Extends exact bigram matching to include near-misses \u2014 bigrams where one syllable differs ",
        "by a single phonetic feature (same consonant, different vowel, or vice versa). ",
        "Tests whether the disc reading is phonetically close to Minoan even where it doesn\u2019t exactly match."
      ),
      pdDiv,

      el("h3", {}, "20. Reverse Direction Test"),
      el("p", {},
        "Reads each disc word with signs in reversed order and retests against Minoan/Linear A. ",
        "If the signal disappears when reversed, the result is direction-dependent \u2014 evidence that ",
        "the reading direction matters and the specific sign ordering carries the signal."
      ),
      rdDiv,

      el("h3", {}, "21. Minimal-Pair Phonetic Plausibility"),
      el("p", {},
        "Examines the phonetic relationship between signs that substitute in minimal pairs. ",
        "In real language paradigms, substitutions tend to be systematic (e.g., vowel alternation ",
        "for case endings). Random substitutions would show no phonetic pattern."
      ),
      mpDiv,

      el("h3", {}, "22. Null-Distribution 80th Percentile (heuristic detection threshold)"),
      el("p", {},
        "The 80th percentile of the null overlap distribution as a function of reference-corpus size. ",
        "An observed overlap above this threshold sits in the upper 20% of what the null model alone produces. ",
        "We report this as a descriptive heuristic, not a formal power calculation: ",
        "true Type II error requires an explicit alternative-hypothesis distribution, which we do not specify."
      ),
      pcDiv,

      el("h3", {}, "23. Token-Weighted Bigram Overlap"),
      el("p", {},
        "Reports how many times each shared bigram appears in the disc and in Minoan/Linear A. ",
        "High-frequency shared bigrams are stronger evidence than single-occurrence matches."
      ),
      twDiv,

      el("h3", {}, "24. Corpus Curation Sensitivity"),
      el("p", {},
        "The default comparison uses 34 curated LA words, excluding 15 borderline items. ",
        "This test randomly includes/excludes each borderline word across many trials to measure ",
        "how sensitive the result is to curation decisions."
      ),
      csDiv,

      el("h3", {}, "25. Fixed-Pool Cross-Language Comparison"),
      el("p", {},
        "Each language normally builds its own syllable pool for the MC null model (different sizes). ",
        "This test uses a single universal pool (all syllables from all 9 languages plus the disc) ",
        "for a fairer direct comparison."
      ),
      fpDiv,

      el("h3", {}, "26. Permutation-Based FWER"),
      el("p", {},
        "A simulation-based alternative to Holm-Bonferroni for multiple-testing assessment. Generates random disc-like texts and ",
        "tests all 9 languages simultaneously, recording the minimum p-value across all languages. The FWER p-value is the fraction ",
        "of random texts where the best-scoring language achieved a p-value at least as extreme as the observed minimum."
      ),
      fwDiv,

      el("h3", {}, "27. Jackknife Stability (Top Competitors)"),
      el("p", {},
        "Leave-one-out stability for the top non-Minoan competitors (Hittite, Luwian, and next best). ",
        "Tests whether any single reference word disproportionately drives the overlap count."
      ),
      jkDiv,

      el("h3", {}, "28. Sign 02 / qe Binding (Exact)"),
      el("p", {},
        "Sign 02 (the \u201Cplumed head\u201D, treated as a determinative in the default reading) ",
        "appears word-initially 19 times. Of those, 13 are immediately followed by Sign 12 (\u201Cqe\u201D) ",
        "\u2014 a 68% binding rate against an expected ~9% under the marginal sign-12 distribution. ",
        "This test reports the exact one-sided hypergeometric p-value plus a Monte Carlo permutation cross-check."
      ),
      qeDiv,

      el("h3", {}, "29. Leave-PD-Inspired-Out (Linear A Curation Ablation)"),
      el("p", {},
        "Approximately 29% of the Linear A reference entries (10 of 34) carry a ",
        el("code", {}, "cf. PD …"),
        " note in the source data, indicating they were curated against Phaistos Disc parallels. ",
        "Testing a PD-derived reading against an LA vocabulary that was itself partly built by reading the disc ",
        "is a stronger form of circularity than the within-mapping reshuffle test. ",
        "This ablation re-runs the Minoan MC against the 24 PD-uncited LA entries to quantify how much of the ",
        "headline Minoan signal depends on that curation overlap."
      ),
      pdOutDiv,
    )
  );
}
