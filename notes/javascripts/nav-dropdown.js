function initLeftNavDropdown() {
  const primaryNav = document.querySelector(".md-nav--primary");
  if (!primaryNav || primaryNav.querySelector(".left-nav-filter-wrapper")) {
    return;
  }

  const navList = primaryNav.querySelector(":scope > .md-nav__list");
  if (!navList) {
    return;
  }

  const topLevelItems = Array.from(navList.children).filter((item) =>
    item.classList.contains("md-nav__item")
  );
  const filterableItems = topLevelItems.filter((item) =>
    item.classList.contains("md-nav__item--section")
  );

  if (filterableItems.length < 2) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "left-nav-filter-wrapper";

  const select = document.createElement("select");
  select.className = "left-nav-filter";
  select.setAttribute("aria-label", "Filter navigation sections");

  const allOption = document.createElement("option");
  allOption.value = "__all__";
  allOption.textContent = "All sections";
  select.appendChild(allOption);

  filterableItems.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent =
      item.querySelector(":scope > .md-nav__link, :scope > label")?.textContent?.trim() ||
      `Section ${index + 1}`;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const selected = select.value;
    filterableItems.forEach((item, index) => {
      item.hidden = selected !== "__all__" && selected !== String(index);
    });
  });

  wrapper.appendChild(select);
  navList.parentNode.insertBefore(wrapper, navList);
}

if (typeof document$ !== "undefined") {
  document$.subscribe(initLeftNavDropdown);
} else {
  document.addEventListener("DOMContentLoaded", initLeftNavDropdown);
}
