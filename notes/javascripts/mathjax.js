window.MathJax = {
  loader: {
    load: ["[tex]/boldsymbol", "[tex]/ams"]
  },
  tex: {
    packages: { "[+]": ["boldsymbol", "ams"] },
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex",
    enableMenu: false // Allow right-click for deepskills highlight menu
  }
};

document$.subscribe(() => {
  // Preserve original LaTeX source on each math element before typesetting
  document.querySelectorAll(".arithmatex").forEach((el, idx) => {
    if (!el.getAttribute("data-tex")) {
      el.setAttribute("data-tex", el.textContent.trim());
    }
    if (!el.getAttribute("data-math-index")) {
      el.setAttribute("data-math-index", String(idx));
    }
  });

  if (typeof MathJax !== "undefined" && MathJax.startup) {
    MathJax.startup.output.clearCache();
    MathJax.typesetClear();
    MathJax.texReset();
    MathJax.typesetPromise().then(() => {
      // Re-apply MathJax formula highlights after typesetting completes
      if (typeof window.__deepskills_restore_highlights === "function") {
        window.__deepskills_restore_highlights();
      }
    });
  }
});
