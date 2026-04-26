(() => {
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
  var RASMUSSEN_PHONETIC = /* @__PURE__ */ new Map([
    [1, "pa"],
    [2, "is"],
    [3, "si"],
    [4, "ap"],
    [5, "pu"],
    [6, "wa"],
    [7, "ti"],
    [8, "ki"],
    [9, "hut"],
    [10, "u"],
    [11, "ar"],
    [12, "ku"],
    [13, "kwe"],
    [14, "tu"],
    [15, "at"],
    [16, "a"],
    [17, "ke"],
    [18, "ra"],
    [19, "lu"],
    [20, "li"],
    [21, "we"],
    [22, "isk"],
    [23, "sa"],
    [24, "ma"],
    [25, "ha"],
    [26, "wi"],
    [27, "la"],
    [28, "za"],
    [29, "mi"],
    [30, "ija"],
    [31, "ka"],
    [32, "i"],
    [33, "pi"],
    [34, "zi"],
    [35, "ta"],
    [36, "vi"],
    [37, "se"],
    [38, "hi"],
    [39, "na"],
    [40, "it"],
    [41, "va"],
    [42, "ru"],
    [43, "su"],
    [44, "he"],
    [45, "ja"]
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
  var GREEK_WORDS = [
    { w: "wa-na-ka", src: "PY Er 312+", note: "king (\u03DD\u03AC\u03BD\u03B1\u03BE)" },
    { w: "po-ti-ni-ja", src: "PY Tn 316+", note: "mistress/lady (\u03C0\u03CC\u03C4\u03BD\u03B9\u03B1)" },
    { w: "ti-ri-po", src: "PY Ta 641", note: "tripod (\u03C4\u03C1\u03AF\u03C0\u03BF\u03C5\u03C2)" },
    { w: "ti-ri-po-de", src: "PY Ta 641", note: "tripods (\u03C4\u03C1\u03AF\u03C0\u03BF\u03B4\u03B5\u03C2)" },
    { w: "ko-wa", src: "PY Aa+", note: "girl (\u03BA\u03CC\u03C1\u03DD\u03B1)" },
    { w: "ko-wo", src: "PY Aa+", note: "boy (\u03BA\u03CC\u03C1\u03DD\u03BF\u03C2)" },
    { w: "e-ra-wo", src: "KN Fh+", note: "olive oil (\u1F14\u03BB\u03B1\u03B9\u03DD\u03BF\u03BD)" },
    { w: "ku-mi-no", src: "HT 97", note: "cumin (\u03BA\u03CD\u03BC\u03B9\u03BD\u03BF\u03BD) \u2014 also LA" },
    { w: "to-so", src: "KN+PY", note: "so much (\u03C4\u03CC\u03C3\u03C3\u03BF\u03C2)" },
    { w: "do-e-ro", src: "PY+KN", note: "slave (\u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2)" },
    { w: "do-e-ra", src: "PY+KN", note: "slave girl (\u03B4\u03BF\u03CD\u03BB\u03B7)" },
    { w: "ka-ko", src: "PY Jn+", note: "bronze (\u03C7\u03B1\u03BB\u03BA\u03CC\u03C2)" },
    { w: "ku-ru-so", src: "PY+KN", note: "gold (\u03C7\u03C1\u03C5\u03C3\u03CC\u03C2)" },
    { w: "ri-no", src: "KN L+", note: "flax (\u03BB\u03AF\u03BD\u03BF\u03BD)" },
    { w: "si-to", src: "KN+PY", note: "wheat (\u03C3\u1FD6\u03C4\u03BF\u03BD)" },
    { w: "wo-no", src: "KN+PY", note: "wine (\u03DD\u03BF\u1FD6\u03BD\u03BF\u03C2)" },
    { w: "me-ri", src: "KN Gg+", note: "honey (\u03BC\u03AD\u03BB\u03B9)" },
    { w: "i-qo", src: "KN Ca+", note: "horse (\u1F35\u03C0\u03C0\u03BF\u03C2)" },
    { w: "te-me-no", src: "PY Er+", note: "shrine (\u03C4\u03AD\u03BC\u03B5\u03BD\u03BF\u03C2)" },
    { w: "te-o", src: "KN+PY", note: "god (\u03B8\u03B5\u03CC\u03C2)" },
    { w: "te-o-jo", src: "PY Un+", note: "of the god (\u03B8\u03B5\u03BF\u1FD6\u03BF)" },
    { w: "da-mo", src: "PY Ep+", note: "municipality (\u03B4\u1FB6\u03BC\u03BF\u03C2)" },
    { w: "pa-te", src: "PY Fn+", note: "father (\u03C0\u03B1\u03C4\u03AE\u03C1)" },
    { w: "ma-te", src: "PY Fr+", note: "mother (\u03BC\u03AC\u03C4\u03B7\u03C1)" },
    { w: "tu-ka-te", src: "PY+MY", note: "daughter (\u03B8\u03C5\u03B3\u03AC\u03C4\u03B7\u03C1)" },
    { w: "pe-ma", src: "PY Un+", note: "grain (\u03C3\u03C0\u03AD\u03C1\u03BC\u03B1)" },
    { w: "ra-wo", src: "KN+PY", note: "people (\u03BB\u03B1\u03DD\u03CC\u03C2)" },
    { w: "ne-wo", src: "KN+PY", note: "new (\u03BD\u03AD\u03DD\u03BF\u03C2)" },
    { w: "to-ra-ka", src: "KN Sk+", note: "armor (\u03B8\u03CE\u03C1\u03B1\u03BA\u03B1)" },
    { w: "ki-to", src: "KN+PY", note: "tunic (\u03C7\u03B9\u03C4\u03CE\u03BD)" },
    { w: "qa-si-re-u", src: "KN+PY", note: "leader (\u03BA\u03DD\u03B1\u03C3\u03B9\u03BB\u03B5\u03CD\u03C2)" },
    { w: "i-je-re-u", src: "PY+KN", note: "priest (\u1F31\u03B5\u03C1\u03B5\u03CD\u03C2)" },
    { w: "i-je-re-ja", src: "PY+KN", note: "priestess (\u1F31\u03AD\u03C1\u03B5\u03B9\u03B1)" },
    { w: "ka-ke-u", src: "PY Jn+", note: "coppersmith (\u03C7\u03B1\u03BB\u03BA\u03B5\u03CD\u03C2)" },
    { w: "na-u-do-mo", src: "PY An+", note: "shipwright (\u03BD\u03B1\u03C5\u03B4\u03CC\u03BC\u03BF\u03C2)" },
    { w: "te-ko-to-ne", src: "PY An+", note: "carpenters (\u03C4\u03AD\u03BA\u03C4\u03BF\u03BD\u03B5\u03C2)" },
    { w: "e-re-ta", src: "PY An+", note: "rowers (\u1F10\u03C1\u03AD\u03C4\u03B1\u03B9)" },
    { w: "po-me", src: "KN Da+", note: "shepherd (\u03C0\u03BF\u03B9\u03BC\u03AE\u03BD)" },
    { w: "po-me-no", src: "KN Da+", note: "shepherd gen. (\u03C0\u03BF\u03B9\u03BC\u03AD\u03BD\u03BF\u03C2)" },
    { w: "e-ke", src: "PY+KN", note: "has (\u1F14\u03C7\u03B5\u03B9)" },
    { w: "do-se", src: "PY+KN", note: "he gives (\u03B4\u03CE\u03C3\u03B5\u03B9)" },
    { w: "pe-re", src: "PY+KN", note: "to bring (\u03C6\u03AD\u03C1\u03B5\u03B9\u03BD)" },
    { w: "de-do-me-na", src: "PY+KN", note: "things offered (\u03B4\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03B1)" },
    { w: "e-e-si", src: "PY+KN", note: "they are (\u1F14\u03B5\u03BD\u03C3\u03B9)" },
    { w: "ko-no-so", src: "KN", note: "Knossos" },
    { w: "pa-i-to", src: "KN", note: "Phaistos" },
    { w: "a-mi-ni-so", src: "KN Fp+", note: "Amnisos" },
    { w: "tu-ri-so", src: "KN+PY", note: "Tylissos" },
    { w: "di-ka-ta", src: "KN Fp+", note: "Dikte (sanctuary)" },
    { w: "a-to-ro-po", src: "PY+KN", note: "man (\u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03C2)" },
    { w: "me-ta", src: "PY+KN", note: "after/with (\u03BC\u03B5\u03C4\u03AC)" },
    { w: "a-pu", src: "PY+KN", note: "from (\u1F00\u03C0\u03CD)" },
    { w: "e-pi", src: "PY+KN", note: "on (\u1F10\u03C0\u03AF)" },
    { w: "u-po", src: "PY+KN", note: "under (\u1F51\u03C0\u03CC)" },
    { w: "pa-sa", src: "PY+KN", note: "all fem. (\u03C0\u1FB6\u03C3\u03B1)" },
    { w: "ke-ra", src: "KN+PY", note: "horn (\u03BA\u03AD\u03C1\u03B1\u03C2)" },
    { w: "to-pe-za", src: "PY+KN", note: "table (\u03C4\u03C1\u03AC\u03C0\u03B5\u03B6\u03B1)" },
    { w: "e-re-pu", src: "PY+KN", note: "ivory (\u1F10\u03BB\u03AD\u03C6\u03B1\u03C2)" },
    { w: "a-ko-ra", src: "PY+KN", note: "assembly (\u1F00\u03B3\u03BF\u03C1\u03AC)" },
    { w: "ku-na-ja", src: "PY+KN", note: "woman (\u03B3\u03C5\u03BD\u03B1\u03AF\u03B1)" },
    { w: "ko-pi-na", src: "PY+KN", note: "basket (\u03BA\u03CC\u03C6\u03B9\u03BD\u03B1\u03C2)" },
    { w: "ka-po", src: "PY+KN", note: "fruit (\u03BA\u03B1\u03C1\u03C0\u03CC\u03C2)" },
    { w: "e-re-u-te-ro", src: "PY+KN", note: "free (\u1F10\u03BB\u03B5\u03CD\u03B8\u03B5\u03C1\u03BF\u03C2)" },
    { w: "a-pi-po-re-we", src: "PY+KN", note: "amphora (\u1F00\u03BC\u03C6\u03B9\u03C6\u03BF\u03C1\u03B5\u03CD\u03C2)" },
    { w: "po-pu-re-ja", src: "PY+KN", note: "purple (\u03C0\u03BF\u03C1\u03C6\u03CD\u03C1\u03B5\u03B9\u03B1)" },
    { w: "ke-ro-si-ja", src: "PY+KN", note: "council of elders (\u03B3\u03B5\u03C1\u03BF\u03C5\u03C3\u03AF\u03B1)" },
    { w: "i-je-ro-jo", src: "PY+KN", note: "holy gen. (\u1F31\u03B5\u03C1\u03BF\u1FD6\u03BF)" }
  ];
  var LUWIAN_WORDS = [
    { w: "ta-ti", src: "CLuw corpus", note: "father (tati-)" },
    { w: "na-ni", src: "CLuw corpus", note: "brother (nani-)" },
    { w: "a-ni", src: "CLuw corpus", note: "mother (anni-)" },
    { w: "wa-na-ti", src: "CLuw corpus", note: "woman (wanatti-)" },
    { w: "zi-ti", src: "HLuw corpus", note: "man/person (ziti-)" },
    { w: "ha-sa-mi", src: "CLuw corpus", note: "clan/people (hasami-)" },
    { w: "na-na-sa-ri", src: "CLuw corpus", note: "sister (nana\u0161ri-)" },
    { w: "ha-sa", src: "CLuw corpus", note: "grandson (ham\u0161a-)" },
    { w: "ti-de-mi", src: "CLuw corpus", note: "son (tideimi-)" },
    { w: "hu-ta-ri", src: "CLuw corpus", note: "servant (hutarli-)" },
    { w: "ha-su", src: "CLuw/HLuw", note: "king (hassuw-)" },
    { w: "ma-sa-na", src: "HLuw corpus", note: "god/deity (ma\u0161\u0161ana-)" },
    { w: "ta-ru-ti", src: "HLuw corpus", note: "storm god (Tarhunt-), CV approx" },
    { w: "ti-wa-ti", src: "HLuw corpus", note: "sun god (Tiwat-)" },
    { w: "a-ri-ma", src: "HLuw corpus", note: "moon/moon god (arma-)" },
    { w: "ha-ta-wa-ti", src: "HLuw corpus", note: "great king (hantawati-)" },
    { w: "pa-ri-na", src: "CLuw corpus", note: "house (parna-)" },
    { w: "ha-pi", src: "CLuw corpus", note: "river (hapi-)" },
    { w: "ha-wi", src: "CLuw corpus", note: "sheep (hawi-)" },
    { w: "da-ka-mi", src: "CLuw corpus", note: "ground/earth (dakam-)" },
    { w: "ma-du", src: "CLuw corpus", note: "honey (maddu-)" },
    { w: "wa-ri-wa", src: "CLuw corpus", note: "lion (walwa-)" },
    { w: "pa-ti", src: "CLuw corpus", note: "foot (pati-)" },
    { w: "ka-ru-ti", src: "CLuw corpus", note: "turn/circle (kaluti-)" },
    { w: "ti-ya-mi", src: "CLuw corpus", note: "ground (tijammi-)" },
    { w: "ta-wi", src: "CLuw corpus", note: "eye (tawi-)" },
    { w: "i-sa-ri", src: "CLuw corpus", note: "hand (i\u0161\u0161ari-)" },
    { w: "ta-pa-sa", src: "CLuw corpus", note: "sky (tappa\u0161-)" },
    { w: "ra-ri", src: "CLuw corpus", note: "language (lali-)" },
    { w: "ma-mi-ya-na", src: "CLuw corpus", note: "word (mammijan-)" },
    { w: "ta-si", src: "HLuw corpus", note: "stone stele (tasi-)" },
    { w: "u-sa", src: "CLuw corpus", note: "year (u\u0161\u0161a-)" },
    { w: "wi-ni-ya-ti", src: "CLuw corpus", note: "wine (winijant-)" },
    { w: "tu-ri-pi", src: "HLuw corpus", note: "bread (TURPI logogram)" },
    { w: "ku-wa-za", src: "CLuw corpus", note: "copper (kuwanza)" },
    { w: "ta-ru-pi", src: "CLuw corpus", note: "clay (taluppi-)" },
    { w: "wa-si-na", src: "CLuw corpus", note: "body (wassina-)" },
    { w: "a-ri-ka-ma-na", src: "CLuw corpus", note: "tribute (arkammana-)" },
    { w: "pa-ri-ha-sa", src: "CLuw corpus", note: "shield (palah\u0161a-)" },
    { w: "i-ya", src: "CLuw corpus", note: "to make/do (iya-)" },
    { w: "pi-ya", src: "CLuw corpus", note: "to give (piya-)" },
    { w: "da", src: "CLuw corpus", note: "to take/give (da-)" },
    { w: "ti-ya", src: "CLuw corpus", note: "to step/set (tiya-)" },
    { w: "tu-wa", src: "CLuw corpus", note: "to put (tuwa-)" },
    { w: "a-ku", src: "CLuw corpus", note: "to drink (aku-)" },
    { w: "wa-ri", src: "CLuw corpus", note: "to help (war-)" },
    { w: "ma-na", src: "CLuw corpus", note: "to pronounce (mana-)" },
    { w: "ha-ri-ta", src: "CLuw corpus", note: "to call (halta-)" },
    { w: "ta-ri-ku-mi-ya", src: "CLuw corpus", note: "to announce (tarkummija-)" },
    { w: "a-pa", src: "CLuw corpus", note: "that/this (apa-, demonstrative)" },
    { w: "a-da", src: "CLuw corpus", note: "in/inside (anda)" },
    { w: "a-ri-ha", src: "CLuw corpus", note: "away (arha)" },
    { w: "pa-ra", src: "CLuw corpus", note: "forward/across (para)" },
    { w: "pa-ri", src: "CLuw corpus", note: "forward (pari)" },
    { w: "na-wa", src: "CLuw corpus", note: "not (nawa)" },
    { w: "na-nu", src: "CLuw corpus", note: "now (nanun)" },
    { w: "sa-ri", src: "CLuw corpus", note: "above/up (\u0161arri)" },
    { w: "ku-wi", src: "CLuw corpus", note: "which/that (kui-, relative)" },
    { w: "pa-ya-tu", src: "Achterberg 2004", note: "Phaistos (proposed)" },
    { w: "ku-na-sa", src: "Achterberg 2004", note: "Knossos (proposed)" },
    { w: "ra-su-ta", src: "Achterberg 2004", note: "Lasithi (proposed)" },
    { w: "hi-ya-wa", src: "Achterberg 2004", note: "Ahhiyawa (proposed)" },
    { w: "ri-ti-na", src: "Achterberg 2004", note: "Rhytion (proposed)" },
    { w: "na-sa-tu", src: "Achterberg 2004", note: "Nestor (proposed)" },
    { w: "na-sa-ti", src: "Achterberg 2004", note: "Nestor dative (proposed)" },
    { w: "wi-ru-si-ya", src: "HLuw corpus", note: "Wilusa/Troy" },
    { w: "a-ri-za-wa", src: "HLuw corpus", note: "Arzawa" },
    { w: "ka-ri-ka-mi-sa", src: "HLuw corpus", note: "Karkamis/Carchemish" },
    { w: "u-ra", src: "CLuw corpus", note: "big/great (ura-)" },
    { w: "wa-su", src: "CLuw corpus", note: "good (wa\u0161u-)" },
    { w: "pa-ri-ha", src: "CLuw corpus", note: "wide (palha-)" },
    { w: "ha-ra-ri", src: "CLuw corpus", note: "pure/clean (halali-)" }
  ];
  var SEMITIC_WORDS = [
    { w: "i-ru", src: "Ugaritic corpus", note: "god ('ilu \u2192 i-lu)" },
    { w: "ba-ru", src: "Ugaritic corpus", note: "lord/Baal (ba'lu)" },
    { w: "ma-ru-ku", src: "Ugaritic corpus", note: "king (malku)" },
    { w: "sa-ru", src: "Akkadian corpus", note: "king (\u0161arru)" },
    { w: "a-bu", src: "Ugaritic corpus", note: "father ('abbu)" },
    { w: "u-mu", src: "Ugaritic corpus", note: "mother ('ummu)" },
    { w: "a-hu", src: "Ugaritic corpus", note: "brother ('a\u1E2Bu)" },
    { w: "bi-ni-tu", src: "Ugaritic corpus", note: "daughter (bintu)" },
    { w: "ka-ru-bu", src: "Ugaritic corpus", note: "dog (kalbu)" },
    { w: "be-tu", src: "Ugaritic corpus", note: "house (b\u0113tu)" },
    { w: "sa-mu-su", src: "Ugaritic corpus", note: "sun (\u0161am\u0161u)" },
    { w: "ya-ri-hu", src: "Ugaritic corpus", note: "moon (yar\u1E2Bu)" },
    { w: "ya-mu", src: "Ugaritic corpus", note: "sea (yammu)" },
    { w: "a-ri-su", src: "Ugaritic corpus", note: "earth ('ar\u1E63u)" },
    { w: "mo-tu", src: "Ugaritic corpus", note: "death (m\xF4tu)" },
    { w: "na-ru", src: "Akkadian corpus", note: "river (n\u0101ru)" },
    { w: "ma-tu", src: "Akkadian corpus", note: "land (m\u0101tu)" },
    { w: "sa-mu-nu", src: "Ugaritic corpus", note: "oil (\u0161amnu)" },
    { w: "ka-ri-mu", src: "Ugaritic corpus", note: "vineyard (karmu)" },
    { w: "da-ya-nu", src: "Akkadian corpus", note: "judge (day\u0101nu)" },
    { w: "hu-ra-su", src: "Akkadian corpus", note: "gold (\u1E2Bur\u0101\u1E63u)" },
    { w: "ka-sa-pu", src: "Akkadian corpus", note: "silver (kaspu)" },
    { w: "ri-bu", src: "Ugaritic corpus", note: "heart (libbu)" },
    { w: "na-pa-su", src: "Ugaritic corpus", note: "soul (nap\u0161u)" },
    { w: "sa-ra-mu", src: "Ugaritic corpus", note: "peace (\u0161al\u0101mu)" },
    { w: "da-mu", src: "Ugaritic corpus", note: "blood (damu)" },
    { w: "mi-tu", src: "Ugaritic corpus", note: "dead (m\u012Btu)" },
    { w: "ka-ta-ba", src: "Ugaritic corpus", note: "he wrote (kataba)" },
    { w: "sa-ma-a", src: "Ugaritic corpus", note: "he heard (\u0161ama'a)" },
    { w: "qa-ta-ra", src: "Ugaritic corpus", note: "he killed (qa\u1E6Dala)" },
    { w: "ma-ra-ka", src: "Ugaritic corpus", note: "he ruled (malaka)" },
    { w: "na-ka-sa", src: "Ugaritic corpus", note: "he cut (nakasa)" },
    { w: "ra-pa-a", src: "Ugaritic corpus", note: "he healed (rap\u0101'a)" },
    { w: "ha-ra-ka", src: "Ugaritic corpus", note: "he went (halaka)" },
    { w: "da-ba-ra", src: "Ugaritic corpus", note: "he spoke (dabara)" },
    { w: "pa-qa-da", src: "Akkadian corpus", note: "he appointed (paq\u0101du)" },
    { w: "na-da-na", src: "Akkadian corpus", note: "he gave (nad\u0101nu)" },
    { w: "sa-ka-nu", src: "Akkadian corpus", note: "he placed (\u0161ak\u0101nu)" },
    { w: "ya-ka-tu-bu", src: "Ugaritic corpus", note: "he writes (yaktub-)" },
    { w: "ya-ma-ru-ku", src: "Ugaritic corpus", note: "he rules (yamluk-)" },
    { w: "ya-sa-ma-u", src: "Ugaritic corpus", note: "he hears (ya\u0161ma'-)" },
    { w: "ka-pu-ta-ru", src: "Ugaritic/Akkadian", note: "Crete (Kaptaru)" },
    { w: "a-ra-si-ya", src: "Ugaritic corpus", note: "Cyprus (Alashiya)" },
    { w: "u-ga-ri-ti", src: "Ugaritic corpus", note: "Ugarit" },
    { w: "si-du-nu", src: "Akkadian corpus", note: "Sidon" },
    { w: "a-na", src: "Akkadian/Ugaritic", note: "to/for (ana)" },
    { w: "i-na", src: "Akkadian corpus", note: "in (ina)" },
    { w: "a-na-ku", src: "Ugaritic corpus", note: "I (an\u0101ku)" },
    { w: "a-ta", src: "Ugaritic corpus", note: "you masc. ('atta)" },
    { w: "hu-a", src: "Ugaritic corpus", note: "he (hu'a)" },
    { w: "ba-a-ru", src: "Ugaritic corpus", note: "Baal (ba'lu) - lord" },
    { w: "a-sa-ra-tu", src: "Ugaritic corpus", note: "Asherah ('A\u0161eratu)" },
    { w: "a-na-tu", src: "Ugaritic corpus", note: "Anat ('Anatu)" },
    { w: "da-ga-nu", src: "Ugaritic corpus", note: "Dagan" },
    { w: "qu-du-su", src: "Ugaritic corpus", note: "holy (qud\u0161u)" },
    { w: "bi-tu-i-ri", src: "Ugaritic corpus", note: "temple (b\u012Bt 'ili)" },
    { w: "za-ba-hu", src: "Ugaritic corpus", note: "sacrifice (zaba\u1E2Bu)" },
    { w: "ra-bu", src: "Ugaritic corpus", note: "great (rabbu)" },
    { w: "ta-bu", src: "Ugaritic corpus", note: "good (\u1E6D\u0101bu)" },
    { w: "da-nu", src: "Ugaritic corpus", note: "strong (dannu)" }
  ];
  var PFU_WORDS = [
    { w: "we-te", note: "water (*wete)" },
    { w: "tu-re", note: "fire (*tule)" },
    { w: "ka-ra", note: "fish (*kala)" },
    { w: "ko-ta", note: "house (*kota)" },
    { w: "ni-mi", note: "name (*nimi)" },
    { w: "si-ma", note: "eye (*\u015Bilm\xE4)" },
    { w: "we-re", note: "blood (*were)" },
    { w: "ru-wi", note: "bone (*luwi)" },
    { w: "me-ne", note: "go (*mene-)" },
    { w: "to-we", note: "do/make (*towe-)" },
    { w: "ko-re", note: "die (*kole-)" },
    { w: "se-we", note: "eat (*sewe-)" },
    { w: "ju-ke", note: "drink (*juke-)" },
    { w: "na-ke", note: "see (*n\xE4ke-)" },
    { w: "ku-re", note: "hear (*kule-)" },
    { w: "tu-ta", note: "know (*tunta-)" },
    { w: "mi-na", note: "I (*min\xE4)" },
    { w: "ti-na", note: "you (*tin\xE4)" },
    { w: "pa-wa", note: "day/sun (*p\xE4jw\xE4)" },
    { w: "ku-ne", note: "moon (*ku\u014Be)" },
    { w: "pu-we", note: "tree (*puwe)" },
    { w: "ki-wi", note: "stone (*kiwi)" },
    { w: "ku-te", note: "smoke (*kunte)" },
    { w: "jo-ke", note: "river (*jokV)" },
    { w: "ka-la", note: "tongue (*k\xE4l\xE4)" },
    { w: "wa-me", note: "marrow (*wajme)" },
    { w: "pa-ta", note: "pot (*pata)" },
    { w: "su-ka", note: "fox (*\u015Buka)" },
    { w: "ko-je", note: "husband (*kojV)" },
    { w: "pe-se", note: "nest (*pes\xE4)" },
    { w: "no-ra", note: "arrow (*\u0144olV)" },
    { w: "ku-si", note: "urine (*k\xFCsV)" },
    { w: "tu-ri", note: "wind (*tulV)" },
    { w: "pe-ra", note: "fear (*pelV-)" },
    { w: "sa-ra", note: "steal (*sala)" },
    { w: "wa-ri", note: "many (*w\xE4lV)" },
    { w: "ka-ta", note: "two (*kakta)" },
    { w: "ko-me", note: "three (*kolme)" },
    { w: "ne-la", note: "four (*nelj\xE4)" },
    { w: "wi-te", note: "five (*witte)" },
    { w: "me-sa", note: "forest (*meks\xE4)" },
    { w: "nu-mi", note: "upper (*numV)" },
    { w: "a-ra", note: "lower (*ala)" },
    { w: "pe-ri", note: "half (*pelV)" },
    { w: "sa-ka", note: "back (*s\xE4lk\xE4)" },
    { w: "pu-na", note: "hair (*puna)" },
    { w: "mu-na", note: "egg (*muna)" },
    { w: "su-ri", note: "horn (*\u015Borwa)" },
    { w: "wa-ta", note: "path (*wajta)" },
    { w: "ku-ta", note: "weave (*kotV-)" }
  ];
  var EGYPTIAN_WORDS = [
    { w: "pa-ru", note: "house (pr)" },
    { w: "me-wu", note: "water (mw)" },
    { w: "ri-a", note: "sun/Ra (r\uA725)" },
    { w: "ne-te-re", note: "god (n\u1E6Fr)" },
    { w: "ne-su", note: "king (nsw)" },
    { w: "ta", note: "land (t\uA723)" },
    { w: "i-re-ti", note: "eye (jr.t)" },
    { w: "ra", note: "mouth (r\uA723)" },
    { w: "se-ti", note: "woman (s.t)" },
    { w: "i-te", note: "father (jt)" },
    { w: "me-we-ti", note: "mother (mw.t)" },
    { w: "se-me", note: "go (\u0161m)" },
    { w: "re-di", note: "give (rdj)" },
    { w: "ma-a", note: "see (m\uA723\uA723)" },
    { w: "se-de-me", note: "hear (s\u1E0Fm)" },
    { w: "de-de", note: "speak (\u1E0Fd)" },
    { w: "we-ne-me", note: "eat (wnm)" },
    { w: "se-we-re", note: "drink (swr)" },
    { w: "a-ne-hu", note: "life (\uA725n\u1E2B)" },
    { w: "he-we-ti", note: "temple (\u1E25w.t)" },
    { w: "he-te-pu", note: "offering (\u1E25tp)" },
    { w: "ke-pe-ti-u", note: "Keftiu/Crete (kftjw)" },
    { w: "we-he-me", note: "repeat (w\u1E25m)" },
    { w: "i-me-nu", note: "Amun (jmn)" },
    { w: "ne-bu", note: "lord (nb)" },
    { w: "he-qa", note: "ruler (\u1E25q\uA723)" },
    { w: "i-bu", note: "heart (jb)" },
    { w: "he-pe-re", note: "become (\u1E2Bpr)" },
    { w: "ne-pe-re", note: "good (nfr)" },
    { w: "me-nu", note: "endure (mn)" },
    { w: "me-ri", note: "beloved (mry)" },
    { w: "se-nu", note: "brother (sn)" },
    { w: "se-ne-ti", note: "sister (sn.t)" },
    { w: "me-su", note: "offspring (msw)" },
    { w: "ha-se-ti", note: "foreign land (\u1E2B\uA723s.t)" },
    { w: "wa-se-ti", note: "Thebes (w\uA723s.t)" },
    { w: "he-pe-su", note: "sword (\u1E2Bp\u0161)" },
    { w: "ha-bu", note: "festival (\u1E25\uA723b)" },
    { w: "ke-mu", note: "black (km)" },
    { w: "he-me-ti", note: "wife (\u1E25m.t)" },
    { w: "se-me-su", note: "follower (\u0161msw)" },
    { w: "i-mi", note: "who is in (jmy)" },
    { w: "we-se-re", note: "powerful (wsr)" },
    { w: "he-re", note: "face (\u1E25r)" },
    { w: "te-pu", note: "head (tp)" },
    { w: "pe-re-a", note: "pharaoh (pr-\uA725\uA723)" },
    { w: "re-ne-pe-ti", note: "year (rnp.t)" },
    { w: "de-se-re-ti", note: "red land (d\u0161r.t)" },
    { w: "se-he-te-pu", note: "satisfy (s\u1E25tp)" },
    { w: "me-re-ka-re", note: "pharaoh Merikare" }
  ];
  var HURRIAN_WORDS = [
    { w: "e-wu-ri", note: "king (ewri)" },
    { w: "e-ni", note: "god/lord (eni)" },
    { w: "ta-he", note: "man (tahe)" },
    { w: "a-su-ti", note: "woman (a\u0161ti)" },
    { w: "sa-ri", note: "daughter (\u0161ali)" },
    { w: "pa-hi", note: "head (pahi)" },
    { w: "su-mu-ni", note: "hand (\u0161umuni)" },
    { w: "pa-si", note: "mouth (fa\u0161i)" },
    { w: "si-hi", note: "eye (\u0161ihi)" },
    { w: "nu-hi", note: "ear (nuhi)" },
    { w: "se-ri", note: "tooth (\u0161eri)" },
    { w: "ti-sa", note: "heart (ti\u0161a)" },
    { w: "si-je", note: "water (\u0161iye)" },
    { w: "ta-ri", note: "fire (tari)" },
    { w: "e-se", note: "earth (e\u0161e)" },
    { w: "i-se-na", note: "rain (i\u0161ena)" },
    { w: "si-mi-ki", note: "sun god (\u0160imigi)" },
    { w: "ku-su-hu", note: "moon god (Ku\u0161u\u1E2B)" },
    { w: "ta-ri", note: "tree (tali)" },
    { w: "e-ra-di", note: "bird (eradi)" },
    { w: "e-ru-wi", note: "dog (erwi)" },
    { w: "pa-ba-ni", note: "mountain (pabani)" },
    { w: "ha-ri", note: "road (hari)" },
    { w: "ti-je", note: "word/name (tiye)" },
    { w: "su-ki", note: "one (\u0161ukki)" },
    { w: "si-ni", note: "two (\u0161ini)" },
    { w: "te-su-bu", note: "Te\u0161\u0161ub (storm god)" },
    { w: "he-ba-ti", note: "\u1E2Aebat (goddess)" },
    { w: "sa-u-su-ka", note: "\u0160au\u0161ka (Ishtar)" },
    { w: "ku-ma-ri-bi", note: "Kumarbi (god)" },
    { w: "i-te", note: "go (itte-)" },
    { w: "u-nu", note: "come (unnu-)" },
    { w: "a-ru", note: "give (ar-)" },
    { w: "a-su", note: "eat (a\u0161u-)" },
    { w: "ha-su", note: "hear (\u1E2Ba\u0161-)" },
    { w: "pa-ru", note: "know (pal-)" },
    { w: "pu-ru", note: "see (fur-)" },
    { w: "na-hu", note: "sit (na\u1E2B\u1E2B-)" },
    { w: "ta-di", note: "love (tadi)" },
    { w: "sa-ri", note: "wish (\u0161arri)" },
    { w: "pu-ri", note: "slave (puri)" },
    { w: "ti-we", note: "word (tive)" },
    { w: "u-ne", note: "land (unne)" },
    { w: "ke-ru-di", note: "health (keldi)" },
    { w: "se-na", note: "brother (\u0161ena)" },
    { w: "ne-ra", note: "water (nera)" },
    { w: "hu-ra-di", note: "warrior (\u1E2Buradi)" },
    { w: "tu-pu-sa-ri", note: "scribe (tup\u0161arri)" },
    { w: "a-su-hu-si", note: "horse trainer (a\u0161\u0161u\u0161i)" },
    { w: "ki-re-na-su", note: "release (kirena\u0161\u0161-)" }
  ];
  var ETRUSCAN_WORDS = [
    { w: "ka-ra-nu", note: "son (clan)" },
    { w: "se-ku", note: "daughter (sec/se\u03C7)" },
    { w: "pu-i-a", note: "wife (puia)" },
    { w: "a-ti", note: "mother (ati)" },
    { w: "a-pa", note: "father (apa)" },
    { w: "a-i-su", note: "god (ais/eis)" },
    { w: "su-pu-ru", note: "city (spur)" },
    { w: "zi-ra-tu", note: "magistrate (zilath)" },
    { w: "ra-u-ku-mu", note: "king (lauchum)" },
    { w: "tu-ru-ke", note: "gave (turce)" },
    { w: "mu-ru-wa-ni-ke", note: "dedicated (muluvanice)" },
    { w: "a-wi-ru", note: "year (avil)" },
    { w: "ru-pu", note: "died (lupu)" },
    { w: "pe-re-re", note: "divinity (flere)" },
    { w: "pa-nu", note: "sacred place (fanu)" },
    { w: "ka-ru", note: "dog (cal)" },
    { w: "ku-pe", note: "cup (cupe)" },
    { w: "a-tu-re", note: "building (athre)" },
    { w: "mi", note: "I (mi)" },
    { w: "mi-ni", note: "me (mini)" },
    { w: "ne-tu-nu-su", note: "Neptune (nethuns)" },
    { w: "ti-ni-a", note: "Jupiter (tinia)" },
    { w: "u-ni", note: "Juno (uni)" },
    { w: "ra-sa", note: "goddess (lasa)" },
    { w: "tu-ra-nu", note: "Venus (turan)" },
    { w: "su-ti", note: "tomb (\u0161u\u03B8i)" },
    { w: "ra-su-na", note: "Etruscan people (rasna)" },
    { w: "tu-ra-ru", note: "boundary (tular)" },
    { w: "ru-wa", note: "brother? (ruva)" },
    { w: "me-tu-ru-mu", note: "district (methlum)" },
    { w: "e-te-ra", note: "slave/foreigner (etera)" },
    { w: "ra-u-ti-ni", note: "freedman (lautni)" },
    { w: "ku-re-na-ru", note: "sons (clenar)" },
    { w: "he-ku", note: "put/place (hec-)" },
    { w: "ma-ru", note: "look/guard (mal-)" },
    { w: "ki", note: "three (ci)" },
    { w: "ma-ku", note: "five (mach)" },
    { w: "ke-zu-pu", note: "eight (cezp)" },
    { w: "sa-ru", note: "ten (\u0161ar)" },
    { w: "he-ro-ke", note: "Lemnian: built (heloke)" },
    { w: "si-a-ri", note: "Lemnian: (sial\u03C7-)" },
    { w: "ho-ra-i-su", note: "Lemnian: name (Holaies)" },
    { w: "na-po-ti-su", note: "Lemnian: name (Naphoth)" },
    { w: "a-ke-ru", note: "Lemnian: (aker)" }
  ];
  var HITTITE_WORDS = [
    { w: "pa-i", note: "to walk, to go" },
    { w: "wa-ta-ra", note: "water" },
    { w: "ne-pi-sa", note: "sky, heaven" },
    { w: "ha-sa", note: "now (adverb)" },
    { w: "ku-sa", note: "shield, leather" },
    { w: "ti-ta", note: "breast" },
    { w: "ki-sa-ra", note: "hand" },
    { w: "ta-ru", note: "forest, wood" },
    { w: "ar-is", note: "bow" },
    { w: "ma-la", note: "to grind" },
    { w: "tu-wa", note: "two" },
    { w: "su-wa-i", note: "to fill" },
    { w: "la-wa-ra", note: "to break" },
    { w: "a-te-su", note: "axe" },
    { w: "sa-li", note: "tall, post" },
    { w: "he-ku-ra", note: "mountain sanctuary" },
    { w: "wi-wa-na", note: "wine" },
    { w: "na-ta", note: "drinking straw" },
    { w: "ja-la", note: "spring, abundance" },
    { w: "pa-ra-a", note: "forth, forward" },
    { w: "ku-e-na", note: "to kill, strike" },
    { w: "ha-lu-ka", note: "message" },
    { w: "is-ha", note: "commander" },
    { w: "pu-la", note: "child" },
    { w: "wa-na", note: "woman" },
    { w: "zi-nu", note: "to present" },
    { w: "ti-ja", note: "to approach, begin" },
    { w: "ti-sa", note: "to speak" },
    { w: "it-ma-ri", note: "sacrificial dish" },
    { w: "ha-na-u-su", note: "sedan chair" },
    { w: "ta-wa-la", note: "cult beverage" },
    { w: "se-pi-ta", note: "ear of corn" },
    { w: "si-ja", note: "to seal up" },
    { w: "ap-pa", note: "prisoner, then" },
    { w: "li-ha", note: "to pour" },
    { w: "we-te", note: "to build" },
    { w: "ru-ta", note: "caterpillar" },
    { w: "ka-ka", note: "bird sound" },
    { w: "i-pa-ra", note: "oracle bird" },
    { w: "pi-su", note: "fish" },
    { w: "su-ha", note: "to spread" },
    { w: "lu-e-sa", note: "incense wood" },
    { w: "mi-a-u", note: "cat (sound)" },
    { w: "wa-la", note: "leg (Rasmussen 2017 transliteration; Linear-B-style uses `wa-`, not `va-`)" },
    { w: "ke-ri-ja", note: "to cover" },
    { w: "sa-ra-hu-li", note: "post, column" },
    { w: "ha-ra", note: "to grind (variant)" },
    { w: "i-ja-ta", note: "sheep" },
    { w: "ha-ta-la", note: "club, to strike" },
    { w: "pa-ru-na", note: "rock" }
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
  var LANGUAGES = [
    { id: "minoan", name: "Minoan / Linear A", words: LINEAR_A_WORDS },
    { id: "greek", name: "Mycenaean Greek", words: GREEK_WORDS },
    { id: "luwian", name: "Luwian (Anatolian)", words: LUWIAN_WORDS },
    { id: "semitic", name: "West Semitic", words: SEMITIC_WORDS },
    { id: "pfu", name: "Proto-Finno-Ugric", words: PFU_WORDS },
    { id: "egyptian", name: "Middle Egyptian", words: EGYPTIAN_WORDS },
    { id: "hurrian", name: "Hurrian", words: HURRIAN_WORDS },
    { id: "etruscan", name: "Etruscan/Tyrsenian", words: ETRUSCAN_WORDS }
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
  function parseTranscription(text) {
    const lines = text.split(/\r?\n/g).map((l) => l.trim()).filter((l) => l.length > 0 && !l.startsWith("#"));
    const joined = lines.join(" ");
    const parts = joined.split("\xA6").map((p) => p.trim()).filter((p) => p.length > 0);
    if (parts.length !== 2) {
      throw new Error(`Expected 2 sides, got ${parts.length}`);
    }
    function parseSide(label, text2) {
      const rawWords = text2.split("|").map((w) => w.trim()).filter(Boolean);
      const words = rawWords.map(parseWord);
      return { label, words };
    }
    return [parseSide("A", parts[0]), parseSide("B", parts[1])];
  }

  // app/js/engine/phonetics.mjs
  function phoneticValue(sign) {
    if (sign == null) return "??";
    const p = PHONETIC.get(sign);
    return p ? p.v : `?${sign}`;
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

  // app/js/engine/stats.mjs
  function lnFactorial(x) {
    if (x <= 1) return 0;
    let r = 0;
    for (let i = 2; i <= x; i++) r += Math.log(i);
    return r;
  }
  function lnComb(n, k) {
    if (k < 0 || k > n) return -Infinity;
    return lnFactorial(n) - lnFactorial(k) - lnFactorial(n - k);
  }
  function hypergeomPmf(N, K, n, k) {
    return Math.exp(lnComb(K, k) + lnComb(N - K, n - k) - lnComb(N, n));
  }
  function hypergeomSf(N, K, n, k) {
    let p = 0;
    const maxK = Math.min(K, n);
    for (let i = k; i <= maxK; i++) p += hypergeomPmf(N, K, n, i);
    return Math.min(p, 1);
  }

  // app/js/engine/prng.mjs
  function mulberry32(seed) {
    let a = seed | 0;
    return () => {
      a = a + 1831565813 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
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
  function mergeAllWords(sideA2, sideB2) {
    return [
      ...sideA2.words.map((w) => ({ ...w, side: "A" })),
      ...sideB2.words.map((w) => ({ ...w, side: "B" }))
    ];
  }
  function buildTargetBigrams(langWords) {
    const bigrams = /* @__PURE__ */ new Set();
    for (const tw of langWords) {
      for (const bg of ngramsOf(syllabify(tw.w), 2)) bigrams.add(bg);
    }
    return bigrams;
  }
  function buildSylFreqMap(words, extractSyls) {
    const freq = /* @__PURE__ */ new Map();
    for (const w of words) {
      for (const s of extractSyls(w)) {
        freq.set(s, (freq.get(s) ?? 0) + 1);
      }
    }
    return freq;
  }
  function runMcForLang(targetBigrams, overlap, allSyls, pdWordLens, rng, iterations) {
    let exc = 0;
    for (let i = 0; i < iterations; i++) {
      const fake = /* @__PURE__ */ new Set();
      for (const len of pdWordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
        for (const bg of ngramsOf(fw, 2)) fake.add(bg);
      }
      if ([...fake].filter((b) => targetBigrams.has(b)).length >= overlap) exc++;
    }
    return exc / iterations;
  }
  function runWeightedMcForLang(targetBigrams, overlap, weightedPool, pdWordLens, rng, iterations) {
    let exc = 0;
    for (let i = 0; i < iterations; i++) {
      const fake = /* @__PURE__ */ new Set();
      for (const len of pdWordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(weightedPool[Math.floor(rng() * weightedPool.length)]);
        for (const bg of ngramsOf(fw, 2)) fake.add(bg);
      }
      if ([...fake].filter((b) => targetBigrams.has(b)).length >= overlap) exc++;
    }
    return exc / iterations;
  }
  function fisherYatesShuffle(arr, rng) {
    const shuffled = [...arr];
    for (let j = shuffled.length - 1; j > 0; j--) {
      const k = Math.floor(rng() * (j + 1));
      [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]];
    }
    return shuffled;
  }
  function partitionTiers(sortedArr, T, key = (x) => x) {
    const tiers = [];
    const N = sortedArr.length;
    if (T === 3) {
      const sz = Math.ceil(N / 3);
      tiers.push(sortedArr.slice(0, sz).map(key));
      tiers.push(sortedArr.slice(sz, sz * 2).map(key));
      tiers.push(sortedArr.slice(sz * 2).map(key));
      return tiers;
    }
    const base = Math.floor(N / T);
    const extras = N % T;
    let start = 0;
    for (let t = 0; t < T; t++) {
      const size = base + (t < extras ? 1 : 0);
      tiers.push(sortedArr.slice(start, start + size).map(key));
      start += size;
    }
    return tiers;
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
  function singleLanguageMC(sideA2, sideB2, langWords, {
    iterations = 1e5,
    seed = 314159,
    includeDet = false,
    valueOverrides = null
  } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    let valueMap = null;
    if (valueOverrides) {
      valueMap = /* @__PURE__ */ new Map();
      for (const [sign, entry] of PHONETIC) valueMap.set(sign, entry.v);
      for (const [sign, val] of valueOverrides) valueMap.set(sign, val);
    }
    const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords, { includeDet, valueMap });
    const targetBigrams = buildTargetBigrams(langWords);
    const overlap = [...pdBigrams].filter((b) => targetBigrams.has(b)).length;
    const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap((b) => b.split("-")))];
    const rng = mulberry32(seed);
    let exc = 0;
    for (let i = 0; i < iterations; i++) {
      const fake = /* @__PURE__ */ new Set();
      for (const len of pdWordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
        for (const bg of ngramsOf(fw, 2)) fake.add(bg);
      }
      if ([...fake].filter((b) => targetBigrams.has(b)).length >= overlap) exc++;
    }
    return { overlap, pValue: exc / iterations, pdBigrams: pdBigrams.size, targetSize: targetBigrams.size };
  }
  function leavePdInspiredOut(sideA2, sideB2, { iterations = 1e5, seed = 314159 } = {}) {
    const fullLA = LINEAR_A_WORDS;
    const filteredLA = LINEAR_A_WORDS_NO_PD_INSPIRED;
    const full = singleLanguageMC(sideA2, sideB2, fullLA, { iterations, seed });
    const filtered = singleLanguageMC(sideA2, sideB2, filteredLA, { iterations, seed });
    return {
      full: {
        overlap: full.overlap,
        pValue: full.pValue,
        corpusSize: fullLA.length,
        pdBigrams: full.pdBigrams,
        targetSize: full.targetSize
      },
      filtered: {
        overlap: filtered.overlap,
        pValue: filtered.pValue,
        corpusSize: filteredLA.length,
        pdBigrams: filtered.pdBigrams,
        targetSize: filtered.targetSize
      },
      droppedCount: fullLA.length - filteredLA.length,
      droppedFraction: (fullLA.length - filteredLA.length) / fullLA.length
    };
  }
  function circularityBiasTest(sideA2, sideB2, langWords, { iterations = 1e5, seed = 414159, tierCounts = [2, 3, 5, 10] } = {}) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const phonSignNums = [];
    const phonSignVals = [];
    for (const [sign, entry] of PHONETIC) {
      if (entry.c === "det" || entry.c === "none") continue;
      phonSignNums.push(sign);
      phonSignVals.push(entry.v);
    }
    const realValueMap = /* @__PURE__ */ new Map();
    for (const [sign, entry] of PHONETIC) realValueMap.set(sign, entry.v);
    const readDiscBigrams = (vm) => buildPdBigramsFromWords(allWords, { valueMap: vm }).bigrams;
    const pdBigrams = readDiscBigrams(realValueMap);
    const laBigrams = buildTargetBigrams(langWords);
    const realOverlap = [...pdBigrams].filter((b) => laBigrams.has(b)).length;
    const signTokenFreq = /* @__PURE__ */ new Map();
    for (const w of allWords) {
      for (const s of w.signs.filter((x) => x != null)) {
        signTokenFreq.set(s, (signTokenFreq.get(s) ?? 0) + 1);
      }
    }
    const laSylFreq = /* @__PURE__ */ new Map();
    for (const tw of langWords) {
      for (const s of syllabify(tw.w)) {
        laSylFreq.set(s, (laSylFreq.get(s) ?? 0) + 1);
      }
    }
    const tieRng = mulberry32(seed + 7777);
    const sortedSigns = phonSignNums.map((s) => ({ sign: s, freq: signTokenFreq.get(s) ?? 0, salt: tieRng() })).sort((a, b) => b.freq - a.freq || a.salt - b.salt);
    const sortedValues = phonSignVals.map((v) => ({ val: v, freq: laSylFreq.get(v) ?? 0, salt: tieRng() })).sort((a, b) => b.freq - a.freq || a.salt - b.salt);
    const n = sortedSigns.length;
    const avgRank = (sorted, keyFn) => {
      const ranks = new Array(sorted.length);
      let i = 0;
      while (i < sorted.length) {
        let j = i;
        while (j < sorted.length && keyFn(sorted[j]) === keyFn(sorted[i])) j++;
        const avg = (i + j - 1) / 2;
        for (let k = i; k < j; k++) ranks[k] = avg;
        i = j;
      }
      return ranks;
    };
    const signRanks = avgRank(sortedSigns, (s) => s.freq);
    const valRankArr = avgRank(sortedValues, (v) => v.freq);
    const valRankByName = /* @__PURE__ */ new Map();
    for (let i = 0; i < sortedValues.length; i++) {
      const v = sortedValues[i].val;
      if (!valRankByName.has(v)) valRankByName.set(v, []);
      valRankByName.get(v).push(valRankArr[i]);
    }
    for (const [v, rs] of valRankByName) valRankByName.set(v, rs.reduce((a, b) => a + b) / rs.length);
    const xRanks = new Array(n);
    const yRanks = new Array(n);
    for (let i = 0; i < n; i++) {
      const assignedVal = PHONETIC.get(sortedSigns[i].sign).v;
      if (!valRankByName.has(assignedVal)) {
        throw new Error(
          `circularityBiasTest: phonetic value "${assignedVal}" assigned to sign ${sortedSigns[i].sign} is not in the value-rank table. Every phonetic value used by an active sign must appear in phonSignVals; check PHONETIC.c classification (values from "det" or "none" signs are intentionally excluded).`
        );
      }
      xRanks[i] = signRanks[i];
      yRanks[i] = valRankByName.get(assignedVal);
    }
    const meanX = xRanks.reduce((a, b) => a + b, 0) / n;
    const meanY = yRanks.reduce((a, b) => a + b, 0) / n;
    let cov = 0, varX = 0, varY = 0;
    for (let i = 0; i < n; i++) {
      const dx = xRanks[i] - meanX;
      const dy = yRanks[i] - meanY;
      cov += dx * dy;
      varX += dx * dx;
      varY += dy * dy;
    }
    const rho = varX > 0 && varY > 0 ? cov / Math.sqrt(varX * varY) : 0;
    const uniformRng = mulberry32(seed);
    let uniformExc = 0;
    for (let i = 0; i < iterations; i++) {
      const shuffled = fisherYatesShuffle(phonSignVals, uniformRng);
      const fakeMap = new Map(realValueMap);
      phonSignNums.forEach((sign, idx) => fakeMap.set(sign, shuffled[idx]));
      const fakeOverlap = [...readDiscBigrams(fakeMap)].filter((b) => laBigrams.has(b)).length;
      if (fakeOverlap >= realOverlap) uniformExc++;
    }
    const computeFwForTierCount = (T) => {
      const T_ = Math.max(1, Math.min(T, n));
      const signTiers = partitionTiers(sortedSigns, T_, (s) => s.sign);
      const valueTiers = partitionTiers(sortedValues, T_, (v) => v.val);
      const tierSizes = signTiers.map((arr) => arr.length);
      const fwSeed = T_ === 3 ? seed + 1 : seed + 1 + 1e3 * T_;
      const fwRng = mulberry32(fwSeed);
      let exc = 0;
      for (let i = 0; i < iterations; i++) {
        const fwMap = /* @__PURE__ */ new Map();
        for (let t = 0; t < T_; t++) {
          const shuffledVals = fisherYatesShuffle(valueTiers[t], fwRng);
          signTiers[t].forEach((sign, j) => fwMap.set(sign, shuffledVals[j]));
        }
        for (const [sign, val] of realValueMap) {
          if (!fwMap.has(sign)) fwMap.set(sign, val);
        }
        const fakeOverlap = [...readDiscBigrams(fwMap)].filter((b) => laBigrams.has(b)).length;
        if (fakeOverlap >= realOverlap) exc++;
      }
      return { tierCount: T_, freqWeightedP: exc / iterations, tierSizes, exceedances: exc };
    };
    const requested = Array.isArray(tierCounts) && tierCounts.length > 0 ? tierCounts : [3];
    const tierSet = [.../* @__PURE__ */ new Set([...requested, 3])].filter((t) => Number.isInteger(t) && t >= 1);
    const tierSweep = tierSet.map((T) => computeFwForTierCount(T));
    const t3 = tierSweep.find((e) => e.tierCount === 3);
    return {
      realOverlap,
      uniformP: uniformExc / iterations,
      freqWeightedP: t3.freqWeightedP,
      spearmanRho: rho,
      tierSweep,
      iterations
    };
  }
  function fullNineLanguageComparison(sideA2, sideB2, { iterations = 1e5, uniformSeed = 314159, fwSeed = 271828, onProgress = null } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);
    const pdSegmentsForFreq = extractKnownPdSegments(allWords);
    const pdSylFreq = /* @__PURE__ */ new Map();
    for (const seg of pdSegmentsForFreq) {
      for (const s of seg) pdSylFreq.set(s, (pdSylFreq.get(s) ?? 0) + 1);
    }
    const results = [];
    for (let li = 0; li < LANGUAGES.length; li++) {
      const lang = LANGUAGES[li];
      const langUniformRng = mulberry32(uniformSeed + li);
      const langFwRng = mulberry32(fwSeed + li);
      const targetBigrams = buildTargetBigrams(lang.words);
      const overlap = [...pdBigrams].filter((b) => targetBigrams.has(b)).length;
      const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap((b) => b.split("-")))];
      const possibleBigrams = allSyls.length * allSyls.length;
      const hyperP = hypergeomSf(possibleBigrams, targetBigrams.size, pdBigrams.size, overlap);
      const refSylFreq = buildSylFreqMap(lang.words, (tw) => syllabify(tw.w));
      const combinedFreq = /* @__PURE__ */ new Map();
      for (const s of allSyls) {
        combinedFreq.set(s, (pdSylFreq.get(s) ?? 0) + (refSylFreq.get(s) ?? 0));
      }
      const weightedPool = [];
      for (const [s, f] of combinedFreq) {
        for (let k2 = 0; k2 < f; k2++) weightedPool.push(s);
      }
      const pValue = runMcForLang(targetBigrams, overlap, allSyls, pdWordLens, langUniformRng, iterations);
      const fwPValue = runWeightedMcForLang(targetBigrams, overlap, weightedPool, pdWordLens, langFwRng, iterations);
      const effectiveSize = lang.words.filter((tw) => syllabify(tw.w).length >= 2).length;
      results.push({
        id: lang.id,
        name: lang.name,
        corpusSize: lang.words.length,
        effectiveSize,
        overlap,
        targetSize: targetBigrams.size,
        pValue,
        fwPValue,
        hyperP
      });
      if (onProgress) onProgress({ done: li + 1, total: LANGUAGES.length + 1, lang: lang.name });
    }
    const rasmusValueMap = /* @__PURE__ */ new Map();
    for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
    const { bigrams: rasmusBigrams, wordLens: rasWordLens } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const hitBigrams = buildTargetBigrams(HITTITE_WORDS);
    const hitOverlap = [...rasmusBigrams].filter((b) => hitBigrams.has(b)).length;
    const hitAllSyls = [...new Set([...rasmusBigrams, ...hitBigrams].flatMap((b) => b.split("-")))];
    const hitPossible = hitAllSyls.length * hitAllSyls.length;
    const hitHyperP = hypergeomSf(hitPossible, hitBigrams.size, rasmusBigrams.size, hitOverlap);
    const rasSegments = extractKnownPdSegments(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const rasSylFreq = /* @__PURE__ */ new Map();
    for (const seg of rasSegments) {
      for (const s of seg) rasSylFreq.set(s, (rasSylFreq.get(s) ?? 0) + 1);
    }
    const hitRefSylFreq = buildSylFreqMap(HITTITE_WORDS, (tw) => syllabify(tw.w));
    const hitCombinedFreq = /* @__PURE__ */ new Map();
    for (const s of hitAllSyls) {
      hitCombinedFreq.set(s, (rasSylFreq.get(s) ?? 0) + (hitRefSylFreq.get(s) ?? 0));
    }
    const hitWeightedPool = [];
    for (const [s, f] of hitCombinedFreq) {
      for (let k2 = 0; k2 < f; k2++) hitWeightedPool.push(s);
    }
    const hitUniformRng = mulberry32(uniformSeed + LANGUAGES.length);
    const hitFwRng = mulberry32(fwSeed + LANGUAGES.length);
    const hitPValue = runMcForLang(hitBigrams, hitOverlap, hitAllSyls, rasWordLens, hitUniformRng, iterations);
    const hitFwPValue = runWeightedMcForLang(hitBigrams, hitOverlap, hitWeightedPool, rasWordLens, hitFwRng, iterations);
    const hitEffectiveSize = HITTITE_WORDS.filter((tw) => syllabify(tw.w).length >= 2).length;
    results.push({
      id: "hittite",
      name: "Hittite (Rasmussen)",
      corpusSize: HITTITE_WORDS.length,
      effectiveSize: hitEffectiveSize,
      overlap: hitOverlap,
      targetSize: hitBigrams.size,
      pValue: hitPValue,
      fwPValue: hitFwPValue,
      hyperP: hitHyperP
    });
    if (onProgress) onProgress({ done: LANGUAGES.length + 1, total: LANGUAGES.length + 1, lang: "Hittite (Rasmussen)" });
    const sorted = [...results].sort((a, b) => a.pValue - b.pValue);
    const k = sorted.length;
    let maxSoFar = 0;
    for (let i = 0; i < k; i++) {
      const adj = Math.min(1, sorted[i].pValue * (k - i));
      maxSoFar = Math.max(maxSoFar, adj);
      sorted[i].holmP = maxSoFar;
    }
    for (const s of sorted) {
      const r = results.find((x) => x.id === s.id);
      r.holmP = s.holmP;
    }
    results.sort((a, b) => a.pValue - b.pValue);
    return { results, significant: results.filter((r) => r.holmP < 0.05), iterations };
  }
  function fwPowerAnalysis(sideA2, sideB2, langWords, { iterations = 1e5, seed = 514159, tierCount = 3 } = {}) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const phonSignNums = [];
    const phonSignVals = [];
    for (const [sign, entry] of PHONETIC) {
      if (entry.c === "det" || entry.c === "none") continue;
      phonSignNums.push(sign);
      phonSignVals.push(entry.v);
    }
    const realValueMap = /* @__PURE__ */ new Map();
    for (const [sign, entry] of PHONETIC) realValueMap.set(sign, entry.v);
    const readDiscBigrams = (vm) => buildPdBigramsFromWords(allWords, { valueMap: vm }).bigrams;
    const pdBigrams = readDiscBigrams(realValueMap);
    const laBigrams = buildTargetBigrams(langWords);
    const observedOverlap = [...pdBigrams].filter((b) => laBigrams.has(b)).length;
    const signTokenFreq = /* @__PURE__ */ new Map();
    for (const w of allWords) {
      for (const s of w.signs.filter((x) => x != null))
        signTokenFreq.set(s, (signTokenFreq.get(s) ?? 0) + 1);
    }
    const laSylFreq = /* @__PURE__ */ new Map();
    for (const tw of langWords) {
      for (const s of syllabify(tw.w))
        laSylFreq.set(s, (laSylFreq.get(s) ?? 0) + 1);
    }
    const n = phonSignNums.length;
    const tieRng = mulberry32(seed + 7777);
    const sortedSigns = phonSignNums.map((s) => ({ sign: s, freq: signTokenFreq.get(s) ?? 0, salt: tieRng() })).sort((a, b) => b.freq - a.freq || a.salt - b.salt);
    const sortedValues = phonSignVals.map((v) => ({ val: v, freq: laSylFreq.get(v) ?? 0, salt: tieRng() })).sort((a, b) => b.freq - a.freq || a.salt - b.salt);
    const T = Math.max(2, Math.floor(tierCount));
    const T_ = Math.min(T, n);
    const signTiers = partitionTiers(sortedSigns, T_, (s) => s.sign);
    const valueTiers = partitionTiers(sortedValues, T_, (v) => v.val);
    const histogram = /* @__PURE__ */ new Map();
    const fwRng = mulberry32(seed);
    let fwExc = 0;
    for (let i = 0; i < iterations; i++) {
      const fwMap = /* @__PURE__ */ new Map();
      for (let t = 0; t < T_; t++) {
        const sv = fisherYatesShuffle(valueTiers[t], fwRng);
        signTiers[t].forEach((sign, j) => fwMap.set(sign, sv[j]));
      }
      for (const [sign, val] of realValueMap) {
        if (!fwMap.has(sign)) fwMap.set(sign, val);
      }
      const ov = [...readDiscBigrams(fwMap)].filter((b) => laBigrams.has(b)).length;
      histogram.set(ov, (histogram.get(ov) ?? 0) + 1);
      if (ov >= observedOverlap) fwExc++;
    }
    const maxOverlap = Math.max(...histogram.keys());
    let tailCount = 0;
    let criticalValue = maxOverlap + 1;
    for (let k = maxOverlap; k >= 0; k--) {
      tailCount += histogram.get(k) ?? 0;
      if (tailCount / iterations <= 0.05) criticalValue = k;
      else break;
    }
    const histKeys = [...histogram.keys()].sort((a, b) => a - b);
    return {
      observedOverlap,
      criticalValue,
      histogram: histKeys.map((k) => ({ overlap: k, count: histogram.get(k) })),
      fwPValue: fwExc / iterations
    };
  }
  function positiveControlCalibration(sideA2, sideB2, { iterations = 1e4, seed = 614159 } = {}) {
    const greekLang = LANGUAGES.find((l) => l.id === "greek");
    const greekWords = greekLang.words;
    const shuffleRng = mulberry32(seed ^ 2654435769);
    const shuffled = fisherYatesShuffle(greekWords, shuffleRng);
    const discWords = shuffled.slice(0, 34);
    const refWords = shuffled.slice(34);
    const discBigrams = /* @__PURE__ */ new Set();
    const discWordLens = [];
    for (const tw of discWords) {
      const syls = syllabify(tw.w);
      discWordLens.push(syls.length);
      for (const bg of ngramsOf(syls, 2)) discBigrams.add(bg);
    }
    const refBigrams = /* @__PURE__ */ new Set();
    for (const tw of refWords) {
      for (const bg of ngramsOf(syllabify(tw.w), 2)) refBigrams.add(bg);
    }
    const selfOverlap = [...discBigrams].filter((b) => refBigrams.has(b)).length;
    const selfAllSyls = [...new Set([...discBigrams, ...refBigrams].flatMap((b) => b.split("-")))];
    const selfP = runMcForLang(refBigrams, selfOverlap, selfAllSyls, discWordLens, mulberry32(seed), iterations);
    const results = [];
    let langIdx = 0;
    for (const lang of LANGUAGES) {
      if (lang.id === "greek") {
        langIdx++;
        continue;
      }
      const targetBigrams = buildTargetBigrams(lang.words);
      const overlap = [...discBigrams].filter((b) => targetBigrams.has(b)).length;
      const allSyls = [...new Set([...discBigrams, ...targetBigrams].flatMap((b) => b.split("-")))];
      const pValue = runMcForLang(targetBigrams, overlap, allSyls, discWordLens, mulberry32(seed + 1 + langIdx), iterations);
      results.push({ id: lang.id, name: lang.name, overlap, pValue });
      langIdx++;
    }
    const hitBigrams = buildTargetBigrams(HITTITE_WORDS);
    const hitOverlap = [...discBigrams].filter((b) => hitBigrams.has(b)).length;
    const hitAllSyls = [...new Set([...discBigrams, ...hitBigrams].flatMap((b) => b.split("-")))];
    const hitP = runMcForLang(hitBigrams, hitOverlap, hitAllSyls, discWordLens, mulberry32(seed + 1 + LANGUAGES.length), iterations);
    results.push({ id: "hittite", name: "Hittite (Rasmussen)", overlap: hitOverlap, pValue: hitP });
    results.sort((a, b) => a.pValue - b.pValue);
    return {
      greekSelf: { overlap: selfOverlap, pValue: selfP },
      results,
      discSize: discWords.length,
      refSize: refWords.length
    };
  }
  function corpusSizeEqualization(sideA2, sideB2, { subsamples = 50, seed = 714159 } = {}) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords);
    const rasmusValueMap = /* @__PURE__ */ new Map();
    for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
    const { bigrams: rasmusBigrams } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const targetSize = 34;
    const results = [];
    function subsampleOverlaps(words, discBigrams, langSeed) {
      if (words.length <= targetSize) {
        const tb = buildTargetBigrams(words);
        const ov = [...discBigrams].filter((b) => tb.has(b)).length;
        return { median: ov, min: ov, max: ov };
      }
      const rng = mulberry32(langSeed);
      const overlaps = [];
      for (let s = 0; s < subsamples; s++) {
        const sample = fisherYatesShuffle(words, rng).slice(0, targetSize);
        const tb = buildTargetBigrams(sample);
        overlaps.push([...discBigrams].filter((b) => tb.has(b)).length);
      }
      overlaps.sort((a, b) => a - b);
      return {
        median: overlaps[Math.floor(overlaps.length / 2)],
        min: overlaps[0],
        max: overlaps[overlaps.length - 1]
      };
    }
    LANGUAGES.forEach((lang, idx) => {
      const { median, min, max } = subsampleOverlaps(lang.words, pdBigrams, seed + 1 + idx);
      results.push({
        id: lang.id,
        name: lang.name,
        fullCorpusSize: lang.words.length,
        medianOverlap: median,
        minOverlap: min,
        maxOverlap: max
      });
    });
    const hitEq = subsampleOverlaps(HITTITE_WORDS, rasmusBigrams, seed + 1 + LANGUAGES.length);
    results.push({
      id: "hittite",
      name: "Hittite (Rasmussen)",
      fullCorpusSize: HITTITE_WORDS.length,
      medianOverlap: hitEq.median,
      minOverlap: hitEq.min,
      maxOverlap: hitEq.max
    });
    return results;
  }
  function confidenceThresholdSweep(sideA2, sideB2, langWords, { iterations = 1e5, seed = 814159 } = {}) {
    const tiers = [
      { label: "HIGH only", levels: /* @__PURE__ */ new Set(["HIGH"]) },
      { label: "HIGH + med-hi", levels: /* @__PURE__ */ new Set(["HIGH", "med-hi"]) },
      { label: "HIGH + med-hi + med", levels: /* @__PURE__ */ new Set(["HIGH", "med-hi", "med"]) },
      { label: "All confidence levels", levels: /* @__PURE__ */ new Set(["HIGH", "med-hi", "med", "low-med", "low"]) }
    ];
    return tiers.map((tier, ti) => {
      const excluded = /* @__PURE__ */ new Set();
      let signCount = 0;
      for (const [sign, entry] of PHONETIC) {
        if (entry.c === "det" || entry.c === "none") continue;
        if (tier.levels.has(entry.c)) signCount++;
        else excluded.add(sign);
      }
      const dropExcluded = (side) => {
        const newWords = [];
        for (const w of side.words) {
          const segments = [[]];
          for (const s of w.signs) {
            if (excluded.has(s)) segments.push([]);
            else segments[segments.length - 1].push(s);
          }
          for (const seg of segments) {
            if (seg.length > 0) newWords.push({ ...w, signs: seg });
          }
        }
        return { ...side, words: newWords };
      };
      const mc = singleLanguageMC(dropExcluded(sideA2), dropExcluded(sideB2), langWords, {
        iterations,
        seed: seed + ti
      });
      return { tier: tier.label, signCount, overlap: mc.overlap, pValue: mc.pValue };
    });
  }
  function leaveOneOutStability(sideA2, sideB2, langWords) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const targetBigrams = buildTargetBigrams(langWords);
    const { bigrams: fullBigrams } = buildPdBigramsFromWords(allWords);
    const baseOverlap = [...fullBigrams].filter((b) => targetBigrams.has(b)).length;
    const results = [];
    for (let i = 0; i < allWords.length; i++) {
      const subset = allWords.filter((_, idx) => idx !== i);
      const { bigrams: subBigrams } = buildPdBigramsFromWords(subset);
      const overlap = [...subBigrams].filter((b) => targetBigrams.has(b)).length;
      const w = allWords[i];
      const signs = w.signs.filter((x) => x != null);
      const hasDet = signs[0] === 2;
      const phonSigns = hasDet ? signs.slice(1) : signs;
      const reading = (
        /* canonical-pipeline-allowed: display-only; this string is shown to users and never re-parsed for bigram counts */
        phonSigns.map(phoneticValue).join("-")
      );
      results.push({
        index: i,
        side: w.side,
        reading,
        overlap,
        delta: overlap - baseOverlap
      });
    }
    return { baseOverlap, results };
  }
  function rasmussenFullComparison(sideA2, sideB2, { iterations = 1e5, seed = 1014159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const rasmusValueMap = /* @__PURE__ */ new Map();
    for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
    const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const allLangs = [
      ...LANGUAGES.map((l) => ({ id: l.id, name: l.name, words: l.words })),
      { id: "hittite", name: "Hittite", words: HITTITE_WORDS }
    ];
    const results = [];
    for (let li = 0; li < allLangs.length; li++) {
      const lang = allLangs[li];
      const targetBigrams = buildTargetBigrams(lang.words);
      const overlap = [...pdBigrams].filter((b) => targetBigrams.has(b)).length;
      const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap((b) => b.split("-")))];
      const rng = mulberry32(seed + li);
      const pValue = runMcForLang(targetBigrams, overlap, allSyls, pdWordLens, rng, iterations);
      results.push({ id: lang.id, name: lang.name, overlap, pValue });
    }
    results.sort((a, b) => a.pValue - b.pValue);
    return results;
  }
  function wordLengthDistribution(sideA2, sideB2) {
    const allWords = mergeAllWords(sideA2, sideB2);
    function pdLenForLang(langId) {
      const stripDet = langId !== "hittite";
      return allWords.map((w) => {
        const signs = w.signs;
        const hasDet = stripDet && signs.length > 0 && signs[0] === 2;
        return hasDet ? signs.length - 1 : signs.length;
      });
    }
    const pdWordLens = pdLenForLang("default");
    function histogram(lens) {
      const counts = /* @__PURE__ */ new Map();
      for (const l of lens) counts.set(l, (counts.get(l) ?? 0) + 1);
      const maxLen = Math.max(...counts.keys());
      const result = [];
      for (let i = 1; i <= maxLen; i++) result.push(counts.get(i) ?? 0);
      return result;
    }
    function mean(lens) {
      return lens.reduce((a, b) => a + b, 0) / lens.length;
    }
    const pdHist = histogram(pdWordLens);
    const pdMean = mean(pdWordLens);
    const allLangs = [
      ...LANGUAGES.map((l) => ({ id: l.id, name: l.name, words: l.words })),
      { id: "hittite", name: "Hittite (Rasmussen)", words: HITTITE_WORDS }
    ];
    const langResults = allLangs.map((lang) => {
      const lens = lang.words.map((tw) => syllabify(tw.w).length);
      return {
        id: lang.id,
        name: lang.name,
        meanLen: mean(lens),
        histogram: histogram(lens),
        corpusSize: lang.words.length
      };
    });
    function ksD(lens1, lens2) {
      const all = [.../* @__PURE__ */ new Set([...lens1, ...lens2])].sort((a, b) => a - b);
      let maxD = 0;
      for (const x of all) {
        const f1 = lens1.filter((v) => v <= x).length / lens1.length;
        const f2 = lens2.filter((v) => v <= x).length / lens2.length;
        maxD = Math.max(maxD, Math.abs(f1 - f2));
      }
      return maxD;
    }
    for (const lr of langResults) {
      const langLens = allLangs.find((l) => l.id === lr.id).words.map((tw) => syllabify(tw.w).length);
      const pdLens = pdLenForLang(lr.id);
      lr.ksD = ksD(pdLens, langLens);
    }
    langResults.sort((a, b) => a.ksD - b.ksD);
    return { pdMean, pdHistogram: pdHist, pdWordCount: allWords.length, languages: langResults };
  }
  function splitHalfReliability(sideA2, sideB2, langWords, { iterations = 1e5, seed = 1114159 } = {}) {
    function testSide(words, label, seedOffset) {
      const { bigrams, wordLens } = buildPdBigramsFromWords(words);
      const targetBigrams2 = buildTargetBigrams(langWords);
      const overlap = [...bigrams].filter((b) => targetBigrams2.has(b)).length;
      const allSyls = [...new Set([...bigrams, ...targetBigrams2].flatMap((b) => b.split("-")))];
      const rng = mulberry32(seed + seedOffset);
      const pValue = runMcForLang(targetBigrams2, overlap, allSyls, wordLens, rng, iterations);
      return { side: label, wordCount: words.length, bigramCount: bigrams.size, overlap, pValue };
    }
    const aWords = sideA2.words.map((w) => ({ ...w, side: "A" }));
    const bWords = sideB2.words.map((w) => ({ ...w, side: "B" }));
    const allWords = [...aWords, ...bWords];
    const { bigrams: fullBigrams } = buildPdBigramsFromWords(allWords);
    const targetBigrams = buildTargetBigrams(langWords);
    const fullOverlap = [...fullBigrams].filter((b) => targetBigrams.has(b)).length;
    const sideAResult = testSide(aWords, "A", 0);
    const sideBResult = testSide(bWords, "B", 1);
    return { full: { overlap: fullOverlap, wordCount: allWords.length }, sideA: sideAResult, sideB: sideBResult };
  }
  function unigramBaseline(sideA2, sideB2, { iterations = 1e5, seed = 1214159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const pdSegments = extractKnownPdSegments(allWords);
    const pdSyls = /* @__PURE__ */ new Set();
    const pdWordLens = [];
    for (const seg of pdSegments) {
      if (seg.length === 0) continue;
      pdWordLens.push(seg.length);
      for (const s of seg) pdSyls.add(s);
    }
    const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords);
    const rasmusValueMap = /* @__PURE__ */ new Map();
    for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
    const rasSegments = extractKnownPdSegments(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const rasmusSyls = /* @__PURE__ */ new Set();
    const rasWordLens = [];
    for (const seg of rasSegments) {
      if (seg.length === 0) continue;
      rasWordLens.push(seg.length);
      for (const s of seg) rasmusSyls.add(s);
    }
    const { bigrams: rasmusBigrams } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const allLangs = [
      ...LANGUAGES.map((l) => ({ id: l.id, name: l.name, words: l.words })),
      { id: "hittite", name: "Hittite (Rasmussen)", words: HITTITE_WORDS }
    ];
    const totalDraws = pdWordLens.reduce((s, n) => s + n, 0);
    const rasTotalDraws = rasWordLens.reduce((s, n) => s + n, 0);
    const results = [];
    for (let li = 0; li < allLangs.length; li++) {
      const lang = allLangs[li];
      const isHittite = lang.id === "hittite";
      const discSyls = isHittite ? rasmusSyls : pdSyls;
      const discBigrams = isHittite ? rasmusBigrams : pdBigrams;
      const discWordLens = isHittite ? rasWordLens : pdWordLens;
      const langSyls = /* @__PURE__ */ new Set();
      for (const tw of lang.words) for (const s of syllabify(tw.w)) langSyls.add(s);
      const unigramOverlap = [...discSyls].filter((s) => langSyls.has(s)).length;
      const targetBigrams = buildTargetBigrams(lang.words);
      const bigramOverlap = [...discBigrams].filter((b) => targetBigrams.has(b)).length;
      const allSyls = [.../* @__PURE__ */ new Set([...discSyls, ...langSyls])];
      const rng = mulberry32(seed + li);
      let uniExc = 0;
      let satCount = 0;
      let fakeOverlapSum = 0;
      for (let i = 0; i < iterations; i++) {
        const fakeSyls = /* @__PURE__ */ new Set();
        for (const len of discWordLens) {
          for (let j = 0; j < len; j++) fakeSyls.add(allSyls[Math.floor(rng() * allSyls.length)]);
        }
        if (fakeSyls.size === allSyls.length) satCount++;
        const fakeOv = [...fakeSyls].filter((s) => langSyls.has(s)).length;
        fakeOverlapSum += fakeOv;
        if (fakeOv >= unigramOverlap) uniExc++;
      }
      const saturationRate = satCount / iterations;
      const meanFakeOverlap = fakeOverlapSum / iterations;
      results.push({
        id: lang.id,
        name: lang.name,
        unigramOverlap,
        unigramP: uniExc / iterations,
        bigramOverlap,
        poolSize: allSyls.length,
        langSylSize: langSyls.size,
        pdSylSize: discSyls.size,
        totalDraws: isHittite ? rasTotalDraws : totalDraws,
        saturationRate,
        meanFakeOverlap
      });
    }
    return results;
  }
  function randomReadingBaseline(sideA2, sideB2, langWords, { permutations = 1e3, seed = 1314159 } = {}) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const targetBigrams = buildTargetBigrams(langWords);
    const realValueMap = /* @__PURE__ */ new Map();
    for (const [sign, entry] of PHONETIC) realValueMap.set(sign, entry.v);
    const { bigrams: realBigrams } = buildPdBigramsFromWords(allWords, { valueMap: realValueMap });
    const realOverlap = [...realBigrams].filter((b) => targetBigrams.has(b)).length;
    const phonSignNums = [];
    for (const [sign, entry] of PHONETIC) {
      if (entry.c === "det" || entry.c === "none") continue;
      phonSignNums.push(sign);
    }
    const VOWELS = /* @__PURE__ */ new Set(["a", "e", "i", "o", "u"]);
    const isLaShape = (s) => s.length > 0 && VOWELS.has(s[s.length - 1]);
    const broadPool = /* @__PURE__ */ new Set();
    for (const lang of LANGUAGES) {
      for (const tw of lang.words) for (const s of syllabify(tw.w)) {
        if (isLaShape(s)) broadPool.add(s);
      }
    }
    for (const tw of HITTITE_WORDS) for (const s of syllabify(tw.w)) {
      if (isLaShape(s)) broadPool.add(s);
    }
    const poolArr = [...broadPool];
    const rng = mulberry32(seed);
    let exceeding = 0;
    const overlapHist = /* @__PURE__ */ new Map();
    for (let p = 0; p < permutations; p++) {
      const fakeMap = new Map(realValueMap);
      for (const sign of phonSignNums) {
        fakeMap.set(sign, poolArr[Math.floor(rng() * poolArr.length)]);
      }
      const { bigrams: fakeBigrams } = buildPdBigramsFromWords(allWords, { valueMap: fakeMap });
      const ov = [...fakeBigrams].filter((b) => targetBigrams.has(b)).length;
      overlapHist.set(ov, (overlapHist.get(ov) ?? 0) + 1);
      if (ov >= realOverlap) exceeding++;
    }
    const histKeys = [...overlapHist.keys()].sort((a, b) => a - b);
    const totalPerms = permutations;
    let nullSum = 0, nullSumSq = 0;
    for (const [ov, count] of overlapHist) {
      nullSum += ov * count;
      nullSumSq += ov * ov * count;
    }
    const nullMean = nullSum / totalPerms;
    const nullSD = Math.sqrt(nullSumSq / totalPerms - nullMean * nullMean);
    return {
      realOverlap,
      permutations,
      fractionExceeding: exceeding / permutations,
      nullMean,
      nullSD,
      histogram: histKeys.map((k) => ({ overlap: k, count: overlapHist.get(k) })),
      poolSize: poolArr.length
    };
  }
  function effectSizeAnalysis(sideA2, sideB2, langWords, { iterations = 1e5, seed = 1414159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);
    const targetBigrams = buildTargetBigrams(langWords);
    const observed = [...pdBigrams].filter((b) => targetBigrams.has(b)).length;
    const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap((b) => b.split("-")))];
    const rng = mulberry32(seed);
    let sum = 0, sumSq = 0, exc = 0;
    for (let i = 0; i < iterations; i++) {
      const fake = /* @__PURE__ */ new Set();
      for (const len of pdWordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
        for (const bg of ngramsOf(fw, 2)) fake.add(bg);
      }
      const ov = [...fake].filter((b) => targetBigrams.has(b)).length;
      sum += ov;
      sumSq += ov * ov;
      if (ov >= observed) exc++;
    }
    const nullMean = sum / iterations;
    const nullSD = Math.sqrt(sumSq / iterations - nullMean * nullMean);
    const zScore = nullSD > 0 ? (observed - nullMean) / nullSD : 0;
    return { observed, nullMean, nullSD, zScore, pValue: exc / iterations };
  }
  function positionalBigramAnalysis(sideA2, sideB2, langWords, { iterations = 1e5, seed = 1514159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    function classifyBigramsFromSegments(segments) {
      const initial = /* @__PURE__ */ new Set(), medial = /* @__PURE__ */ new Set(), final_ = /* @__PURE__ */ new Set();
      for (const seg of segments) {
        const bgs = ngramsOf(seg, 2);
        if (bgs.length === 0) continue;
        initial.add(bgs[0]);
        if (bgs.length > 1) final_.add(bgs[bgs.length - 1]);
        else final_.add(bgs[0]);
        for (let i = 1; i < bgs.length - 1; i++) medial.add(bgs[i]);
      }
      return { initial, medial, final: final_ };
    }
    const pdSegments = extractKnownPdSegments(allWords);
    const pdPos = classifyBigramsFromSegments(pdSegments);
    const laSegments = langWords.map((tw) => syllabify(tw.w));
    const laPos = classifyBigramsFromSegments(laSegments);
    const positions = [
      { label: "Word-initial", pd: pdPos.initial, la: laPos.initial },
      { label: "Word-medial", pd: pdPos.medial, la: laPos.medial },
      { label: "Word-final", pd: pdPos.final, la: laPos.final }
    ];
    const pdWordLens = pdSegments.map((seg) => seg.length);
    const allSyls = [...new Set([
      ...pdPos.initial,
      ...pdPos.medial,
      ...pdPos.final,
      ...laPos.initial,
      ...laPos.medial,
      ...laPos.final
    ].flatMap((b) => b.split("-")))];
    const results = positions.map((pos, pi) => {
      const overlap = [...pos.pd].filter((b) => pos.la.has(b)).length;
      const rng = mulberry32(seed + pi);
      let exc = 0;
      for (let i = 0; i < iterations; i++) {
        const fakeInit = /* @__PURE__ */ new Set(), fakeMed = /* @__PURE__ */ new Set(), fakeFin = /* @__PURE__ */ new Set();
        for (const len of pdWordLens) {
          const fw = [];
          for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
          const bgs = ngramsOf(fw, 2);
          if (bgs.length === 0) continue;
          fakeInit.add(bgs[0]);
          if (bgs.length > 1) fakeFin.add(bgs[bgs.length - 1]);
          else fakeFin.add(bgs[0]);
          for (let k = 1; k < bgs.length - 1; k++) fakeMed.add(bgs[k]);
        }
        const fakeSet = pi === 0 ? fakeInit : pi === 1 ? fakeMed : fakeFin;
        if ([...fakeSet].filter((b) => pos.la.has(b)).length >= overlap) exc++;
      }
      return {
        position: pos.label,
        pdCount: pos.pd.size,
        laCount: pos.la.size,
        overlap,
        pValue: exc / iterations
      };
    });
    return results;
  }
  function bootstrapOverlapCI(sideA2, sideB2, langWords, { bootstraps = 1e4, seed = 1614159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const targetBigrams = buildTargetBigrams(langWords);
    const { bigrams: fullBigrams } = buildPdBigramsFromWords(allWords);
    const observed = [...fullBigrams].filter((b) => targetBigrams.has(b)).length;
    const rng = mulberry32(seed);
    const overlaps = [];
    for (let b = 0; b < bootstraps; b++) {
      const sample = [];
      for (let i = 0; i < allWords.length; i++) {
        sample.push(allWords[Math.floor(rng() * allWords.length)]);
      }
      const { bigrams } = buildPdBigramsFromWords(sample);
      overlaps.push([...bigrams].filter((bg) => targetBigrams.has(bg)).length);
    }
    overlaps.sort((a, b) => a - b);
    const lo = Math.floor(bootstraps * 0.025);
    const hi = Math.floor(bootstraps * 0.975);
    const mean = overlaps.reduce((s, v) => s + v, 0) / bootstraps;
    const hist = /* @__PURE__ */ new Map();
    for (const ov of overlaps) hist.set(ov, (hist.get(ov) ?? 0) + 1);
    const histKeys = [...hist.keys()].sort((a, b) => a - b);
    return {
      observed,
      mean,
      ci95: [overlaps[lo], overlaps[hi]],
      min: overlaps[0],
      max: overlaps[overlaps.length - 1],
      bootstraps,
      histogram: histKeys.map((k) => ({ overlap: k, count: hist.get(k) }))
    };
  }
  function trigramOverlapTest(sideA2, sideB2, langWords, { iterations = 1e5, seed = 1714159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const pdTrigrams = /* @__PURE__ */ new Set();
    const pdWordLens = [];
    const pdSegments = extractKnownPdSegments(allWords);
    for (const seg of pdSegments) {
      pdWordLens.push(seg.length);
      for (const tg of ngramsOf(seg, 3)) pdTrigrams.add(tg);
    }
    const laTrigrams = /* @__PURE__ */ new Set();
    for (const tw of langWords) {
      for (const tg of ngramsOf(syllabify(tw.w), 3)) laTrigrams.add(tg);
    }
    const overlap = [...pdTrigrams].filter((t) => laTrigrams.has(t)).length;
    const matchingTrigrams = [...pdTrigrams].filter((t) => laTrigrams.has(t));
    const allSyls = [...new Set([...pdTrigrams, ...laTrigrams].flatMap((t) => t.split("-")))];
    const rng = mulberry32(seed);
    let exc = 0;
    for (let i = 0; i < iterations; i++) {
      const fake = /* @__PURE__ */ new Set();
      for (const len of pdWordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
        for (const tg of ngramsOf(fw, 3)) fake.add(tg);
      }
      if ([...fake].filter((t) => laTrigrams.has(t)).length >= overlap) exc++;
    }
    return {
      pdTrigramCount: pdTrigrams.size,
      laTrigramCount: laTrigrams.size,
      overlap,
      matchingTrigrams,
      pValue: exc / iterations
    };
  }
  function parseSyllable(syl) {
    const vowels = /* @__PURE__ */ new Set(["a", "e", "i", "o", "u"]);
    for (let i = syl.length - 1; i >= 0; i--) {
      if (vowels.has(syl[i])) return { onset: syl.slice(0, i), vowel: syl.slice(i) };
    }
    return { onset: syl, vowel: "" };
  }
  function syllableDistance(s1, s2) {
    if (s1 === s2) return 0;
    const p1 = parseSyllable(s1);
    const p2 = parseSyllable(s2);
    return (p1.onset !== p2.onset ? 1 : 0) + (p1.vowel !== p2.vowel ? 1 : 0);
  }
  function entropyAnalysis(sideA2, sideB2) {
    function computeEntropy(freqMap) {
      let total = 0;
      for (const c of freqMap.values()) total += c;
      if (total === 0) return { entropy: 0, types: 0, tokens: 0 };
      let h = 0;
      for (const c of freqMap.values()) {
        const p = c / total;
        if (p > 0) h -= p * Math.log2(p);
      }
      return { entropy: h, types: freqMap.size, tokens: total };
    }
    function corpusEntropy(words, extractSyls) {
      const uniFreq = /* @__PURE__ */ new Map(), biFreq = /* @__PURE__ */ new Map();
      for (const w of words) {
        const syls = extractSyls(w);
        for (const s of syls) uniFreq.set(s, (uniFreq.get(s) ?? 0) + 1);
        for (const bg of ngramsOf(syls, 2)) biFreq.set(bg, (biFreq.get(bg) ?? 0) + 1);
      }
      return { unigram: computeEntropy(uniFreq), bigram: computeEntropy(biFreq) };
    }
    const allWords = mergeAllWords(sideA2, sideB2);
    const pdSegments = extractKnownPdSegments(allWords);
    const pdUniFreq = /* @__PURE__ */ new Map();
    const pdBiFreq = /* @__PURE__ */ new Map();
    for (const seg of pdSegments) {
      for (const s of seg) pdUniFreq.set(s, (pdUniFreq.get(s) ?? 0) + 1);
      for (const bg of ngramsOf(seg, 2)) pdBiFreq.set(bg, (pdBiFreq.get(bg) ?? 0) + 1);
    }
    const pd = { unigram: computeEntropy(pdUniFreq), bigram: computeEntropy(pdBiFreq) };
    const allLangs = [
      ...LANGUAGES.map((l) => ({ id: l.id, name: l.name, words: l.words })),
      { id: "hittite", name: "Hittite (Rasmussen)", words: HITTITE_WORDS }
    ];
    const languages = allLangs.map((lang) => ({
      id: lang.id,
      name: lang.name,
      ...corpusEntropy(lang.words, (tw) => syllabify(tw.w))
    }));
    return { pd, languages };
  }
  function bayesFactors(langPValues, { iterations = 1e5 } = {}) {
    const pFloor = iterations > 0 ? 1 / iterations : 1e-12;
    return langPValues.map(({ id, name, pValue: p }) => {
      const pEff = Math.max(p, pFloor);
      let bf01Lower;
      if (pEff <= 1 / Math.E) bf01Lower = -Math.E * pEff * Math.log(pEff);
      else bf01Lower = 1;
      const bf10Upper = bf01Lower > 0 ? 1 / bf01Lower : 1 / pFloor;
      const postH1Bound = 1 / (1 + bf01Lower);
      let maxEvidence;
      if (bf10Upper >= 100) maxEvidence = "at most decisive";
      else if (bf10Upper >= 30) maxEvidence = "at most very strong";
      else if (bf10Upper >= 10) maxEvidence = "at most strong";
      else if (bf10Upper >= 3) maxEvidence = "at most moderate";
      else if (bf10Upper >= 1) maxEvidence = "at most anecdotal";
      else maxEvidence = "favors null";
      return {
        id,
        name,
        pValue: p,
        pEffective: pEff,
        bf10Upper,
        bf01Lower,
        postH1Bound,
        maxEvidence,
        // Backward-compatible aliases (deprecated; UI may still read these)
        bfH1: bf10Upper,
        postH1: postH1Bound,
        strength: maxEvidence
      };
    });
  }
  function phoneticDistanceOverlap(sideA2, sideB2, langWords, { iterations = 1e4, seed = 1914159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const { bigrams: pdBgSet, wordLens } = buildPdBigramsFromWords(allWords);
    const pdBgs = [...pdBgSet];
    const targetBgs = [...buildTargetBigrams(langWords)];
    const allSyls = [...new Set([...pdBgs, ...targetBgs].flatMap((b) => b.split("-")))];
    const dCache = /* @__PURE__ */ new Map();
    for (const s1 of allSyls) for (const s2 of allSyls)
      dCache.set(s1 + "|" + s2, syllableDistance(s1, s2));
    function bgSim(bg1, bg2) {
      const [a1, b1] = bg1.split("-");
      const [a2, b2] = bg2.split("-");
      const ss = (d) => d === 0 ? 1 : d === 1 ? 0.5 : 0;
      return (ss(dCache.get(a1 + "|" + a2) ?? 2) + ss(dCache.get(b1 + "|" + b2) ?? 2)) / 2;
    }
    function score(bgs) {
      let total = 0, exact = 0, near = 0;
      for (const dbg of bgs) {
        let best = 0;
        for (const tbg of targetBgs) {
          const s = bgSim(dbg, tbg);
          if (s > best) best = s;
          if (s === 1) break;
        }
        total += best;
        if (best === 1) exact++;
        else if (best >= 0.5) near++;
      }
      return { total, exact, near };
    }
    const observed = score(pdBgs);
    const rng = mulberry32(seed);
    let exc = 0;
    for (let i = 0; i < iterations; i++) {
      const fake = /* @__PURE__ */ new Set();
      for (const len of wordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
        for (const bg of ngramsOf(fw, 2)) fake.add(bg);
      }
      if (score([...fake]).total >= observed.total) exc++;
    }
    return {
      exactMatches: observed.exact,
      nearMisses: observed.near,
      weightedScore: observed.total,
      pValue: exc / iterations,
      pdBigramCount: pdBgs.length,
      laBigramCount: targetBgs.length
    };
  }
  function reverseDirectionTest(sideA2, sideB2, langWords, { iterations = 1e5, seed = 314159 } = {}) {
    const fwd = singleLanguageMC(sideA2, sideB2, langWords, { iterations, seed });
    const stripAndReverse = (w) => {
      let signs = w.signs;
      if (signs.length > 0 && signs[0] === 2) {
        signs = signs.slice(1);
      }
      return { ...w, signs: signs.slice().reverse() };
    };
    const revA = { words: sideA2.words.map(stripAndReverse) };
    const revB = { words: sideB2.words.map(stripAndReverse) };
    const rev = singleLanguageMC(revA, revB, langWords, { iterations, seed: seed + 1, includeDet: true });
    return {
      forward: { overlap: fwd.overlap, pValue: fwd.pValue, pdBigrams: fwd.pdBigrams },
      reversed: { overlap: rev.overlap, pValue: rev.pValue, pdBigrams: rev.pdBigrams }
    };
  }
  function minimalPairPlausibility(sideA2, sideB2) {
    const allWords = mergeAllWords(sideA2, sideB2);
    function phonSigns(w) {
      const signs = w.signs.filter((x) => x != null);
      return signs[0] === 2 ? signs.slice(1) : signs;
    }
    const pairs = [];
    const seen = /* @__PURE__ */ new Set();
    for (let i = 0; i < allWords.length; i++) {
      const s1 = phonSigns(allWords[i]);
      for (let j = i + 1; j < allWords.length; j++) {
        const s2 = phonSigns(allWords[j]);
        if (s1.length !== s2.length || s1.length < 2) continue;
        let diffs = 0, dPos = -1;
        for (let k = 0; k < s1.length; k++) if (s1[k] !== s2[k]) {
          diffs++;
          dPos = k;
        }
        if (diffs !== 1) continue;
        const r1 = (
          /* canonical-pipeline-allowed: dedup hash key, not a bigram pipeline */
          s1.map(phoneticValue).join("-")
        );
        const r2 = (
          /* canonical-pipeline-allowed: dedup hash key, not a bigram pipeline */
          s2.map(phoneticValue).join("-")
        );
        const key = [r1, r2].sort().join("|");
        if (seen.has(key)) continue;
        seen.add(key);
        const v1 = phoneticValue(s1[dPos]), v2 = phoneticValue(s2[dPos]);
        const p1 = parseSyllable(v1), p2 = parseSyllable(v2);
        let rel;
        if (p1.onset === p2.onset && p1.vowel === p2.vowel) rel = "allograph";
        else if (p1.onset === p2.onset && p1.vowel !== p2.vowel) rel = "same-C";
        else if (p1.onset !== p2.onset && p1.vowel === p2.vowel) rel = "same-V";
        else rel = "unrelated";
        pairs.push({ word1: r1, word2: r2, position: dPos, val1: v1, val2: v2, relationship: rel });
      }
    }
    return {
      pairs,
      sameConsonant: pairs.filter((p) => p.relationship === "same-C").length,
      sameVowel: pairs.filter((p) => p.relationship === "same-V").length,
      allograph: pairs.filter((p) => p.relationship === "allograph").length,
      unrelated: pairs.filter((p) => p.relationship === "unrelated").length,
      total: pairs.length
    };
  }
  function twoSidedElimination(sideA2, sideB2, { iterations = 1e4, seed = 2114159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);
    const rasmusValueMap = /* @__PURE__ */ new Map();
    for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
    const { bigrams: rasmusBigrams, wordLens: rasWordLens } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const allLangs = [
      ...LANGUAGES.map((l) => ({ id: l.id, name: l.name, words: l.words })),
      { id: "hittite", name: "Hittite", words: HITTITE_WORDS }
    ];
    return allLangs.map((lang, li) => {
      const isHittite = lang.id === "hittite";
      const discBigrams = isHittite ? rasmusBigrams : pdBigrams;
      const wordLens = isHittite ? rasWordLens : pdWordLens;
      const targetBigrams = buildTargetBigrams(lang.words);
      const overlap = [...discBigrams].filter((b) => targetBigrams.has(b)).length;
      const allSyls = [...new Set([...discBigrams, ...targetBigrams].flatMap((b) => b.split("-")))];
      const rng = mulberry32(seed + li);
      let excUp = 0, excLow = 0, sum = 0;
      for (let i = 0; i < iterations; i++) {
        const fake = /* @__PURE__ */ new Set();
        for (const len of wordLens) {
          const fw = [];
          for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
          for (const bg of ngramsOf(fw, 2)) fake.add(bg);
        }
        const ov = [...fake].filter((b) => targetBigrams.has(b)).length;
        sum += ov;
        if (ov >= overlap) excUp++;
        if (ov <= overlap) excLow++;
      }
      return {
        id: lang.id,
        name: lang.name,
        overlap,
        nullMean: sum / iterations,
        upperP: excUp / iterations,
        lowerP: excLow / iterations
      };
    });
  }
  function formalPowerCurve(sideA2, sideB2, { iterations = 1e4, seed = 2214159 } = {}) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const { bigrams: pdBigrams, wordLens } = buildPdBigramsFromWords(allWords);
    const subsetRng = mulberry32(seed ^ 1367130551);
    const shuffledLA = fisherYatesShuffle(LINEAR_A_WORDS, subsetRng);
    const corpusSizes = [15, 20, 25, 30, 34, 40, 50, 60, 72];
    const results = [];
    const rng = mulberry32(seed);
    for (const size of corpusSizes) {
      const langWords = shuffledLA.slice(0, Math.min(size, shuffledLA.length));
      const targetBigrams = buildTargetBigrams(langWords);
      const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap((b) => b.split("-")))];
      const nullDist = [];
      for (let i = 0; i < iterations; i++) {
        const fake = /* @__PURE__ */ new Set();
        for (const len of wordLens) {
          const fw = [];
          for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(rng() * allSyls.length)]);
          for (const bg of ngramsOf(fw, 2)) fake.add(bg);
        }
        nullDist.push([...fake].filter((b) => targetBigrams.has(b)).length);
      }
      nullDist.sort((a, b) => a - b);
      const mean = nullDist.reduce((s, v) => s + v, 0) / iterations;
      const sd = Math.sqrt(nullDist.reduce((s, v) => s + (v - mean) ** 2, 0) / iterations);
      const crit95 = nullDist[Math.floor(iterations * 0.95)];
      let minDetectable = null;
      for (let ov = crit95; ov <= crit95 + 20; ov++) {
        const below = nullDist.filter((v) => v < ov).length / iterations;
        if (below >= 0.8) {
          minDetectable = ov;
          break;
        }
      }
      results.push({
        corpusSize: size,
        effectiveSize: langWords.filter((tw) => syllabify(tw.w).length >= 2).length,
        nullMean: mean,
        nullSD: sd,
        critical95: crit95,
        minDetectable80: minDetectable ?? crit95 + 1
      });
    }
    return results;
  }
  function tokenWeightedOverlap(sideA2, sideB2, langWords) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords);
    const targetBigrams = buildTargetBigrams(langWords);
    const shared = [...pdBigrams].filter((b) => targetBigrams.has(b));
    const pdBigramTokens = /* @__PURE__ */ new Map();
    for (const seg of extractKnownPdSegments(allWords)) {
      for (const bg of ngramsOf(seg, 2)) {
        pdBigramTokens.set(bg, (pdBigramTokens.get(bg) ?? 0) + 1);
      }
    }
    const laBigramTokens = /* @__PURE__ */ new Map();
    for (const tw of langWords) {
      for (const bg of ngramsOf(syllabify(tw.w), 2)) {
        laBigramTokens.set(bg, (laBigramTokens.get(bg) ?? 0) + 1);
      }
    }
    const details = shared.map((bg) => ({
      bigram: bg,
      pdTokens: pdBigramTokens.get(bg) ?? 0,
      laTokens: laBigramTokens.get(bg) ?? 0
    })).sort((a, b) => b.pdTokens + b.laTokens - (a.pdTokens + a.laTokens));
    const totalPdTokens = details.reduce((s, d) => s + d.pdTokens, 0);
    const totalLaTokens = details.reduce((s, d) => s + d.laTokens, 0);
    return {
      sharedCount: shared.length,
      details,
      totalPdTokens,
      totalLaTokens
    };
  }
  function corpusCurationSensitivity(sideA2, sideB2, { trials = 200, seed = 2314159, mcIter = 1e4 } = {}) {
    const allWords = [...sideA2.words, ...sideB2.words];
    const { bigrams: pdBigrams, wordLens } = buildPdBigramsFromWords(allWords);
    const rng = mulberry32(seed);
    const excluded = LINEAR_A_EXCLUDED;
    const base = LINEAR_A_WORDS;
    const n = excluded.length;
    const overlaps = [];
    const pValues = [];
    for (let t = 0; t < trials; t++) {
      const subset = [...base];
      for (let i = 0; i < n; i++) {
        if (rng() < 0.5) subset.push(excluded[i]);
      }
      const targetBigrams = buildTargetBigrams(subset);
      const overlap = [...pdBigrams].filter((b) => targetBigrams.has(b)).length;
      const allSyls = [...new Set([...pdBigrams, ...targetBigrams].flatMap((b) => b.split("-")))];
      const mcRng = mulberry32(seed + 1 + t);
      let exc = 0;
      for (let i = 0; i < mcIter; i++) {
        const fake = /* @__PURE__ */ new Set();
        for (const len of wordLens) {
          const fw = [];
          for (let j = 0; j < len; j++) fw.push(allSyls[Math.floor(mcRng() * allSyls.length)]);
          for (const bg of ngramsOf(fw, 2)) fake.add(bg);
        }
        if ([...fake].filter((b) => targetBigrams.has(b)).length >= overlap) exc++;
      }
      const p = exc / mcIter;
      overlaps.push(overlap);
      pValues.push(p);
    }
    overlaps.sort((a, b) => a - b);
    pValues.sort((a, b) => a - b);
    const meanOv = overlaps.reduce((s, v) => s + v, 0) / trials;
    const meanP = pValues.reduce((s, v) => s + v, 0) / trials;
    const minP = pValues[0];
    const maxP = pValues[pValues.length - 1];
    const sigFraction = pValues.filter((p) => p < 0.05).length / trials;
    return {
      trials,
      mcIter,
      excludedCount: n,
      overlapRange: [overlaps[0], overlaps[overlaps.length - 1]],
      meanOverlap: meanOv,
      pValueRange: [minP, maxP],
      meanPValue: meanP,
      fractionSignificant: sigFraction
    };
  }
  function collectSyllablesFromBigrams(bigrams, into) {
    for (const b of bigrams) {
      for (const s of b.split("-")) into.add(s);
    }
  }
  function buildUniversalSyllablePool(allWords) {
    const { bigrams: pdB } = buildPdBigramsFromWords(allWords);
    const rasmusValueMap = /* @__PURE__ */ new Map();
    for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
    const { bigrams: rasB } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const syls = /* @__PURE__ */ new Set();
    collectSyllablesFromBigrams(pdB, syls);
    collectSyllablesFromBigrams(rasB, syls);
    for (const lang of LANGUAGES) {
      collectSyllablesFromBigrams(buildTargetBigrams(lang.words), syls);
    }
    collectSyllablesFromBigrams(buildTargetBigrams(HITTITE_WORDS), syls);
    return [...syls];
  }
  function fixedPoolComparison(sideA2, sideB2, { iterations = 1e4, seed = 2414159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);
    const rasmusValueMap = /* @__PURE__ */ new Map();
    for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
    const { bigrams: rasmusBigrams, wordLens: rasWordLens } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const universalPool = buildUniversalSyllablePool(allWords);
    const results = [];
    for (let li = 0; li < LANGUAGES.length; li++) {
      const lang = LANGUAGES[li];
      const targetBigrams = buildTargetBigrams(lang.words);
      const overlap = [...pdBigrams].filter((b) => targetBigrams.has(b)).length;
      const rng = mulberry32(seed + li);
      const pValue = runMcForLang(targetBigrams, overlap, universalPool, pdWordLens, rng, iterations);
      results.push({
        id: lang.id,
        name: lang.name,
        overlap,
        targetSize: targetBigrams.size,
        pValue
      });
    }
    const hitBigrams = buildTargetBigrams(HITTITE_WORDS);
    const hitOverlap = [...rasmusBigrams].filter((b) => hitBigrams.has(b)).length;
    const hitRng = mulberry32(seed + LANGUAGES.length);
    const hitP = runMcForLang(hitBigrams, hitOverlap, universalPool, rasWordLens, hitRng, iterations);
    results.push({
      id: "hittite",
      name: "Hittite (Rasmussen)",
      overlap: hitOverlap,
      targetSize: hitBigrams.size,
      pValue: hitP
    });
    results.sort((a, b) => a.pValue - b.pValue);
    return results;
  }
  function permutationFWER(sideA2, sideB2, { permutations = 1e3, mcPerPerm = 1e3, seed = 2514159 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const { bigrams: pdBigrams, wordLens: pdWordLens } = buildPdBigramsFromWords(allWords);
    const rasmusValueMap = /* @__PURE__ */ new Map();
    for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
    const { bigrams: rasmusBigrams, wordLens: rasWordLens } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
    const universalPool = buildUniversalSyllablePool(allWords);
    const allLangs = [
      ...LANGUAGES.map((l) => ({ id: l.id, name: l.name, words: l.words })),
      { id: "hittite", name: "Hittite", words: HITTITE_WORDS }
    ];
    const observedPs = [];
    for (let li = 0; li < allLangs.length; li++) {
      const lang = allLangs[li];
      const isHittite = lang.id === "hittite";
      const discBg = isHittite ? rasmusBigrams : pdBigrams;
      const discWl = isHittite ? rasWordLens : pdWordLens;
      const targetBigrams = buildTargetBigrams(lang.words);
      const overlap = [...discBg].filter((b) => targetBigrams.has(b)).length;
      const rng = mulberry32(seed + li);
      const p = runMcForLang(targetBigrams, overlap, universalPool, discWl, rng, mcPerPerm);
      observedPs.push(p);
    }
    const observedMinP = Math.min(...observedPs);
    let countLe = 0;
    for (let pi = 0; pi < permutations; pi++) {
      const permRng = mulberry32(seed + 1e4 + pi);
      const fake = /* @__PURE__ */ new Set();
      for (const len of pdWordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(universalPool[Math.floor(permRng() * universalPool.length)]);
        for (const bg of ngramsOf(fw, 2)) fake.add(bg);
      }
      const fakeRas = /* @__PURE__ */ new Set();
      for (const len of rasWordLens) {
        const fw = [];
        for (let j = 0; j < len; j++) fw.push(universalPool[Math.floor(permRng() * universalPool.length)]);
        for (const bg of ngramsOf(fw, 2)) fakeRas.add(bg);
      }
      let minPLoop = 1;
      for (let li = 0; li < allLangs.length; li++) {
        const lang = allLangs[li];
        const isHittite = lang.id === "hittite";
        const fakeBg = isHittite ? fakeRas : fake;
        const discWl = isHittite ? rasWordLens : pdWordLens;
        const targetBigrams = buildTargetBigrams(lang.words);
        const ov = [...fakeBg].filter((b) => targetBigrams.has(b)).length;
        const mcRng = mulberry32(seed + 2e5 + pi * allLangs.length + li);
        const p = runMcForLang(targetBigrams, ov, universalPool, discWl, mcRng, mcPerPerm);
        if (p < minPLoop) minPLoop = p;
      }
      if (minPLoop <= observedMinP) countLe++;
    }
    return {
      observedMinP,
      fwerP: countLe / permutations,
      permutations
    };
  }
  function jackknifeLangStability(sideA2, sideB2, { topN = 3 } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    const { bigrams: pdBigrams } = buildPdBigramsFromWords(allWords);
    const rasmusValueMap = /* @__PURE__ */ new Map();
    for (const [sign, val] of RASMUSSEN_PHONETIC) rasmusValueMap.set(sign, val);
    const { bigrams: rasmusBigrams } = buildPdBigramsFromWords(allWords, { includeDet: true, valueMap: rasmusValueMap });
    let bestThird = null;
    let bestOv = -1;
    for (const lang of LANGUAGES) {
      if (lang.id === "minoan" || lang.id === "luwian") continue;
      const t = buildTargetBigrams(lang.words);
      const ov = [...pdBigrams].filter((b) => t.has(b)).length;
      if (ov > bestOv || ov === bestOv && bestThird && lang.id < bestThird.id) {
        bestOv = ov;
        bestThird = lang;
      }
    }
    const specs = [
      { id: "hittite", name: "Hittite (Rasmussen)", words: HITTITE_WORDS, pdBigrams: rasmusBigrams },
      { id: "luwian", name: "Luwian (Anatolian)", words: LANGUAGES.find((l) => l.id === "luwian").words, pdBigrams },
      { id: bestThird.id, name: bestThird.name, words: bestThird.words, pdBigrams }
    ].slice(0, topN);
    const out = [];
    for (const spec of specs) {
      const targetFull = buildTargetBigrams(spec.words);
      const baseOverlap = [...spec.pdBigrams].filter((b) => targetFull.has(b)).length;
      const overlaps = [];
      for (let i = 0; i < spec.words.length; i++) {
        const subset = spec.words.filter((_, j) => j !== i);
        const tb = buildTargetBigrams(subset);
        overlaps.push([...spec.pdBigrams].filter((b) => tb.has(b)).length);
      }
      const minOverlap = overlaps.length ? Math.min(...overlaps) : baseOverlap;
      const maxOverlap = overlaps.length ? Math.max(...overlaps) : baseOverlap;
      const meanOverlap = overlaps.length ? overlaps.reduce((s, v) => s + v, 0) / overlaps.length : baseOverlap;
      const sensitive = minOverlap !== maxOverlap;
      out.push({
        id: spec.id,
        name: spec.name,
        baseOverlap,
        minOverlap,
        maxOverlap,
        meanOverlap,
        sensitive
      });
    }
    return out;
  }
  function signZeroTwoQeBinding(sideA2, sideB2, {
    iterations = 1e5,
    seed = 2614159,
    sign02 = 2,
    sign12 = 12
  } = {}) {
    const allWords = mergeAllWords(sideA2, sideB2);
    let s02InitialCount = 0;
    let s02FollowedByS12 = 0;
    let s12FollowerCount = 0;
    let totalFollowers = 0;
    for (const w of allWords) {
      const signs = w.signs.filter((x) => x != null);
      if (signs.length < 2) continue;
      if (signs[0] === sign02) {
        s02InitialCount++;
        if (signs[1] === sign12) s02FollowedByS12++;
      }
      for (let i = 0; i < signs.length - 1; i++) {
        totalFollowers++;
        if (signs[i + 1] === sign12) s12FollowerCount++;
      }
    }
    const expected = totalFollowers > 0 ? s02InitialCount * (s12FollowerCount / totalFollowers) : 0;
    const bindingRate = s02InitialCount > 0 ? s02FollowedByS12 / s02InitialCount : 0;
    const lift = expected > 0 ? s02FollowedByS12 / expected : 0;
    const exactP = hypergeomSf(totalFollowers, s12FollowerCount, s02InitialCount, s02FollowedByS12);
    const rng = mulberry32(seed);
    const N = totalFollowers;
    const K = s12FollowerCount;
    const n = s02InitialCount;
    let exc = 0;
    if (N > 0 && K > 0 && n > 0) {
      const idx = new Array(N);
      for (let i = 0; i < N; i++) idx[i] = i;
      for (let it = 0; it < iterations; it++) {
        for (let i = 0; i < K; i++) {
          const r = i + Math.floor(rng() * (N - i));
          const tmp = idx[i];
          idx[i] = idx[r];
          idx[r] = tmp;
        }
        let hits = 0;
        for (let i = 0; i < K; i++) if (idx[i] < n) hits++;
        if (hits >= s02FollowedByS12) exc++;
      }
    }
    const mcP = N > 0 ? exc / iterations : 1;
    return {
      s02InitialCount,
      s02FollowedByS12,
      s12FollowerCount,
      totalFollowers,
      bindingRate,
      expected,
      lift,
      exactP,
      mcP,
      iterations
    };
  }

  // app/js/mc-worker.mjs
  var sideA;
  var sideB;
  var parseOk = false;
  try {
    [sideA, sideB] = parseTranscription(TRANSCRIPTION_TEXT);
    parseOk = true;
  } catch (err) {
    self.postMessage({ type: "error", message: `Transcription parse error: ${err.message}` });
  }
  self.onmessage = function(e) {
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
        }
      });
      self.postMessage({ type: "result", ...result });
    }
    if (type === "run-sensitivity") {
      self.postMessage({ type: "progress", step: "Sign 02 determinative (default)", done: 0, total: 5 });
      const sign02det = singleLanguageMC(sideA, sideB, LINEAR_A_WORDS, { iterations, includeDet: false });
      self.postMessage({ type: "progress", step: "Sign 02 phonetic", done: 1, total: 5 });
      const sign02phon = singleLanguageMC(sideA, sideB, LINEAR_A_WORDS, {
        iterations,
        seed: 314160,
        includeDet: true,
        valueOverrides: /* @__PURE__ */ new Map([[2, "i"]])
      });
      self.postMessage({ type: "progress", step: "Sign 18 RJU sensitivity", done: 2, total: 5 });
      const sign18rju = singleLanguageMC(sideA, sideB, LINEAR_A_WORDS, {
        iterations,
        seed: 314161,
        valueOverrides: /* @__PURE__ */ new Map([[18, "rju"]])
      });
      self.postMessage({ type: "progress", step: "Circularity bias (uniform + freq-weighted)", done: 3, total: 5 });
      const circularity = circularityBiasTest(sideA, sideB, LINEAR_A_WORDS, { iterations });
      self.postMessage({ type: "progress", step: "Complete", done: 5, total: 5 });
      self.postMessage({
        type: "sensitivity-result",
        sign02det,
        sign02phon,
        sign18rju,
        circularity,
        iterations
      });
    }
    if (type === "run-extended") {
      const total = 29;
      self.postMessage({ type: "progress", step: "FW power analysis", done: 0, total });
      const power = fwPowerAnalysis(sideA, sideB, LINEAR_A_WORDS, { iterations });
      self.postMessage({ type: "progress", step: "Positive-control calibration (Greek)", done: 1, total });
      const calibration = positiveControlCalibration(sideA, sideB, {
        iterations: Math.max(1e3, Math.floor(iterations / 10))
      });
      self.postMessage({ type: "progress", step: "Corpus-size equalization", done: 2, total });
      const equalization = corpusSizeEqualization(sideA, sideB);
      self.postMessage({ type: "progress", step: "49-word LA corpus MC", done: 3, total });
      const fullCorpus = singleLanguageMC(sideA, sideB, LINEAR_A_FULL, {
        iterations,
        seed: 914159
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
        permutations: Math.max(500, Math.floor(iterations / 100))
      });
      self.postMessage({ type: "progress", step: "Effect size analysis", done: 11, total });
      const effectSize = effectSizeAnalysis(sideA, sideB, LINEAR_A_WORDS, { iterations });
      self.postMessage({ type: "progress", step: "Positional bigram analysis", done: 12, total });
      const positional = positionalBigramAnalysis(sideA, sideB, LINEAR_A_WORDS, { iterations });
      self.postMessage({ type: "progress", step: "Bootstrap confidence intervals", done: 13, total });
      const bootstrap = bootstrapOverlapCI(sideA, sideB, LINEAR_A_WORDS, {
        bootstraps: Math.max(1e3, Math.floor(iterations / 10))
      });
      self.postMessage({ type: "progress", step: "Trigram overlap test", done: 14, total });
      const trigram = trigramOverlapTest(sideA, sideB, LINEAR_A_WORDS, { iterations });
      self.postMessage({ type: "progress", step: "Entropy analysis", done: 15, total });
      const entropyResult = entropyAnalysis(sideA, sideB);
      self.postMessage({ type: "progress", step: "Two-sided elimination", done: 16, total });
      const twoSidedIter = Math.max(1e4, Math.floor(iterations / 10));
      const twoSided = twoSidedElimination(sideA, sideB, { iterations: twoSidedIter });
      self.postMessage({ type: "progress", step: "Bayes factors", done: 17, total });
      const bayes = bayesFactors(
        twoSided.map((r) => ({ id: r.id, name: r.name, pValue: r.upperP })),
        { iterations: twoSidedIter }
      );
      self.postMessage({ type: "progress", step: "Phonetic distance overlap", done: 18, total });
      const phonDist = phoneticDistanceOverlap(sideA, sideB, LINEAR_A_WORDS, {
        iterations: Math.max(5e3, Math.floor(iterations / 20))
      });
      self.postMessage({ type: "progress", step: "Reverse direction test", done: 19, total });
      const reverseDir = reverseDirectionTest(sideA, sideB, LINEAR_A_WORDS, { iterations });
      self.postMessage({ type: "progress", step: "Minimal-pair plausibility", done: 20, total });
      const minPairs = minimalPairPlausibility(sideA, sideB);
      self.postMessage({ type: "progress", step: "Formal power curve", done: 21, total });
      const powerCurve = formalPowerCurve(sideA, sideB, {
        iterations: Math.max(5e3, Math.floor(iterations / 20))
      });
      self.postMessage({ type: "progress", step: "Token-weighted bigram overlap", done: 22, total });
      const tokenWeighted = tokenWeightedOverlap(sideA, sideB, LINEAR_A_WORDS);
      self.postMessage({ type: "progress", step: "Corpus curation sensitivity", done: 23, total });
      const curationSens = corpusCurationSensitivity(sideA, sideB, {
        trials: Math.max(100, Math.floor(iterations / 500)),
        mcIter: Math.max(5e3, Math.floor(iterations / 10))
      });
      self.postMessage({ type: "progress", step: "Fixed-pool comparison", done: 24, total });
      const fixedPool = fixedPoolComparison(sideA, sideB, {
        iterations: Math.max(5e3, Math.floor(iterations / 20))
      });
      self.postMessage({ type: "progress", step: "Permutation FWER", done: 25, total });
      const fwer = permutationFWER(sideA, sideB, {
        permutations: Math.max(200, Math.floor(iterations / 500)),
        mcPerPerm: Math.max(500, Math.floor(iterations / 200))
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
        iterations
      });
    }
  };
})();
