/* global Chart */

export function createBarChart(canvas, { labels, datasets, title, yLabel, xLabel, yMax, threshold }) {
  if (typeof Chart === "undefined") {
    canvas.parentElement?.insertAdjacentHTML("afterbegin",
      '<p class="text-hint">Chart unavailable (Chart.js failed to load from CDN).</p>');
    return null;
  }
  const plugins = {
    legend: { display: datasets.length > 1, position: "top" },
    title: title ? { display: true, text: title, font: { size: 13, family: "Georgia, serif" } } : { display: false },
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
        font: { size: 11 },
      },
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
          ticks: { callback: v => v.toFixed(2) },
        },
        x: {
          title: { display: !!xLabel, text: xLabel },
        },
      },
    },
  });
}

export function createHistogram(canvas, { labels, data, title, xLabel, yLabel, highlightIndex }) {
  if (typeof Chart === "undefined") {
    canvas.parentElement?.insertAdjacentHTML("afterbegin",
      '<p class="text-hint">Chart unavailable (Chart.js failed to load from CDN).</p>');
    return null;
  }
  const colors = data.map((_, i) => i === highlightIndex ? "#2e7d32" : "#78909c");

  return new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Count",
        data,
        backgroundColor: colors,
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        title: title ? { display: true, text: title, font: { size: 13, family: "Georgia, serif" } } : { display: false },
      },
      scales: {
        y: { title: { display: !!yLabel, text: yLabel } },
        x: { title: { display: !!xLabel, text: xLabel } },
      },
    },
  });
}

export function destroyChart(chartInstance) {
  if (chartInstance) chartInstance.destroy();
}
