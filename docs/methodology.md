## Methodology (what the workflow is, and why)

> **Scope of this document.** This document describes the *full* methodology used in the project, including some procedures that are reported in `paper_draft.md` but not yet exposed by the public browser workbench (notably the Davis-style syllabotactic permutation test and the Kuykendall mutual-information replication; both come from internal CLI scripts). The numerical claims that the public workbench reproduces *out of the box* are the nine-language sweep, the uniform and frequency-weighted circularity controls, the Sign 02 / qe binding test, the leave-PD-inspired-out ablation, the direction-reversal test, and the full per-sign sensitivity grid; these are locked by `scripts/canonical-values.json` and the `verify-canonical` / `verify-prose` gates in CI. Values that come from internal CLI scripts and have not been ported are flagged in §6 ("Limitations and deferred work") of `paper_draft.md`. When you read a specific p-value or overlap count below, treat the workbench's live "Run" output as the authoritative source if there is any discrepancy.

### Goal

Build a reproducible way to evaluate hypotheses about the Phaistos Disc without relying on "it feels right" translations.

### Are we reinventing the wheel?

Parts of this workflow already exist in the literature:

- **Statistical / structural analysis** has been done before (e.g., Macdonald 1999; Timm 2004; Duhoux 1977).
- **Positional / distributional analysis** is the core of **Davis's (2018, 2026)** syllabotactic method, which compares sign positional behavior across scripts. Our Phase 1 distributional sign classification replicates this approach.
- **Canonical transcriptions** (Evans numbering) are widely circulated. We use the Evans 01-45 convention consistent with Timm, Davis, Duhoux, and others.
- **Sign correspondence tables** have been compiled by **Owens & Coleman (Daidalika signary, 2017)**, **Achterberg et al. (Luwian, 2004)**, and others. Our Phase 2 correspondence table builds on these.
- **Computational approaches** have been surveyed comprehensively by **Braovic, Krstinic, Stula & Ivanda (2024)** in *Computational Linguistics* 50.2: 725-779 ([DOI 10.1162/coli_a_00514](https://doi.org/10.1162/coli_a_00514)), identifying 15 major challenges in computational decipherment of Bronze Age scripts. Our approach addresses most of these.

What we add here is not a "new decipherment", but a **reproducible, code-backed workspace** that:

- keeps data vs mapping hypotheses separate (as Duhoux recommends)
- reruns analyses under alternate directionality assumptions
- accumulates comparanda in a machine-readable dataset and tests overlaps mechanically
- confidence-tags all correspondences (following the principle that visual similarity does not prove phonetic equivalence, per Duhoux 2000)
- explicitly tests linguistic vs. non-linguistic structural hypotheses (responding to Kuykendall's challenge)

For a full catalog of how our work relates to published research, see `prior_decipherment_attempts.md`.

### Core constraints (why this is hard)

- The Disc corpus is **tiny** (~241 impressions, 45 signs). **Barber (1974)** proved mathematically that this corpus size cannot verify any decipherment statistically. With so little data, it's easy to "solve" it by accident.
- Reading direction and segmentation assumptions are not fully settled, so any result must be **robust under alternatives**.
- The assumption that the disc encodes language has not been formally tested against alternatives (Kuykendall ~2024).

### Principle 1 -- Separate **data** from **interpretation**

- **Data**: transcriptions and other inscriptions as sign sequences.
- **Interpretation**: mappings (e.g., "this Arkalochori sign resembles Disc sign 02") and higher-level claims (language, genre).

This separation is a fundamental principle shared by Davis (2018), who carefully distinguished homomorphic status from phonetic equivalence, and by Duhoux, who emphasized that visual similarity does not guarantee phonetic correspondence.

In practice:
- raw Disc transcription: `phaistos_disc/transcription_evans_numbers.txt`
- raw comparanda sequences: JSON under `phaistos_disc/comparanda/`
- proposed mappings: stored explicitly as `disc_mapping` with **confidence** in the relevant comparandum file (e.g. `arkalochori_axe_local.json`).

### Principle 2 -- Make everything testable

We focus on tests that can be repeated mechanically:

- **Structural statistics** on the Disc:
  - sign frequencies
  - repeated "word" forms
  - common prefixes/suffixes (cf. Duhoux 1977 prefix:suffix analysis)
  - within-word n-grams (bigrams/trigrams)
  - positional profiles (cf. Davis 2018 syllabotactic method)
  - oblique stroke distribution
  Script: `phaistos_disc/analyze.mjs`

- **Comparanda overlaps**:
  - unigram intersection (shared signs)
  - n-gram overlaps (2-4) between Disc within-word sequences and projected comparanda sequences
  Script: `phaistos_disc/compare.mjs`

### Principle 3 -- Directionality sensitivity checks

Because directionality is debated, we can re-run structural stats with transforms:

```powershell
node .\phaistos_disc\analyze.mjs --reverse-word-order
node .\phaistos_disc\analyze.mjs --reverse-signs-in-word
node .\phaistos_disc\analyze.mjs --reverse-word-order --reverse-signs-in-word
```

Any "morphology-like" claim that disappears under reasonable transforms is suspicious. This principle is also emphasized by Braovic et al. (2024) as one of their 15 identified challenges.

### Principle 4 -- Treat mappings as hypotheses with confidence

Comparanda often don't come with a guaranteed sign-to-sign equivalence. As Duhoux (2000) emphasizes: "there are no definitive comparisons between the signs of the Phaistos disc and the syllabograms of the three known Cretan scripts." We therefore:

- record a mapping with a confidence level (`high|medium|low`)
- allow overlap search to ignore low-confidence mappings

Example:

```powershell
node .\phaistos_disc\compare.mjs 2 high
node .\phaistos_disc\compare.mjs 2 medium
node .\phaistos_disc\compare.mjs 2 low
```

### What "success" looks like at this stage

Not a full translation -- the Barber limit (1974) prevents statistical verification. Instead:

- a growing set of **external constraints** (comparanda with well-cited overlaps) — **achieved**: 44/45 signs with correspondences
- a small number of hypotheses that survive:
  - directionality variants
  - structural tests
  - comparanda overlap tests
  - linguistic vs. non-linguistic structure tests
- **Phase 4 outcome (April 2026)**: 9 language hypotheses tested. Only Minoan/Linear A is below α = 0.05 under the uniform null (MC p = 0.0318), though this does not survive Holm-Bonferroni correction (Holm p = 0.286), the frequency-weighted null (FW p = 0.706), the leave-PD-inspired-out ablation (filtered MC p = 0.261), or the alternative phonetic treatment of sign 02 (Minoan p = 0.0562). The workbench now includes `npm run final-comparison` *(internal CLI; not in the public workbench. The workbench's main "Run" button computes the same nine-language ranking live.)* for the full 9-way ranking. See the project's internal Phase-4 decipherment-strategy document (not in the public workbench tree) for details.

### How this methodology serves the decipherment goal

This workflow is Phase 1-2 infrastructure for a 4-phase decipherment strategy documented in the project's internal Phase-4 decipherment-strategy document (not in the public workbench tree). The principles here (data/interpretation separation, testability, directionality sensitivity, confidence-tagged mappings) apply to all four phases. Our approach is the logical extension of Davis's (2018) syllabotactic work: he established the PD-LA linguistic relationship; we attempt the next step of applying candidate phonetic values.

### Key references for methodology

- Barber, E. J. W. *Archaeological Decipherment: A Handbook*. Princeton UP, 1974. (corpus size limits)
- Braovic, M. et al. "A Systematic Review of Computational Approaches to Deciphering Bronze Age Aegean and Cypriot Scripts." *Computational Linguistics* 50.2 (2024): 725-779. (15 challenges, proposed computational model)
- Davis, B. "The Phaistos Disk." *Oxford Journal of Archaeology* 37.4 (2018): 373-410. (syllabotactic method)
- Davis, B. *The Undeciphered Aegean Scripts*. Cambridge UP, 2026. (comprehensive analysis)
- Duhoux, Y. *Le disque de Phaestos*. Louvain, 1977. (structural analysis, prefix:suffix ratios)
- Duhoux, Y. "How Not to Decipher the Phaistos Disc: A Review Article." *AJA* 104.3 (2000): 597-600. (methodological skepticism)
- Godart, L. *Le Disque de Phaistos: L'enigme d'une ecriture*. 1995. (definitive scholarly treatment)
- Macdonald, P. J. "A Statistical Study of the Phaistos Disc." *Kadmos* 38 (1999): 19-30. (word-length distributions)
- Timm, T. "Der Diskos von Phaistos." *Indogermanische Forschungen* 109 (2004): 204-231. (alliterations, connector candidates)

### Extended analysis

The workbench includes twenty-nine additional analyses addressing methodological limitations. One of these (`#10 Unigram-only baseline`) is a *test-geometry diagnostic* rather than a substantive significance test — it returns p ≈ 1.0 for every language by construction, because the simulated bag-of-syllables saturates the pool under the disc's corpus size; we retain the card so readers can see that saturation regime explicitly. The remaining twenty-eight are inferential analyses (means, distributions, MC simulations, sensitivity sweeps, ablations). We count the diagnostic card separately from the inferential ones so the prose does not over-state how many of the supporting findings are independent significance tests.

1. **FW power analysis** — Extracts the full overlap distribution under the frequency-weighted null to determine the critical value needed for significance at α = 0.05.
2. **Positive-control calibration** — Uses 34 Mycenaean Greek words as a synthetic "disc" (split-corpus design) and runs the bigram comparison against all reference languages to characterize the method's discriminative power.
3. **Corpus-size equalization** — Subsamples each reference vocabulary to 34 words (50 trials) to check whether the overlap ranking is stable across different corpus sizes.
4. **49-word LA corpus MC** — Runs the full Monte Carlo test with the complete 49-word Linear A corpus, including excluded place names and probable Greek borrowings.
5. **Confidence-threshold sweep** — Masks sign-value assignments below each confidence tier (HIGH only → all levels) to reveal which correspondences drive the Minoan overlap.
6. **Leave-one-out stability** — Removes each disc word one at a time and recomputes the Minoan overlap. Tests whether the result depends on any single word.
7. **Rasmussen full comparison** — Applies Rasmussen's (2010) independent phonetic values to the disc and runs the full 9-language comparison to test whether Hittite ranks first under his reading.
8. **Word-length distribution comparison** — Compares disc word-length profiles (in syllables) against each reference language using the Kolmogorov-Smirnov D statistic.
9. **Split-half reliability** — Tests Side A (31 words) and Side B (30 words) independently against Minoan/Linear A to assess internal consistency.
10. **Unigram-only baseline (test-geometry diagnostic)** — Compares individual syllable overlap (ignoring ordering) against bigram overlap across all 9 languages. Per-language p-values are 1.0 by construction under the disc's corpus size (the simulated set saturates the syllable pool), so this card is *retained as a test-geometry diagnostic*, not as a substantive significance test. The substantive evidence that sequential ordering carries the signal comes from the direction-reversal test (#20 below).
11. **Random reading baseline** — Generates random phonetic mappings (drawing from all attested syllables across all reference languages) and measures how often arbitrary assignments produce Minoan overlap as high as the real reading.
12. **Effect size analysis** — Reports the z-score (observed overlap minus null mean, divided by null SD) for the Minoan result, quantifying the magnitude of the departure beyond binary significance.
13. **Positional bigram analysis** — Classifies each bigram by word position (initial, medial, final) and tests each position separately against Minoan/Linear A via MC simulation. Reveals whether the overlap signal is concentrated at specific word positions or distributed evenly.
14. **Bootstrap confidence interval** — Resamples the 61 disc words with replacement (10,000 bootstrap replicates) to produce a 95% confidence interval on the Minoan overlap count.
15. **Trigram overlap test** — Extends the bigram comparison to trigrams (3-syllable sequences) with MC simulation. Trigrams are sparser, so statistical power is limited, but any overlap would indicate deeper sequential similarity.
16. **Entropy analysis** — Compares syllable-level Shannon entropy (unigram and bigram) of the disc reading against each reference language. Languages with similar entropy profiles share similar frequency structure.
17. **Two-sided elimination** — Tests both tails of the null distribution for all 9 languages. A language with significantly low overlap is actively anti-correlated with the disc reading, strengthening its elimination beyond mere non-significance.
18. **Minimum Bayes factors** — Converts p-values to the strongest possible Bayesian evidence against the null (Sellke–Bayarri–Berger 2001). Requires no prior specification; provides a continuous evidence scale.
19. **Phonetic distance-weighted overlap** — Extends exact bigram matching to include near-misses where one syllable differs by a single phonetic feature. Tests whether the disc reading is phonetically close to Minoan even where it doesn't exactly match.
20. **Reverse direction test** — Reads each disc word with signs in reversed order and retests against Minoan. If the signal disappears, the result is direction-dependent, supporting the current reading direction.
21. **Minimal-pair phonetic plausibility** — Examines whether the signs that substitute in minimal pairs show systematic phonetic relationships (shared consonant or vowel), as expected in real morphological paradigms.
22. **Formal power curve** — Estimates how large bigram overlap must be for reliable detection at 80% power across reference corpus sizes (e.g., whether a borderline language could become significant with more data).
23. **Token-weighted bigram overlap** — Counts how often each shared bigram appears in the disc and in Minoan/Linear A, weighting high-frequency shared bigrams more than one-off matches.
24. **Corpus curation sensitivity** — Randomly includes or excludes each borderline Linear A word across many trials to quantify sensitivity of the Minoan result to curation choices (34-word default vs. fuller corpus).
25. **Fixed-pool cross-language comparison** — Uses one universal syllable pool (all syllables from all nine reference languages plus the disc) for the Monte Carlo null so language tests share the same sampling frame.
26. **Permutation-based FWER** — Stricter multiple-testing control than Holm–Bonferroni: simulates disc-like texts, tests all nine languages, and reports the family-wise error rate for the minimum p-value.
27. **Jackknife stability (top competitors)** — Leave-one-out stability for the strongest non-Minoan competitors (e.g., Hittite, Luwian) to see whether any single reference word drives overlap.
28. **Sign 02 / qe binding (exact + permutation)** — One-sided hypergeometric test of the contingency that 13 of 19 Sign 02 word-initial occurrences are immediately followed by Sign 12 ("qe"). Quantifies a structural feature of the disc independent of any phonetic decipherment; the binding lift is ~7× over the marginal sign-12 distribution.
29. **Leave-PD-inspired-out (Linear A curation ablation)** — Re-runs the Minoan / Linear A bigram-overlap MC against the 24 of 34 Linear A reference entries that do **not** carry an explicit `cf. PD …` note in the source data. Quantifies how much of the headline Minoan signal depends on Linear A entries that were themselves curated by reading the disc. Engine result: full LA overlap = 9 (uncorrected p = 0.032) → filtered LA overlap = 5 (p = 0.261). Disclosed in §3.4 of `paper_draft.md`.

### Next data improvements

- Replace secondary/placeholder comparanda entries with **primary catalog identifiers and contexts** (e.g., from Baldacci 2017 for the "Comb" sign).
- Add additional comparanda with longer sequences or better-established sign correspondences.
- Acquire Davis (2026) Chapter 8 data for cross-referencing homomorph identifications.
- Resolve allograph pairs (PD07/PD18 → TI; PD19/PD33 → SA) using validation cosine similarity data.
- Catalog Achterberg et al. (2004) alternative Luwian sign-value grid and retest Luwian hypothesis with their values.
- Reproduce Duhoux (1977) prefix:suffix ratio from our positional data.
