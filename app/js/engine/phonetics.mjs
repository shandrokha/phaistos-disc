import { PHONETIC } from "./data.mjs";

export function phoneticValue(sign) {
  if (sign == null) return "??";
  const p = PHONETIC.get(sign);
  return p ? p.v : `?${sign}`;
}

export function phoneticWord(signs) {
  return signs.map(phoneticValue).join("-");
}

export function syllabify(word) {
  return word.split("-").filter(s => s.length > 0);
}

export function ngramsOf(syls, n) {
  const result = [];
  for (let i = 0; i <= syls.length - n; i++) {
    result.push(syls.slice(i, i + n).join("-"));
  }
  return result;
}

export function confLevel(sign) {
  if (sign == null) return "unknown";
  const p = PHONETIC.get(sign);
  if (!p) return "unknown";
  return p.c;
}

export function confTag(sign) {
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

export function confBar(signs) {
  return signs.map(confTag).join("");
}

// Classifies Daidalika-derived values only. Rasmussen values (CVC, VC, CCV)
// would need a more sophisticated classifier; they are not passed through this function.
export function cvStructure(sign) {
  if (sign == null) return "?";
  const p = PHONETIC.get(sign);
  if (!p) return "?";
  if (p.c === "det") return "DET";
  if (p.c === "none") return "?";
  const v = p.v;
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  return vowels.has(v[0]) ? "V" : "CV";
}
