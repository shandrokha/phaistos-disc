var PhaistosApp = (() => {
  // app/js/engine/data.mjs
  var TRANSCRIPTION_TEXT = `# Phaistos Disc transcription (Evans sign numbers)
# Side A:
\xA602 12 13 01 18/
| 24 40 12 | 29 45 07/
| 29 29 34 | 02 12 04 40 33 | 27 45 07 12 | 27 44 08 | 02 12 06 18 ?? | 31 26 35 | 02 12 41 19 35 | 01 41 40 07 | 02 12 32 23 38/
| 39 11 | ^ 02 27 25 10 23 18 | 28 01/
| 02 12 31 26/
| 02 12 27 27 35 37 21 | 33 23 | 02 12 31 26/
| 02 27 25 10 23 18 | 28 01/
| 02 12 31 26/
| 02 12 27 14 32 18 27 | 06 18 17 19/
| 31 26 12 | 02 12 13 01 | 23 19 35/
| 10 03 38 | 02 12 27 27 35 37 21 | 13 01 | 10 03 38
# Side B:
\xA602 12 22 40 07 | 27 45 07 35 | 02 37 23 05/
| 22 25 27 | 33 24 20 12 | 16 23 18 43/
| 13 01 39 33 | 15 07 13 01 18 | 22 37 42 25 | 07 24 40 35 | 02 26 36 40 | 27 25 38 01 | 29 ^ 24 24 20 35 | 16 14 18 | 29 33 01 | 06 35 32 39 33 | 02 09 27 01 | 29 36 07 08/
| 29 08 13 | 29 45 07/
| 22 29 36 07 08/
| 27 34 23 25 | 07 18 35 | 07 45 07/
| 07 23 18 24 | 22 29 36 07 08/
| 09 30 39 18 07 | 02 06 35 23 07 | 29 34 23 25 | 45 07/
`;
  var PHONETIC = /* @__PURE__ */ new Map([
    [1, { v: "je", c: "low-med" }],
    [2, { v: "\xB0", c: "det" }],
    [3, { v: "u", c: "low-med" }],
    [4, { v: "nwa", c: "low" }],
    [5, { v: "pu", c: "low" }],
    [6, { v: "de", c: "low" }],
    [7, { v: "ti", c: "med" }],
    [8, { v: "no", c: "low-med" }],
    [9, { v: "pe", c: "med" }],
    [10, { v: "zu", c: "med" }],
    [11, { v: "twe", c: "low" }],
    [12, { v: "qe", c: "HIGH" }],
    [13, { v: "pa", c: "low" }],
    [14, { v: "ta", c: "low" }],
    [15, { v: "so", c: "low-med" }],
    [16, { v: "ze", c: "low-med" }],
    [17, { v: "?17", c: "none" }],
    [18, { v: "ti", c: "med", note: "allograph of 07" }],
    [19, { v: "sa", c: "HIGH" }],
    [20, { v: "ra", c: "low-med" }],
    [21, { v: "swi", c: "med-hi" }],
    [22, { v: "zo", c: "low" }],
    [23, { v: "na", c: "low-med" }],
    [24, { v: "e", c: "low-med" }],
    [25, { v: "dwa", c: "low" }],
    [26, { v: "rja", c: "med", note: "CORRECTED: AB76 RA2, not AB77 KA" }],
    [27, { v: "wi", c: "low" }],
    [28, { v: "re", c: "low-med" }],
    [29, { v: "ma", c: "HIGH" }],
    [30, { v: "me", c: "low" }],
    [31, { v: "ku", c: "HIGH" }],
    [32, { v: "ra2", c: "low", note: "tentative; distinct from PD20 ra (AB60)" }],
    [33, { v: "sa", c: "med", note: "allograph of 19" }],
    [34, { v: "pi", c: "low-med" }],
    [35, { v: "te", c: "med" }],
    [36, { v: "ni", c: "low-med" }],
    [37, { v: "tu", c: "low-med" }],
    [38, { v: "ka", c: "low-med", note: "CORRECTED: AB77 KA, not AB38 E" }],
    [39, { v: "i", c: "med" }],
    [40, { v: "ru", c: "low-med" }],
    [41, { v: "si", c: "low" }],
    [42, { v: "mi", c: "low" }],
    [43, { v: "tja", c: "low-med" }],
    [44, { v: "di", c: "med" }],
    [45, { v: "rja", c: "med" }]
  ]);
  var LINEAR_A_WORDS = [
    { w: "a-ta-i-*301-wa-ja", src: "IO Za 2, PK Za 11", note: "libation formula opening" },
    { w: "ja-di-ki-tu", src: "IO Za 2", note: "libation formula \u2014 vessel term" },
    { w: "ja-sa-sa-ra-me", src: "IO Za 2, PK Za 11+", note: "divine epithet 'lady'?" },
    { w: "u-na-ka-na-si", src: "IO Za 2", note: "libation formula" },
    { w: "i-pi-na-ma", src: "IO Za 2, PK Za 11", note: "'I distribute'?" },
    { w: "si-ru-te", src: "IO Za 2", note: "cf. PD B23 (Owens)", pdInspired: true },
    { w: "ta-na-ra-te", src: "IO Za 2", note: "cf. PD B25 (Owens)", pdInspired: true },
    { w: "u-ti-nu", src: "IO Za 2", note: "libation formula" },
    { w: "i-*301-wa-ja", src: "IO Za 2, PK Za 11", note: "'olive oil'" },
    { w: "i-*301-wa-e", src: "PK Za 11", note: "variant of above" },
    { w: "da-pi-te-ri", src: "PK Za 11", note: "'stone (material)'" },
    { w: "a-di-ki-te-te", src: "PK Za 11", note: "vessel designation" },
    { w: "tu-me-i", src: "PK Za 11, PK Za 8", note: "libation formula" },
    { w: "u-na-ru-ka-na-ti", src: "PK Za 11", note: "cf. PD B28-29 (Owens)", pdInspired: true },
    { w: "ma-te-re-sa", src: "PH 15a", note: "cf. PD B16 -re-sa", pdInspired: true },
    { w: "ti-di-te", src: "KN Zf 31", note: "cf. PD B24", pdInspired: true },
    { w: "ti-di-te-qa-ti", src: "KN Zf 31", note: "extended form" },
    { w: "ma-ka-ri-te", src: "HT 117a", note: "compound phrase" },
    { w: "na-da-re", src: "HT 117a", note: "cf. PD A27 na-da-te?", pdInspired: true },
    { w: "da-ru-ne-te", src: "HT 98 b.2", note: "cf. -ne-te suffix" },
    { w: "ka-ku-ne-te", src: "ZA 10 b.6", note: "cf. -ne-te suffix" },
    { w: "ku-ro", src: "multiple", note: "'total'" },
    { w: "ki-ro", src: "multiple", note: "'crossroads'?" },
    { w: "qe-ku-re", src: "multiple", note: "'underground'?" },
    { w: "ti-ti-ku", src: "HT 86a", note: "reduplicated TI" },
    { w: "pi-rju-te", src: "HT 116a.4", note: "cf. PD -rju-te", pdInspired: true },
    { w: "ja-sa-ja", src: "KN Zg 55", note: "cf. PD B15 (Owens)", pdInspired: true },
    { w: "ja-si-e", src: "KE Zb 4", note: "variant" },
    { w: "i-da-ma-na", src: "AR Zf 1, AR Zf 2", note: "Arkalochori Axe" },
    { w: "si-da-te", src: "ARKH 2.1", note: "cf. PD A10 (Owens)", pdInspired: true },
    { w: "ku-ra", src: "ZA 20.4", note: "cf. PD A9 (Owens)", pdInspired: true },
    { w: "sa-sa-ma", src: "multiple", note: "'sesame'" },
    { w: "ku-mi-no", src: "HT 97", note: "'cumin'" },
    { w: "a-sa-sa-ra-ma-na", src: "PK Za 11", note: "extended epithet" }
  ];
  var LINEAR_A_WORDS_NO_PD_INSPIRED = LINEAR_A_WORDS.filter((w) => !w.pdInspired);
  var HOMOMORPH_SET = [
    { pd: 12, ab: 78, val: "QE", conf: "high" },
    { pd: 19, ab: 31, val: "SA", conf: "high" },
    { pd: 29, ab: 80, val: "MA", conf: "high" },
    { pd: 31, ab: 81, val: "KU", conf: "high" },
    { pd: 7, ab: 37, val: "TI", conf: "medium" },
    { pd: 18, ab: 37, val: "TI", conf: "medium" },
    { pd: 10, ab: 79, val: "ZU", conf: "medium" },
    { pd: 21, ab: 64, val: "SWI", conf: "medium-high" },
    { pd: 26, ab: 76, val: "RA2", conf: "medium" },
    { pd: 33, ab: 31, val: "SA", conf: "medium" },
    { pd: 35, ab: 4, val: "TE", conf: "medium" },
    { pd: 39, ab: 28, val: "I", conf: "medium" },
    { pd: 44, ab: 7, val: "DI", conf: "medium" },
    { pd: 45, ab: 76, val: "RA2", conf: "medium" },
    { pd: 9, ab: 301, val: "PE", conf: "medium" },
    { pd: 8, ab: 52, val: "NO", conf: "low-medium" },
    { pd: 23, ab: 6, val: "NA", conf: "low-medium" },
    { pd: 28, ab: 27, val: "RE", conf: "low-medium" },
    { pd: 34, ab: 39, val: "PI", conf: "low-medium" },
    { pd: 36, ab: 30, val: "NI", conf: "low-medium" },
    { pd: 37, ab: 69, val: "TU", conf: "low-medium" },
    { pd: 38, ab: 77, val: "KA", conf: "low-medium" },
    { pd: 43, ab: 66, val: "TJA", conf: "low-medium" }
  ];
  var LINEAR_A_EXCLUDED = [
    { w: "a-mi-ni-so", src: "KN Fp+", note: "Amnisos \u2014 Cretan place name" },
    { w: "ko-no-so", src: "KN", note: "Knossos \u2014 Cretan place name" },
    { w: "pa-i-to", src: "KN", note: "Phaistos \u2014 Cretan place name" },
    { w: "su-ki-ri-ta", src: "KN Db+", note: "Sukrita \u2014 Cretan place name" },
    { w: "ma-di-na", src: "HT 97a", note: "personal name or toponym" },
    { w: "da-we-da", src: "ZA 10b", note: "personal name or toponym" },
    { w: "wi-ri-no", src: "HT 117a", note: "wool/flax? \u2014 probable Greek cognate" },
    { w: "e-ka-ra", src: "HT Wc 3017", note: "fireplace? \u2014 probable Greek cognate" },
    { w: "te-me-no", src: "PK Za 11", note: "shrine \u2014 Greek borrowing (\u03C4\u03AD\u03BC\u03B5\u03BD\u03BF\u03C2)" },
    { w: "na-wi-jo", src: "HT 6a", note: "nautical term? \u2014 probable Greek cognate" },
    { w: "qe-to", src: "HT 86a", note: "toponym?" },
    { w: "de-mi-ni-ja", src: "KH 5.1", note: "personal/divine name?" },
    { w: "ta-ra-nu", src: "KN Zf 31", note: "footstool \u2014 probable Greek cognate (\u03B8\u03C1\u1FB6\u03BD\u03C5\u03C2)" },
    { w: "a-ke-ti-rja", src: "PK Za 11", note: "cf. Linear B a-ke-ti-ri-ja (\u1F00\u03C3\u03BA\u03AE\u03C4\u03C1\u03B9\u03B1\u03B9)" },
    { w: "a-sa-ta-tja", src: "PK Za 11", note: "uncertain interpretation" }
  ];
  var LINEAR_A_FULL = [...LINEAR_A_WORDS, ...LINEAR_A_EXCLUDED];
  var LA_TEXTS = [
    "a-ta-i-*301-wa-ja",
    "ja-di-ki-tu",
    "ja-sa-sa-ra-me",
    "u-na-ka-na-si",
    "i-pi-na-ma",
    "si-ru-te",
    "ta-na-ra-te",
    "u-ti-nu",
    "i-*301-wa-ja",
    "i-*301-wa-e",
    "da-pi-te-ri",
    "a-di-ki-te-te",
    "tu-me-i",
    "u-na-ru-ka-na-ti",
    "ma-te-re-sa",
    "ti-di-te",
    "ti-di-te-qa-ti",
    "ma-ka-ri-te",
    "na-da-re",
    "da-ru-ne-te",
    "ka-ku-ne-te",
    "ku-ro",
    "ki-ro",
    "qe-ku-re",
    "ti-ti-ku",
    "pi-rju-te",
    "ja-sa-ja",
    "ja-si-e",
    "i-da-ma-na",
    "si-da-te",
    "ku-ra",
    "sa-sa-ma",
    "ku-mi-no",
    "a-sa-sa-ra-ma-na",
    "a-mi-ni-so",
    "ko-no-so",
    "pa-i-to",
    "su-ki-ri-ta",
    "ma-di-na",
    "da-we-da",
    "wi-ri-no",
    "e-ka-ra",
    "te-me-no",
    "na-wi-jo",
    "qe-to",
    "de-mi-ni-ja",
    "ta-ra-nu",
    "a-ke-ti-rja",
    "a-sa-ta-tja"
  ];

  // app/js/engine/parser.mjs
  function parseWord(raw) {
    raw = raw.replaceAll("^", " ").trim();
    if (!raw) return { signs: [], hasObliqueStroke: false };
    let hasObliqueStroke = raw.endsWith("/");
    if (hasObliqueStroke) raw = raw.slice(0, -1).trimEnd();
    const tokens = raw.split(/\s+/g).filter((t) => t.length > 0 && t !== "\xA6");
    const signs = tokens.map((t) => {
      if (t === "??") return null;
      if (/^\d{2}$/.test(t)) return Number.parseInt(t, 10);
      throw new Error(`Unexpected token: ${JSON.stringify(t)}`);
    });
    return { signs, hasObliqueStroke };
  }
  function parseTranscription(text2) {
    const lines = text2.split(/\r?\n/g).map((l) => l.trim()).filter((l) => l.length > 0 && !l.startsWith("#"));
    const joined = lines.join(" ");
    const parts = joined.split("\xA6").map((p) => p.trim()).filter((p) => p.length > 0);
    if (parts.length !== 2) {
      throw new Error(`Expected 2 sides, got ${parts.length}`);
    }
    function parseSide(label, text3) {
      const rawWords = text3.split("|").map((w) => w.trim()).filter(Boolean);
      const words = rawWords.map(parseWord);
      return { label, words };
    }
    return [parseSide("A", parts[0]), parseSide("B", parts[1])];
  }

  // app/js/router.mjs
  function initRouter(onNavigate) {
    function handleHash() {
      const hash = window.location.hash.slice(1) || "overview";
      onNavigate(hash);
    }
    window.addEventListener("hashchange", handleHash);
    handleHash();
  }
  function setActiveLink(sectionId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });
  }

  // app/js/dom.mjs
  function el(tag, attrs = {}, ...children) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === "className") {
        element.className = value;
      } else if (key.startsWith("on")) {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === "dataset") {
        for (const [dk, dv] of Object.entries(value)) element.dataset[dk] = dv;
      } else {
        element.setAttribute(key, value);
      }
    }
    for (const child of children) {
      if (child == null) continue;
      if (typeof child === "string" || typeof child === "number") {
        element.appendChild(document.createTextNode(String(child)));
      } else {
        element.appendChild(child);
      }
    }
    return element;
  }
  function text(str) {
    return document.createTextNode(str);
  }
  function clear(container) {
    for (const node of [...container.childNodes]) {
      if (node.nodeType === 1 && node.id === "live-region") continue;
      container.removeChild(node);
    }
  }
  function table(headers, rows, { className = "data-table" } = {}) {
    const thead = el(
      "thead",
      {},
      el("tr", {}, ...headers.map((h) => {
        const attrs = {};
        if (typeof h === "object") {
          attrs.className = h.className || "";
          return el("th", attrs, h.label);
        }
        return el("th", {}, h);
      }))
    );
    const tbody = el(
      "tbody",
      {},
      ...rows.map(
        (cells) => el("tr", {}, ...cells.map((cell) => {
          if (cell && typeof cell === "object" && cell.nodeType) {
            return el("td", {}, cell);
          }
          if (cell && typeof cell === "object" && cell.value !== void 0) {
            return el("td", { className: cell.className || "" }, String(cell.value));
          }
          return el("td", {}, String(cell ?? ""));
        }))
      )
    );
    return el("table", { className }, thead, tbody);
  }
  function progressBar(fraction) {
    const pct = Math.round(fraction * 100);
    const fill = el("div", { className: "progress-bar-fill" });
    fill.style.width = `${pct}%`;
    return el("div", {
      className: "progress-bar",
      role: "progressbar",
      "aria-valuenow": String(pct),
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }, fill);
  }
  function resultCard(title, ...children) {
    return el(
      "div",
      { className: "result-card" },
      el("h4", {}, title),
      ...children
    );
  }
  function confClass(level) {
    const map = {
      "HIGH": "conf-high",
      "med-hi": "conf-med-hi",
      "med": "conf-med",
      "low-med": "conf-low-med",
      "low": "conf-low",
      "det": "conf-det",
      "none": "conf-none"
    };
    return map[level] || "conf-none";
  }

  // app/js/sections/overview.mjs
  function render(container, ctx2) {
    const allWords = [...ctx2.sideA.words, ...ctx2.sideB.words];
    container.appendChild(
      el(
        "div",
        {},
        el("h2", {}, "Overview"),
        el(
          "p",
          {},
          "The Phaistos Disc is a fired clay disc from the Minoan palace of Phaistos, Crete, ",
          "dated to the Middle or Late Minoan Bronze Age (c. 1700 BCE). ",
          "Stamped with 241 readable tokens of 45 distinct signs arranged in a spiral on both sides, ",
          "it remains one of the most famous unsolved puzzles in archaeology."
        ),
        el(
          "p",
          {},
          "This workbench provides an interactive, reproducible environment for exploring ",
          "a structural analysis of the disc. Using proposed phonetic values derived from ",
          "Linear A/B sign correspondences (homomorphs), it tests which ancient language \u2014 ",
          "if any \u2014 the disc text most closely resembles."
        ),
        // Images are vendored locally under public/app/assets/ rather than
        // hot-linked from upload.wikimedia.org. The hot-linked URLs broke when
        // (a) Side A was re-uploaded on Commons and its content-hash thumbnail
        // path changed, and (b) Wikimedia tightened its thumbnail-step policy
        // (see https://w.wiki/GHai), causing the previously-cached 400px size
        // to return HTTP 400. Vendoring is license-compatible (CC BY-SA 4.0;
        // attribution preserved in the caption below) and removes the live
        // demo's dependency on Wikimedia's hot-link policy.
        el(
          "div",
          { className: "disc-photos" },
          el(
            "figure",
            { className: "disc-figure" },
            el("img", {
              src: "assets/disc-side-a.jpg",
              alt: "Phaistos Disc \u2014 Side A, as displayed in the Heraklion Archaeological Museum",
              loading: "lazy",
              width: "400",
              height: "377"
            }),
            el("figcaption", {}, "Side A")
          ),
          el(
            "figure",
            { className: "disc-figure" },
            el("img", {
              src: "assets/disc-side-b.jpg",
              alt: "Phaistos Disc \u2014 Side B, as displayed in the Heraklion Archaeological Museum",
              loading: "lazy",
              width: "400",
              height: "377"
            }),
            el("figcaption", {}, "Side B")
          )
        ),
        el(
          "p",
          { className: "photo-attribution" },
          "Photos: C\xA0messier / Bammesk, ",
          el("a", {
            href: "https://commons.wikimedia.org/wiki/File:Phaistos_Disc_-_Side_A_-_6380_-_crop1.jpg",
            target: "_blank",
            rel: "noopener"
          }, "Wikimedia Commons"),
          ", CC\xA0BY-SA\xA04.0. Heraklion Archaeological Museum."
        ),
        el(
          "div",
          { className: "key-finding" },
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
        el(
          "div",
          { className: "result-card" },
          el(
            "p",
            {},
            el("strong", {}, "Side A: "),
            text(`${ctx2.sideA.words.length} words`),
            text("  \u2022  "),
            el("strong", {}, "Side B: "),
            text(`${ctx2.sideB.words.length} words`),
            text("  \u2022  "),
            el("strong", {}, "Total: "),
            text(`${allWords.length} words`)
          ),
          el(
            "p",
            {},
            el("strong", {}, "Tokens: "),
            text("242 (241 readable, 1 damaged)"),
            text("  \u2022  "),
            el("strong", {}, "Distinct signs: "),
            text("45")
          )
        ),
        el("h3", {}, "How to Use"),
        el(
          "p",
          {},
          "Navigate using the sidebar on the left. Each section presents a different ",
          "analysis with pre-computed results shown by default. Where applicable, you can ",
          "re-run Monte Carlo simulations live in your browser using the \u201CRun\u201D buttons. ",
          "The iteration count can be adjusted in the sidebar footer."
        ),
        el(
          "p",
          {},
          "All computation is performed client-side \u2014 no data is sent to any server. ",
          "The underlying analysis code uses seeded pseudorandom number generators ",
          "(mulberry32) to ensure deterministic, reproducible results."
        )
      )
    );
  }

  // app/js/engine/phonetics.mjs
  function phoneticValue(sign) {
    if (sign == null) return "??";
    const p = PHONETIC.get(sign);
    return p ? p.v : `?${sign}`;
  }
  function phoneticWord(signs) {
    return signs.map(phoneticValue).join("-");
  }
  function syllabify(word) {
    return word.split("-").filter((s) => s.length > 0);
  }
  function ngramsOf(syls, n) {
    const result = [];
    for (let i = 0; i <= syls.length - n; i++) {
      result.push(syls.slice(i, i + n).join("-"));
    }
    return result;
  }
  function confTag(sign) {
    if (sign == null) return "?";
    const p = PHONETIC.get(sign);
    if (!p) return "?";
    if (p.c === "HIGH") return "H";
    if (p.c === "med-hi") return "M";
    if (p.c === "med") return "m";
    if (p.c === "low-med") return "l";
    if (p.c === "low") return ".";
    if (p.c === "det") return "D";
    return "?";
  }
  function confBar(signs) {
    return signs.map(confTag).join("");
  }
  function cvStructure(sign) {
    if (sign == null) return "?";
    const p = PHONETIC.get(sign);
    if (!p) return "?";
    if (p.c === "det") return "DET";
    if (p.c === "none") return "?";
    const v = p.v;
    const vowels = /* @__PURE__ */ new Set(["a", "e", "i", "o", "u"]);
    return vowels.has(v[0]) ? "V" : "CV";
  }

  // app/js/sections/reading.mjs
  function countFrequencies(sideA2, sideB2) {
    const freq = /* @__PURE__ */ new Map();
    for (const side of [sideA2, sideB2]) {
      for (const w of side.words) {
        for (const s of w.signs) {
          if (s != null) freq.set(s, (freq.get(s) ?? 0) + 1);
        }
      }
    }
    return freq;
  }
  function render2(container, ctx2) {
    const { sideA: sideA2, sideB: sideB2 } = ctx2;
    const freq = countFrequencies(sideA2, sideB2);
    const headers = ["Side", "#", "Sign Numbers", "Phonetic Reading", "Confidence", "Oblique"];
    const rows = [];
    let wordNum = 0;
    for (const side of [sideA2, sideB2]) {
      for (const w of side.words) {
        wordNum++;
        const signNums = w.signs.map((s) => s == null ? "??" : String(s).padStart(2, "0")).join(" ");
        const reading = phoneticWord(w.signs);
        const conf = confBar(w.signs);
        rows.push([
          side.label,
          wordNum,
          { value: signNums, className: "mono" },
          { value: reading, className: "mono" },
          { value: conf, className: "mono" },
          w.hasObliqueStroke ? "/" : ""
        ]);
      }
    }
    const signEntries = [...PHONETIC.entries()].sort((a, b) => a[0] - b[0]);
    const signCards = signEntries.map(([num, info]) => {
      const f = freq.get(num) ?? 0;
      return el(
        "div",
        { className: "sign-card" },
        el("div", { className: "sign-num" }, `PD ${String(num).padStart(2, "0")}`),
        el("div", { className: `sign-value ${confClass(info.c)}` }, info.v),
        el("div", {}, `${f}x`),
        info.note ? el("div", { className: "text-note" }, info.note) : null
      );
    });
    container.appendChild(
      el(
        "div",
        {},
        el("h2", {}, "Phonetic Reading"),
        el(
          "p",
          {},
          "Each of the 45 distinct signs on the Phaistos Disc is assigned a phonetic value ",
          "based on visual correspondences (homomorphs) with Linear A and Linear B signs. ",
          "The table below shows all 61 words with their sign numbers and proposed phonetic readings."
        ),
        el(
          "p",
          {},
          "Confidence key: ",
          el("span", { className: "conf-high" }, "H = HIGH"),
          text(", "),
          el("span", { className: "conf-med-hi" }, "M = med-high"),
          text(", "),
          el("span", { className: "conf-med" }, "m = medium"),
          text(", "),
          el("span", { className: "conf-low-med" }, "l = low-med"),
          text(", "),
          el("span", { className: "conf-low" }, ". = low"),
          text(", "),
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

  // app/js/sections/validation.mjs
  function analyzeStructure(sideA2, sideB2) {
    let cvCount = 0;
    let vCount = 0;
    let detCount = 0;
    let totalPhonetic = 0;
    const freq = /* @__PURE__ */ new Map();
    for (const side of [sideA2, sideB2]) {
      for (const w of side.words) {
        for (const s of w.signs) {
          if (s == null) continue;
          freq.set(s, (freq.get(s) ?? 0) + 1);
          const cv = cvStructure(s);
          if (cv === "DET") {
            detCount++;
            continue;
          }
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
      logFreq: Math.log10(count)
    }));
    return { cvCount, vCount, detCount, totalPhonetic, ranks };
  }
  function computePositionalProfile(sideA2, sideB2) {
    const initial = /* @__PURE__ */ new Map();
    const nonInitial = /* @__PURE__ */ new Map();
    for (const side of [sideA2, sideB2]) {
      for (const w of side.words) {
        const signs = w.signs.filter((s) => s != null);
        const hasDet = signs[0] === 2;
        const phonSigns = hasDet ? signs.slice(1) : signs;
        for (let i = 0; i < phonSigns.length; i++) {
          const s = phonSigns[i];
          if (i === 0) initial.set(s, (initial.get(s) ?? 0) + 1);
          else nonInitial.set(s, (nonInitial.get(s) ?? 0) + 1);
        }
      }
    }
    const allSigns = /* @__PURE__ */ new Set([...initial.keys(), ...nonInitial.keys()]);
    const profiles = [...allSigns].map((s) => ({
      sign: s,
      value: phoneticValue(s),
      initial: initial.get(s) ?? 0,
      nonInitial: nonInitial.get(s) ?? 0,
      total: (initial.get(s) ?? 0) + (nonInitial.get(s) ?? 0)
    }));
    profiles.sort((a, b) => b.total - a.total);
    return profiles;
  }
  function render3(container, ctx2) {
    const { sideA: sideA2, sideB: sideB2 } = ctx2;
    const { cvCount, vCount, detCount, totalPhonetic, ranks } = analyzeStructure(sideA2, sideB2);
    const cvPercent = ((cvCount + vCount) / totalPhonetic * 100).toFixed(1);
    const n = ranks.length;
    const sumX = ranks.reduce((s, r) => s + r.logRank, 0);
    const sumY = ranks.reduce((s, r) => s + r.logFreq, 0);
    const sumXY = ranks.reduce((s, r) => s + r.logRank * r.logFreq, 0);
    const sumX2 = ranks.reduce((s, r) => s + r.logRank * r.logRank, 0);
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const profiles = computePositionalProfile(sideA2, sideB2);
    container.appendChild(
      el(
        "div",
        {},
        el("h2", {}, "Validation"),
        el(
          "p",
          {},
          "Structural checks verify that the proposed phonetic reading produces patterns ",
          "consistent with natural language."
        ),
        el("h3", {}, "CV/V Syllable Structure"),
        resultCard(
          "Syllable structure check",
          el(
            "p",
            {},
            `Of ${totalPhonetic} phonetic tokens, ${cvCount} are CV and ${vCount} are V. `,
            `${detCount} determinative tokens excluded.`
          ),
          el("p", { className: "stat-value" }, `${cvPercent}% CV/V structure`),
          el(
            "p",
            { className: "text-hint" },
            "Note: 100% CV/V structure is a necessary consequence of using Linear B-derived ",
            "phonetic values (which are all CV or V). This is not independent validation."
          )
        ),
        el("h3", {}, "Zipf\u2019s Law"),
        resultCard(
          "Frequency distribution",
          el(
            "p",
            {},
            `Log-log slope of sign frequency vs. rank: `,
            el("span", { className: "stat-value" }, `\u2248 ${slope.toFixed(2)}`),
            text(" (expected for natural language: \u2248 \u22121.0, \xB10.2)")
          ),
          el(
            "p",
            { className: "text-hint" },
            "A slope near \u22121 is consistent with natural language (Zipf\u2019s law). ",
            "Highly repetitive or random texts deviate significantly."
          )
        ),
        el("h3", {}, "Sign Frequency Ranking"),
        table(
          ["Rank", "Sign", "Value", "Count", "log(rank)", "log(freq)"],
          ranks.slice(0, 20).map((r) => [
            r.rank,
            `PD ${String(r.sign).padStart(2, "0")}`,
            { value: r.value, className: "mono" },
            r.count,
            { value: r.logRank.toFixed(3), className: "mono" },
            { value: r.logFreq.toFixed(3), className: "mono" }
          ])
        ),
        el("p", { className: "text-small" }, `Showing top 20 of ${ranks.length} signs.`),
        el("h3", {}, "Positional Profile"),
        el(
          "p",
          {},
          "How often each sign appears in word-initial vs. non-initial position. ",
          "Strong positional preference suggests functional differentiation."
        ),
        table(
          ["Sign", "Value", "Initial", "Non-initial", "Total", "Initial %"],
          profiles.slice(0, 20).map((p) => [
            `PD ${String(p.sign).padStart(2, "0")}`,
            { value: p.value, className: "mono" },
            p.initial,
            p.nonInitial,
            p.total,
            { value: p.total > 0 ? (p.initial / p.total * 100).toFixed(0) + "%" : "\u2014", className: "mono" }
          ])
        ),
        el("p", { className: "text-small" }, `Showing top 20 of ${profiles.length} signs by frequency.`),
        el("h3", {}, "Oblique Stroke Distribution"),
        (() => {
          const obliqueWords = [];
          let wordNum = 0;
          let sideACt = 0, sideBCt = 0;
          for (const side of [sideA2, sideB2]) {
            for (const w of side.words) {
              wordNum++;
              if (w.hasObliqueStroke) {
                obliqueWords.push({
                  num: wordNum,
                  side: side.label,
                  signs: w.signs.map((s) => s == null ? "??" : String(s).padStart(2, "0")).join(" ")
                });
                if (side.label === "A") sideACt++;
                else sideBCt++;
              }
            }
          }
          const total = sideACt + sideBCt;
          return el(
            "div",
            {},
            resultCard(
              "Oblique stroke summary",
              el(
                "p",
                {},
                `${total} of 61 words (${(total / 61 * 100).toFixed(0)}%) carry an oblique stroke marker: `,
                `${sideACt} on Side A, ${sideBCt} on Side B.`
              ),
              el(
                "p",
                { className: "text-hint" },
                "The oblique stroke appears exclusively at word-final position. ",
                "Its function is debated (word divider, morphological marker, or scribal convention)."
              )
            ),
            table(
              ["#", "Side", "Sign Numbers"],
              obliqueWords.map((w) => [w.num, w.side, { value: w.signs, className: "mono" }])
            )
          );
        })()
      )
    );
  }

  // app/js/sections/morphology.mjs
  function getPhoneticSigns(w) {
    const signs = w.signs.filter((s) => s != null);
    const hasDet = signs[0] === 2;
    return hasDet ? signs.slice(1) : signs;
  }
  function findMinimalPairs(sideA2, sideB2) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const pairs = [];
    for (let i = 0; i < allWords.length; i++) {
      for (let j = i + 1; j < allWords.length; j++) {
        const a = getPhoneticSigns(allWords[i]);
        const b = getPhoneticSigns(allWords[j]);
        if (a.length !== b.length || a.length < 2) continue;
        let diffs = 0;
        let diffPos = -1;
        for (let k = 0; k < a.length; k++) {
          if (phoneticValue(a[k]) !== phoneticValue(b[k])) {
            diffs++;
            diffPos = k;
          }
        }
        if (diffs === 1) {
          pairs.push({
            wordA: phoneticWord(a),
            wordB: phoneticWord(b),
            position: diffPos,
            signA: a[diffPos],
            signB: b[diffPos],
            valA: phoneticValue(a[diffPos]),
            valB: phoneticValue(b[diffPos])
          });
        }
      }
    }
    return pairs;
  }
  function analyzePrefixSuffix(sideA2, sideB2) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const prefixes = /* @__PURE__ */ new Map();
    const suffixes = /* @__PURE__ */ new Map();
    let total = 0;
    let damagedFinal = 0;
    for (const w of allWords) {
      const phonSigns = getPhoneticSigns(w);
      if (phonSigns.length < 2) continue;
      total++;
      const pref = phoneticValue(phonSigns[0]);
      prefixes.set(pref, (prefixes.get(pref) ?? 0) + 1);
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
  function wordLengthDist(sideA2, sideB2) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const dist = /* @__PURE__ */ new Map();
    for (const w of allWords) {
      const len = getPhoneticSigns(w).length;
      dist.set(len, (dist.get(len) ?? 0) + 1);
    }
    return [...dist.entries()].sort((a, b) => a[0] - b[0]);
  }
  function render4(container, ctx2) {
    const { sideA: sideA2, sideB: sideB2 } = ctx2;
    const pairs = findMinimalPairs(sideA2, sideB2);
    const { sortedPrefixes, sortedSuffixes, total, damagedFinal } = analyzePrefixSuffix(sideA2, sideB2);
    const lenDist = wordLengthDist(sideA2, sideB2);
    container.appendChild(
      el(
        "div",
        {},
        el("h2", {}, "Morphology"),
        el(
          "p",
          {},
          "Morphological analysis examines internal structure: minimal pairs suggest ",
          "phonemic contrast, while recurring prefixes and suffixes suggest productive ",
          "morphological patterns."
        ),
        el("h3", {}, "Minimal Pairs"),
        el(
          "p",
          {},
          `Found ${pairs.length} minimal pair(s) \u2014 words that differ by exactly one sign `,
          "in the same position. Minimal pairs are strong evidence for phonemic contrast ",
          "in natural language."
        ),
        el(
          "p",
          { className: "text-hint" },
          "Note: this count includes all attested pairwise contrasts (e.g. the same frame attested twice on different sides ",
          "counts twice). The paper reports seven attested pairs collapsing to five unique phonetic frames. ",
          "Two-syllable pairs are evidentially weaker than 3\u20134-syllable pairs because substituting one syllable in a ",
          "two-syllable word leaves only 50% of the form intact and is more likely to occur by chance."
        ),
        pairs.length > 0 ? table(
          ["Word A", "Word B", "Position", "Contrast"],
          pairs.map((p) => [
            { value: p.wordA, className: "mono" },
            { value: p.wordB, className: "mono" },
            p.position + 1,
            { value: `${p.valA} \u2194 ${p.valB}`, className: "mono" }
          ])
        ) : el("p", { className: "loading" }, "No minimal pairs found."),
        el("h3", {}, "Word-Initial Syllables (Prefixes)"),
        el("p", {}, `Distribution of initial syllables across ${total} words (excluding determinative):`),
        table(
          ["Syllable", "Count", "% of words"],
          sortedPrefixes.slice(0, 15).map(([syl, count]) => [
            { value: syl, className: "mono" },
            count,
            { value: (count / total * 100).toFixed(1) + "%", className: "mono" }
          ])
        ),
        el("h3", {}, "Word-Final Syllables (Suffixes)"),
        el(
          "p",
          {},
          `Distribution of final syllables across ${total} word-groups (determinative excluded). `,
          damagedFinal > 0 ? `${damagedFinal} group(s) with a damaged final sign are excluded from the numerator only \u2014 their true suffix is unknown \u2014 so percentages are reported against the full ${total}-group corpus, matching the convention used in the paper:` : "Each percentage is the share of all word-groups exhibiting that final syllable:"
        ),
        table(
          ["Syllable", "Count", "% of words"],
          sortedSuffixes.slice(0, 15).map(([syl, count]) => [
            { value: syl, className: "mono" },
            count,
            { value: (count / total * 100).toFixed(1) + "%", className: "mono" }
          ])
        ),
        el("h3", {}, "Word-Length Distribution"),
        el("p", {}, "Number of phonetic signs per word (determinative excluded):"),
        table(
          ["Length (signs)", "Count", "% of words"],
          lenDist.map(([len, count]) => [
            len,
            count,
            { value: (count / (sideA2.words.length + sideB2.words.length) * 100).toFixed(1) + "%", className: "mono" }
          ])
        )
      )
    );
  }

  // app/js/charts.mjs
  function createBarChart(canvas, { labels, datasets, title, yLabel, xLabel, yMax, threshold }) {
    if (typeof Chart === "undefined") {
      canvas.parentElement?.insertAdjacentHTML(
        "afterbegin",
        '<p class="text-hint">Chart unavailable (Chart.js failed to load from CDN).</p>'
      );
      return null;
    }
    const plugins = {
      legend: { display: datasets.length > 1, position: "top" },
      title: title ? { display: true, text: title, font: { size: 13, family: "Georgia, serif" } } : { display: false }
    };
    const annotations = {};
    if (threshold != null) {
      annotations.threshold = {
        type: "line",
        yMin: threshold,
        yMax: threshold,
        borderColor: "#555",
        borderWidth: 2,
        borderDash: [6, 3],
        label: {
          display: true,
          content: `\u03B1 = ${threshold}`,
          position: "end",
          backgroundColor: "transparent",
          color: "#555",
          font: { size: 11 }
        }
      };
      plugins.annotation = { annotations };
    }
    return new Chart(canvas, {
      type: "bar",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins,
        scales: {
          y: {
            title: { display: !!yLabel, text: yLabel },
            min: 0,
            max: yMax,
            ticks: { callback: (v) => v.toFixed(2) }
          },
          x: {
            title: { display: !!xLabel, text: xLabel }
          }
        }
      }
    });
  }
  function destroyChart(chartInstance) {
    if (chartInstance) chartInstance.destroy();
  }

  // app/js/sections/comparison.mjs
  var PRE_COMPUTED = [
    { id: "minoan", name: "Minoan / Linear A", corpusSize: 34, effectiveSize: 34, overlap: 9, pValue: 0.0318, fwPValue: 0.7061, holmP: 0.2858, hyperP: 22e-4 },
    { id: "hittite", name: "Hittite (Rasmussen)", corpusSize: 50, effectiveSize: 50, overlap: 8, pValue: 0.1012, fwPValue: 0.8953, holmP: 0.8098, hyperP: 0.0118 },
    { id: "luwian", name: "Luwian (Anatolian)", corpusSize: 72, effectiveSize: 71, overlap: 8, pValue: 0.1765, fwPValue: 0.9988, holmP: 1, hyperP: 0.0255 },
    { id: "greek", name: "Mycenaean Greek", corpusSize: 67, effectiveSize: 67, overlap: 4, pValue: 0.6362, fwPValue: 0.9058, holmP: 1, hyperP: 0.3221 },
    { id: "pfu", name: "Proto-Finno-Ugric", corpusSize: 50, effectiveSize: 50, overlap: 2, pValue: 0.7188, fwPValue: 0.9037, holmP: 1, hyperP: 0.4936 },
    { id: "hurrian", name: "Hurrian", corpusSize: 50, effectiveSize: 50, overlap: 2, pValue: 0.8102, fwPValue: 0.9751, holmP: 1, hyperP: 0.5981 },
    { id: "semitic", name: "West Semitic", corpusSize: 60, effectiveSize: 60, overlap: 1, pValue: 0.988, fwPValue: 1, holmP: 1, hyperP: 0.9495 },
    { id: "egyptian", name: "Middle Egyptian", corpusSize: 50, effectiveSize: 48, overlap: 0, pValue: 1, fwPValue: 1, holmP: 1, hyperP: 1 },
    { id: "etruscan", name: "Etruscan/Tyrsenian", corpusSize: 44, effectiveSize: 42, overlap: 0, pValue: 1, fwPValue: 1, holmP: 1, hyperP: 1 }
  ];
  function formatP(p) {
    if (!Number.isFinite(p)) return "n/a";
    if (p >= 1) return "1.0000";
    return p.toFixed(4);
  }
  function buildTable(results) {
    const headers = ["Rank", "Language", "Corpus", "Overlap", "MC p", "FW p", "Holm p", "HG p", "Uniform MC < 0.05", "Holm < 0.05"];
    const rows = results.map((r, i) => {
      const rawSig = r.pValue < 0.05;
      const holmSig = r.holmP < 0.05;
      const rawCell = el("span", { className: rawSig ? "sig" : "not-sig" }, rawSig ? "yes" : "no");
      const holmCell = el("span", { className: holmSig ? "sig" : "not-sig" }, holmSig ? "yes" : "no");
      return [
        i + 1,
        r.name,
        r.effectiveSize != null ? `${r.corpusSize} (${r.effectiveSize})` : r.corpusSize,
        r.overlap,
        { value: formatP(r.pValue), className: "mono" + (rawSig ? " sig" : "") },
        { value: formatP(r.fwPValue), className: "mono" },
        { value: formatP(r.holmP), className: "mono" + (holmSig ? " sig" : "") },
        { value: formatP(r.hyperP), className: "mono" },
        rawCell,
        holmCell
      ];
    });
    return table(headers, rows);
  }
  function corpusSizeFootnoteEl() {
    return el(
      "p",
      { className: "text-hint" },
      "Corpus = total words (effective). Effective count excludes single-syllable words ",
      "(e.g. \u201Cda\u201D, \u201Cta\u201D) which produce zero bigrams and do not contribute to overlap."
    );
  }
  function buildChart(canvas, results) {
    const labels = results.map((r) => r.name);
    const pvals = results.map((r) => r.pValue);
    const fwPvals = results.map((r) => r.fwPValue);
    return createBarChart(canvas, {
      labels,
      datasets: [
        {
          label: "Uniform MC p-value",
          data: pvals,
          backgroundColor: pvals.map((p) => p < 0.05 ? "#2e7d32" : "#b71c1c"),
          borderWidth: 1
        },
        {
          label: "Freq-weighted MC p-value",
          data: fwPvals,
          backgroundColor: fwPvals.map(() => "#ff8a65"),
          borderWidth: 1
        }
      ],
      title: "Nine-Language Comparison: MC p-Values",
      yLabel: "p-value",
      xLabel: "Language hypothesis",
      yMax: 1.05,
      threshold: 0.05
    });
  }
  function buildVerdictEl(results, iters) {
    const minoan = results.find((r) => r.id === "minoan");
    if (!minoan) return el("span", {}, "No Minoan result available.");
    const sigCount = results.filter((r) => r.pValue < 0.05).length;
    const label = iters ? `(${(iters / 1e3).toFixed(0)}k iterations)` : "(canonical 100k)";
    if (sigCount === 1 && minoan.pValue < 0.05) {
      return el(
        "span",
        {},
        `Minoan/Linear A is the only language below \u03B1 = 0.05 under the uniform null `,
        `(p = ${formatP(minoan.pValue)}), but does not survive Holm-Bonferroni correction `,
        `(Holm p = ${formatP(minoan.holmP)}) or the frequency-weighted null `,
        `(FW p = ${formatP(minoan.fwPValue)}). ${label}`
      );
    }
    if (sigCount === 0) {
      return el(
        "span",
        {},
        `No language reaches \u03B1 = 0.05 under the uniform null. `,
        `Minoan/Linear A is the closest (p = ${formatP(minoan.pValue)}). ${label}`
      );
    }
    return el(
      "span",
      {},
      `${sigCount} language(s) below \u03B1 = 0.05. `,
      `Minoan p = ${formatP(minoan.pValue)}, Holm p = ${formatP(minoan.holmP)}. ${label}`
    );
  }
  function render5(container, ctx2) {
    let chartInstance = null;
    let worker = null;
    const tableContainer = el("div", { id: "comparison-table" });
    tableContainer.appendChild(buildTable(PRE_COMPUTED));
    tableContainer.appendChild(corpusSizeFootnoteEl());
    const canvas = el("canvas", {
      width: "800",
      height: "400",
      role: "img",
      "aria-label": "Bar chart comparing MC p-values across nine ancient languages"
    }, "Bar chart of nine-language comparison p-values. Data also available in the table above.");
    const chartContainer = el("div", { className: "chart-container" }, canvas);
    const verdictEl = el(
      "div",
      { className: "key-finding" },
      el("strong", {}, "Result: "),
      buildVerdictEl(PRE_COMPUTED, null)
    );
    const statusEl = el("p", { className: "loading" });
    const progressEl = el("div");
    const runBtn = el("button", {
      className: "btn-run",
      onClick() {
        runBtn.disabled = true;
        runBtn.setAttribute("aria-busy", "true");
        statusEl.textContent = "Starting Monte Carlo simulation...";
        const iterations = ctx2.getIterations();
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
            const { done, total, lang } = e.data;
            statusEl.textContent = `Computing ${lang}... (${done}/${total})`;
            progressEl.replaceChildren(progressBar(done / total));
          }
          if (e.data.type === "result") {
            const { results, iterations: iters } = e.data;
            const minoan = results.find((r) => r.id === "minoan");
            const preMinoan = PRE_COMPUTED.find((r) => r.id === "minoan");
            if (minoan && preMinoan && minoan.overlap !== preMinoan.overlap) {
              statusEl.textContent += ` \u26A0 Minoan overlap (${minoan.overlap}) differs from pre-computed (${preMinoan.overlap}). Data may have changed.`;
            }
            tableContainer.replaceChildren(buildTable(results), corpusSizeFootnoteEl());
            if (chartInstance) destroyChart(chartInstance);
            const newCanvas = el("canvas", {
              width: "800",
              height: "400",
              role: "img",
              "aria-label": "Bar chart comparing MC p-values across nine ancient languages"
            });
            chartContainer.replaceChildren(newCanvas);
            chartInstance = buildChart(newCanvas, results);
            verdictEl.replaceChildren(
              el("strong", {}, "Result: "),
              buildVerdictEl(results, iters)
            );
            const msg = `Completed ${iters.toLocaleString()} iterations per language.`;
            statusEl.textContent = msg;
            ctx2.announce(msg);
            progressEl.replaceChildren();
            runBtn.disabled = false;
            runBtn.setAttribute("aria-busy", "false");
            worker.terminate();
            worker = null;
          }
        };
        worker.postMessage({ type: "run-comparison", iterations });
      }
    }, "Run Monte Carlo");
    container.appendChild(
      el(
        "div",
        {},
        el("h2", {}, "Nine-Language Comparison"),
        el(
          "p",
          {},
          "This is the core analysis: the disc\u2019s phonetic reading is compared against ",
          "reference vocabularies from nine ancient languages using bigram overlap as a ",
          "similarity metric. Languages are ranked by Monte Carlo p-value (lower = more ",
          "similar to the disc)."
        ),
        el(
          "p",
          {},
          "Three null models are reported: uniform MC (primary), frequency-weighted MC ",
          "(conservative), and hypergeometric (analytical cross-check). Holm-Bonferroni ",
          "correction adjusts for nine simultaneous tests."
        ),
        el(
          "div",
          { className: "result-card" },
          el(
            "div",
            { className: "run-control" },
            runBtn,
            el(
              "span",
              { className: "mono text-hint" },
              "Re-run with live Monte Carlo to verify results"
            )
          ),
          statusEl,
          progressEl
        ),
        verdictEl,
        el(
          "p",
          { className: "text-hint" },
          "Note: Hittite (Rasmussen) uses an independent phonetic map derived from Rasmussen (2010), ",
          "not the Daidalika signary. In this reading, Sign 02 is treated phonetically as \u201Cis\u201D ",
          "(adding 19 tokens), whereas the Daidalika reading excludes it as a determinative. ",
          "Both readings use the same bigram construction pipeline. ",
          "Each language uses an independently seeded PRNG (uniformSeed + languageIndex), ",
          "so individual p-values are reproducible without running the full suite."
        ),
        el(
          "p",
          { className: "text-hint" },
          "HG p-values are a cross-check only. The hypergeometric uses N = S\xB2 (all theoretically ",
          "possible ordered bigram pairs), which exceeds the number of attested bigrams and ",
          "produces systematically smaller p-values than the MC simulation. The MC simulation is ",
          "the primary test because it generates random pseudo-disc texts through the same ",
          "word-length-preserving process, implicitly accounting for bigram producibility."
        ),
        tableContainer,
        chartContainer
      )
    );
    requestAnimationFrame(() => {
      chartInstance = buildChart(canvas, PRE_COMPUTED);
    });
  }

  // app/js/engine/comparison.mjs
  function isUnknownValue(v) {
    return v == null || typeof v === "string" && v.length > 0 && v[0] === "?";
  }
  function buildPdBigramsFromWords(allWords, { includeDet = false, valueMap = null } = {}) {
    const bigrams = /* @__PURE__ */ new Set();
    const wordLens = [];
    const pv = valueMap ? (s) => s == null ? null : valueMap.get(s) ?? null : (s) => {
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
  function buildTargetBigrams(langWords) {
    const bigrams = /* @__PURE__ */ new Set();
    for (const tw of langWords) {
      for (const bg of ngramsOf(syllabify(tw.w), 2)) bigrams.add(bg);
    }
    return bigrams;
  }
  function extractKnownPdSegments(allWords, { includeDet = false, valueMap = null } = {}) {
    const segments = [];
    const resolveValue = valueMap ? (s) => valueMap.get(s) ?? null : (s) => {
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
  function computeOverlapCount(sideA2, sideB2, langWords, { includeDet = false, valueMap = null } = {}) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords, { includeDet, valueMap });
    const targetBigrams = buildTargetBigrams(langWords);
    return [...pdBigrams].filter((b) => targetBigrams.has(b)).length;
  }

  // app/js/sections/sensitivity.mjs
  var PRE_SIGN02 = {
    det: { tokens: 241, phonSigns: 43, overlap: 9, pValue: 0.0318 },
    phon: { tokens: 241, phonSigns: 44, overlap: 9, pValue: 0.0562 }
  };
  var PRE_SIGN18_RJU = { overlap: 9, pValue: 0.0307 };
  var PRE_CIRCULARITY = {
    realOverlap: 9,
    uniformP: 47e-4,
    freqWeightedP: 0.3647,
    spearmanRho: 0.257,
    tierSweep: [
      { tierCount: 2, freqWeightedP: 0.1853, tierSizes: [22, 21] },
      { tierCount: 3, freqWeightedP: 0.3647, tierSizes: [15, 15, 13] },
      { tierCount: 5, freqWeightedP: 0.4377, tierSizes: [9, 9, 9, 8, 8] },
      { tierCount: 10, freqWeightedP: 0.5733, tierSizes: [5, 5, 5, 4, 4, 4, 4, 4, 4, 4] }
    ]
  };
  function renderSign02Card(label, data, desc) {
    return resultCard(
      label,
      el("p", {}, desc),
      el(
        "p",
        { className: "mono" },
        `Tokens: ${data.tokens} | Phonetic signs: ${data.phonSigns} | Minoan overlap: ${data.overlap} | MC p = ${data.pValue.toFixed(4)}`
      )
    );
  }
  function renderSign18Card(label, overlap, pValue, desc) {
    return resultCard(
      label,
      el("p", {}, desc),
      el("p", { className: "mono" }, `Minoan overlap: ${overlap} | MC p = ${pValue.toFixed(4)}`)
    );
  }
  function renderTierSweepTable(sweep) {
    if (!Array.isArray(sweep) || sweep.length === 0) return null;
    const headers = ["Tiers (T)", "Tier sizes", "Freq-weighted p"];
    const rows = sweep.map((s) => {
      const sig = s.freqWeightedP < 0.05;
      return [
        s.tierCount,
        { value: s.tierSizes.join(", "), className: "mono" },
        { value: s.freqWeightedP.toFixed(4), className: "mono" + (sig ? " sig" : "") }
      ];
    });
    return table(headers, rows);
  }
  function renderCircCard(circ) {
    const sweepTable = renderTierSweepTable(circ.tierSweep);
    const children = [
      el(
        "p",
        { className: "mono" },
        `Real Minoan overlap: ${circ.realOverlap}`
      ),
      el(
        "p",
        { className: "mono" },
        `Uniform reshuffling p = ${circ.uniformP.toFixed(4)}`
      ),
      el(
        "p",
        { className: "mono" },
        `Freq-weighted reshuffling p (T = 3) = ${circ.freqWeightedP.toFixed(4)} (Spearman \u03C1 = ${circ.spearmanRho.toFixed(3)})`
      ),
      el(
        "p",
        {},
        "Uniform: reshuffles all 43 sign\u2192value assignments. Freq-weighted: reshuffles within T frequency tiers, ",
        "preserving the macro correlation between disc sign frequency and LA syllable frequency."
      )
    ];
    if (sweepTable) {
      children.push(el("h4", {}, "Tier-count sensitivity sweep"));
      children.push(el(
        "p",
        {},
        "The frequency-weighted p depends on the tier count T (a hyperparameter). ",
        "T = 1 reduces to the uniform null; large T approaches a fully rank-pinned shuffle. ",
        "The sweep below shows that the FW null is conservative across all tested T values, ",
        "with no value falling below \u03B1 = 0.05."
      ));
      children.push(sweepTable);
    }
    children.push(el(
      "p",
      { className: "text-hint" },
      "Note: finer tiers preserve the frequency correlation more strictly, ",
      "coarser tiers approach the uniform reshuffle. T = 3 is reported as the headline figure ",
      "for backward compatibility; the sweep is the honest reading."
    ));
    return resultCard("Circularity Bias Control", ...children);
  }
  function render6(container, ctx2) {
    let worker = null;
    const sign02DetCard = el("div", { id: "s02-det" });
    sign02DetCard.appendChild(renderSign02Card(
      "Default: Determinative",
      PRE_SIGN02.det,
      "Sign 02 treated as a non-phonetic determinative (default). Excluded from phonetic reading."
    ));
    const sign02PhonCard = el("div", { id: "s02-phon" });
    sign02PhonCard.appendChild(renderSign02Card(
      "Alternative: Phonetic",
      PRE_SIGN02.phon,
      "Sign 02 treated as phonetic (i). Included in bigram computation."
    ));
    const circCard = el("div", { id: "circ-result" });
    circCard.appendChild(renderCircCard(PRE_CIRCULARITY));
    const sign18TiCard = el("div", { id: "s18-ti" });
    sign18TiCard.appendChild(renderSign18Card(
      "Default: Allograph (ti)",
      PRE_SIGN02.det.overlap,
      PRE_SIGN02.det.pValue,
      "Sign 18 = ti (allograph of Sign 07). This is the default reading."
    ));
    const sign18RjuCard = el("div", { id: "s18-rju" });
    sign18RjuCard.appendChild(renderSign18Card(
      "Alternative: Distinct (rju)",
      PRE_SIGN18_RJU.overlap,
      PRE_SIGN18_RJU.pValue,
      "Sign 18 given the distinct value rju (Owens/Palmer). Changes some bigrams."
    ));
    const sign02Verdict = el(
      "div",
      { className: "key-finding" },
      el("strong", {}, "Verdict: "),
      el(
        "span",
        {},
        `P-value rises from ${PRE_SIGN02.det.pValue.toFixed(3)} to ${PRE_SIGN02.phon.pValue.toFixed(3)}`,
        PRE_SIGN02.phon.pValue < 0.05 ? " \u2014 marginally below \u03B1 = 0.05. The result survives this choice, but the margin is thin. (canonical 100k)" : ` \u2014 above \u03B1 = 0.05. The result does NOT survive under phonetic treatment. (canonical 100k)`
      )
    );
    const circVerdict = el(
      "div",
      { className: "key-finding" },
      el("strong", {}, "Interpretation: "),
      el(
        "span",
        {},
        "The uniform test (p \u2248 0.005) confirms the specific sign correspondences outperform random. ",
        "The frequency-weighted test (p \u2248 0.36) reveals that much of the overlap is attributable ",
        "to frequency correlation: frequent disc signs being paired with frequent LA values. ",
        "The eight language eliminations are unaffected by either control. (canonical 100k)"
      )
    );
    const statusEl = el("p", { className: "loading" });
    const progressEl = el("div");
    const runBtn = el("button", {
      className: "btn-run",
      onClick() {
        runBtn.disabled = true;
        runBtn.setAttribute("aria-busy", "true");
        statusEl.textContent = "Starting sensitivity tests...";
        const iterations = ctx2.getIterations();
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
          if (e.data.type === "sensitivity-result") {
            const { sign02det, sign02phon, sign18rju, circularity, iterations: iters } = e.data;
            if (sign02det.overlap !== PRE_SIGN02.det.overlap) {
              statusEl.textContent += ` \u26A0 Overlap (${sign02det.overlap}) differs from pre-computed (${PRE_SIGN02.det.overlap}). Data may have changed.`;
            }
            sign02DetCard.replaceChildren(renderSign02Card(
              "Default: Determinative",
              { tokens: 241, phonSigns: 43, overlap: sign02det.overlap, pValue: sign02det.pValue },
              "Sign 02 treated as a non-phonetic determinative (default). Excluded from phonetic reading."
            ));
            sign02PhonCard.replaceChildren(renderSign02Card(
              "Alternative: Phonetic",
              { tokens: 241, phonSigns: 44, overlap: sign02phon.overlap, pValue: sign02phon.pValue },
              "Sign 02 treated as phonetic (i). Included in bigram computation."
            ));
            sign18TiCard.replaceChildren(renderSign18Card(
              "Default: Allograph (ti)",
              sign02det.overlap,
              sign02det.pValue,
              "Sign 18 = ti (allograph of Sign 07). This is the default reading."
            ));
            sign18RjuCard.replaceChildren(renderSign18Card(
              "Alternative: Distinct (rju)",
              sign18rju.overlap,
              sign18rju.pValue,
              "Sign 18 given the distinct value rju (Owens/Palmer). Changes some bigrams."
            ));
            circCard.replaceChildren(renderCircCard(circularity));
            const kLabel = `(${(iters / 1e3).toFixed(0)}k iterations)`;
            sign02Verdict.replaceChildren(
              el("strong", {}, "Verdict: "),
              el(
                "span",
                {},
                `P-value rises from ${sign02det.pValue.toFixed(3)} to ${sign02phon.pValue.toFixed(3)}`,
                sign02phon.pValue < 0.05 ? ` \u2014 marginally below \u03B1 = 0.05. The result survives this choice, but the margin is thin. ${kLabel}` : ` \u2014 above \u03B1 = 0.05. The result does NOT survive under phonetic treatment. ${kLabel}`
              )
            );
            circVerdict.replaceChildren(
              el("strong", {}, "Interpretation: "),
              el(
                "span",
                {},
                `The uniform test (p = ${circularity.uniformP.toFixed(4)}) `,
                circularity.uniformP < 0.05 ? "confirms" : "does not confirm",
                " the specific sign correspondences outperform random. ",
                `The frequency-weighted test (p = ${circularity.freqWeightedP.toFixed(4)}) `,
                circularity.freqWeightedP > 0.05 ? "reveals that much of the overlap is attributable to frequency correlation. " : "suggests the overlap goes beyond frequency correlation. ",
                `The eight language eliminations are unaffected by either control. ${kLabel}`
              )
            );
            const msg = `Completed ${iters.toLocaleString()} iterations per test.`;
            statusEl.textContent = msg;
            ctx2.announce(msg);
            progressEl.replaceChildren();
            runBtn.disabled = false;
            runBtn.setAttribute("aria-busy", "false");
            worker.terminate();
            worker = null;
          }
        };
        worker.postMessage({ type: "run-sensitivity", iterations });
      }
    }, "Run Sensitivity Tests");
    container.appendChild(
      el(
        "div",
        {},
        el("h2", {}, "Sensitivity Analysis"),
        el(
          "p",
          {},
          "These tests examine how sensitive the results are to key analytical choices. ",
          "If a small change in assumptions causes the results to flip, the finding is fragile. ",
          "All four tests below run live in the browser via Monte Carlo simulation."
        ),
        el(
          "div",
          { className: "result-card" },
          el(
            "div",
            { className: "run-control" },
            runBtn,
            el(
              "span",
              { className: "mono text-hint" },
              "Re-run all sensitivity tests live (Sign 02, Sign 18, circularity)"
            )
          ),
          statusEl,
          progressEl
        ),
        el("h3", {}, "Sign 02: Determinative vs. Phonetic"),
        el(
          "p",
          {},
          "Sign 02 (the \u201Cplumed head\u201D sign) appears word-initially 19 times and is treated ",
          "as a non-phonetic determinative in the default reading. This test compares results ",
          "when it is included as a phonetic sign."
        ),
        sign02DetCard,
        sign02PhonCard,
        sign02Verdict,
        el("h3", {}, "Sign 18: Allograph vs. Distinct Value"),
        el(
          "p",
          {},
          "Sign 18 is treated as an allograph of Sign 07 (both = \u201Cti\u201D) in the default reading. ",
          "This test checks what happens if Sign 18 is assigned the distinct phonetic value \u201Crju\u201D ",
          "(Owens/Palmer reading)."
        ),
        sign18TiCard,
        sign18RjuCard,
        el("h3", {}, "Circularity Bias Control"),
        el(
          "p",
          {},
          "If the phonetic mapping simply correlates high-frequency PD signs with high-frequency ",
          "LA syllables, bigram overlap could be an artifact. Two controls test this: ",
          "uniform reshuffling (all 43 values randomized) and frequency-weighted reshuffling ",
          "(values randomized only within matching frequency tiers, preserving the macro structure)."
        ),
        circCard,
        circVerdict,
        el("h3", {}, "Allograph Merge Sensitivity"),
        el(
          "p",
          {},
          "Signs 07/18 (\u201Cti\u201D), 19/33 (\u201Csa\u201D), and 26/45 (\u201Crja\u201D) are proposed allograph pairs. ",
          "Merging them reduces the sign inventory from 45 to 42 distinct signs. ",
          "The merge has negligible impact on bigram overlap because merged signs produce ",
          "the same syllable strings (\u0394p \u2248 0.000)."
        ),
        el(
          "p",
          { className: "text-hint" },
          "This is an analytical argument, not a Monte Carlo simulation: since allograph pairs ",
          "share identical phonetic values, merging them cannot change any bigram in the reading. ",
          "A formal MC verification is therefore unnecessary."
        ),
        el("h3", {}, "Vocabulary Curation: 34 vs. 49 Words"),
        (() => {
          const { sideA: sideA2, sideB: sideB2 } = ctx2;
          const overlap34 = computeOverlapCount(sideA2, sideB2, LINEAR_A_WORDS);
          const overlap49 = computeOverlapCount(sideA2, sideB2, LINEAR_A_FULL);
          const delta = overlap49 - overlap34;
          return el(
            "div",
            {},
            el(
              "p",
              {},
              "The default comparison uses a curated 34-word Linear A corpus that excludes ",
              "Cretan place names (Knossos, Phaistos, Amnisos, Sukrita), probable Greek borrowings ",
              "(te-me-no, ta-ra-nu, e-ka-ra, wi-ri-no, na-wi-jo, a-ke-ti-rja), ",
              "and items of uncertain provenance. ",
              "This test checks whether including the full 49-word set changes the overlap."
            ),
            resultCard(
              "34-word corpus (default)",
              el(
                "p",
                { className: "mono" },
                `Minoan bigram overlap: ${overlap34}`
              )
            ),
            resultCard(
              "49-word corpus (full)",
              el(
                "p",
                { className: "mono" },
                `Minoan bigram overlap: ${overlap49} (\u0394 = ${delta >= 0 ? "+" : ""}${delta})`
              )
            ),
            el(
              "p",
              { className: "text-hint" },
              delta === 0 ? "The additional 15 words introduce no new bigram matches. The result is robust to vocabulary curation." : `The additional 15 words change overlap by ${delta > 0 ? "+" : ""}${delta} (${overlap34} \u2192 ${overlap49}). ` + (Math.abs(delta) <= 2 ? "This marginal change suggests the result is robust to vocabulary curation. " : "") + "The MC p-value for the full 49-word set is computed in the Extended Analysis section."
            ),
            el(
              "details",
              {},
              el("summary", {}, "Excluded words (15)"),
              el(
                "ul",
                {},
                ...LINEAR_A_EXCLUDED.map(
                  (w) => el("li", { className: "mono" }, `${w.w} \u2014 ${w.note}`)
                )
              )
            )
          );
        })()
      )
    );
  }

  // app/js/sections/davis.mjs
  function getPhoneticSigns2(w) {
    const signs = w.signs.filter((s) => s != null);
    const hasDet = signs[0] === 2;
    return hasDet ? signs.slice(1) : signs;
  }
  function findWordParallels(sideA2, sideB2) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const parallels = [];
    let trigramMatchCount = 0;
    for (const w of allWords) {
      const reading = phoneticWord(getPhoneticSigns2(w));
      const segments = extractKnownPdSegments([w]);
      const discBigrams = /* @__PURE__ */ new Set();
      const discTrigrams = /* @__PURE__ */ new Set();
      for (const seg of segments) {
        for (const bg of ngramsOf(seg, 2)) discBigrams.add(bg);
        for (const tg of ngramsOf(seg, 3)) discTrigrams.add(tg);
      }
      for (const la of LINEAR_A_WORDS) {
        const laSyls = syllabify(la.w);
        const laBigrams = new Set(ngramsOf(laSyls, 2));
        const laTrigrams = new Set(ngramsOf(laSyls, 3));
        const shared = [...discBigrams].filter((b) => laBigrams.has(b));
        const sharedTri = [...discTrigrams].filter((t) => laTrigrams.has(t));
        trigramMatchCount += sharedTri.length;
        if (shared.length > 0) {
          parallels.push({
            disc: reading,
            la: la.w,
            src: la.src,
            shared,
            sharedTrigrams: sharedTri
          });
        }
      }
    }
    parallels.sort((a, b) => b.shared.length - a.shared.length);
    const seen = /* @__PURE__ */ new Set();
    const filtered = parallels.filter((p) => {
      const key = `${p.disc}|${p.la}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { parallels: filtered, trigramMatchCount };
  }
  function render7(container, ctx2) {
    const { sideA: sideA2, sideB: sideB2 } = ctx2;
    const { parallels, trigramMatchCount } = findWordParallels(sideA2, sideB2);
    container.appendChild(
      el(
        "div",
        {},
        el("h2", {}, "Davis Replication"),
        el(
          "p",
          {},
          "This section replicates and extends the syllabotactic analysis approach of ",
          "Davis (2018), comparing the disc\u2019s sign sequences against Linear A texts."
        ),
        el("h3", {}, "Homomorph Set"),
        el(
          "p",
          {},
          `${HOMOMORPH_SET.length} Phaistos Disc signs are identified as visual homomorphs `,
          "of Linear A/B signs, providing the basis for phonetic value assignment."
        ),
        table(
          ["PD Sign", "AB Sign", "Value", "Confidence"],
          HOMOMORPH_SET.map((h) => [
            `PD ${String(h.pd).padStart(2, "0")}`,
            `AB ${h.ab}`,
            { value: h.val, className: "mono" },
            h.conf
          ])
        ),
        el("h3", {}, "Word-Level Parallels"),
        el(
          "p",
          {},
          "Words from the disc that share bigrams with attested Linear A vocabulary. ",
          "These parallels suggest structural similarity between the disc text and Minoan."
        ),
        resultCard(
          "Trigram verification",
          el(
            "p",
            {},
            `Three-syllable (trigram) matches found: `,
            el("strong", {}, String(trigramMatchCount)),
            ". All parallels share exactly two contiguous syllables; ",
            trigramMatchCount === 0 ? "no three-syllable matches were found, confirming the paper's claim." : `${trigramMatchCount} trigram match(es) detected.`
          )
        ),
        parallels.length > 0 ? table(
          ["Disc Word", "Linear A Word", "Source", "Shared Bigrams"],
          parallels.slice(0, 30).map((p) => [
            { value: p.disc, className: "mono" },
            { value: p.la, className: "mono" },
            p.src || "",
            { value: p.shared.join(", "), className: "mono" }
          ])
        ) : el("p", { className: "loading" }, "No parallels found."),
        parallels.length > 30 ? el("p", { className: "text-small" }, `Showing 30 of ${parallels.length} parallels.`) : null,
        el("h3", {}, "Linear A Reference Texts"),
        el(
          "p",
          {},
          `${LA_TEXTS.length} Linear A text forms used for syllabotactic display (the Monte Carlo comparison uses the curated ${LINEAR_A_WORDS.length}-word subset).`
        ),
        el(
          "div",
          { className: "word-list" },
          ...LA_TEXTS.map((t) => el("span", { className: "mono" }, t))
        )
      )
    );
  }

  // app/js/sections/methodology.mjs
  function render8(container, ctx2) {
    container.appendChild(
      el(
        "div",
        {},
        el("h2", {}, "Methodology"),
        el("h3", {}, "Analytical Approach"),
        el(
          "p",
          {},
          "This workbench implements a hypothesis-screening framework: rather than ",
          "attempting to prove the disc is written in a particular language, it asks ",
          "which language hypotheses are not supported by a single, consistent statistical ",
          "test. We deliberately do not say \u201Cruled out\u201D, because a language can fail this ",
          "Daidalika-reading bigram test without being excluded under a different sign-value ",
          "system, a larger reference corpus, different transliteration rules, or a different ",
          "statistic. The approach uses bigram overlap as a language-similarity metric, comparing ",
          "the disc\u2019s phonetic reading against reference vocabularies from nine ancient languages."
        ),
        el("h3", {}, "Phonetic Values"),
        el(
          "p",
          {},
          "Phonetic values are assigned to the 45 disc signs based on visual correspondences ",
          "(homomorphs) with Linear A and Linear B signs whose values are known. ",
          "This follows the methodology of Packard (and subsequent scholars). ",
          "Each assignment carries a confidence level from HIGH (e.g., signs clearly ",
          "matching well-attested Linear B values) to LOW (tentative or ambiguous matches)."
        ),
        el("h3", {}, "Bigram Overlap Method"),
        el(
          "p",
          {},
          "For each candidate language, the test counts how many consecutive syllable pairs ",
          "(bigrams) in the disc\u2019s phonetic reading also appear in the reference vocabulary. ",
          "This count is compared against a null distribution generated by Monte Carlo ",
          "simulation, where random pseudo-words of the same length distribution are drawn."
        ),
        el(
          "p",
          {},
          "Two null models are employed: (1) a uniform null, where syllables are sampled ",
          "uniformly from the combined syllable inventory, and (2) a frequency-weighted null, ",
          "where syllables are sampled proportionally to their frequency in the combined corpus. ",
          "The frequency-weighted null controls for the possibility that overlap is driven ",
          "by high-frequency syllables appearing in both corpora."
        ),
        el("h3", {}, "Multiple Testing Correction"),
        el(
          "p",
          {},
          "Because nine languages are tested simultaneously, the Holm-Bonferroni correction ",
          "is applied to control the family-wise error rate. The corrected p-value for the ",
          "best-ranked language (Minoan) is 0.286, which does not reach significance at ",
          "\u03B1 = 0.05."
        ),
        el("h3", {}, "The Barber Limit"),
        el(
          "p",
          {},
          "Barber (1974) demonstrated a mathematical constraint on decipherment verification: ",
          "with only ~240 tokens of an undeciphered script, there is insufficient text to ",
          "uniquely determine phonetic values through internal evidence alone. Any proposed ",
          "decipherment of the Phaistos Disc therefore remains inherently unverifiable ",
          "from the disc text alone, regardless of how well it fits a particular language."
        ),
        el("h3", {}, "Reproducibility"),
        el(
          "p",
          {},
          "All Monte Carlo simulations use a seeded pseudorandom number generator (mulberry32) ",
          "to ensure bit-exact reproducibility across platforms. The uniform null uses seed ",
          "314159; the frequency-weighted null uses seed 271828. Results from this web ",
          "application are deterministic across runs when using the same iteration count."
        ),
        el("h3", {}, "Caveats"),
        el(
          "div",
          { className: "result-card" },
          el(
            "ul",
            {},
            el(
              "li",
              {},
              el("strong", {}, "Reading direction: "),
              text("The disc\u2019s intended reading direction is unknown. All headline analyses use the conventional outside-in direction. "),
              text("The Extended Analysis tab exposes a within-word direction-reversal test (after stripping the Sign 02 determinative): the Minoan bigram overlap drops from 9 to 4 under reversal and the uniform-null Monte Carlo p rises above 0.6, so the headline overlap is direction-dependent rather than direction-invariant. "),
              text("A broader sensitivity sweep over word-order reversal and combined transforms is documented in the paper and lives in the research repository\u2019s CLI tools; morphological patterns have not been independently tested under reversed reading.")
            ),
            el(
              "li",
              {},
              el("strong", {}, "Phonetic values: "),
              text("Assignments are hypothetical. The entire analysis is conditional on these values being at least approximately correct.")
            ),
            el(
              "li",
              {},
              el("strong", {}, "Corpus limitations: "),
              text("Reference vocabularies vary in size (34\u201372 words) and may not represent the full phonological inventory of each language. "),
              text("Single-syllable words produce zero bigrams and do not contribute to overlap counts.")
            ),
            el(
              "li",
              {},
              el("strong", {}, "Lacuna policy ("),
              el("code", {}, "??"),
              text(" tokens and Sign 17): "),
              text("Damaged sign impressions ("),
              el("code", {}, "??"),
              text(") and signs without an established phonetic value (notably Sign 17, recorded internally as "),
              el("code", {}, "?17"),
              text(") are treated as "),
              el("em", {}, "adjacency-breaking boundaries"),
              text(" \u2014 not as omissions and not as wildcards \u2014 in all phonetic and statistical computations. "),
              text("Concretely: the affected word is split into independent sub-segments at every unknown sign, "),
              text("bigrams are formed only within each sub-segment, and each sub-segment's length is appended separately to the Monte-Carlo word-length pool so the null model draws independent \u201Cfake sub-words\u201D at the same lengths. "),
              text("This is stricter than treating lacunae as omissions (it eliminates any bigram that would span an unknown sign) and stricter than a wildcard (which would inflate the bigram set across lacunae); both alternatives are explicitly rejected. "),
              text("Counts of word groups (61) and readable sign impressions (241) reflect the surface transcription; the 52 distinct disc bigrams reflect the adjacency-breaking policy described here. "),
              text("Reading-order display strings such as "),
              el("code", {}, "de-ti-?17-sa"),
              text(" use \u201C?17\u201D as a placeholder for the unknown-value sign and are display-only; the bigram engine never sees that placeholder as a valid syllable.")
            ),
            el(
              "li",
              {},
              el("strong", {}, "CV/V syllable structure: "),
              text("100% CV/V structure in the phonetic reading is a necessary consequence of using Linear B-derived values, not independent validation.")
            ),
            el(
              "li",
              {},
              el("strong", {}, "Bigram method: "),
              text("This is a non-standard text categorization approach, chosen for robustness with very small corpora (cf. Cavnar & Trenkle 1994).")
            ),
            el(
              "li",
              {},
              el("strong", {}, "Features not in this workbench: "),
              text("The broader directionality sweep (word-order reversal and combined transforms), Ventris-style CV grid, Packard Distribution Index, Duhoux prefix:suffix ratio test, "),
              text("and Kuykendall mutual-information replication are documented in the paper but implemented only in the research repository\u2019s CLI tools. "),
              text("The within-word direction-reversal test is exposed in the public Extended Analysis tab.")
            )
          )
        )
      )
    );
  }

  // app/js/sections/extended.mjs
  function renderPowerCard(power) {
    const obs = power.observedOverlap;
    const crit = power.criticalValue;
    const gap = crit - obs;
    return resultCard(
      "Circularity FW Power Analysis",
      el(
        "p",
        { className: "mono" },
        `Observed Minoan overlap: ${obs} | FW circularity critical value (\u03B1 = 0.05): ${crit}`
      ),
      el(
        "p",
        { className: "mono" },
        `FW circularity p-value: ${power.fwPValue.toFixed(4)}`
      ),
      el(
        "p",
        {},
        gap > 0 ? `The observed overlap (${obs}) is ${gap} bigram(s) below the threshold (${crit}) needed for significance under the frequency-weighted circularity reshuffle. ` : `The observed overlap (${obs}) meets or exceeds the critical value (${crit}). `,
        gap > 0 ? "This quantifies the shortfall: much of the overlap is attributable to frequency correlation in the sign-to-value mapping." : "The result would be significant even under frequency-tier reshuffling."
      ),
      el(
        "details",
        {},
        el("summary", {}, "FW null overlap distribution"),
        table(
          ["Overlap", "Count", "Fraction"],
          (() => {
            const total = power.histogram.reduce((s, x) => s + x.count, 0);
            return power.histogram.map((h) => [
              h.overlap,
              h.count,
              { value: (h.count / total * 100).toFixed(2) + "%", className: "mono" }
            ]);
          })()
        )
      )
    );
  }
  function renderCalibrationCard(cal) {
    return resultCard(
      "Positive-Control Calibration (Greek)",
      el(
        "p",
        {},
        `Mycenaean Greek corpus split: ${cal.discSize} words as synthetic "disc", `,
        `${cal.refSize} words as reference. If the method works, Greek should rank first.`
      ),
      resultCard(
        "Greek self-overlap (split-corpus)",
        el(
          "p",
          { className: "mono" },
          `Overlap: ${cal.greekSelf.overlap} | MC p = ${cal.greekSelf.pValue.toFixed(4)}`
        )
      ),
      el("h4", {}, "Cross-language ranking (Greek disc)"),
      table(
        ["Language", "Overlap", "MC p-value"],
        cal.results.map((r) => [
          r.name,
          r.overlap,
          { value: r.pValue.toFixed(4), className: "mono" }
        ])
      ),
      el(
        "p",
        { className: "text-hint" },
        cal.greekSelf.pValue < 0.05 ? "The Greek self-test is significant, confirming the method can detect a true match." : "The Greek self-test is not significant. The split-corpus design may lack power with only 34/33 words."
      )
    );
  }
  function renderEqualizationCard(eq) {
    return resultCard(
      "Corpus-Size Equalization (34 words)",
      el(
        "p",
        {},
        "Each language\u2019s corpus is subsampled to 34 words (matching Minoan) 50 times. ",
        "The table shows the median, min, and max bigram overlap across subsamples."
      ),
      table(
        ["Language", "Full size", "Median overlap", "Range"],
        eq.map((r) => [
          r.name,
          r.fullCorpusSize,
          r.medianOverlap,
          r.minOverlap === r.maxOverlap ? { value: String(r.minOverlap), className: "mono" } : { value: `${r.minOverlap}\u2013${r.maxOverlap}`, className: "mono" }
        ])
      ),
      el(
        "p",
        { className: "text-hint" },
        "Languages with \u226434 words show no range (no subsampling needed). ",
        "If the ranking is stable across subsamples, corpus-size asymmetry does not drive the result."
      )
    );
  }
  function renderFullCorpusCard(fc, defaultOverlap) {
    return resultCard(
      "49-Word LA Corpus MC",
      el(
        "p",
        {},
        "Full Monte Carlo test using all 49 Linear A words (including excluded place names and Greek borrowings), ",
        "compared to the default 34-word result."
      ),
      el(
        "p",
        { className: "mono" },
        `34-word: overlap = ${defaultOverlap} | 49-word: overlap = ${fc.overlap}`
      ),
      el(
        "p",
        { className: "mono" },
        `49-word MC p-value: ${fc.pValue.toFixed(4)}`
      ),
      el(
        "p",
        { className: "text-hint" },
        Math.abs(fc.overlap - defaultOverlap) <= 2 ? "The marginal overlap change confirms the result is robust to vocabulary curation." : "The overlap change is notable; the excluded words affect the result."
      )
    );
  }
  function renderConfSweepCard(sweep) {
    return resultCard(
      "Confidence-Threshold Sweep",
      el(
        "p",
        {},
        "Tests which sign-value assignments drive the Minoan overlap. Signs whose phonetic value ",
        "is below each confidence tier act as adjacency-breakers: each excluded sign splits its ",
        "word into separate phonetic segments, so any bigram crossing that sign disappears, but ",
        "the surrounding signs still contribute their own bigrams within their segments. No ",
        "placeholder syllable is injected into the null pool, so the test does not get spuriously ",
        "inflated or deflated by a synthetic \u201Cunknown\u201D token."
      ),
      table(
        ["Tier", "Signs included", "Overlap", "MC p-value"],
        sweep.map((s) => [
          s.tier,
          s.signCount,
          s.overlap,
          { value: s.pValue.toFixed(4), className: "mono" }
        ])
      ),
      el(
        "p",
        { className: "text-hint" },
        "If the overlap drops sharply when restricting to HIGH-only signs, the result depends on ",
        "lower-confidence assignments. If it remains stable, the HIGH-confidence signs carry the signal."
      )
    );
  }
  function renderLooCard(loo) {
    const affected = loo.results.filter((r) => r.delta !== 0);
    const dropped = affected.filter((r) => r.delta < 0);
    const gained = affected.filter((r) => r.delta > 0);
    return resultCard(
      "Leave-One-Out Stability",
      el(
        "p",
        { className: "mono" },
        `Baseline overlap: ${loo.baseOverlap} | Words tested: ${loo.results.length}`
      ),
      el(
        "p",
        {},
        `${affected.length} of ${loo.results.length} words affect the overlap when removed. `,
        dropped.length > 0 ? `${dropped.length} reduce it; ` : "",
        gained.length > 0 ? `${gained.length} increase it.` : ""
      ),
      affected.length > 0 ? el(
        "details",
        {},
        el("summary", {}, `Words affecting overlap (${affected.length})`),
        table(
          ["Side", "Word", "Overlap w/o", "\u0394"],
          affected.sort((a, b) => a.delta - b.delta).map((r) => [
            r.side,
            { value: r.reading, className: "mono" },
            r.overlap,
            { value: (r.delta >= 0 ? "+" : "") + r.delta, className: "mono" }
          ])
        )
      ) : el("p", { className: "text-hint" }, "No individual word removal changes the overlap."),
      el(
        "p",
        { className: "text-hint" },
        "A stable result (most words neutral) means no single word drives the finding. ",
        "If many words change the overlap, the result is fragile."
      )
    );
  }
  function renderRasmussenCard(ras) {
    return resultCard(
      "Rasmussen Reading \u2014 Full 9-Language Comparison",
      el(
        "p",
        {},
        "Rasmussen\u2019s (2010) independent phonetic values applied to the disc, ",
        "then compared against all 9 reference languages via uniform MC."
      ),
      table(
        ["Rank", "Language", "Overlap", "MC p-value"],
        ras.map((r, i) => [
          i + 1,
          r.name,
          r.overlap,
          { value: r.pValue.toFixed(4), className: "mono" }
        ])
      ),
      el(
        "p",
        { className: "text-hint" },
        "If Hittite ranks first under Rasmussen\u2019s values (designed to support a Hittite hypothesis), ",
        "it validates the method\u2019s sensitivity to the phonetic mapping."
      )
    );
  }
  function renderWordLenCard(wl) {
    const maxLen = Math.max(
      wl.pdHistogram.length,
      ...wl.languages.map((l) => l.histogram.length)
    );
    const headers = ["Language", "Mean", ...Array.from({ length: maxLen }, (_, i) => `${i + 1}-syl`)];
    const pdRow = [
      { value: `Phaistos Disc (${wl.pdWordCount})`, className: "mono" },
      { value: wl.pdMean.toFixed(2), className: "mono" },
      ...Array.from({ length: maxLen }, (_, i) => wl.pdHistogram[i] ?? 0)
    ];
    const langRows = wl.languages.map((l) => [
      `${l.name} (${l.corpusSize})`,
      { value: l.meanLen.toFixed(2), className: "mono" },
      ...Array.from({ length: maxLen }, (_, i) => l.histogram[i] ?? 0)
    ]);
    return resultCard(
      "Word-Length Distribution Comparison",
      el(
        "p",
        {},
        "Compares the syllable-length distribution of disc words against each reference language. ",
        "Languages encoding the same language should show similar word-length profiles."
      ),
      table(headers, [pdRow, ...langRows]),
      el("h4", {}, "Kolmogorov-Smirnov D (smaller = closer match)"),
      table(
        ["Language", "KS D"],
        wl.languages.map((l) => [
          l.name,
          { value: l.ksD.toFixed(4), className: "mono" }
        ])
      ),
      el(
        "p",
        { className: "text-hint" },
        "The KS D statistic measures the maximum difference between the two cumulative distributions. ",
        "Smaller values indicate a closer match in word-length profile."
      )
    );
  }
  function renderSplitHalfCard(sh) {
    return resultCard(
      "Split-Half Reliability (Side A vs Side B)",
      el(
        "p",
        {},
        "Each disc surface tested independently against Minoan/Linear A via MC simulation."
      ),
      table(
        ["", "Words", "PD bigrams", "Minoan overlap", "MC p-value"],
        [
          ["Combined", sh.full.wordCount, "\u2014", sh.full.overlap, "\u2014"],
          [
            "Side A",
            sh.sideA.wordCount,
            sh.sideA.bigramCount,
            sh.sideA.overlap,
            { value: sh.sideA.pValue.toFixed(4), className: "mono" }
          ],
          [
            "Side B",
            sh.sideB.wordCount,
            sh.sideB.bigramCount,
            sh.sideB.overlap,
            { value: sh.sideB.pValue.toFixed(4), className: "mono" }
          ]
        ]
      ),
      el(
        "p",
        { className: "text-hint" },
        sh.sideA.overlap > 0 && sh.sideB.overlap > 0 ? "Both sides contribute to the Minoan overlap, indicating internal consistency." : "One side carries all the overlap \u2014 the result may depend on a single surface."
      )
    );
  }
  function renderUnigramCard(uni) {
    const minoan = uni.find((r) => r.id === "minoan");
    const allBounded = uni.every((r) => (r.meanFakeOverlap ?? 0) - (r.unigramOverlap ?? 0) > 5);
    return resultCard(
      "Unigram-Only Baseline (Bag-of-Syllables) \u2014 test-geometry diagnostic",
      el(
        "p",
        {},
        "Compares unigram (individual syllable) overlap vs bigram (ordered pair) overlap. ",
        "If unigrams alone discriminate equally well, sequential ordering adds no signal. ",
        "In practice the simulated set saturates the syllable pool under this corpus size, ",
        "so per-language p-values trivially equal 1.0 by construction. We retain the card ",
        "as a test-geometry diagnostic (showing that the saturation regime applies and that ",
        "a unigram-set baseline therefore cannot discriminate languages here), not as a ",
        "substantive language-comparison test. Cross-referenced in `paper_draft.md` \xA74.6 ",
        "and \xA76.3."
      ),
      table(
        ["Language", "Unigram overlap", "Unigram MC p", "Bigram overlap", "Mean simulated overlap"],
        uni.map((r) => [
          r.name,
          r.unigramOverlap,
          { value: r.unigramP.toFixed(4), className: "mono" },
          r.bigramOverlap,
          { value: (r.meanFakeOverlap ?? 0).toFixed(2), className: "mono" }
        ])
      ),
      minoan ? el(
        "p",
        { className: "mono" },
        `Pool size: ${minoan.poolSize ?? "?"} unique syllables | Draws per iteration: ${minoan.totalDraws ?? "?"} | `,
        `PD syllables: ${minoan.pdSylSize ?? "?"} | Minoan reference syllables: ${minoan.langSylSize ?? "?"}`
      ) : null,
      el(
        "p",
        { className: "text-hint" },
        allBounded ? "Test-geometry alert: the simulated mean unigram-overlap exceeds the observed overlap for every language. Drawing ~222 syllables from a pool of ~50-65 and aggregating into a Set produces a simulated set whose intersection with each language inventory converges rapidly toward |langSyls|, so the simulated overlap is bounded above by |langSyls| and dominated by it in mean. Under this regime any observed unigram-overlap < |langSyls| trivially yields MC p \u2248 1.0 regardless of any real inventory match. The per-language p-values therefore reflect the test geometry, not the relative role of syllable inventory vs sequential ordering. The substantive evidence that ordering matters comes from the direction-reversal test (overlap 9 \u2192 4 under within-word reversal); see Reversed Direction below." : minoan && minoan.unigramP > 0.1 ? "Unigrams alone are not significant \u2014 the bigram ordering carries the signal." : "Unigrams are also significant \u2014 some signal comes from syllable inventory, not just ordering."
      )
    );
  }
  function renderRandomReadingCard(rr) {
    return resultCard(
      "Random Reading Baseline",
      el(
        "p",
        {},
        `${rr.permutations.toLocaleString()} random phonetic mappings tested. `,
        `Each assigns a random syllable (from a pool of ${rr.poolSize} attested syllables) to each of the 43 phonetic signs.`
      ),
      el(
        "p",
        { className: "mono" },
        `Real Minoan overlap: ${rr.realOverlap} | `,
        `Null mean: ${rr.nullMean.toFixed(2)} \xB1 ${rr.nullSD.toFixed(2)} | `,
        `Fraction \u2265 real: ${(rr.fractionExceeding * 100).toFixed(1)}%`
      ),
      el(
        "p",
        {},
        rr.fractionExceeding < 0.01 ? "Fewer than 1% of random mappings match the real overlap \u2014 the specific sign-value assignments matter." : rr.fractionExceeding < 0.05 ? `Only ${(rr.fractionExceeding * 100).toFixed(1)}% of random mappings achieve this overlap.` : `${(rr.fractionExceeding * 100).toFixed(1)}% of random mappings achieve this overlap \u2014 the result may be achievable by chance.`
      ),
      el(
        "details",
        {},
        el("summary", {}, "Random reading overlap distribution"),
        table(
          ["Overlap", "Count", "Fraction"],
          (() => {
            const total = rr.histogram.reduce((s, x) => s + x.count, 0);
            return rr.histogram.map((h) => [
              h.overlap,
              h.count,
              { value: (h.count / total * 100).toFixed(2) + "%", className: "mono" }
            ]);
          })()
        )
      )
    );
  }
  function renderEffectSizeCard(es) {
    const absZ = Math.abs(es.zScore);
    let magnitude = "negligible";
    if (absZ >= 3) magnitude = "large";
    else if (absZ >= 2) magnitude = "medium";
    else if (absZ >= 1) magnitude = "small";
    return resultCard(
      "Effect Size (Minoan Overlap)",
      el(
        "p",
        {},
        "Quantifies how far the observed Minoan overlap exceeds the null distribution, ",
        "beyond binary significance."
      ),
      el(
        "p",
        { className: "mono" },
        `Observed: ${es.observed} | Null mean: ${es.nullMean.toFixed(2)} | Null SD: ${es.nullSD.toFixed(2)}`
      ),
      el(
        "p",
        { className: "mono" },
        `z-score: ${es.zScore.toFixed(3)} (${magnitude} effect) | MC p = ${es.pValue.toFixed(4)}`
      ),
      el(
        "p",
        { className: "text-hint" },
        `The observed overlap is ${es.zScore.toFixed(1)} standard deviations above the null mean. `,
        absZ >= 2 ? "This is a substantial departure from random expectation." : "This is a modest departure from random expectation."
      )
    );
  }
  function renderPositionalCard(pos) {
    return resultCard(
      "Positional Bigram Analysis",
      el(
        "p",
        {},
        "Bigrams classified by position within each word, tested separately against Minoan/Linear A."
      ),
      table(
        ["Position", "PD bigrams", "LA bigrams", "Overlap", "MC p-value"],
        pos.map((p) => [
          p.position,
          p.pdCount,
          p.laCount,
          p.overlap,
          { value: p.pValue.toFixed(4), className: "mono" }
        ])
      ),
      el(
        "p",
        { className: "text-hint" },
        (() => {
          const sig = pos.filter((p) => p.pValue < 0.05);
          if (sig.length === 0) return "No single position reaches significance alone \u2014 the signal is distributed across positions.";
          return `${sig.map((p) => p.position.toLowerCase()).join(" and ")} position${sig.length > 1 ? "s" : ""} reach${sig.length === 1 ? "es" : ""} significance, indicating concentrated signal.`;
        })()
      )
    );
  }
  function renderBootstrapCard(bs) {
    return resultCard(
      "Bootstrap Confidence Interval (Minoan Overlap)",
      el(
        "p",
        {},
        `${bs.bootstraps.toLocaleString()} bootstrap resamples of the 61 disc words (with replacement).`
      ),
      el(
        "p",
        { className: "mono" },
        `Observed: ${bs.observed} | Bootstrap mean: ${bs.mean.toFixed(2)} | `,
        `95% CI: [${bs.ci95[0]}, ${bs.ci95[1]}] | Range: [${bs.min}, ${bs.max}]`
      ),
      el(
        "p",
        {},
        bs.ci95[0] > 0 ? `Even at the lower bound of the 95% CI, the overlap is ${bs.ci95[0]} (non-zero). ` : "The lower bound of the 95% CI reaches 0 \u2014 the overlap is not robust to resampling. ",
        `The range [${bs.min}\u2013${bs.max}] shows the full variability.`
      ),
      el(
        "details",
        {},
        el("summary", {}, "Bootstrap overlap distribution"),
        table(
          ["Overlap", "Count", "Fraction"],
          (() => {
            const total = bs.histogram.reduce((s, x) => s + x.count, 0);
            return bs.histogram.map((h) => [
              h.overlap,
              h.count,
              { value: (h.count / total * 100).toFixed(2) + "%", className: "mono" }
            ]);
          })()
        )
      )
    );
  }
  function renderTrigramCard(tg) {
    return resultCard(
      "Trigram Overlap Test",
      el(
        "p",
        { className: "mono" },
        `PD trigrams: ${tg.pdTrigramCount} | LA trigrams: ${tg.laTrigramCount} | `,
        `Overlap: ${tg.overlap} | MC p = ${tg.pValue.toFixed(4)}`
      ),
      tg.overlap > 0 && tg.matchingTrigrams.length > 0 ? el(
        "p",
        {},
        `Matching trigrams: `,
        el("span", { className: "mono" }, tg.matchingTrigrams.join(", "))
      ) : el("p", {}, "No trigram overlap found."),
      el(
        "p",
        { className: "text-hint" },
        tg.overlap === 0 ? "Zero trigram overlap is expected for a 241-token corpus \u2014 trigrams are much sparser than bigrams." : tg.pValue < 0.05 ? "Trigram overlap is significant \u2014 the similarity extends beyond bigram-level patterns." : "Trigram overlap is present but not significant \u2014 the corpus is likely too small for trigram statistics."
      )
    );
  }
  function renderEntropyCard(ent) {
    return resultCard(
      "Entropy Analysis (Syllable-Level)",
      el(
        "p",
        {},
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
            ent.pd.unigram.tokens
          ],
          ...ent.languages.map((l) => [
            l.name,
            { value: l.unigram.entropy.toFixed(3), className: "mono" },
            { value: l.bigram.entropy.toFixed(3), className: "mono" },
            l.unigram.types,
            l.unigram.tokens
          ])
        ]
      ),
      el(
        "p",
        { className: "text-hint" },
        "If the disc's entropy profile closely matches a specific language, that suggests similar frequency structure. ",
        "Note: small corpora have inherently higher variance in entropy estimates."
      )
    );
  }
  function renderBayesCard(bayes) {
    return resultCard(
      "Sellke\u2013Bayarri\u2013Berger Bound on BF\u2081\u2080",
      el(
        "p",
        {},
        "Converts each p-value to the Sellke\u2013Bayarri\u2013Berger upper bound on BF\u2081\u2080 \u2014 ",
        "i.e. the largest evidence against H\u2080 that any reasonable proper alternative prior could give. ",
        "The actual BF\u2081\u2080 may be anywhere in (0, this bound], so the column is a ceiling, not a posterior odds."
      ),
      table(
        ["Language", "p-value", "Upper bound on BF\u2081\u2080", "Upper bound on P(H\u2081)", "Max evidence"],
        bayes.map((b) => {
          const bfDisplay = b.bf10Upper ?? b.bfH1;
          const postDisplay = b.postH1Bound ?? b.postH1;
          const maxLabel = b.maxEvidence ?? b.strength;
          return [
            b.name,
            { value: b.pValue.toFixed(4), className: "mono" },
            { value: bfDisplay === Infinity ? "\u221E" : bfDisplay.toFixed(2), className: "mono" },
            { value: postDisplay.toFixed(3), className: "mono" },
            maxLabel
          ];
        })
      ),
      el(
        "p",
        { className: "text-hint" },
        "Jeffreys-style ceilings: bound < 1 favors null, 1\u20133 at most anecdotal, 3\u201310 at most moderate, ",
        "10\u201330 at most strong, > 30 at most very strong. The P(H\u2081) column inherits the same caveat: ",
        "it is the largest posterior the bound permits under equal prior odds, not a posterior estimate."
      ),
      el(
        "p",
        { className: "text-hint" },
        "Note (exploratory): the input is the upper-tail Monte Carlo p from the two-sided elimination test. ",
        "Sellke\u2013Bayarri\u2013Berger calibration is most commonly stated for two-sided p-values, and the bound ",
        "depends only on p, not on sample size. Treat this column as a maximum-evidence ceiling, not a definitive Bayesian quantity."
      )
    );
  }
  function renderPhonDistCard(pd) {
    return resultCard(
      "Phonetic Distance-Weighted Overlap (Minoan)",
      el(
        "p",
        {},
        "Scores each disc bigram by its phonetic similarity to the closest Linear A bigram. ",
        "Captures near-misses (one phonetic feature off) that exact matching ignores."
      ),
      el(
        "p",
        { className: "mono" },
        `PD bigrams: ${pd.pdBigramCount} | LA bigrams: ${pd.laBigramCount}`
      ),
      el(
        "p",
        { className: "mono" },
        `Exact matches: ${pd.exactMatches} | Near-misses (\u22650.5 sim): ${pd.nearMisses} | `,
        `Weighted score: ${pd.weightedScore.toFixed(2)}`
      ),
      el(
        "p",
        { className: "mono" },
        `MC p-value (weighted score): ${pd.pValue.toFixed(4)}`
      ),
      el(
        "p",
        { className: "text-hint" },
        pd.nearMisses > 0 ? `${pd.nearMisses} near-miss bigram(s) indicate phonetic proximity beyond exact matches.` : "No near-misses found beyond the exact matches.",
        pd.pValue < 0.05 ? " The weighted score is significant \u2014 the phonetic proximity is greater than chance." : " The weighted score is not significant at \u03B1 = 0.05."
      )
    );
  }
  function renderReverseDirCard(rd) {
    const lostSignal = rd.reversed.pValue > 0.1 && rd.forward.pValue < 0.05;
    const keptSignal = rd.reversed.pValue < 0.05;
    return resultCard(
      "Reverse Direction Test (Minoan)",
      el(
        "p",
        {},
        "The disc words are read with signs in reversed order, then retested against Minoan/Linear A."
      ),
      table(
        ["Direction", "Overlap", "PD bigrams", "MC p-value"],
        [
          [
            "Forward (standard)",
            rd.forward.overlap,
            rd.forward.pdBigrams,
            { value: rd.forward.pValue.toFixed(4), className: "mono" }
          ],
          [
            "Reversed",
            rd.reversed.overlap,
            rd.reversed.pdBigrams,
            { value: rd.reversed.pValue.toFixed(4), className: "mono" }
          ]
        ]
      ),
      el(
        "p",
        { className: "text-hint" },
        lostSignal ? "The Minoan signal disappears when the disc is read backwards \u2014 the result is direction-dependent, supporting the current reading direction." : keptSignal ? "The signal persists when reversed \u2014 this may reflect shared syllable inventory rather than directional reading." : "The reversed overlap is intermediate \u2014 some signal survives but is weakened."
      )
    );
  }
  function renderMinPairsCard(mp) {
    return resultCard(
      "Minimal-Pair Phonetic Plausibility",
      el(
        "p",
        {},
        `${mp.total} minimal pairs found (words differing by exactly one phonetic sign).`
      ),
      el(
        "p",
        { className: "mono" },
        `Same consonant (vowel alternation): ${mp.sameConsonant} | `,
        `Same vowel (consonant alternation): ${mp.sameVowel} | `,
        `Allograph (identical syllable): ${mp.allograph ?? 0} | `,
        `Unrelated: ${mp.unrelated}`
      ),
      mp.total > 0 ? el(
        "details",
        {},
        el("summary", {}, `All ${mp.total} minimal pairs`),
        table(
          ["Word 1", "Word 2", "Position", "Change", "Relationship"],
          mp.pairs.map((p) => [
            { value: p.word1, className: "mono" },
            { value: p.word2, className: "mono" },
            p.position,
            { value: `${p.val1} \u2194 ${p.val2}`, className: "mono" },
            p.relationship === "same-C" ? "Same consonant" : p.relationship === "same-V" ? "Same vowel" : p.relationship === "allograph" ? "Allograph (same syllable)" : "Unrelated"
          ])
        )
      ) : el("p", {}, "No minimal pairs found."),
      el(
        "p",
        { className: "text-hint" },
        mp.sameConsonant + mp.sameVowel > mp.unrelated ? "Most minimal pairs show systematic phonetic relationships (shared consonant or vowel), suggesting real morphological paradigms." : mp.sameConsonant + mp.sameVowel > 0 ? "Some minimal pairs are phonetically systematic, but others are unrelated." : "The minimal pairs do not show phonetic systematicity."
      )
    );
  }
  function renderTwoSidedCard(ts) {
    const antiCorrelated = ts.filter((r) => r.lowerP < 0.05);
    return resultCard(
      "Two-Sided Language Elimination",
      el(
        "p",
        {},
        "Tests both tails: is the overlap unusually high (upper) OR unusually low (lower)? ",
        "A low lower-P means the language has significantly FEWER matches than chance \u2014 active anti-correlation."
      ),
      table(
        ["Language", "Overlap", "Null mean", "Upper p", "Lower p"],
        ts.map((r) => [
          r.name,
          r.overlap,
          { value: r.nullMean.toFixed(2), className: "mono" },
          { value: r.upperP.toFixed(4), className: "mono" },
          { value: r.lowerP.toFixed(4), className: "mono" }
        ])
      ),
      el(
        "p",
        { className: "text-hint" },
        antiCorrelated.length > 0 ? `${antiCorrelated.map((r) => r.name).join(", ")} show${antiCorrelated.length === 1 ? "s" : ""} significantly low overlap (anti-correlated), strengthening the case that the disc reading is not consistent with these languages under this test.` : "No language shows significantly low overlap. The non-significant languages simply fail to exceed chance under this test; we do not interpret this as \u201Cruled out.\u201D"
      )
    );
  }
  function renderFixedPoolCard(fp) {
    return resultCard(
      "Fixed-Pool Cross-Language Comparison",
      el(
        "p",
        {},
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
          { value: r.pValue.toFixed(4), className: "mono" + (r.pValue < 0.05 ? " sig" : "") }
        ])
      )
    );
  }
  function renderFwerCard(fw) {
    return resultCard(
      "Permutation-Based FWER",
      el(
        "p",
        { className: "mono" },
        `Observed minimum p-value across 9 languages: ${fw.observedMinP.toFixed(4)}`
      ),
      el(
        "p",
        { className: "mono" },
        `FWER-adjusted p = ${fw.fwerP.toFixed(4)} (${fw.permutations} permutations)`
      ),
      el(
        "p",
        { className: "text-hint" },
        fw.fwerP < 0.05 ? "The minimum p-value across all 9 languages is significant after permutation-based family-wise correction." : "The minimum p-value does not survive permutation-based family-wise correction, consistent with Holm-Bonferroni."
      )
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
    return resultCard(
      "Leave-PD-Inspired-Out (Linear A Curation Ablation)",
      el(
        "p",
        {},
        `${lp.droppedCount} of ${lp.full.corpusSize} Linear A entries (${dropPct}%) carry a `,
        el("code", {}, "cf. PD \u2026"),
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
          ["Without PD-cited entries (24 entries)", lp.filtered.corpusSize, lp.filtered.overlap, { value: lp.filtered.pValue.toFixed(4), className: "mono" + (lp.filtered.pValue < 0.05 ? " sig" : "") }]
        ]
      ),
      el(
        "p",
        { className: "mono" },
        `\u0394 overlap (filtered \u2212 full) = ${deltaOv >= 0 ? "+" : ""}${deltaOv} | `,
        `\u0394 p-value = ${deltaP >= 0 ? "+" : ""}${deltaP.toFixed(4)}`
      ),
      el(
        "p",
        { className: "text-hint" },
        lp.filtered.pValue >= 0.05 ? "After dropping PD-cited LA entries, the Minoan MC p-value rises above \u03B1 = 0.05. A non-trivial fraction of the headline signal therefore depends on entries that were themselves curated by reading the disc. Treat the headline result as exploratory rather than as evidence independent of LA-corpus curation." : "After dropping PD-cited LA entries, the Minoan MC p-value remains below \u03B1 = 0.05, suggesting the curation overlap is not load-bearing for the headline result."
      )
    );
  }
  function renderQeBindingCard(s02qe) {
    const expectedStr = s02qe.expected.toFixed(2);
    const liftStr = s02qe.lift.toFixed(1);
    const rateStr = (s02qe.bindingRate * 100).toFixed(1);
    return resultCard(
      "Sign 02 / qe Binding (exact + permutation)",
      el(
        "p",
        {},
        `Sign 02 occurs ${s02qe.s02InitialCount} times word-initially. `,
        `Of those, ${s02qe.s02FollowedByS12} (${rateStr}%) are immediately followed by Sign 12 ("qe"). `,
        `Sign 12 appears ${s02qe.s12FollowerCount} times across ${s02qe.totalFollowers} non-initial positions on the disc.`
      ),
      el(
        "p",
        { className: "mono" },
        `Expected under the null: ${expectedStr} | Observed: ${s02qe.s02FollowedByS12} | Lift: ${liftStr}\xD7`
      ),
      el(
        "p",
        { className: "mono" + (s02qe.exactP < 0.05 ? " sig" : "") },
        `Exact (hypergeometric) p = ${formatPSci(s02qe.exactP)}`
      ),
      el(
        "p",
        { className: "mono" + (s02qe.mcP < 0.05 ? " sig" : "") },
        s02qe.exactP * s02qe.iterations < 1 ? `MC permutation p < ${(1 / s02qe.iterations).toExponential(2)} (${s02qe.iterations.toLocaleString()} iterations; exact p \u2248 ${formatPSci(s02qe.exactP)} is below the MC resolution floor 1/iterations, so the simulation cannot resolve it numerically)` : `MC permutation p = ${formatPSci(s02qe.mcP)} (${s02qe.iterations.toLocaleString()} iterations)`
      ),
      el(
        "p",
        {},
        "Under the null that Sign 12 tokens are exchangeable across all non-initial positions on the disc, ",
        "the observed concentration in slots immediately following Sign 02 is extreme. ",
        "This is descriptive evidence that Sign 02 binds preferentially to Sign 12 (the \xB0-qe prefix), ",
        "consistent with the morphological reading of Sign 02 as a determinative."
      ),
      el(
        "p",
        { className: "text-hint" },
        "Caveat: this is a structural test of one specific Sign 02 / Sign 12 contingency, not a language-comparison test. ",
        "It does not by itself support any phonetic decipherment. It is an independent observation about disc structure ",
        "that any decipherment must accommodate."
      ),
      el(
        "p",
        { className: "text-hint" },
        "Post-hoc multiple-comparisons disclosure: the Sign 02 / Sign 12 ",
        "binding was discovered by visual inspection of the disc, not pre-registered. The Phaistos Disc has 43 phonetic-bearing ",
        "signs, so the family of pairwise sign contingencies that could have been examined is at minimum C(43, 2) = 903. ",
        "Even under a Bonferroni correction across that family, the observed exact p \u2248 2.6 \xD7 10\u207B\xB9\xB2 yields ",
        "an adjusted bound of \u2248 2.4 \xD7 10\u207B\u2079, which still survives \u03B1 = 10\u207B\xB3. The result is therefore robust ",
        "to a conservative search-space correction, but readers should treat the unadjusted exact p as a lower bound rather ",
        "than as a single-test p-value."
      )
    );
  }
  function renderJackknifeCard(jk) {
    return resultCard(
      "Jackknife Stability (Top Competitors)",
      el(
        "p",
        {},
        "Leave-one-out stability for the top non-Minoan competitors. ",
        "If removing a single word causes overlap to drop substantially, the result depends on that word."
      ),
      table(
        ["Language", "Base overlap", "Min", "Max", "Mean", "Sensitive?"],
        jk.map((r) => [
          r.name,
          r.baseOverlap,
          r.minOverlap,
          r.maxOverlap,
          { value: r.meanOverlap.toFixed(2), className: "mono" },
          r.sensitive ? "Yes" : "No"
        ])
      )
    );
  }
  function renderPowerCurveCard(curve) {
    return resultCard(
      "Null-Distribution 80th Percentile (heuristic detection threshold)",
      el(
        "p",
        {},
        "Heuristic detection threshold for different corpus sizes: the 80th percentile ",
        "of the null overlap distribution. An observed overlap above this threshold sits in ",
        "the upper 20% of what the null model alone produces. ",
        "This is ",
        el("em", {}, "not"),
        " statistical power in the formal sense \u2014 true power ",
        "requires an explicit alternative-hypothesis distribution, which we do not specify ",
        "(a Bayesian decipherment likelihood is beyond the scope of this paper)."
      ),
      table(
        ["Corpus size", "Effective", "Null mean", "Null SD", "95th pctl", "80th pctl threshold"],
        curve.map((r) => [
          r.corpusSize,
          r.effectiveSize,
          { value: r.nullMean.toFixed(2), className: "mono" },
          { value: r.nullSD.toFixed(2), className: "mono" },
          r.critical95,
          r.minDetectable80
        ])
      ),
      el(
        "p",
        { className: "text-hint" },
        "At the actual corpus size of 34 words, the observed overlap of 9 exceeds the 95th percentile (",
        curve.find((r) => r.corpusSize === 34)?.critical95 ?? "?",
        "). The 80th-percentile threshold at 34 words is ",
        curve.find((r) => r.corpusSize === 34)?.minDetectable80 ?? "?",
        ". Rows above 34 are capped at the actual Linear A corpus (34 words) since synthetic words cannot be generated. ",
        "The threshold is read directly off the empirical null distribution; it makes no claim about Type II error against any specific decipherment alternative."
      )
    );
  }
  function renderTokenWeightedCard(tw) {
    return resultCard(
      "Token-Weighted Bigram Overlap",
      el(
        "p",
        {},
        `${tw.sharedCount} shared bigrams between PD and Minoan/Linear A. `,
        `Total PD tokens in shared bigrams: ${tw.totalPdTokens}. `,
        `Total LA tokens in shared bigrams: ${tw.totalLaTokens}.`
      ),
      table(
        ["Bigram", "PD tokens", "LA tokens", "Combined"],
        tw.details.map((d) => [
          { value: d.bigram, className: "mono" },
          d.pdTokens,
          d.laTokens,
          d.pdTokens + d.laTokens
        ])
      ),
      el(
        "p",
        { className: "text-hint" },
        "High-frequency shared bigrams (appearing multiple times in both corpora) ",
        "represent stronger evidence than hapax bigrams. Token counts quantify this distinction."
      )
    );
  }
  function renderCurationCard(cs) {
    return resultCard(
      "Corpus Curation Sensitivity",
      el(
        "p",
        {},
        `Randomly included/excluded each of ${cs.excludedCount} borderline LA words across ${cs.trials} trials.`
      ),
      el(
        "p",
        { className: "mono" },
        `Overlap range: ${cs.overlapRange[0]}\u2013${cs.overlapRange[1]} (mean: ${cs.meanOverlap.toFixed(1)})`
      ),
      el(
        "p",
        { className: "mono" },
        `p-value range: ${cs.pValueRange[0].toFixed(4)}\u2013${cs.pValueRange[1].toFixed(4)} (mean: ${cs.meanPValue.toFixed(4)})`
      ),
      el(
        "p",
        { className: "mono" },
        `Fraction of subsets reaching significance (\u03B1 = 0.05): ${(cs.fractionSignificant * 100).toFixed(1)}%`
      ),
      el(
        "p",
        { className: "text-hint" },
        cs.fractionSignificant > 0.8 ? "The result is robust to corpus curation \u2014 most subsets reach significance." : cs.fractionSignificant > 0.5 ? "The result is moderately sensitive to corpus curation." : "The result is sensitive to which borderline words are included."
      )
    );
  }
  function render9(container, ctx2) {
    let worker = null;
    const defaultOverlap = computeOverlapCount(ctx2.sideA, ctx2.sideB, LINEAR_A_WORDS);
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
        const iterations = ctx2.getIterations();
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
            const {
              power,
              calibration,
              equalization,
              fullCorpus,
              confSweep,
              loo,
              rasmussen,
              wordLen,
              splitHalf,
              unigram,
              randomReading,
              effectSize,
              positional,
              bootstrap,
              trigram,
              entropyResult,
              twoSided,
              bayes,
              phonDist,
              reverseDir,
              minPairs,
              powerCurve,
              tokenWeighted,
              curationSens,
              fixedPool,
              fwer,
              jackknife,
              s02qe,
              leavePdOut,
              iterations: iters
            } = e.data;
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
            ctx2.announce(msg);
            progressEl.replaceChildren();
            runBtn.disabled = false;
            runBtn.setAttribute("aria-busy", "false");
            worker.terminate();
            worker = null;
          }
        };
        worker.postMessage({ type: "run-extended", iterations });
      }
    }, "Run Extended Analysis");
    container.appendChild(
      el(
        "div",
        {},
        el("h2", {}, "Extended Analysis"),
        el(
          "p",
          {},
          "Twenty-nine additional analyses that address methodological limitations identified in peer review. ",
          "These are computationally intensive and run on demand."
        ),
        el(
          "div",
          { className: "result-card" },
          el(
            "div",
            { className: "run-control" },
            runBtn,
            el(
              "span",
              { className: "mono text-hint" },
              "Runs all 29 extended analyses"
            )
          ),
          statusEl,
          progressEl
        ),
        el("h3", {}, "1. Circularity FW Power Analysis"),
        el(
          "p",
          {},
          "Determines the minimum bigram overlap needed for significance under a frequency-weighted circularity reshuffle ",
          "(sign-to-value mappings shuffled within frequency tiers \u2014 tests mapping quality, not the language-comparison FW null). ",
          `If the observed overlap (${defaultOverlap}) falls well below this threshold, the mapping may simply lack `,
          "the statistical power to detect a real signal at this corpus size."
        ),
        powerDiv,
        el("h3", {}, "2. Positive-Control Calibration"),
        el(
          "p",
          {},
          "Uses Mycenaean Greek words as a synthetic \u201Cdisc\u201D and runs the bigram comparison ",
          "against all other languages. If the method works, Greek should rank first with a low p-value. ",
          "The Greek corpus is split (34 disc / 33 reference) to avoid trivial self-overlap."
        ),
        el(
          "p",
          { className: "text-hint" },
          "Note: this is a sanity check on a partially arbitrary 34/33 split of a single Linear-B-style word list, ",
          "not a structure-matched mirror of the actual disc (61 word-groups). Treat the result as a directional ",
          "calibration of the pipeline, not as a full positive control at PD scale."
        ),
        calDiv,
        el("h3", {}, "3. Corpus-Size Equalization"),
        el(
          "p",
          {},
          "Reference vocabularies range from 34 to 72 words. Larger corpora produce more bigrams, ",
          "potentially inflating overlap counts. This test subsamples each language to 34 words and ",
          "checks whether the overlap ranking is stable."
        ),
        eqDiv,
        el("h3", {}, "4. Full 49-Word Linear A Corpus"),
        el(
          "p",
          {},
          "The default comparison uses a curated 34-word LA corpus. This runs the full Monte Carlo ",
          "test with all 49 words, including excluded place names and probable Greek borrowings."
        ),
        fcDiv,
        el("h3", {}, "5. Confidence-Threshold Sweep"),
        el(
          "p",
          {},
          "Systematically varies which sign-value assignments are included, from only the 4 ",
          "HIGH-confidence correspondences to the full set of 43 phonetic signs. This reveals ",
          "whether the signal is driven by a few strong correspondences or the full mapping."
        ),
        sweepDiv,
        el("h3", {}, "6. Leave-One-Out Stability"),
        el(
          "p",
          {},
          "Removes each of the 61 disc words one at a time and recomputes the Minoan bigram overlap. ",
          "If the result depends on just one or two words, the finding is fragile."
        ),
        looDiv,
        el("h3", {}, "7. Rasmussen Reading \u2014 Full 9-Language Comparison"),
        el(
          "p",
          {},
          "Rasmussen (2010) proposed an independent set of phonetic values for Hittite. ",
          "This test applies his values to the disc and runs the full 9-language comparison ",
          "to check whether Hittite ranks first under his reading."
        ),
        rasDiv,
        el("h3", {}, "8. Word-Length Distribution Comparison"),
        el(
          "p",
          {},
          "Compares the word-length distribution (in syllables) of disc words against each ",
          "reference language. Languages encoding the same language should have similar profiles."
        ),
        wlDiv,
        el("h3", {}, "9. Split-Half Reliability"),
        el(
          "p",
          {},
          "Tests Side A (31 words) and Side B (30 words) independently against Minoan/Linear A. ",
          "If both sides show overlap, the finding is internally consistent across the disc."
        ),
        shDiv,
        el("h3", {}, "10. Unigram-Only Baseline (test-geometry diagnostic)"),
        el(
          "p",
          {},
          "Compares individual syllable overlap (ignoring order) against bigram overlap. ",
          "Under our corpus sizes the simulated set saturates the syllable pool, so per-language ",
          "p-values are 1.0 by construction; this card is retained as a test-geometry diagnostic ",
          "rather than a substantive language test. The substantive evidence that ordering carries ",
          "the signal comes from the direction-reversal test (overlap 9 \u2192 4 under within-word ",
          "reversal; see card #20 below)."
        ),
        uniDiv,
        el("h3", {}, "11. Random Reading Baseline"),
        el(
          "p",
          {},
          "Generates many random phonetic mappings (drawing from all attested syllables across ",
          "all 9 reference languages) and tests how often they produce Minoan overlap as high as ours. ",
          "Differs from circularity test: uses a broad syllable pool, not just the 43 existing values."
        ),
        rrDiv,
        el("h3", {}, "12. Effect Size"),
        el(
          "p",
          {},
          "Quantifies how far the observed Minoan overlap exceeds the null distribution in ",
          "standard deviations (z-score). P-values alone can be misleading in small corpora; ",
          "effect size shows the magnitude of the departure."
        ),
        esDiv,
        el("h3", {}, "13. Positional Bigram Analysis"),
        el(
          "p",
          {},
          "Classifies each bigram by its position within the word (initial, medial, or final) and ",
          "tests each position separately against Minoan/Linear A. Reveals whether the overlap is ",
          "concentrated in specific word positions or distributed evenly."
        ),
        posDiv,
        el("h3", {}, "14. Bootstrap Confidence Interval"),
        el(
          "p",
          {},
          "Resamples the 61 disc words with replacement to produce a 95% confidence interval on the ",
          "overlap count. Provides an uncertainty range rather than a single point estimate."
        ),
        bsDiv,
        el("h3", {}, "15. Trigram Overlap"),
        el(
          "p",
          {},
          "Extends the bigram comparison to trigrams (3-syllable sequences). Trigrams are sparser \u2014 ",
          "most words produce 0\u20131 trigrams \u2014 so statistical power is limited, but any trigram overlap ",
          "would indicate deeper sequential similarity."
        ),
        tgDiv,
        el("h3", {}, "16. Entropy Analysis"),
        el(
          "p",
          {},
          "Compares the syllable-level Shannon entropy of the disc reading against each reference language. ",
          "Languages with similar entropy profiles share similar frequency structure."
        ),
        entDiv,
        el("h3", {}, "17. Two-Sided Language Elimination"),
        el(
          "p",
          {},
          "Tests both tails of the null distribution: is the overlap unusually high OR unusually low? ",
          "A language with significantly low overlap is actively anti-correlated with the disc reading."
        ),
        tsDiv,
        el("h3", {}, "18. Minimum Bayes Factors"),
        el(
          "p",
          {},
          "Converts p-values to the strongest possible Bayesian evidence against the null hypothesis ",
          "(Sellke\u2013Bayarri\u2013Berger 2001). Requires no prior specification. ",
          "Provides a continuous evidence scale beyond binary significance."
        ),
        bfDiv,
        el("h3", {}, "19. Phonetic Distance-Weighted Overlap"),
        el(
          "p",
          {},
          "Extends exact bigram matching to include near-misses \u2014 bigrams where one syllable differs ",
          "by a single phonetic feature (same consonant, different vowel, or vice versa). ",
          "Tests whether the disc reading is phonetically close to Minoan even where it doesn\u2019t exactly match."
        ),
        pdDiv,
        el("h3", {}, "20. Reverse Direction Test"),
        el(
          "p",
          {},
          "Reads each disc word with signs in reversed order and retests against Minoan/Linear A. ",
          "If the signal disappears when reversed, the result is direction-dependent \u2014 evidence that ",
          "the reading direction matters and the specific sign ordering carries the signal."
        ),
        rdDiv,
        el("h3", {}, "21. Minimal-Pair Phonetic Plausibility"),
        el(
          "p",
          {},
          "Examines the phonetic relationship between signs that substitute in minimal pairs. ",
          "In real language paradigms, substitutions tend to be systematic (e.g., vowel alternation ",
          "for case endings). Random substitutions would show no phonetic pattern."
        ),
        mpDiv,
        el("h3", {}, "22. Null-Distribution 80th Percentile (heuristic detection threshold)"),
        el(
          "p",
          {},
          "The 80th percentile of the null overlap distribution as a function of reference-corpus size. ",
          "An observed overlap above this threshold sits in the upper 20% of what the null model alone produces. ",
          "We report this as a descriptive heuristic, not a formal power calculation: ",
          "true Type II error requires an explicit alternative-hypothesis distribution, which we do not specify."
        ),
        pcDiv,
        el("h3", {}, "23. Token-Weighted Bigram Overlap"),
        el(
          "p",
          {},
          "Reports how many times each shared bigram appears in the disc and in Minoan/Linear A. ",
          "High-frequency shared bigrams are stronger evidence than single-occurrence matches."
        ),
        twDiv,
        el("h3", {}, "24. Corpus Curation Sensitivity"),
        el(
          "p",
          {},
          "The default comparison uses 34 curated LA words, excluding 15 borderline items. ",
          "This test randomly includes/excludes each borderline word across many trials to measure ",
          "how sensitive the result is to curation decisions."
        ),
        csDiv,
        el("h3", {}, "25. Fixed-Pool Cross-Language Comparison"),
        el(
          "p",
          {},
          "Each language normally builds its own syllable pool for the MC null model (different sizes). ",
          "This test uses a single universal pool (all syllables from all 9 languages plus the disc) ",
          "for a fairer direct comparison."
        ),
        fpDiv,
        el("h3", {}, "26. Permutation-Based FWER"),
        el(
          "p",
          {},
          "A simulation-based alternative to Holm-Bonferroni for multiple-testing assessment. Generates random disc-like texts and ",
          "tests all 9 languages simultaneously, recording the minimum p-value across all languages. The FWER p-value is the fraction ",
          "of random texts where the best-scoring language achieved a p-value at least as extreme as the observed minimum."
        ),
        fwDiv,
        el("h3", {}, "27. Jackknife Stability (Top Competitors)"),
        el(
          "p",
          {},
          "Leave-one-out stability for the top non-Minoan competitors (Hittite, Luwian, and next best). ",
          "Tests whether any single reference word disproportionately drives the overlap count."
        ),
        jkDiv,
        el("h3", {}, "28. Sign 02 / qe Binding (Exact)"),
        el(
          "p",
          {},
          "Sign 02 (the \u201Cplumed head\u201D, treated as a determinative in the default reading) ",
          "appears word-initially 19 times. Of those, 13 are immediately followed by Sign 12 (\u201Cqe\u201D) ",
          "\u2014 a 68% binding rate against an expected ~9% under the marginal sign-12 distribution. ",
          "This test reports the exact one-sided hypergeometric p-value plus a Monte Carlo permutation cross-check."
        ),
        qeDiv,
        el("h3", {}, "29. Leave-PD-Inspired-Out (Linear A Curation Ablation)"),
        el(
          "p",
          {},
          "Approximately 29% of the Linear A reference entries (10 of 34) carry a ",
          el("code", {}, "cf. PD \u2026"),
          " note in the source data, indicating they were curated against Phaistos Disc parallels. ",
          "Testing a PD-derived reading against an LA vocabulary that was itself partly built by reading the disc ",
          "is a stronger form of circularity than the within-mapping reshuffle test. ",
          "This ablation re-runs the Minoan MC against the 24 PD-uncited LA entries to quantify how much of the ",
          "headline Minoan signal depends on that curation overlap."
        ),
        pdOutDiv
      )
    );
  }

  // app/js/app.mjs
  var sections = {
    overview: render,
    reading: render2,
    validation: render3,
    morphology: render4,
    comparison: render5,
    sensitivity: render6,
    extended: render9,
    davis: render7,
    methodology: render8
  };
  var sideA;
  var sideB;
  try {
    [sideA, sideB] = parseTranscription(TRANSCRIPTION_TEXT);
  } catch (err) {
    const errEl = document.createElement("p");
    errEl.style.cssText = "color:#b71c1c;padding:2rem";
    errEl.textContent = `Transcription parse error: ${err.message}`;
    const main = document.getElementById("main-content");
    main.textContent = "";
    main.appendChild(errEl);
    throw err;
  }
  function announce(message) {
    const region = document.getElementById("live-region");
    if (region) region.textContent = message;
  }
  function getIterations() {
    const raw = Number(document.getElementById("mc-iterations").value);
    if (!Number.isFinite(raw) || raw < 1e3) return 1e5;
    return Math.floor(Math.min(raw, 1e7));
  }
  var ctx = {
    sideA,
    sideB,
    getIterations,
    announce
  };
  var cache = /* @__PURE__ */ new Map();
  document.getElementById("mc-iterations")?.addEventListener("change", () => {
    cache.clear();
  });
  function navigate(sectionId) {
    if (!sections[sectionId]) sectionId = "overview";
    setActiveLink(sectionId);
    const main = document.getElementById("main-content");
    const liveRegion = document.getElementById("live-region");
    clear(main);
    const mount = (node) => {
      if (liveRegion && liveRegion.parentNode === main) {
        main.insertBefore(node, liveRegion);
      } else {
        main.appendChild(node);
      }
    };
    if (cache.has(sectionId)) {
      mount(cache.get(sectionId));
      requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
      main.focus({ preventScroll: true });
      return;
    }
    const container = document.createElement("section");
    container.setAttribute("aria-label", sectionId);
    sections[sectionId](container, ctx);
    cache.set(sectionId, container);
    mount(container);
    main.focus({ preventScroll: true });
  }
  initRouter(navigate);
})();
