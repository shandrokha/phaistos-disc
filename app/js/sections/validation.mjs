import { el, text, table, resultCard } from "../dom.mjs";
import { PHONETIC } from "../engine/data.mjs";
import { phoneticValue, cvStructure } from "../engine/phonetics.mjs";

function analyzeStructure(sideA, sideB) {
  let cvCount = 0;
  let vCount = 0;
  let detCount = 0;
  let totalPhonetic = 0;
  const freq = new Map();

  for (const side of [sideA, sideB]) {
    for (const w of side.words) {
      for (const s of w.signs) {
        if (s == null) continue;
        freq.set(s, (freq.get(s) ?? 0) + 1);
        const cv = cvStructure(s);
        if (cv === "DET") { detCount++; continue; }
        totalPhonetic++;
        if (cv === "CV") cvCount++;
        else if (cv === "V") vCount++;
      }
    }
  }

  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const ranks = sorted.map(([sign, count], i) => ({
    rank: i + 1,
    sign,
    value: phoneticValue(sign),
    count,
    logRank: Math.log10(i + 1),
    logFreq: Math.log10(count),
  }));

  return { cvCount, vCount, detCount, totalPhonetic, ranks };
}

function computePositionalProfile(sideA, sideB) {
  const initial = new Map();
  const nonInitial = new Map();

  for (const side of [sideA, sideB]) {
    for (const w of side.words) {
      const signs = w.signs.filter(s => s != null);
      const hasDet = signs[0] === 2;
      const phonSigns = hasDet ? signs.slice(1) : signs;

      for (let i = 0; i < phonSigns.length; i++) {
        const s = phonSigns[i];
        if (i === 0) initial.set(s, (initial.get(s) ?? 0) + 1);
        else nonInitial.set(s, (nonInitial.get(s) ?? 0) + 1);
      }
    }
  }

  const allSigns = new Set([...initial.keys(), ...nonInitial.keys()]);
  const profiles = [...allSigns].map(s => ({
    sign: s,
    value: phoneticValue(s),
    initial: initial.get(s) ?? 0,
    nonInitial: nonInitial.get(s) ?? 0,
    total: (initial.get(s) ?? 0) + (nonInitial.get(s) ?? 0),
  }));
  profiles.sort((a, b) => b.total - a.total);
  return profiles;
}

export function render(container, ctx) {
  const { sideA, sideB } = ctx;
  const { cvCount, vCount, detCount, totalPhonetic, ranks } = analyzeStructure(sideA, sideB);

  const cvPercent = ((cvCount + vCount) / totalPhonetic * 100).toFixed(1);

  const n = ranks.length;
  const sumX = ranks.reduce((s, r) => s + r.logRank, 0);
  const sumY = ranks.reduce((s, r) => s + r.logFreq, 0);
  const sumXY = ranks.reduce((s, r) => s + r.logRank * r.logFreq, 0);
  const sumX2 = ranks.reduce((s, r) => s + r.logRank * r.logRank, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

  const profiles = computePositionalProfile(sideA, sideB);

  container.appendChild(
    el("div", {},
      el("h2", {}, "Validation"),
      el("p", {},
        "Structural checks verify that the proposed phonetic reading produces patterns ",
        "consistent with natural language."
      ),

      el("h3", {}, "CV/V Syllable Structure"),
      resultCard("Syllable structure check",
        el("p", {},
          `Of ${totalPhonetic} phonetic tokens, ${cvCount} are CV and ${vCount} are V. `,
          `${detCount} determinative tokens excluded.`
        ),
        el("p", { className: "stat-value" }, `${cvPercent}% CV/V structure`),
        el("p", { className: "text-hint" },
          "Note: 100% CV/V structure is a necessary consequence of using Linear B-derived ",
          "phonetic values (which are all CV or V). This is not independent validation."
        )
      ),

      el("h3", {}, "Zipf\u2019s Law"),
      resultCard("Frequency distribution",
        el("p", {},
          `Log-log slope of sign frequency vs. rank: `,
          el("span", { className: "stat-value" }, `\u2248 ${slope.toFixed(2)}`),
          text(" (expected for natural language: \u2248 \u22121.0, \u00B10.2)")
        ),
        el("p", { className: "text-hint" },
          "A slope near \u22121 is consistent with natural language (Zipf\u2019s law). ",
          "Highly repetitive or random texts deviate significantly."
        )
      ),

      el("h3", {}, "Sign Frequency Ranking"),
      table(
        ["Rank", "Sign", "Value", "Count", "log(rank)", "log(freq)"],
        ranks.slice(0, 20).map(r => [
          r.rank,
          `PD ${String(r.sign).padStart(2, "0")}`,
          { value: r.value, className: "mono" },
          r.count,
          { value: r.logRank.toFixed(3), className: "mono" },
          { value: r.logFreq.toFixed(3), className: "mono" },
        ])
      ),
      el("p", { className: "text-small" }, `Showing top 20 of ${ranks.length} signs.`),

      el("h3", {}, "Positional Profile"),
      el("p", {},
        "How often each sign appears in word-initial vs. non-initial position. ",
        "Strong positional preference suggests functional differentiation."
      ),
      table(
        ["Sign", "Value", "Initial", "Non-initial", "Total", "Initial %"],
        profiles.slice(0, 20).map(p => [
          `PD ${String(p.sign).padStart(2, "0")}`,
          { value: p.value, className: "mono" },
          p.initial,
          p.nonInitial,
          p.total,
          { value: p.total > 0 ? (p.initial / p.total * 100).toFixed(0) + "%" : "\u2014", className: "mono" },
        ])
      ),
      el("p", { className: "text-small" }, `Showing top 20 of ${profiles.length} signs by frequency.`),

      el("h3", {}, "Oblique Stroke Distribution"),
      (() => {
        const obliqueWords = [];
        let wordNum = 0;
        let sideACt = 0, sideBCt = 0;
        for (const side of [sideA, sideB]) {
          for (const w of side.words) {
            wordNum++;
            if (w.hasObliqueStroke) {
              obliqueWords.push({
                num: wordNum, side: side.label,
                signs: w.signs.map(s => s == null ? "??" : String(s).padStart(2, "0")).join(" "),
              });
              if (side.label === "A") sideACt++;
              else sideBCt++;
            }
          }
        }
        const total = sideACt + sideBCt;
        return el("div", {},
          resultCard("Oblique stroke summary",
            el("p", {},
              `${total} of 61 words (${(total / 61 * 100).toFixed(0)}%) carry an oblique stroke marker: `,
              `${sideACt} on Side A, ${sideBCt} on Side B.`
            ),
            el("p", { className: "text-hint" },
              "The oblique stroke appears exclusively at word-final position. ",
              "Its function is debated (word divider, morphological marker, or scribal convention)."
            )
          ),
          table(
            ["#", "Side", "Sign Numbers"],
            obliqueWords.map(w => [w.num, w.side, { value: w.signs, className: "mono" }])
          )
        );
      })()
    )
  );
}
