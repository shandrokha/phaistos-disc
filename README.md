# Phaistos Disc — A Reproducible Multi-Language Statistical Test

**Author:** Shiarhei Shandrokha (siarhei.shandrokha@gmail.com)

An honest, quantitative investigation of the Phaistos Disc applying phonetic values derived from published Disc–Linear A sign correspondences (the Daidalika signary curated by G. Owens; Owens 1999, 2007) and testing the resulting reading against nine Bronze Age language hypotheses using Monte Carlo simulation. This project prioritizes intellectual honesty above all: we report what the data shows, present only results we are certain of, and treat a null result as a valid outcome.

The primary statistical analyses (nine-language comparison, sensitivity tests, circularity controls, and 29 extended robustness checks) run in an interactive browser workbench — no installation required. Some supplementary analyses (directionality sweep, Ventris CV grid, Packard DI, Duhoux ratio) are available only in the private research CLI.

## Live Demo

**[Open the Interactive Workbench](https://shandrokha.github.io/phaistos-disc/app/)**

## Run Locally

**Quick start** — open `app/index.html` in any modern browser. No server or installation required. All computation happens client-side.

**With a local server** (enables hot-reload during development):

```bash
npm install
npm run serve        # opens http://localhost:3000
```

**Rebuild bundles from source** (after editing files in `app/js/`):

```bash
npm run build        # produces app/dist/app.bundle.js and app/dist/mc-worker.bundle.js
```

The source ES modules in `app/js/` are included for transparency and peer review. The app loads the bundled versions from `app/dist/`. Bundles are committed to the repository so the live demo (GitHub Pages) and `app/index.html` work without a build step; CI rebuilds and byte-diffs them on every push to guarantee the committed bundles match the source.

## Principal Results

1. **Under the most conservative tests, no language reaches significance.** The Holm-Bonferroni correction for nine simultaneous tests (Holm p = 0.286), the frequency-weighted null model (FW p = 0.706), the leave-PD-inspired-out ablation of the Linear A reference vocabulary (filtered MC p = 0.261), and the alternative phonetic treatment of sign 02 (Minoan p = 0.056) all fail to reach α = 0.05 for any language, including Minoan.

2. **Under the primary uniform null with the default sign-02-as-determinative annotation, Minoan/Linear A is the only language below α = 0.05** (MC p = 0.032). Eight competing hypotheses — Mycenaean Greek, Luwian, West Semitic, Proto-Finno-Ugric, Middle Egyptian, Hurrian, Etruscan, and Hittite — show no evidence of relationship under either the uniform null (MC p runs from 0.1012 for Hittite up to 1.0000) or the frequency-weighted null (FW p runs from 0.8953 for Hittite up to 1.0000). These negative results are robust across all corrections.

3. **Circularity control.** Randomly reshuffling the same syllable values across sign positions, only 0.47% of reshufflings match or exceed the real Minoan overlap (uniform circularity p = 0.0047). However, under a frequency-weighted reshuffling that preserves the correlation between sign frequency and syllable frequency, the result is not significant (FW circularity p = 0.3647), indicating that much of the overlap is attributable to frequency matching rather than specific sign identities.

4. **Morphological evidence.** The reading exhibits productive affixation (7 attested minimal pairs collapsing to 5 unique phonetic frames; 3- and 4-syllable pairs are evidentially stronger than 2-syllable pairs), a *°-qe* prefix in 13/61 words, and a *-ti* suffix in 13/61 words paralleling known Linear A morphology.

## Background

Building on Davis (2018), who demonstrated statistically (p = 1–3%) that the Disc and Linear A likely encode the same language without assigning phonetic values, this study completes the next step: applying values and testing specific language candidates with a consistent framework.

## Documents

| Document | Description |
|----------|-------------|
| [Paper Draft](docs/paper_draft.md) | Full research paper (~9,900 words) |
| [Plain Language Summary](docs/plain_language_summary.md) | Non-technical overview |
| [Prior Decipherment Attempts](docs/prior_decipherment_attempts.md) | Survey of previous work |
| [Sign Catalog](docs/sign_catalog.md) | Phaistos Disc sign inventory |
| [Linear A Correspondences](docs/linear_a_correspondences.md) | Sign-to-syllable mappings with confidence ratings |
| [Methodology](docs/methodology.md) | Statistical methods and reproducibility |

## Reproducibility

The interactive workbench (`app/`) implements the full analysis pipeline — from raw transcription to final p-values — in client-side JavaScript. Source modules are included alongside bundles for peer review transparency. Monte Carlo simulations use a seeded PRNG (mulberry32) for deterministic results. An Extended Analysis section provides twenty-nine additional robustness checks covering statistical power, calibration, corpus sensitivity, circularity controls, internal consistency, effect magnitude, positional analysis, phonetic distance, reading directionality, entropy profiling, Bayesian evidence, morphological plausibility, an exact test of the Sign 02 / qe binding contingency, and a leave-PD-inspired-out ablation that quantifies the dependence of the headline Minoan signal on PD-curated Linear A reference entries.

## How This Repository Is Maintained

This repository is the publication-ready output of a private research repository. The full commit history of the research process is kept private; only reviewed, production-ready content is published here.

## Photo Credits

Disc photographs by C messier / Bammesk (Wikimedia Commons), CC BY-SA 4.0.

## License

This work is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
