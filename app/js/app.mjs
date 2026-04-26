import { TRANSCRIPTION_TEXT } from "./engine/data.mjs";
import { parseTranscription } from "./engine/parser.mjs";
import { initRouter, setActiveLink } from "./router.mjs";
import { clear } from "./dom.mjs";

import { render as renderOverview } from "./sections/overview.mjs";
import { render as renderReading } from "./sections/reading.mjs";
import { render as renderValidation } from "./sections/validation.mjs";
import { render as renderMorphology } from "./sections/morphology.mjs";
import { render as renderComparison } from "./sections/comparison.mjs";
import { render as renderSensitivity } from "./sections/sensitivity.mjs";
import { render as renderDavis } from "./sections/davis.mjs";
import { render as renderMethodology } from "./sections/methodology.mjs";
import { render as renderExtended } from "./sections/extended.mjs";

const sections = {
  overview: renderOverview,
  reading: renderReading,
  validation: renderValidation,
  morphology: renderMorphology,
  comparison: renderComparison,
  sensitivity: renderSensitivity,
  extended: renderExtended,
  davis: renderDavis,
  methodology: renderMethodology,
};

let sideA, sideB;
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
  if (!Number.isFinite(raw) || raw < 1000) return 100000;
  return Math.floor(Math.min(raw, 10_000_000));
}

const ctx = {
  sideA,
  sideB,
  getIterations,
  announce,
};

const cache = new Map();

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
