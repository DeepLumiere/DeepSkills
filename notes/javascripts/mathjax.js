window.MathJax = {
  tex: {
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
