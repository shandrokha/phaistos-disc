export function el(tag, attrs = {}, ...children) {
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

export function text(str) {
  return document.createTextNode(str);
}

export function clear(container) {
  for (const node of [...container.childNodes]) {
    if (node.nodeType === 1 && node.id === "live-region") continue;
    container.removeChild(node);
  }
}

export function table(headers, rows, { className = "data-table" } = {}) {
  const thead = el("thead", {},
    el("tr", {}, ...headers.map(h => {
      const attrs = {};
      if (typeof h === "object") {
        attrs.className = h.className || "";
        return el("th", attrs, h.label);
      }
      return el("th", {}, h);
    }))
  );

  const tbody = el("tbody", {},
    ...rows.map(cells =>
      el("tr", {}, ...cells.map(cell => {
        if (cell && typeof cell === "object" && cell.nodeType) {
          return el("td", {}, cell);
        }
        if (cell && typeof cell === "object" && cell.value !== undefined) {
          return el("td", { className: cell.className || "" }, String(cell.value));
        }
        return el("td", {}, String(cell ?? ""));
      }))
    )
  );

  return el("table", { className }, thead, tbody);
}

export function badge(label, variant = "default") {
  const classMap = {
    success: "sig",
    danger: "not-sig",
    default: "",
  };
  return el("span", { className: classMap[variant] || "" }, label);
}

export function progressBar(fraction) {
  const pct = Math.round(fraction * 100);
  const fill = el("div", { className: "progress-bar-fill" });
  fill.style.width = `${pct}%`;
  return el("div", {
    className: "progress-bar",
    role: "progressbar",
    "aria-valuenow": String(pct),
    "aria-valuemin": "0",
    "aria-valuemax": "100",
  }, fill);
}

export function resultCard(title, ...children) {
  return el("div", { className: "result-card" },
    el("h4", {}, title),
    ...children
  );
}

export function confClass(level) {
  const map = {
    "HIGH": "conf-high",
    "med-hi": "conf-med-hi",
    "med": "conf-med",
    "low-med": "conf-low-med",
    "low": "conf-low",
    "det": "conf-det",
    "none": "conf-none",
  };
  return map[level] || "conf-none";
}
