// Sidebar toggle handler: makes the left pane closable by clicking on the logo
(function () {
  function applySidebarState() {
    try {
      if (localStorage.getItem("sidebar-closed") === "true") {
        document.body.classList.add("sidebar-closed");
      } else {
        document.body.classList.remove("sidebar-closed");
      }
    } catch (e) {}
  }

  // Handle client-side instant navigation
  if (typeof location$ !== "undefined") {
    location$.subscribe(applySidebarState);
  }

  // Initial execution when DOM loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applySidebarState);
  } else {
    applySidebarState();
  }

  // Intercept logo clicks to toggle the left sidebar
  document.addEventListener(
    "click",
    function (e) {
      const logo = e.target.closest(
        ".md-header__button.md-logo, .md-nav__button.md-logo"
      );
      if (logo) {
        e.preventDefault();
        e.stopPropagation();

        if (window.matchMedia("(min-width: 76.25em)").matches) {
          const isClosed = document.body.classList.toggle("sidebar-closed");
          try {
            localStorage.setItem(
              "sidebar-closed",
              isClosed ? "true" : "false"
            );
          } catch (err) {}
        } else {
          const drawer = document.getElementById("__drawer");
          if (drawer) {
            drawer.checked = !drawer.checked;
          }
        }
      }
    },
    true
  );
})();
