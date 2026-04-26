import { TRANSCRIPTION_TEXT, LINEAR_A_WORDS, LINEAR_A_FULL } from "./engine/data.mjs";
import { parseTranscription } from "./engine/parser.mjs";
import {
  fullNineLanguageComparison, singleLanguageMC, circularityBiasTest,
  fwPowerAnalysis, positiveControlCalibration, corpusSizeEqualization, confidenceThresholdSweep,
  leaveOneOutStability, rasmussenFullComparison, wordLengthDistribution,
  splitHalfReliability, unigramBaseline, randomReadingBaseline, effectSizeAnalysis,
  positionalBigramAnalysis, bootstrapOverlapCI, trigramOverlapTest,
  entropyAnalysis, bayesFactors, phoneticDistanceOverlap,
  reverseDirectionTest, minimalPairPlausibility, twoSidedElimination,
  formalPowerCurve, tokenWeightedOverlap, corpusCurationSensitivity,
  fixedPoolComparison, permutationFWER, jackknifeLangStability,
  signZeroTwoQeBinding, leavePdInspiredOut,
} from "./engine/comparison.mjs";

let sideA, sideB;
let parseOk = false;
try {
  [sideA, sideB] = parseTranscription(TRANSCRIPTION_TEXT);
  parseOk = true;
} catch (err) {
  self.postMessage({ type: "error", message: `Transcription parse error: ${err.message}` });
}

self.onmessage = function (e) {
  if (!parseOk) {
    self.postMessage({ type: "error", message: "Worker unavailable: transcription failed to parse." });
    return;
  }
  const { type, iterations } = e.data;

  if (type === "run-comparison") {
    const result = fullNineLanguageComparison(sideA, sideB, {
      iterations,
      onProgress(p) {
        self.postMessage({ type: "progress", ...p });
      },
    });
    self.postMessage({ type: "result", ...result });
  }

  if (type === "run-sensitivity") {
    self.postMessage({ type: "progress", step: "Sign 02 determinative (default)", done: 0, total: 5 });
    const sign02det = singleLanguageMC(sideA, sideB, LINEAR_A_WORDS, { iterations, includeDet: false });

    self.postMessage({ type: "progress", step: "Sign 02 phonetic", done: 1, total: 5 });
    const sign02phon = singleLanguageMC(sideA, sideB, LINEAR_A_WORDS, {
      iterations, seed: 314160, includeDet: true,
      valueOverrides: new Map([[2, "i"]]),
    });

    self.postMessage({ type: "progress", step: "Sign 18 RJU sensitivity", done: 2, total: 5 });
    const sign18rju = singleLanguageMC(sideA, sideB, LINEAR_A_WORDS, {
      iterations, seed: 314161,
      valueOverrides: new Map([[18, "rju"]]),
    });

    self.postMessage({ type: "progress", step: "Circularity bias (uniform + freq-weighted)", done: 3, total: 5 });
    const circularity = circularityBiasTest(sideA, sideB, LINEAR_A_WORDS, { iterations });

    self.postMessage({ type: "progress", step: "Complete", done: 5, total: 5 });
    self.postMessage({
      type: "sensitivity-result",
      sign02det, sign02phon, sign18rju, circularity, iterations,
    });
  }

  if (type === "run-extended") {
    const total = 29;

    self.postMessage({ type: "progress", step: "FW power analysis", done: 0, total });
    const power = fwPowerAnalysis(sideA, sideB, LINEAR_A_WORDS, { iterations });

    self.postMessage({ type: "progress", step: "Positive-control calibration (Greek)", done: 1, total });
    const calibration = positiveControlCalibration(sideA, sideB, {
      iterations: Math.max(1000, Math.floor(iterations / 10)),
    });

    self.postMessage({ type: "progress", step: "Corpus-size equalization", done: 2, total });
    const equalization = corpusSizeEqualization(sideA, sideB);

    self.postMessage({ type: "progress", step: "49-word LA corpus MC", done: 3, total });
    const fullCorpus = singleLanguageMC(sideA, sideB, LINEAR_A_FULL, {
      iterations, seed: 914159,
    });

    self.postMessage({ type: "progress", step: "Confidence-threshold sweep", done: 4, total });
    const confSweep = confidenceThresholdSweep(sideA, sideB, LINEAR_A_WORDS, { iterations });

    self.postMessage({ type: "progress", step: "Leave-one-out stability", done: 5, total });
    const loo = leaveOneOutStability(sideA, sideB, LINEAR_A_WORDS);

    self.postMessage({ type: "progress", step: "Rasmussen full comparison", done: 6, total });
    const rasmussen = rasmussenFullComparison(sideA, sideB, { iterations });

    self.postMessage({ type: "progress", step: "Word-length distributions", done: 7, total });
    const wordLen = wordLengthDistribution(sideA, sideB);

    self.postMessage({ type: "progress", step: "Split-half reliability (Side A / Side B)", done: 8, total });
    const splitHalf = splitHalfReliability(sideA, sideB, LINEAR_A_WORDS, { iterations });

    self.postMessage({ type: "progress", step: "Unigram baseline (bag-of-syllables)", done: 9, total });
    const unigram = unigramBaseline(sideA, sideB, { iterations });

    self.postMessage({ type: "progress", step: "Random reading baseline", done: 10, total });
    const randomReading = randomReadingBaseline(sideA, sideB, LINEAR_A_WORDS, {
      permutations: Math.max(500, Math.floor(iterations / 100)),
    });

    self.postMessage({ type: "progress", step: "Effect size analysis", done: 11, total });
    const effectSize = effectSizeAnalysis(sideA, sideB, LINEAR_A_WORDS, { iterations });

    self.postMessage({ type: "progress", step: "Positional bigram analysis", done: 12, total });
    const positional = positionalBigramAnalysis(sideA, sideB, LINEAR_A_WORDS, { iterations });

    self.postMessage({ type: "progress", step: "Bootstrap confidence intervals", done: 13, total });
    const bootstrap = bootstrapOverlapCI(sideA, sideB, LINEAR_A_WORDS, {
      bootstraps: Math.max(1000, Math.floor(iterations / 10)),
    });

    self.postMessage({ type: "progress", step: "Trigram overlap test", done: 14, total });
    const trigram = trigramOverlapTest(sideA, sideB, LINEAR_A_WORDS, { iterations });

    self.postMessage({ type: "progress", step: "Entropy analysis", done: 15, total });
    const entropyResult = entropyAnalysis(sideA, sideB);

    self.postMessage({ type: "progress", step: "Two-sided elimination", done: 16, total });
    const twoSidedIter = Math.max(10000, Math.floor(iterations / 10));
    const twoSided = twoSidedElimination(sideA, sideB, { iterations: twoSidedIter });

    self.postMessage({ type: "progress", step: "Bayes factors", done: 17, total });
    // Pass the actual two-sided MC iteration count so the p-floor used by
    // bayesFactors matches the simulation that produced the p-values.
    const bayes = bayesFactors(
      twoSided.map(r => ({ id: r.id, name: r.name, pValue: r.upperP })),
      { iterations: twoSidedIter },
    );

    self.postMessage({ type: "progress", step: "Phonetic distance overlap", done: 18, total });
    const phonDist = phoneticDistanceOverlap(sideA, sideB, LINEAR_A_WORDS, {
      iterations: Math.max(5000, Math.floor(iterations / 20)),
    });

    self.postMessage({ type: "progress", step: "Reverse direction test", done: 19, total });
    const reverseDir = reverseDirectionTest(sideA, sideB, LINEAR_A_WORDS, { iterations });

    self.postMessage({ type: "progress", step: "Minimal-pair plausibility", done: 20, total });
    const minPairs = minimalPairPlausibility(sideA, sideB);

    self.postMessage({ type: "progress", step: "Formal power curve", done: 21, total });
    const powerCurve = formalPowerCurve(sideA, sideB, {
      iterations: Math.max(5000, Math.floor(iterations / 20)),
    });

    self.postMessage({ type: "progress", step: "Token-weighted bigram overlap", done: 22, total });
    const tokenWeighted = tokenWeightedOverlap(sideA, sideB, LINEAR_A_WORDS);

    self.postMessage({ type: "progress", step: "Corpus curation sensitivity", done: 23, total });
    const curationSens = corpusCurationSensitivity(sideA, sideB, {
      trials: Math.max(100, Math.floor(iterations / 500)),
      mcIter: Math.max(5000, Math.floor(iterations / 10)),
    });

    self.postMessage({ type: "progress", step: "Fixed-pool comparison", done: 24, total });
    const fixedPool = fixedPoolComparison(sideA, sideB, {
      iterations: Math.max(5000, Math.floor(iterations / 20)),
    });

    self.postMessage({ type: "progress", step: "Permutation FWER", done: 25, total });
    const fwer = permutationFWER(sideA, sideB, {
      permutations: Math.max(200, Math.floor(iterations / 500)),
      mcPerPerm: Math.max(500, Math.floor(iterations / 200)),
    });

    self.postMessage({ type: "progress", step: "Jackknife competitor stability", done: 26, total });
    const jackknife = jackknifeLangStability(sideA, sideB);

    self.postMessage({ type: "progress", step: "Sign 02 / qe binding (exact)", done: 27, total });
    const s02qe = signZeroTwoQeBinding(sideA, sideB, { iterations });

    self.postMessage({ type: "progress", step: "Leave-PD-inspired-out ablation", done: 28, total });
    const leavePdOut = leavePdInspiredOut(sideA, sideB, { iterations });

    self.postMessage({ type: "progress", step: "Complete", done: total, total });
    self.postMessage({
      type: "extended-result",
      power, calibration, equalization, fullCorpus, confSweep,
      loo, rasmussen, wordLen,
      splitHalf, unigram, randomReading, effectSize,
      positional, bootstrap, trigram,
      entropyResult, twoSided, bayes, phonDist, reverseDir, minPairs,
      powerCurve, tokenWeighted, curationSens,
      fixedPool, fwer, jackknife, s02qe, leavePdOut,
      iterations,
    });
  }
};
