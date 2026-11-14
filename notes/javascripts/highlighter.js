/**
 * DeepSkills Note Highlighter
 * Enables text & MathJax formula highlighting, recoloring, persistence via localStorage,
 * 1-second auto-trigger on selection, right-click context menu access, and highlights drawer.
 */

(function () {
  "use strict";

  const COLORS = [
    { name: "yellow", label: "Yellow", hex: "#facc15" },
    { name: "green",  label: "Green",  hex: "#4ade80" },
    { name: "blue",   label: "Blue",   hex: "#38bdf8" },
    { name: "purple", label: "Purple", hex: "#c084fc" },
    { name: "pink",   label: "Pink",   hex: "#fb7185" }
  ];

  let activeRange = null;
  let activeTargetMath = null;
  let activeHighlightId = null;
  let selectionTimer = null;
  let uiInitialized = false;

  // DOM Elements for UI
  let selectionToolbar = null;
  let clickPopover = null;
  let fabButton = null;
  let drawer = null;
  let toastEl = null;

  /* --------------------------------------------------------------------------
     Helper: Storage & Paths
     -------------------------------------------------------------------------- */
  function getStorageKey() {
    let path = window.location.pathname || "/";
    path = path.replace(/index\.html$/, "").replace(/\/+$/, "") || "/";
    return "deepskills_hl:" + path;
  }

  function getStoredHighlights() {
    try {
      const data = localStorage.getItem(getStorageKey());
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Highlighter storage error:", e);
      return [];
    }
  }

  function saveStoredHighlights(list) {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("deepskills:highlights-updated"));
    } catch (e) {
      console.warn("Highlighter storage error:", e);
    }
  }

  function getContentContainer() {
    return (
      document.querySelector(".md-content__inner") ||
      document.querySelector(".md-typeset") ||
      document.querySelector("article") ||
      document.body
    );
  }

  /* --------------------------------------------------------------------------
     Toast Notifications
     -------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("is-show");
    }, 2200);
  }

  /* --------------------------------------------------------------------------
     DOM Text Wrapping & Range Helpers (Handles Normal Text & MathJax Spans)
     -------------------------------------------------------------------------- */
  function createMarkElement(id, color, text) {
    const mark = document.createElement("mark");
    mark.className = `user-highlight hl-${color}`;
    mark.setAttribute("data-highlight-id", id);
    mark.textContent = text;
    return mark;
  }

  function wrapRangeWithHighlight(range, id, color) {
    const root = range.commonAncestorContainer;

    // Single text node selection
    if (
      range.startContainer === range.endContainer &&
      range.startContainer.nodeType === Node.TEXT_NODE
    ) {
      const textNode = range.startContainer;
      const text = textNode.textContent;
      const before = text.substring(0, range.startOffset);
      const selected = text.substring(range.startOffset, range.endOffset);
      const after = text.substring(range.endOffset);

      const mark = createMarkElement(id, color, selected);
      const parent = textNode.parentNode;

      if (after) {
        parent.insertBefore(document.createTextNode(after), textNode.nextSibling);
      }
      parent.insertBefore(mark, textNode.nextSibling);

      if (before) {
        textNode.textContent = before;
      } else {
        parent.removeChild(textNode);
      }
      return [mark];
    }

    // Check if range intersects any .arithmatex math elements
    const container = getContentContainer();
    const mathInContainer = container.querySelectorAll(".arithmatex, mjx-container");
    mathInContainer.forEach((mEl) => {
      try {
        if (range.intersectsNode(mEl)) {
          const target = mEl.closest(".arithmatex") || mEl;
          target.classList.add("user-highlight", `hl-${color}`);
          target.setAttribute("data-highlight-id", id);
        }
      } catch (e) {}
    });

    // Multi-node selection: collect intersecting text nodes outside MathJax internals
    const walker = document.createTreeWalker(
      root.nodeType === Node.TEXT_NODE ? root.parentNode : root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!range.intersectsNode(node)) return NodeFilter.FILTER_REJECT;
          if (
            node.parentElement &&
            (node.parentElement.closest(".hl-floating-ui") ||
              node.parentElement.closest(".hl-fab") ||
              node.parentElement.closest(".hl-drawer") ||
              node.parentElement.closest(".arithmatex") ||
              node.parentElement.closest("mjx-container"))
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      textNodes.push(currentNode);
    }

    const marks = [];
    for (const node of textNodes) {
      let start = 0;
      let end = node.textContent.length;
      if (node === range.startContainer) start = range.startOffset;
      if (node === range.endContainer) end = range.endOffset;
      if (start >= end) continue;

      const text = node.textContent;
      const before = text.substring(0, start);
      const selected = text.substring(start, end);
      const after = text.substring(end);

      const mark = createMarkElement(id, color, selected);
      marks.push(mark);

      const parent = node.parentNode;
      if (after) {
        parent.insertBefore(document.createTextNode(after), node.nextSibling);
      }
      parent.insertBefore(mark, node.nextSibling);

      if (before) {
        node.textContent = before;
      } else {
        parent.removeChild(node);
      }
    }
    return marks;
  }

  /* --------------------------------------------------------------------------
     Context Extraction for Robust Serialization
     -------------------------------------------------------------------------- */
  function getContextForRange(range) {
    let prefix = "";
    let suffix = "";
    try {
      const container = getContentContainer();
      const preRange = range.cloneRange();
      preRange.collapse(true);
      preRange.setStart(container, 0);
      prefix = preRange.toString().slice(-35);

      const postRange = range.cloneRange();
      postRange.collapse(false);
      postRange.setEnd(container, container.childNodes.length);
      suffix = postRange.toString().slice(0, 35);
    } catch (e) {}
    return { prefix, suffix };
  }

  function getContextForElement(el) {
    let prefix = "";
    let suffix = "";
    try {
      const container = getContentContainer();
      const range = document.createRange();
      range.selectNode(el);

      const preRange = range.cloneRange();
      preRange.collapse(true);
      preRange.setStart(container, 0);
      prefix = preRange.toString().slice(-35);

      const postRange = range.cloneRange();
      postRange.collapse(false);
      postRange.setEnd(container, container.childNodes.length);
      suffix = postRange.toString().slice(0, 35);
    } catch (e) {}
    return { prefix, suffix };
  }

  /* --------------------------------------------------------------------------
     Fuzzy / Context Text Search in DOM for Restoration
     -------------------------------------------------------------------------- */
  function findRangeByQuote(root, text, prefix, suffix) {
    if (!text) return null;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (
          node.parentElement &&
          (node.parentElement.closest(".hl-floating-ui") ||
            node.parentElement.closest(".hl-fab") ||
            node.parentElement.closest(".hl-drawer") ||
            node.parentElement.tagName === "SCRIPT" ||
            node.parentElement.tagName === "STYLE")
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let node;
    let fullDocText = "";
    const nodeMap = [];

    while ((node = walker.nextNode())) {
      const val = node.nodeValue;
      const start = fullDocText.length;
      fullDocText += val;
      nodeMap.push({
        node: node,
        start: start,
        end: fullDocText.length
      });
    }

    let targetIndex = -1;

    // Strategy 1: Exact prefix + text + suffix
    if (prefix || suffix) {
      const pattern = (prefix || "") + text + (suffix || "");
      const idx = fullDocText.indexOf(pattern);
      if (idx !== -1) {
        targetIndex = idx + (prefix ? prefix.length : 0);
      }
    }

    // Strategy 2: Prefix + text
    if (targetIndex === -1 && prefix) {
      const pattern = prefix + text;
      const idx = fullDocText.indexOf(pattern);
      if (idx !== -1) {
        targetIndex = idx + prefix.length;
      }
    }

    // Strategy 3: Text + suffix
    if (targetIndex === -1 && suffix) {
      const pattern = text + suffix;
      const idx = fullDocText.indexOf(pattern);
      if (idx !== -1) {
        targetIndex = idx;
      }
    }

    // Strategy 4: Fallback to exact text
    if (targetIndex === -1) {
      targetIndex = fullDocText.indexOf(text);
    }

    if (targetIndex === -1) return null;

    const targetEnd = targetIndex + text.length;
    const range = document.createRange();
    let startSet = false;
    let endSet = false;

    for (let i = 0; i < nodeMap.length; i++) {
      const item = nodeMap[i];
      if (!startSet && targetIndex >= item.start && targetIndex <= item.end) {
        range.setStart(item.node, targetIndex - item.start);
        startSet = true;
      }
      if (!endSet && targetEnd >= item.start && targetEnd <= item.end) {
        range.setEnd(item.node, targetEnd - item.start);
        endSet = true;
        break;
      }
    }

    return startSet && endSet ? range : null;
  }

  /* --------------------------------------------------------------------------
     Core Highlight Operations (Add, Remove, Recoloring, Restoration)
     -------------------------------------------------------------------------- */
  function addHighlight(range, color) {
    if (!range) return;
    const text = range.toString().trim();
    if (!text) return;

    const id = "hl_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
    const { prefix, suffix } = getContextForRange(range);

    wrapRangeWithHighlight(range, id, color);

    const list = getStoredHighlights();
    list.push({
      id: id,
      color: color,
      text: text,
      isMath: false,
      prefix: prefix,
      suffix: suffix,
      createdAt: Date.now()
    });
    saveStoredHighlights(list);

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    hideSelectionToolbar();
    updateUIState();
    showToast("Highlighted!");
  }

  function addMathHighlight(mathEl, color) {
    if (!mathEl) return;
    const target = mathEl.closest(".arithmatex") || mathEl;
    const id = "hl_math_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);

    target.classList.add("user-highlight", `hl-${color}`);
    target.setAttribute("data-highlight-id", id);
    target.setAttribute("data-is-math", "true");

    const text = target.textContent.trim();
    const { prefix, suffix } = getContextForElement(target);

    const list = getStoredHighlights();
    list.push({
      id: id,
      color: color,
      text: text,
      isMath: true,
      prefix: prefix,
      suffix: suffix,
      createdAt: Date.now()
    });
    saveStoredHighlights(list);

    hideSelectionToolbar();
    updateUIState();
    showToast("Formula highlighted!");
  }

  function removeHighlight(id) {
    const container = getContentContainer();
    if (!container) return;

    // 1. Unwrap regular mark elements
    const marks = container.querySelectorAll(
      `mark.user-highlight[data-highlight-id="${id}"]`
    );
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      if (parent) parent.normalize();
    });

    // 2. Clear classes from MathJax formula elements
    const mathEls = container.querySelectorAll(
      `[data-highlight-id="${id}"]`
    );
    mathEls.forEach((el) => {
      el.classList.remove(
        "user-highlight",
        "hl-yellow",
        "hl-green",
        "hl-blue",
        "hl-purple",
        "hl-pink"
      );
      el.removeAttribute("data-highlight-id");
      el.removeAttribute("data-is-math");
    });

    let list = getStoredHighlights();
    list = list.filter((item) => item.id !== id);
    saveStoredHighlights(list);

    hideClickPopover();
    updateUIState();
    showToast("Highlight removed");
  }

  function changeHighlightColor(id, newColor) {
    const container = getContentContainer();
    if (!container) return;

    // 1. Mark elements
    const marks = container.querySelectorAll(
      `mark.user-highlight[data-highlight-id="${id}"]`
    );
    marks.forEach((mark) => {
      mark.className = `user-highlight hl-${newColor}`;
    });

    // 2. Math elements
    const mathEls = container.querySelectorAll(`[data-highlight-id="${id}"]`);
    mathEls.forEach((el) => {
      COLORS.forEach((c) => el.classList.remove(`hl-${c.name}`));
      el.classList.add(`hl-${newColor}`);
    });

    const list = getStoredHighlights();
    list.forEach((item) => {
      if (item.id === id) item.color = newColor;
    });
    saveStoredHighlights(list);

    updateUIState();
    showToast("Color updated");
  }

  function clearAllHighlights() {
    if (!confirm("Are you sure you want to remove all highlights on this page?")) {
      return;
    }
    const container = getContentContainer();
    if (!container) return;

    // Remove text marks
    const marks = container.querySelectorAll("mark.user-highlight");
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      if (parent) parent.normalize();
    });

    // Remove math element highlights
    const mathEls = container.querySelectorAll(".user-highlight[data-is-math]");
    mathEls.forEach((el) => {
      el.classList.remove(
        "user-highlight",
        "hl-yellow",
        "hl-green",
        "hl-blue",
        "hl-purple",
        "hl-pink"
      );
      el.removeAttribute("data-highlight-id");
      el.removeAttribute("data-is-math");
    });

    saveStoredHighlights([]);
    hideClickPopover();
    closeDrawer();
    updateUIState();
    showToast("All highlights cleared");
  }

  function copyHighlightsToClipboard() {
    const list = getStoredHighlights();
    if (list.length === 0) {
      showToast("No highlights to copy");
      return;
    }
    const pageTitle = document.title || "Page Notes";
    const markdown = [
      `### Highlights from ${pageTitle}\n`,
      ...list.map(
        (hl, i) =>
          `${i + 1}. *(${hl.color.toUpperCase()}${hl.isMath ? " - Math" : ""})* "${hl.text}"`
      )
    ].join("\n");

    navigator.clipboard
      .writeText(markdown)
      .then(() => {
        showToast("Copied notes to clipboard!");
      })
      .catch(() => {
        showToast("Unable to copy to clipboard");
      });
  }

  /* --------------------------------------------------------------------------
     Restoration Engine (Text + MathJax)
     -------------------------------------------------------------------------- */
  function restoreHighlights() {
    const container = getContentContainer();
    if (!container) return;

    const list = getStoredHighlights();
    if (list.length === 0) {
      updateUIState();
      return;
    }

    // 1. Restore standard text highlights
    list.forEach((hl) => {
      if (hl.isMath) return;
      if (container.querySelector(`mark[data-highlight-id="${hl.id}"]`)) return;
      const range = findRangeByQuote(container, hl.text, hl.prefix, hl.suffix);
      if (range) {
        wrapRangeWithHighlight(range, hl.id, hl.color);
      }
    });

    // 2. Restore MathJax formula highlights
    const mathHighlights = list.filter((hl) => hl.isMath);
    if (mathHighlights.length > 0) {
      const mathElements = container.querySelectorAll(".arithmatex, mjx-container");
      mathElements.forEach((mEl) => {
        const target = mEl.closest(".arithmatex") || mEl;
        if (target.hasAttribute("data-highlight-id")) return;

        const mathText = target.textContent.trim();
        const { prefix } = getContextForElement(target);

        const match = mathHighlights.find((hl) => {
          if (hl.text === mathText) {
            if (!hl.prefix || !prefix || prefix.slice(-15) === hl.prefix.slice(-15)) {
              return true;
            }
          }
          return false;
        });

        if (match) {
          target.classList.add("user-highlight", `hl-${match.color}`);
          target.setAttribute("data-highlight-id", match.id);
          target.setAttribute("data-is-math", "true");
        }
      });
    }

    updateUIState();
  }

  // Expose global hook for MathJax.typesetPromise() completion
  window.__deepskills_restore_highlights = restoreHighlights;

  /* --------------------------------------------------------------------------
     Floating Selection Toolbar Management
     -------------------------------------------------------------------------- */
  function showSelectionToolbar(rect) {
    if (!selectionToolbar) return;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = rect.top + scrollY - 48;
    if (rect.top < 60) {
      top = rect.bottom + scrollY + 8;
    }
    const left = Math.max(12, rect.left + scrollX + rect.width / 2 - 95);

    selectionToolbar.style.top = `${top}px`;
    selectionToolbar.style.left = `${left}px`;
    selectionToolbar.classList.add("is-active");
  }

  function showSelectionToolbarAt(clientX, clientY) {
    if (!selectionToolbar) return;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = clientY + scrollY - 48;
    if (clientY < 60) {
      top = clientY + scrollY + 12;
    }
    const left = Math.max(12, clientX + scrollX - 95);

    selectionToolbar.style.top = `${top}px`;
    selectionToolbar.style.left = `${left}px`;
    selectionToolbar.classList.add("is-active");
  }

  function hideSelectionToolbar() {
    if (selectionToolbar) {
      selectionToolbar.classList.remove("is-active");
    }
    activeRange = null;
    activeTargetMath = null;
    clearTimeout(selectionTimer);
  }

  /* --------------------------------------------------------------------------
     Highlight Click Popover Management
     -------------------------------------------------------------------------- */
  function showClickPopover(targetEl) {
    if (!clickPopover) return;
    const id = targetEl.getAttribute("data-highlight-id");
    activeHighlightId = id;

    const list = getStoredHighlights();
    const currentHl = list.find((item) => item.id === id);
    const activeColor = currentHl ? currentHl.color : "yellow";

    clickPopover.querySelectorAll(".hl-color-btn").forEach((btn) => {
      if (btn.getAttribute("data-color") === activeColor) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const rect = targetEl.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = rect.top + scrollY - 44;
    if (rect.top < 50) {
      top = rect.bottom + scrollY + 8;
    }
    const left = Math.max(12, rect.left + scrollX + rect.width / 2 - 110);

    clickPopover.style.top = `${top}px`;
    clickPopover.style.left = `${left}px`;
    clickPopover.classList.add("is-active");
  }

  function showClickPopoverAt(targetEl, clientX, clientY) {
    if (!clickPopover) return;
    const id = targetEl.getAttribute("data-highlight-id");
    activeHighlightId = id;

    const list = getStoredHighlights();
    const currentHl = list.find((item) => item.id === id);
    const activeColor = currentHl ? currentHl.color : "yellow";

    clickPopover.querySelectorAll(".hl-color-btn").forEach((btn) => {
      if (btn.getAttribute("data-color") === activeColor) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = clientY + scrollY - 44;
    if (clientY < 50) {
      top = clientY + scrollY + 12;
    }
    const left = Math.max(12, clientX + scrollX - 110);

    clickPopover.style.top = `${top}px`;
    clickPopover.style.left = `${left}px`;
    clickPopover.classList.add("is-active");
  }

  function hideClickPopover() {
    if (clickPopover) {
      clickPopover.classList.remove("is-active");
    }
    activeHighlightId = null;
  }

  function hideAllPopups() {
    hideSelectionToolbar();
    hideClickPopover();
  }

  /* --------------------------------------------------------------------------
     Floating Action Button & Drawer UI Update
     -------------------------------------------------------------------------- */
  function updateUIState() {
    const list = getStoredHighlights();
    const count = list.length;

    if (!fabButton) return;

    if (count > 0) {
      fabButton.style.display = "inline-flex";
      fabButton.querySelector(".hl-fab-badge").textContent = count;
      fabButton.querySelector(".hl-fab-text").textContent =
        count === 1 ? "1 Highlight" : `${count} Highlights`;
    } else {
      fabButton.style.display = "none";
      if (drawer && drawer.classList.contains("is-open")) {
        closeDrawer();
      }
    }

    renderDrawerList(list);
  }

  function renderDrawerList(list) {
    if (!drawer) return;
    const listContainer = drawer.querySelector(".hl-drawer-list");
    const countBadge = drawer.querySelector(".hl-drawer-count");
    if (countBadge) countBadge.textContent = list.length;

    if (list.length === 0) {
      listContainer.innerHTML =
        '<div class="hl-drawer-empty">No highlights on this page yet.<br>Select text or right-click equations to highlight!</div>';
      return;
    }

    listContainer.innerHTML = "";
    list.forEach((hl) => {
      const item = document.createElement("div");
      item.className = "hl-drawer-item";
      item.innerHTML = `
        <span class="hl-item-dot dot-${hl.color}"></span>
        <span class="hl-item-text">${hl.isMath ? "📐 " : ""} "${hl.text}"</span>
        <button class="hl-item-remove" title="Remove highlight">✕</button>
      `;

      item.addEventListener("click", (e) => {
        if (e.target.closest(".hl-item-remove")) return;
        jumpToHighlight(hl.id);
      });

      const removeBtn = item.querySelector(".hl-item-remove");
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeHighlight(hl.id);
      });

      listContainer.appendChild(item);
    });
  }

  function jumpToHighlight(id) {
    const el = document.querySelector(
      `[data-highlight-id="${id}"]`
    );
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("pulse-jump");
    void el.offsetWidth;
    el.classList.add("pulse-jump");

    closeDrawer();
  }

  function toggleDrawer() {
    if (!drawer) return;
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  function openDrawer() {
    if (drawer) {
      drawer.classList.add("is-open");
      hideAllPopups();
    }
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.remove("is-open");
    }
  }

  /* --------------------------------------------------------------------------
     Build & Inject UI DOM Elements
     -------------------------------------------------------------------------- */
  function buildUI() {
    if (uiInitialized && document.getElementById("hl-selection-toolbar")) return;

    // 1. Selection & Formula Toolbar
    selectionToolbar = document.createElement("div");
    selectionToolbar.id = "hl-selection-toolbar";
    selectionToolbar.className = "hl-floating-ui";
    selectionToolbar.innerHTML = `
      ${COLORS.map(
        (c) =>
          `<button class="hl-color-btn btn-${c.name}" data-color="${c.name}" title="Highlight ${c.label}"></button>`
      ).join("")}
      <div class="hl-divider"></div>
      <button class="hl-action-btn hl-btn-close" title="Cancel">✕</button>
    `;
    document.body.appendChild(selectionToolbar);

    selectionToolbar.querySelectorAll(".hl-color-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const color = btn.getAttribute("data-color");
        if (activeTargetMath) {
          addMathHighlight(activeTargetMath, color);
        } else if (activeRange) {
          addHighlight(activeRange, color);
        }
      });
    });

    selectionToolbar
      .querySelector(".hl-btn-close")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        hideSelectionToolbar();
      });

    // 2. Click / Right-Click Popover (Existing Highlight)
    clickPopover = document.createElement("div");
    clickPopover.id = "hl-click-popover";
    clickPopover.className = "hl-floating-ui";
    clickPopover.innerHTML = `
      ${COLORS.map(
        (c) =>
          `<button class="hl-color-btn btn-${c.name}" data-color="${c.name}" title="Change to ${c.label}"></button>`
      ).join("")}
      <div class="hl-divider"></div>
      <button class="hl-action-btn hl-btn-remove" title="Remove Highlight">
        <span>🗑️</span> Remove
      </button>
    `;
    document.body.appendChild(clickPopover);

    clickPopover.querySelectorAll(".hl-color-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const color = btn.getAttribute("data-color");
        if (activeHighlightId) {
          changeHighlightColor(activeHighlightId, color);
          hideClickPopover();
        }
      });
    });

    clickPopover
      .querySelector(".hl-btn-remove")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        if (activeHighlightId) {
          removeHighlight(activeHighlightId);
        }
      });

    // 3. Floating Action Button (FAB)
    fabButton = document.createElement("div");
    fabButton.id = "hl-fab";
    fabButton.className = "hl-fab";
    fabButton.style.display = "none";
    fabButton.innerHTML = `
      <span>🖊️</span>
      <span class="hl-fab-text">Highlights</span>
      <span class="hl-fab-badge">0</span>
    `;
    document.body.appendChild(fabButton);

    fabButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDrawer();
    });

    // 4. Highlights Drawer
    drawer = document.createElement("div");
    drawer.id = "hl-drawer";
    drawer.className = "hl-drawer";
    drawer.innerHTML = `
      <div class="hl-drawer-header">
        <span>🖊️ Highlights (<span class="hl-drawer-count">0</span>)</span>
        <button class="hl-drawer-close" title="Close">✕</button>
      </div>
      <div class="hl-drawer-list"></div>
      <div class="hl-drawer-footer">
        <button class="hl-footer-btn btn-copy" title="Copy notes to clipboard">
          <span>📋</span> Copy Notes
        </button>
        <button class="hl-footer-btn btn-clear" title="Clear all highlights">
          <span>🗑️</span> Clear All
        </button>
      </div>
    `;
    document.body.appendChild(drawer);

    drawer.querySelector(".hl-drawer-close").addEventListener("click", closeDrawer);
    drawer.querySelector(".btn-copy").addEventListener("click", copyHighlightsToClipboard);
    drawer.querySelector(".btn-clear").addEventListener("click", clearAllHighlights);

    // 5. Toast Notification
    toastEl = document.createElement("div");
    toastEl.id = "hl-toast";
    toastEl.className = "hl-toast";
    document.body.appendChild(toastEl);

    uiInitialized = true;
  }

  /* --------------------------------------------------------------------------
     Event Listeners: 1-Second Timer, MouseUp, and Right-Click Context Menu
     -------------------------------------------------------------------------- */
  function attachEventListeners() {
    // 1. Selection Timer (Fires automatically in 1s upon text selection)
    document.addEventListener("selectionchange", () => {
      clearTimeout(selectionTimer);

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        if (!activeTargetMath && !activeHighlightId) {
          hideSelectionToolbar();
        }
        return;
      }

      // Schedule auto-popup in 1s as requested
      selectionTimer = setTimeout(() => {
        const sel = window.getSelection();
        if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) {
          const range = sel.getRangeAt(0);
          const container = getContentContainer();
          if (container && container.contains(range.commonAncestorContainer)) {
            activeRange = range.cloneRange();
            activeTargetMath = null;
            showSelectionToolbar(range.getBoundingClientRect());
          }
        }
      }, 1000);
    });

    // 2. MouseUp (Ensures selection settles & allows instant trigger if desired)
    document.addEventListener("mouseup", (e) => {
      if (
        e.target.closest("#hl-selection-toolbar") ||
        e.target.closest("#hl-click-popover") ||
        e.target.closest("#hl-drawer") ||
        e.target.closest("#hl-fab")
      ) {
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        return;
      }

      const range = selection.getRangeAt(0);
      const container = getContentContainer();
      if (container && container.contains(range.commonAncestorContainer)) {
        activeRange = range.cloneRange();
        activeTargetMath = null;
        // Also show toolbar on mouseup immediately if user has completed drag
        showSelectionToolbar(range.getBoundingClientRect());
      }
    });

    // 3. Right-Click Context Menu Handler
    document.addEventListener("contextmenu", (e) => {
      // A. Right-click on existing highlight (text or MathJax)
      const existing = e.target.closest("[data-highlight-id]");
      if (existing) {
        e.preventDefault();
        e.stopPropagation();
        hideSelectionToolbar();
        showClickPopoverAt(existing, e.clientX, e.clientY);
        return;
      }

      // B. Right-click on MathJax formula (.arithmatex or mjx-container)
      const mathEl = e.target.closest(".arithmatex, mjx-container");
      if (mathEl) {
        e.preventDefault();
        e.stopPropagation();
        const target = mathEl.closest(".arithmatex") || mathEl;
        activeTargetMath = target;
        activeRange = null;
        showSelectionToolbarAt(e.clientX, e.clientY);
        return;
      }

      // C. Right-click on selected text
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const container = getContentContainer();
        if (container && container.contains(range.commonAncestorContainer)) {
          e.preventDefault();
          e.stopPropagation();
          activeRange = range.cloneRange();
          activeTargetMath = null;
          showSelectionToolbarAt(e.clientX, e.clientY);
          return;
        }
      }
    });

    // 4. Left-Click Handler for existing highlights & outside dismissal
    document.addEventListener("click", (e) => {
      const mark = e.target.closest("[data-highlight-id]");
      if (mark) {
        e.preventDefault();
        e.stopPropagation();
        hideSelectionToolbar();
        showClickPopover(mark);
        return;
      }

      if (
        !e.target.closest("#hl-selection-toolbar") &&
        !e.target.closest("#hl-click-popover")
      ) {
        hideAllPopups();
      }

      if (
        !e.target.closest("#hl-drawer") &&
        !e.target.closest("#hl-fab")
      ) {
        closeDrawer();
      }
    });

    // Dismiss on window resize
    window.addEventListener("resize", hideAllPopups);
  }

  /* --------------------------------------------------------------------------
     Initialization & Lifecycle
     -------------------------------------------------------------------------- */
  function init() {
    buildUI();
    restoreHighlights();
  }

  attachEventListeners();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      init();
    });
  } else if (typeof location$ !== "undefined") {
    location$.subscribe(function () {
      init();
    });
  }
})();
