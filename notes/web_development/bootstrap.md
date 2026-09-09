# Bootstrap 5 Comprehensive Guide

Bootstrap is the world's most popular front-end open source toolkit, featuring Sass variables and mixins, a responsive grid system, extensive prebuilt components, and powerful JavaScript plugins. 

> [!NOTE]
> Bootstrap 5 completely removed the jQuery dependency in favor of vanilla JavaScript, improving performance and modernizing the framework.

## 1. The Container System

Containers are the most basic layout element in Bootstrap and are required when using the default grid system.

### Container Types

- `.container`: Sets a `max-width` at each responsive breakpoint.
- `.container-fluid`: Which is `width: 100%` at all breakpoints.
- `.container-{breakpoint}`: Which is `width: 100%` until the specified breakpoint.

```html
<div class="container">
  <!-- Content is centered and bounded by breakpoint max-widths -->
</div>

<div class="container-fluid">
  <!-- Content stretches the entire width of the viewport -->
</div>
```

---

## 2. Grid System and Breakpoints

Bootstrap’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive.

### Breakpoints Reference

| Breakpoint | Class Infix | Dimensions |
| :--- | :--- | :--- |
| **X-Small** | *None* | `<576px` |
| **Small** | `sm` | `≥576px` |
| **Medium** | `md` | `≥768px` |
| **Large** | `lg` | `≥992px` |
| **Extra large**| `xl` | `≥1200px` |
| **XX large** | `xxl` | `≥1400px` |

### 12-Column Grid

The grid supports up to 12 columns across the page. You can group columns to create wider columns.

```html
<div class="container">
  <div class="row">
    <div class="col-sm-8">col-sm-8</div>
    <div class="col-sm-4">col-sm-4</div>
  </div>
  
  <!-- Auto-layout columns (equal width) -->
  <div class="row">
    <div class="col">1 of 3</div>
    <div class="col">2 of 3</div>
    <div class="col">3 of 3</div>
  </div>
</div>
```

> [!TIP]
> Use `.row-cols-*` classes to quickly set the number of columns that best render your content and layout. E.g., `<div class="row row-cols-2 row-cols-lg-4">`.

---

## 3. Typography and Colors

Bootstrap provides global settings for typography and a rich color palette.

### Typography Utilities

- **Headings**: `.h1` through `.h6`
- **Display headings**: `.display-1` to `.display-6` (larger, more opinionated heading styles)
- **Lead**: `.lead` (makes a paragraph stand out)
- **Text alignment**: `.text-start`, `.text-center`, `.text-end`
- **Text wrapping**: `.text-wrap`, `.text-nowrap`, `.text-break`

### Theme Colors

Used for text, backgrounds, buttons, and alerts.

| Color | Class Prefix | Description |
| :--- | :--- | :--- |
| **Primary** | `*-primary` | Blue (main brand color) |
| **Secondary** | `*-secondary`| Gray |
| **Success** | `*-success` | Green (positive action) |
| **Danger** | `*-danger` | Red (negative/destructive) |
| **Warning** | `*-warning` | Yellow (caution) |
| **Info** | `*-info` | Light Blue (informational) |
| **Light/Dark**| `*-light` / `*-dark` | Grayscale extremes |

```html
<p class="text-primary bg-dark">Blue text on a dark background</p>
```

---

## 4. Spacing Utilities

Bootstrap includes a wide range of shorthand responsive margin and padding utility classes to modify an element's appearance.

Format: `{property}{sides}-{breakpoint}-{size}`

- **Property**: `m` (margin), `p` (padding)
- **Sides**: `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (horizontal), `y` (vertical), blank (all 4 sides).
- **Size**: `0` to `5` (where 0 is 0, and 5 is $3\text{rem}$), or `auto`.

```html
<!-- Margin top 3 (1rem) -->
<div class="mt-3"></div>

<!-- Padding horizontal 4, padding vertical 2 -->
<div class="px-4 py-2"></div>

<!-- Center a block element horizontally -->
<div class="mx-auto" style="width: 200px;"></div>
```

---

## 5. UI Components

Bootstrap provides dozens of pre-built, interactive components.

### Buttons

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-outline-success">Outline</button>
<button type="button" class="btn btn-danger btn-lg">Large Danger</button>
```

### Cards

A flexible and extensible content container with multiple variants and options.

```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### Navbars

Responsive navigation headers.

```html
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

> [!IMPORTANT]
> Interactive components like Navbars, Modals, and Dropdowns require the Bootstrap JavaScript bundle (`bootstrap.bundle.min.js`) which includes Popper.js for positioning.
