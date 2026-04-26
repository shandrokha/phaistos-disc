import { el, text } from "../dom.mjs";

// CROSS-UPDATE WATCHLIST: The key-finding text below contains hardcoded
// canonical literals (Minoan MC p, Holm p, FW p; leave-PD filtered MC p;
// Sign 02 phonetic MC p). These are locked to scripts/canonical-values.json
// at 3-decimal precision by `verify-canonical` (see extractOverviewLiterals
// in scripts/verify-canonical.mjs). If you change either side without
// updating the other, CI will fail. The phrasing must keep the matching
// labels intact ("MC p = ... under default", "Holm p = ...", "FW p = ...",
// "filtered MC p = ...", "phonetic treatment of sign 02 (MC p = ...)").

export function render(container, ctx) {
  const allWords = [...ctx.sideA.words, ...ctx.sideB.words];

  container.appendChild(
    el("div", {},
      el("h2", {}, "Overview"),

      el("p", {},
        "The Phaistos Disc is a fired clay disc from the Minoan palace of Phaistos, Crete, ",
        "dated to the Middle or Late Minoan Bronze Age (c. 1700 BCE). ",
        "Stamped with 241 readable tokens of 45 distinct signs arranged in a spiral on both sides, ",
        "it remains one of the most famous unsolved puzzles in archaeology."
      ),

      el("p", {},
        "This workbench provides an interactive, reproducible environment for exploring ",
        "a structural analysis of the disc. Using proposed phonetic values derived from ",
        "Linear A/B sign correspondences (homomorphs), it tests which ancient language — ",
        "if any — the disc text most closely resembles."
      ),

      // Images are vendored locally under public/app/assets/ rather than
      // hot-linked from upload.wikimedia.org. The hot-linked URLs broke when
      // (a) Side A was re-uploaded on Commons and its content-hash thumbnail
      // path changed, and (b) Wikimedia tightened its thumbnail-step policy
      // (see https://w.wiki/GHai), causing the previously-cached 400px size
      // to return HTTP 400. Vendoring is license-compatible (CC BY-SA 4.0;
      // attribution preserved in the caption below) and removes the live
      // demo's dependency on Wikimedia's hot-link policy.
      el("div", { className: "disc-photos" },
        el("figure", { className: "disc-figure" },
          el("img", {
            src: "assets/disc-side-a.jpg",
            alt: "Phaistos Disc — Side A, as displayed in the Heraklion Archaeological Museum",
            loading: "lazy",
            width: "400",
            height: "377"
          }),
          el("figcaption", {}, "Side A")
        ),
        el("figure", { className: "disc-figure" },
          el("img", {
            src: "assets/disc-side-b.jpg",
            alt: "Phaistos Disc — Side B, as displayed in the Heraklion Archaeological Museum",
            loading: "lazy",
            width: "400",
            height: "377"
          }),
          el("figcaption", {}, "Side B")
        )
      ),
      el("p", { className: "photo-attribution" },
        "Photos: C\u00A0messier / Bammesk, ",
        el("a", {
          href: "https://commons.wikimedia.org/wiki/File:Phaistos_Disc_-_Side_A_-_6380_-_crop1.jpg",
          target: "_blank",
          rel: "noopener"
        }, "Wikimedia Commons"),
        ", CC\u00A0BY-SA\u00A04.0. Heraklion Archaeological Museum."
      ),

      el("div", { className: "key-finding" },
        el("strong", {}, "Key finding: "),
        text("Of nine ancient languages tested, Minoan (Linear A) produces the only "),
        text("statistically significant bigram overlap under a uniform null model "),
        text("(MC p = 0.032 under default sign-02-as-determinative annotation). However, "),
        text("this result does not survive Holm-Bonferroni correction for multiple testing "),
        text("(Holm p = 0.286), the frequency-weighted null model (FW p = 0.706), the "),
        text("leave-PD-inspired-out ablation (filtered MC p = 0.261), or the alternative "),
        text("phonetic treatment of sign 02 (MC p = 0.056). The disc reading is most "),
        text("consistent with Minoan under one specific test, but confirmation remains below the Barber limit.")
      ),

      el("h3", {}, "Disc Statistics"),
      el("div", { className: "result-card" },
        el("p", {},
          el("strong", {}, "Side A: "), text(`${ctx.sideA.words.length} words`),
          text("  \u2022  "),
          el("strong", {}, "Side B: "), text(`${ctx.sideB.words.length} words`),
          text("  \u2022  "),
          el("strong", {}, "Total: "), text(`${allWords.length} words`)
        ),
        el("p", {},
          el("strong", {}, "Tokens: "), text("242 (241 readable, 1 damaged)"),
          text("  \u2022  "),
          el("strong", {}, "Distinct signs: "), text("45")
        )
      ),

      el("h3", {}, "How to Use"),
      el("p", {},
        "Navigate using the sidebar on the left. Each section presents a different ",
        "analysis with pre-computed results shown by default. Where applicable, you can ",
        "re-run Monte Carlo simulations live in your browser using the \u201CRun\u201D buttons. ",
        "The iteration count can be adjusted in the sidebar footer."
      ),
      el("p", {},
        "All computation is performed client-side — no data is sent to any server. ",
        "The underlying analysis code uses seeded pseudorandom number generators ",
        "(mulberry32) to ensure deterministic, reproducible results."
      )
    )
  );
}
