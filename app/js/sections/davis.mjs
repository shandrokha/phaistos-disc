import { el, table, resultCard } from "../dom.mjs";
import { HOMOMORPH_SET, LA_TEXTS, LINEAR_A_WORDS } from "../engine/data.mjs";
import { phoneticWord, syllabify, ngramsOf } from "../engine/phonetics.mjs";
import { extractKnownPdSegments } from "../engine/comparison.mjs";

function getPhoneticSigns(w) {
  const signs = w.signs.filter(s => s != null);
  const hasDet = signs[0] === 2;
  return hasDet ? signs.slice(1) : signs;
}

function findWordParallels(sideA, sideB) {
  const allWords = [...sideA.words, ...sideB.words];
  const parallels = [];
  let trigramMatchCount = 0;

  for (const w of allWords) {
    // Reading string is for human-facing display only; we keep `?N` placeholders
    // so the user sees which signs are unknown.
    const reading = phoneticWord(getPhoneticSigns(w));
    // Bigrams / trigrams must use the canonical adjacency-breaking helper:
    // unknown ("?N") and damaged (null) signs split segments instead of being
    // baked into spurious bigrams. Enforced in CI by `verify-engine-invariants`.
    const segments = extractKnownPdSegments([w]);
    const discBigrams = new Set();
    const discTrigrams = new Set();
    for (const seg of segments) {
      for (const bg of ngramsOf(seg, 2)) discBigrams.add(bg);
      for (const tg of ngramsOf(seg, 3)) discTrigrams.add(tg);
    }

    for (const la of LINEAR_A_WORDS) {
      const laSyls = syllabify(la.w);
      const laBigrams = new Set(ngramsOf(laSyls, 2));
      const laTrigrams = new Set(ngramsOf(laSyls, 3));
      const shared = [...discBigrams].filter(b => laBigrams.has(b));
      const sharedTri = [...discTrigrams].filter(t => laTrigrams.has(t));
      trigramMatchCount += sharedTri.length;
      if (shared.length > 0) {
        parallels.push({
          disc: reading,
          la: la.w,
          src: la.src,
          shared,
          sharedTrigrams: sharedTri,
        });
      }
    }
  }

  parallels.sort((a, b) => b.shared.length - a.shared.length);
  const seen = new Set();
  const filtered = parallels.filter(p => {
    const key = `${p.disc}|${p.la}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return { parallels: filtered, trigramMatchCount };
}

export function render(container, ctx) {
  const { sideA, sideB } = ctx;
  const { parallels, trigramMatchCount } = findWordParallels(sideA, sideB);

  container.appendChild(
    el("div", {},
      el("h2", {}, "Davis Replication"),
      el("p", {},
        "This section replicates and extends the syllabotactic analysis approach of ",
        "Davis (2018), comparing the disc\u2019s sign sequences against Linear A texts."
      ),

      el("h3", {}, "Homomorph Set"),
      el("p", {},
        `${HOMOMORPH_SET.length} Phaistos Disc signs are identified as visual homomorphs `,
        "of Linear A/B signs, providing the basis for phonetic value assignment."
      ),
      table(
        ["PD Sign", "AB Sign", "Value", "Confidence"],
        HOMOMORPH_SET.map(h => [
          `PD ${String(h.pd).padStart(2, "0")}`,
          `AB ${h.ab}`,
          { value: h.val, className: "mono" },
          h.conf,
        ])
      ),

      el("h3", {}, "Word-Level Parallels"),
      el("p", {},
        "Words from the disc that share bigrams with attested Linear A vocabulary. ",
        "These parallels suggest structural similarity between the disc text and Minoan."
      ),
      resultCard("Trigram verification",
        el("p", {},
          `Three-syllable (trigram) matches found: `,
          el("strong", {}, String(trigramMatchCount)),
          ". All parallels share exactly two contiguous syllables; ",
          trigramMatchCount === 0
            ? "no three-syllable matches were found, confirming the paper's claim."
            : `${trigramMatchCount} trigram match(es) detected.`
        )
      ),
      parallels.length > 0
        ? table(
            ["Disc Word", "Linear A Word", "Source", "Shared Bigrams"],
            parallels.slice(0, 30).map(p => [
              { value: p.disc, className: "mono" },
              { value: p.la, className: "mono" },
              p.src || "",
              { value: p.shared.join(", "), className: "mono" },
            ])
          )
        : el("p", { className: "loading" }, "No parallels found."),
      parallels.length > 30
        ? el("p", { className: "text-small" }, `Showing 30 of ${parallels.length} parallels.`)
        : null,

      el("h3", {}, "Linear A Reference Texts"),
      el("p", {},
        `${LA_TEXTS.length} Linear A text forms used for syllabotactic display (the Monte Carlo comparison uses the curated ${LINEAR_A_WORDS.length}-word subset).`
      ),
      el("div", { className: "word-list" },
        ...LA_TEXTS.map(t => el("span", { className: "mono" }, t))
      )
    )
  );
}
