/**
 * DeepSkills Study Tools Suite
 * Features:
 * 3. Global Study Hub (Cross-Chapter Highlights Aggregator & Exporter)
 * 5. Reading Experience (Progress Bar, Reading Time Badge, Zen/Focus Mode)
 * 6. Bookmarks & Recently Viewed History
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     State & Constants
     -------------------------------------------------------------------------- */
  const COLORS = [
    { name: "all",    label: "All",    hex: "var(--hl-ui-fg)" },
    { name: "yellow", label: "Yellow", hex: "#facc15" },
    { name: "green",  label: "Green",  hex: "#4ade80" },
    { name: "blue",   label: "Blue",   hex: "#38bdf8" },
    { name: "purple", label: "Purple", hex: "#c084fc" },
    { name: "pink",   label: "Pink",   hex: "#fb7185" }
  ];

  let activeColorFilter = "all";
  let activeSearchQuery = "";
  let activeBookmarksTab = "bookmarks"; // 'bookmarks' | 'history'

  // Modal elements
  let hubModal = null;
  let bookmarksModal = null;
  let progressBar = null;
  let zenExitBtn = null;

  /* --------------------------------------------------------------------------
     Storage Helpers: Normalization, Bookmarks, and History
     -------------------------------------------------------------------------- */
  function getCleanPath(path) {
    path = path || window.location.pathname || "/";
    return path.replace(/index\.html$/, "").replace(/\/+$/, "") || "/";
  }

  function getPageTitle() {
    const h1 = document.querySelector(".md-content h1, article h1");
    if (h1) {
      return h1.textContent.trim().replace(/^#+\s*/, "");
    }
    return document.title.replace(/\s*-\s*DeepSkills.*$/, "").trim() || "Notes";
  }

  // --- Bookmarks Storage ---
  function getBookmarks() {
    try {
      const data = localStorage.getItem("deepskills_bookmarks");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveBookmarks(list) {
    try {
      localStorage.setItem("deepskills_bookmarks", JSON.stringify(list));
      updateBookmarkIndicators();
    } catch (e) {}
  }

  function isCurrentPageBookmarked() {
    const current = getCleanPath();
    const bookmarks = getBookmarks();
    return bookmarks.some((b) => b.path === current);
  }

  function toggleCurrentPageBookmark() {
    const current = getCleanPath();
    const title = getPageTitle();
    let bookmarks = getBookmarks();

    if (bookmarks.some((b) => b.path === current)) {
      bookmarks = bookmarks.filter((b) => b.path !== current);
      showStudyToast("Bookmark removed");
    } else {
      bookmarks.unshift({
        path: current,
        title: title,
        bookmarkedAt: Date.now()
      });
      showStudyToast("Page bookmarked!");
    }
    saveBookmarks(bookmarks);
  }

  // --- Reading History Storage ---
  function getHistory() {
    try {
      const data = localStorage.getItem("deepskills_history");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function recordHistory() {
    const current = getCleanPath();
    const title = getPageTitle();
    if (!title || title === "Overview") return;

    let history = getHistory();
    // Remove if previously recorded so it moves to front
    history = history.filter((h) => h.path !== current);
    history.unshift({
      path: current,
      title: title,
      visitedAt: Date.now()
    });

    // Keep top 12 recent pages
    if (history.length > 12) history = history.slice(0, 12);
    try {
      localStorage.setItem("deepskills_history", JSON.stringify(history));
    } catch (e) {}
  }

  /* --------------------------------------------------------------------------
     Toast Notification Helper
     -------------------------------------------------------------------------- */
  function showStudyToast(msg) {
    let toast = document.getElementById("hl-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "hl-toast";
      toast.className = "hl-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("is-show");
    setTimeout(() => toast.classList.remove("is-show"), 2200);
  }

  /* --------------------------------------------------------------------------
     5.1 Reading Progress Bar
     -------------------------------------------------------------------------- */
  function initProgressBar() {
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.id = "st-reading-progress";
      document.body.appendChild(progressBar);
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgressBar();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  function updateProgressBar() {
    if (!progressBar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      progressBar.style.transform = "scaleX(0)";
      return;
    }
    const scrolled = Math.max(0, Math.min(1, window.scrollY / docHeight));
    progressBar.style.transform = `scaleX(${scrolled})`;
  }

  /* --------------------------------------------------------------------------
     5.2 Reading Time & Word Count Meta Badge
     -------------------------------------------------------------------------- */
  function injectReadingMeta() {
    const content = document.querySelector(".md-content .md-typeset");
    if (!content) return;

    const h1 = content.querySelector("h1");
    if (!h1) return;

    // Remove existing badge if present (on re-render)
    const existing = content.querySelector(".st-reading-meta");
    if (existing) existing.remove();

    // Extract text excluding code blocks & pre tags for accurate prose estimate
    const clone = content.cloneNode(true);
    clone.querySelectorAll("pre, code, .highlight, script, style, .arithmatex").forEach((el) => el.remove());
    const words = (clone.textContent || "")
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;

    const readTimeMinutes = Math.max(1, Math.round(words / 200));

    const meta = document.createElement("div");
    meta.className = "st-reading-meta";
    meta.innerHTML = `
      <span class="st-meta-item">⏱️ ${readTimeMinutes} min read</span>
      <span class="st-meta-divider"></span>
      <span class="st-meta-item">📝 ${words.toLocaleString()} words</span>
      <span class="st-meta-divider"></span>
      <button class="st-bookmark-toggle ${isCurrentPageBookmarked() ? "is-bookmarked" : ""}" title="Bookmark this page">
        <span>${isCurrentPageBookmarked() ? "★" : "☆"}</span>
        <span class="st-bm-label">${isCurrentPageBookmarked() ? "Bookmarked" : "Bookmark"}</span>
      </button>
    `;

    meta.querySelector(".st-bookmark-toggle").addEventListener("click", () => {
      toggleCurrentPageBookmark();
    });

    h1.insertAdjacentElement("afterend", meta);
  }

  /* --------------------------------------------------------------------------
     5.3 Focus / Zen Mode
     -------------------------------------------------------------------------- */
  function initZenMode() {
    if (!zenExitBtn) {
      zenExitBtn = document.createElement("button");
      zenExitBtn = document.createElement("button");
      zenExitBtn.id = "st-zen-exit";
      zenExitBtn.innerHTML = `<span>✕</span> Exit Zen Mode (Esc)`;
      document.body.appendChild(zenExitBtn);

      zenExitBtn.addEventListener("click", () => {
        exitZenMode();
      });
    }

    // Keyboard shortcut: Alt+Z to toggle, Esc to exit
    document.addEventListener("keydown", (e) => {
      if (e.altKey && (e.key === "z" || e.key === "Z")) {
        e.preventDefault();
        toggleZenMode();
      } else if (e.key === "Escape") {
        if (document.body.classList.contains("zen-mode")) {
          exitZenMode();
        }
        closeAllModals();
      } else if (e.altKey && (e.key === "h" || e.key === "H")) {
        e.preventDefault();
        openStudyHubModal();
      } else if (e.altKey && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        openBookmarksModal();
      }
    });
  }

  function toggleZenMode() {
    if (document.body.classList.contains("zen-mode")) {
      exitZenMode();
    } else {
      enterZenMode();
    }
  }

  function enterZenMode() {
    document.body.classList.add("zen-mode");
    closeAllModals();
    showStudyToast("Zen Mode: Active (Press Esc to exit)");
  }

  function exitZenMode() {
    document.body.classList.remove("zen-mode");
    showStudyToast("Exited Zen Mode");
  }

  /* --------------------------------------------------------------------------
     6. Bookmarks & History Modal Management
     -------------------------------------------------------------------------- */
  function buildBookmarksModal() {
    if (document.getElementById("st-bookmarks-modal")) return;

    bookmarksModal = document.createElement("div");
    bookmarksModal.id = "st-bookmarks-modal";
    bookmarksModal.className = "st-modal-backdrop";
    bookmarksModal.innerHTML = `
      <div class="st-modal">
        <div class="st-modal-header">
          <div class="st-modal-title">
            <span>🔖</span> Bookmarks & Recent History
          </div>
          <button class="st-modal-close" title="Close">✕</button>
        </div>
        <div class="st-tabs">
          <button class="st-tab-btn is-active" data-tab="bookmarks">
            ★ Bookmarks (<span class="st-bm-count">0</span>)
          </button>
          <button class="st-tab-btn" data-tab="history">
            🕒 Recently Viewed
          </button>
        </div>
        <div class="st-modal-body st-bookmarks-list"></div>
        <div class="st-modal-footer">
          <button class="st-btn st-btn-clear-tab st-btn-danger">
            <span>🗑️</span> Clear
          </button>
          <button class="st-btn st-btn-close-modal">Done</button>
        </div>
      </div>
    `;

    document.body.appendChild(bookmarksModal);

    bookmarksModal.querySelector(".st-modal-close").addEventListener("click", closeAllModals);
    bookmarksModal.querySelector(".st-btn-close-modal").addEventListener("click", closeAllModals);
    bookmarksModal.addEventListener("click", (e) => {
      if (e.target === bookmarksModal) closeAllModals();
    });

    // Tab switching
    bookmarksModal.querySelectorAll(".st-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        bookmarksModal.querySelectorAll(".st-tab-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeBookmarksTab = btn.getAttribute("data-tab");
        renderBookmarksModalContent();
      });
    });

    // Clear active tab
    bookmarksModal.querySelector(".st-btn-clear-tab").addEventListener("click", () => {
      if (activeBookmarksTab === "bookmarks") {
        if (confirm("Clear all bookmarked pages?")) {
          saveBookmarks([]);
          renderBookmarksModalContent();
          showStudyToast("Bookmarks cleared");
        }
      } else {
        if (confirm("Clear reading history?")) {
          localStorage.removeItem("deepskills_history");
          renderBookmarksModalContent();
          showStudyToast("History cleared");
        }
      }
    });
  }

  function formatRelativeTime(timestamp) {
    if (!timestamp) return "";
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  function renderBookmarksModalContent() {
    if (!bookmarksModal) return;
    const container = bookmarksModal.querySelector(".st-bookmarks-list");
    const bmCountEl = bookmarksModal.querySelector(".st-bm-count");
    const bookmarks = getBookmarks();
    if (bmCountEl) bmCountEl.textContent = bookmarks.length;

    if (activeBookmarksTab === "bookmarks") {
      if (bookmarks.length === 0) {
        container.innerHTML = `
          <div class="st-empty-state">
            <span>☆</span>
            No bookmarked pages yet.<br>Click "Bookmark" on any chapter to pin it here!
          </div>
        `;
        return;
      }

      container.innerHTML = bookmarks
        .map(
          (b, i) => `
          <div class="st-list-item">
            <div class="st-item-info">
              <a href="${b.path}" class="st-item-title">${b.title}</a>
              <span class="st-item-sub">Saved ${formatRelativeTime(b.bookmarkedAt)} • ${b.path}</span>
            </div>
            <button class="st-row-del" data-del-bm="${b.path}" title="Remove bookmark">✕</button>
          </div>
        `
        )
        .join("");

      container.querySelectorAll("[data-del-bm]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const targetPath = btn.getAttribute("data-del-bm");
          const updated = getBookmarks().filter((b) => b.path !== targetPath);
          saveBookmarks(updated);
          renderBookmarksModalContent();
        });
      });
    } else {
      // History Tab
      const history = getHistory();
      if (history.length === 0) {
        container.innerHTML = `
          <div class="st-empty-state">
            <span>🕒</span>
            No recent history recorded yet.
          </div>
        `;
        return;
      }

      container.innerHTML = history
        .map(
          (h) => `
          <div class="st-list-item">
            <div class="st-item-info">
              <a href="${h.path}" class="st-item-title">${h.title}</a>
              <span class="st-item-sub">Visited ${formatRelativeTime(h.visitedAt)} • ${h.path}</span>
            </div>
          </div>
        `
        )
        .join("");
    }
  }

  function openBookmarksModal() {
    buildBookmarksModal();
    renderBookmarksModalContent();
    bookmarksModal.classList.add("is-open");
  }

  function updateBookmarkIndicators() {
    const isBm = isCurrentPageBookmarked();
    const btnMeta = document.querySelector(".st-bookmark-toggle");
    if (btnMeta) {
      btnMeta.classList.toggle("is-bookmarked", isBm);
      btnMeta.querySelector("span").textContent = isBm ? "★" : "☆";
      btnMeta.querySelector(".st-bm-label").textContent = isBm ? "Bookmarked" : "Bookmark";
    }

    const headerBtn = document.getElementById("st-btn-bookmarks");
    if (headerBtn) {
      const count = getBookmarks().length;
      let badge = headerBtn.querySelector(".st-header-btn-badge");
      if (count > 0) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "st-header-btn-badge";
          headerBtn.appendChild(badge);
        }
        badge.textContent = count;
      } else if (badge) {
        badge.remove();
      }
    }
  }

  /* --------------------------------------------------------------------------
     3. Global Study Hub (All Highlights Across All Chapters)
     -------------------------------------------------------------------------- */
  function getAllSiteHighlights() {
    const chapters = [];
    const history = getHistory();
    const historyMap = {};
    history.forEach((h) => (historyMap[h.path] = h.title));

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("deepskills_hl:")) {
        const path = key.replace("deepskills_hl:", "");
        try {
          const highlights = JSON.parse(localStorage.getItem(key)) || [];
          if (highlights.length > 0) {
            // Derive clean chapter title from history or path slug
            let title = historyMap[path];
            if (!title) {
              const parts = path.split("/").filter(Boolean);
              const last = parts[parts.length - 1] || "Overview";
              title = last
                .replace(/_/g, " ")
                .replace(/^(\d+)/, "$1.")
                .replace(/\b\w/g, (c) => c.toUpperCase());
            }

            chapters.push({
              path: path,
              title: title,
              highlights: highlights
            });
          }
        } catch (e) {}
      }
    }

    return chapters;
  }

  function buildStudyHubModal() {
    if (document.getElementById("st-hub-modal")) return;

    hubModal = document.createElement("div");
    hubModal.id = "st-hub-modal";
    hubModal.className = "st-modal-backdrop";
    hubModal.innerHTML = `
      <div class="st-modal">
        <div class="st-modal-header">
          <div class="st-modal-title">
            <span>🌐</span> Global Study Hub
            <span class="st-modal-badge st-hub-total">0 Highlights</span>
          </div>
          <button class="st-modal-close" title="Close">✕</button>
        </div>

        <div class="st-modal-controls">
          <input type="text" class="st-search-input st-hub-search" placeholder="Search highlights across all chapters..." />
          <div class="st-filter-chips">
            ${COLORS.map(
              (c) => `
              <button class="st-filter-chip ${c.name === "all" ? "is-active" : ""}" 
                      data-color="${c.name}" 
                      style="background-color: ${c.hex};" 
                      title="Filter by ${c.label}">
              </button>
            `
            ).join("")}
          </div>
        </div>

        <div class="st-modal-body st-hub-content"></div>

        <div class="st-modal-footer">
          <div class="st-footer-actions">
            <button class="st-btn st-btn-copy-all" title="Copy all highlights as a Markdown cheat sheet">
              <span>📋</span> Copy All (.md)
            </button>
            <button class="st-btn st-btn-dl-md" title="Download Markdown file">
              <span>💾</span> Download Notes
            </button>
          </div>
          <button class="st-btn st-btn-danger st-btn-clear-all-hl" title="Clear all site highlights">
            <span>🗑️</span> Clear All
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(hubModal);

    hubModal.querySelector(".st-modal-close").addEventListener("click", closeAllModals);
    hubModal.addEventListener("click", (e) => {
      if (e.target === hubModal) closeAllModals();
    });

    // Search input
    hubModal.querySelector(".st-hub-search").addEventListener("input", (e) => {
      activeSearchQuery = e.target.value.toLowerCase().trim();
      renderStudyHubContent();
    });

    // Color filter chips
    hubModal.querySelectorAll(".st-filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        hubModal.querySelectorAll(".st-filter-chip").forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        activeColorFilter = chip.getAttribute("data-color");
        renderStudyHubContent();
      });
    });

    // Actions
    hubModal.querySelector(".st-btn-copy-all").addEventListener("click", exportAllHighlightsToClipboard);
    hubModal.querySelector(".st-btn-dl-md").addEventListener("click", downloadHighlightsMarkdownFile);
    hubModal.querySelector(".st-btn-clear-all-hl").addEventListener("click", clearAllSiteHighlights);
  }

  function renderStudyHubContent() {
    if (!hubModal) return;
    const container = hubModal.querySelector(".st-hub-content");
    const totalEl = hubModal.querySelector(".st-hub-total");

    const chapters = getAllSiteHighlights();
    let totalCount = 0;
    let filteredChapters = [];

    chapters.forEach((ch) => {
      totalCount += ch.highlights.length;

      // Filter by color and search query
      const matching = ch.highlights.filter((hl) => {
        const matchesColor = activeColorFilter === "all" || hl.color === activeColorFilter;
        const matchesSearch = !activeSearchQuery || hl.text.toLowerCase().includes(activeSearchQuery);
        return matchesColor && matchesSearch;
      });

      if (matching.length > 0) {
        filteredChapters.push({
          path: ch.path,
          title: ch.title,
          highlights: matching
        });
      }
    });

    totalEl.textContent = `${totalCount} Highlights across ${chapters.length} Chapters`;

    if (filteredChapters.length === 0) {
      container.innerHTML = `
        <div class="st-empty-state">
          <span>🔍</span>
          ${
            chapters.length === 0
              ? "No highlights recorded yet across the site.<br>Select any text or right-click formulas to start highlighting!"
              : "No highlights match your current filter or search query."
          }
        </div>
      `;
      return;
    }

    container.innerHTML = filteredChapters
      .map(
        (ch) => `
        <div class="st-chapter-card">
          <div class="st-chapter-header">
            <a href="${ch.path}" class="st-chapter-link">
              <span>📖</span> ${ch.title}
            </a>
            <span class="st-chapter-count">${ch.highlights.length} highlight${ch.highlights.length === 1 ? "" : "s"}</span>
          </div>
          <div class="st-highlights-list">
            ${ch.highlights
              .map(
                (hl) => `
              <div class="st-highlight-row">
                <span class="hl-item-dot dot-${hl.color}"></span>
                <div class="st-row-quote">
                  <a href="${ch.path}" class="st-row-link">${hl.isMath ? "📐 " : ""} "${hl.text}"</a>
                </div>
                <button class="st-row-del" data-del-hl-id="${hl.id}" data-del-path="${ch.path}" title="Delete highlight">✕</button>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
      )
      .join("");

    // Wire up delete buttons
    container.querySelectorAll("[data-del-hl-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-del-hl-id");
        const path = btn.getAttribute("data-del-path");
        deleteHighlightFromPath(path, id);
        renderStudyHubContent();
        showStudyToast("Highlight removed");
      });
    });
  }

  function deleteHighlightFromPath(path, id) {
    const key = "deepskills_hl:" + path;
    try {
      let list = JSON.parse(localStorage.getItem(key)) || [];
      list = list.filter((item) => item.id !== id);
      localStorage.setItem(key, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("deepskills:highlights-updated"));
    } catch (e) {}
  }

  function clearAllSiteHighlights() {
    if (!confirm("Are you sure you want to delete ALL highlights across the entire site? This cannot be undone.")) {
      return;
    }
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("deepskills_hl:")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    window.dispatchEvent(new CustomEvent("deepskills:highlights-updated"));
    renderStudyHubContent();
    showStudyToast("All site highlights cleared");
  }

  function generateFullMarkdownSummary() {
    const chapters = getAllSiteHighlights();
    const lines = [
      `# DeepSkills - Comprehensive Revision Notes & Highlights`,
      `*Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}*\n`,
      `---`
    ];

    chapters.forEach((ch) => {
      lines.push(`\n## 📖 ${ch.title}`);
      lines.push(`*Source: ${ch.path}*\n`);
      ch.highlights.forEach((hl, i) => {
        lines.push(`${i + 1}. **[${hl.color.toUpperCase()}${hl.isMath ? " - Math" : ""}]** "${hl.text}"`);
      });
    });

    return lines.join("\n");
  }

  function exportAllHighlightsToClipboard() {
    const md = generateFullMarkdownSummary();
    navigator.clipboard
      .writeText(md)
      .then(() => showStudyToast("All highlights copied to clipboard!"))
      .catch(() => showStudyToast("Failed to copy notes"));
  }

  function downloadHighlightsMarkdownFile() {
    const md = generateFullMarkdownSummary();
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DeepSkills_Revision_Notes_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStudyToast("Downloaded revision notes!");
  }

  function openStudyHubModal() {
    buildStudyHubModal();
    renderStudyHubContent();
    hubModal.classList.add("is-open");
  }

  function closeAllModals() {
    if (hubModal) hubModal.classList.remove("is-open");
    if (bookmarksModal) bookmarksModal.classList.remove("is-open");
  }

  /* --------------------------------------------------------------------------
     Inject Header Buttons
     -------------------------------------------------------------------------- */
  function injectHeaderButtons() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner || document.getElementById("st-header-actions")) return;

    const actions = document.createElement("div");
    actions.id = "st-header-actions";
    actions.className = "st-header-actions";
    actions.innerHTML = `
      <button class="st-header-btn" id="st-btn-hub" title="Global Study Hub (Alt+H)">
        <span>🌐</span>
      </button>
      <button class="st-header-btn" id="st-btn-bookmarks" title="Bookmarks & History (Alt+B)">
        <span>🔖</span>
      </button>
      <button class="st-header-btn" id="st-btn-zen" title="Zen Focus Mode (Alt+Z)">
        <span>🧘</span>
      </button>
    `;

    // Insert right before repo source link or search
    const sourceEl = headerInner.querySelector(".md-header__source");
    if (sourceEl) {
      headerInner.insertBefore(actions, sourceEl);
    } else {
      headerInner.appendChild(actions);
    }

    actions.querySelector("#st-btn-hub").addEventListener("click", openStudyHubModal);
    actions.querySelector("#st-btn-bookmarks").addEventListener("click", openBookmarksModal);
    actions.querySelector("#st-btn-zen").addEventListener("click", toggleZenMode);

    updateBookmarkIndicators();
  }

  /* --------------------------------------------------------------------------
     Hook into Bottom-Right Highlights Drawer
     -------------------------------------------------------------------------- */
  function hookIntoHighlightsDrawer() {
    const drawer = document.getElementById("hl-drawer");
    if (!drawer) return;

    const footer = drawer.querySelector(".hl-drawer-footer");
    if (footer && !footer.querySelector(".btn-hub-link")) {
      const hubBtn = document.createElement("button");
      hubBtn.className = "hl-footer-btn btn-hub-link";
      hubBtn.title = "View all highlights across all chapters";
      hubBtn.innerHTML = `<span>🌐</span> Study Hub`;
      hubBtn.addEventListener("click", () => {
        openStudyHubModal();
      });
      footer.insertBefore(hubBtn, footer.firstChild);
    }
  }

  /* --------------------------------------------------------------------------
     Lifecycle & Init
     -------------------------------------------------------------------------- */
  function onPageLoad() {
    initProgressBar();
    injectReadingMeta();
    injectHeaderButtons();
    hookIntoHighlightsDrawer();
    recordHistory();
    updateProgressBar();
    updateBookmarkIndicators();
  }

  // React to highlights updates
  window.addEventListener("deepskills:highlights-updated", () => {
    if (hubModal && hubModal.classList.contains("is-open")) {
      renderStudyHubContent();
    }
  });

  initZenMode();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onPageLoad);
  } else {
    onPageLoad();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
      onPageLoad();
    });
  } else if (typeof location$ !== "undefined") {
    location$.subscribe(() => {
      onPageLoad();
    });
  }
})();
