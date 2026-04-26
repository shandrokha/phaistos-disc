function parseWord(raw) {
  raw = raw.replaceAll("^", " ").trim();
  if (!raw) return { signs: [], hasObliqueStroke: false };

  let hasObliqueStroke = raw.endsWith("/");
  if (hasObliqueStroke) raw = raw.slice(0, -1).trimEnd();

  const tokens = raw
    .split(/\s+/g)
    .filter((t) => t.length > 0 && t !== "¦");

  const signs = tokens.map((t) => {
    if (t === "??") return null;
    if (/^\d{2}$/.test(t)) return Number.parseInt(t, 10);
    throw new Error(`Unexpected token: ${JSON.stringify(t)}`);
  });

  return { signs, hasObliqueStroke };
}

export function parseTranscription(text) {
  const lines = text
    .split(/\r?\n/g)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"));

  const joined = lines.join(" ");
  const parts = joined
    .split("¦")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (parts.length !== 2) {
    throw new Error(`Expected 2 sides, got ${parts.length}`);
  }

  function parseSide(label, text) {
    const rawWords = text.split("|").map((w) => w.trim()).filter(Boolean);
    const words = rawWords.map(parseWord);
    return { label, words };
  }

  return [parseSide("A", parts[0]), parseSide("B", parts[1])];
}
