import { el, text, table, confClass } from "../dom.mjs";
import { PHONETIC } from "../engine/data.mjs";
import { phoneticValue, phoneticWord, confBar } from "../engine/phonetics.mjs";

function countFrequencies(sideA, sideB) {
  const freq = new Map();
  for (const side of [sideA, sideB]) {
    for (const w of side.words) {
      for (const s of w.signs) {
        if (s != null) freq.set(s, (freq.get(s) ?? 0) + 1);
      }
    }
  }
  return freq;
}

export function render(container, ctx) {
  const { sideA, sideB } = ctx;
  const freq = countFrequencies(sideA, sideB);

  const headers = ["Side", "#", "Sign Numbers", "Phonetic Reading", "Confidence", "Oblique"];
  const rows = [];
  let wordNum = 0;
  for (const side of [sideA, sideB]) {
    for (const w of side.words) {
      wordNum++;
      const signNums = w.signs.map(s => s == null ? "??" : String(s).padStart(2, "0")).join(" ");
      const reading = phoneticWord(w.signs);
      const conf = confBar(w.signs);
      rows.push([
        side.label,
        wordNum,
        { value: signNums, className: "mono" },
        { value: reading, className: "mono" },
        { value: conf, className: "mono" },
        w.hasObliqueStroke ? "/" : "",
      ]);
    }
  }

  const signEntries = [...PHONETIC.entries()].sort((a, b) => a[0] - b[0]);
  const signCards = signEntries.map(([num, info]) => {
    const f = freq.get(num) ?? 0;
    return el("div", { className: "sign-card" },
      el("div", { className: "sign-num" }, `PD ${String(num).padStart(2, "0")}`),
      el("div", { className: `sign-value ${confClass(info.c)}` }, info.v),
      el("div", {}, `${f}x`),
      info.note ? el("div", { className: "text-note" }, info.note) : null
    );
  });

  container.appendChild(
    el("div", {},
      el("h2", {}, "Phonetic Reading"),

      el("p", {},
        "Each of the 45 distinct signs on the Phaistos Disc is assigned a phonetic value ",
        "based on visual correspondences (homomorphs) with Linear A and Linear B signs. ",
        "The table below shows all 61 words with their sign numbers and proposed phonetic readings."
      ),

      el("p", {},
        "Confidence key: ",
        el("span", { className: "conf-high" }, "H = HIGH"), text(", "),
        el("span", { className: "conf-med-hi" }, "M = med-high"), text(", "),
        el("span", { className: "conf-med" }, "m = medium"), text(", "),
        el("span", { className: "conf-low-med" }, "l = low-med"), text(", "),
        el("span", { className: "conf-low" }, ". = low"), text(", "),
        el("span", { className: "conf-det" }, "D = determinative")
      ),

      el("h3", {}, "Word Transliteration"),
      table(headers, rows),

      el("h3", {}, "Sign Inventory"),
      el("p", {}, `${signEntries.length} distinct signs, ${[...freq.values()].reduce((a, b) => a + b, 0)} total tokens`),
      el("div", { className: "sign-grid" }, ...signCards)
    )
  );
}
