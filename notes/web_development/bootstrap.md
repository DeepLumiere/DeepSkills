# Bootstrap 5 — Complete Framework Reference

Bootstrap is the world's most popular front-end open source toolkit featuring Sass variables, a responsive grid system, extensive prebuilt components, and vanilla JavaScript plugins.

> [!NOTE]
> Bootstrap 5 completely removed the jQuery dependency in favor of vanilla JavaScript, improving performance and modernizing the framework.

## 1. CDN Setup & Installation

The fastest way to include Bootstrap is via the CDN. Always include the CSS in `<head>` and JS bundle before `</body>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap 5 App</title>

  <!-- Bootstrap 5 CSS (CDN with SRI) -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous">
</head>
<body>
  <!-- Page content -->

  <!-- Bootstrap JS Bundle (includes Popper.js) -->
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc4s9bIOgUxi8T/jzmS8GW3QgdnfwFvkFXjqhpqSl8y"
    crossorigin="anonymous">
  </script>
</body>
</html>
```

---

## 2. Container System

Containers are the foundational layout element — they center and horizontally pad your content.

### Container Types

| Class | Behaviour |
| :--- | :--- |
| `.container` | Fixed max-width at each breakpoint |
| `.container-fluid` | `width: 100%` at all viewports |
| `.container-sm` | 100% wide until `≥576px` breakpoint |
| `.container-md` | 100% wide until `≥768px` breakpoint |
| `.container-lg` | 100% wide until `≥992px` breakpoint |
| `.container-xl` | 100% wide until `≥1200px` breakpoint |
| `.container-xxl` | 100% wide until `≥1400px` breakpoint |

```html
<!-- Fixed container — bounded at each breakpoint -->
<div class="container">
  <h1>Fixed Container</h1>
  <p>This content is centered with max-width at each breakpoint.</p>
</div>

<!-- Full-width fluid container -->
<div class="container-fluid bg-primary text-white p-4">
  <h1>Full-Width Fluid Container</h1>
</div>

<!-- Responsive container — fluid until lg breakpoint -->
<div class="container-lg">
  <p>100% wide on mobile/tablet, bounded at 992px+</p>
</div>
```

---

## 3. Grid System & Breakpoints

Bootstrap's 12-column flexbox grid: wrap columns in `.row` inside any `.container`.

### Breakpoint Reference

| Breakpoint | Class Infix | Min Width | Container Max-Width |
| :--- | :---: | :--- | :--- |
| **X-Small** | *(none)* | `<576px` | None (fluid) |
| **Small** | `sm` | `≥576px` | `540px` |
| **Medium** | `md` | `≥768px` | `720px` |
| **Large** | `lg` | `≥992px` | `960px` |
| **X-Large** | `xl` | `≥1200px` | `1140px` |
| **XX-Large** | `xxl` | `≥1400px` | `1320px` |

```html
<!-- Basic 2-column layout -->
<div class="container">
  <div class="row">
    <div class="col-sm-8 bg-primary text-white p-3">col-sm-8</div>
    <div class="col-sm-4 bg-secondary text-white p-3">col-sm-4</div>
  </div>
</div>

<!-- Auto-layout equal-width columns -->
<div class="container">
  <div class="row">
    <div class="col bg-info p-2">1 of 3</div>
    <div class="col bg-warning p-2">2 of 3</div>
    <div class="col bg-success p-2">3 of 3</div>
  </div>
</div>

<!-- Responsive column stacking: 12→6→4 columns per row -->
<div class="container">
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <div class="col"><div class="card p-3">Card 1</div></div>
    <div class="col"><div class="card p-3">Card 2</div></div>
    <div class="col"><div class="card p-3">Card 3</div></div>
  </div>
</div>

<!-- Mixed: one fixed column, one fills remaining -->
<div class="container">
  <div class="row">
    <div class="col-md-3 bg-dark text-white p-3">Sidebar (3 cols)</div>
    <div class="col-md-9 bg-light p-3">Main Content (9 cols)</div>
  </div>
</div>

<!-- Gutters: control spacing between columns -->
<div class="container">
  <div class="row g-4">   <!-- g-0 to g-5 -->
    <div class="col-6"><div class="p-3 bg-light border">Column 1</div></div>
    <div class="col-6"><div class="p-3 bg-light border">Column 2</div></div>
  </div>
</div>

<!-- Offset columns -->
<div class="container">
  <div class="row">
    <div class="col-md-4 offset-md-4 bg-primary text-white p-3">
      Centered (offset 4)
    </div>
  </div>
</div>
```

---

## 4. Typography & Color System

### Typography Classes

```html
<!-- Display headings — large, impactful -->
<h1 class="display-1">Display 1</h1>
<h2 class="display-2">Display 2</h2>
<h3 class="display-6">Display 6 (smallest)</h3>

<!-- Regular headings with heading utilities -->
<p class="h1">Paragraph styled as H1</p>
<p class="h3">Paragraph styled as H3</p>

<!-- Lead paragraph -->
<p class="lead">This is a leading paragraph that stands out from regular body text.</p>

<!-- Text utilities -->
<p class="text-center fw-bold">Bold, centered text</p>
<p class="text-end fst-italic">Italic, right-aligned</p>
<p class="text-uppercase text-muted">Muted uppercase text</p>
<p class="text-truncate" style="max-width: 200px;">This long text is truncated...</p>

<!-- Text decorations -->
<p class="text-decoration-underline">Underlined text</p>
<p class="text-decoration-line-through">Strikethrough text</p>

<!-- Font sizes (fs-1 = 2.5rem, fs-6 = 1rem) -->
<p class="fs-1">Largest (fs-1)</p>
<p class="fs-4">Medium (fs-4)</p>
<p class="fs-6">Smallest (fs-6)</p>
```

### Theme Colors

| Color Name | Background | Text | Button | Border |
| :--- | :--- | :--- | :--- | :--- |
| primary | `bg-primary` | `text-primary` | `btn-primary` | `border-primary` |
| secondary | `bg-secondary` | `text-secondary` | `btn-secondary` | `border-secondary` |
| success | `bg-success` | `text-success` | `btn-success` | `border-success` |
| danger | `bg-danger` | `text-danger` | `btn-danger` | `border-danger` |
| warning | `bg-warning` | `text-warning` | `btn-warning` | `border-warning` |
| info | `bg-info` | `text-info` | `btn-info` | `border-info` |
| light | `bg-light` | `text-light` | `btn-light` | `border-light` |
| dark | `bg-dark` | `text-dark` | `btn-dark` | `border-dark` |

```html
<!-- Semantic color usage -->
<div class="alert alert-success">Operation completed successfully.</div>
<div class="alert alert-danger">An error occurred. Please try again.</div>
<div class="alert alert-warning">Warning: This action is irreversible.</div>

<p class="text-primary bg-dark p-2">Blue text on dark background.</p>
<span class="badge bg-success">Approved</span>
<span class="badge bg-danger rounded-pill">99+</span>
```

---

## 5. Spacing Utilities

Format: `{property}{sides}-{breakpoint}-{size}`

- **Property**: `m` (margin), `p` (padding)
- **Sides**: `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (left+right), `y` (top+bottom), blank (all 4)
- **Sizes**: `0`=0, `1`=0.25rem, `2`=0.5rem, `3`=1rem, `4`=1.5rem, `5`=3rem, `auto`

```html
<!-- Padding -->
<div class="p-4">4-side padding 1.5rem</div>
<div class="px-5 py-2">Horizontal 3rem, vertical 0.5rem</div>
<div class="pt-3 pb-0">Top 1rem, bottom 0</div>

<!-- Margin -->
<div class="mt-5">Top margin 3rem</div>
<div class="mx-auto" style="width:200px;">Horizontally centered block</div>
<div class="ms-auto">Pushed to the right (margin-start auto)</div>
<div class="mb-2 me-3">Bottom + right margin</div>

<!-- Responsive spacing (md and up) -->
<div class="p-2 p-md-5">Sm padding on mobile, larger on desktop</div>

<!-- Gap utilities (for flex/grid) -->
<div class="d-flex gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

---

## 6. Flexbox Utilities

```html
<!-- Basic flex container -->
<div class="d-flex justify-content-between align-items-center">
  <span>Left</span>
  <span>Center</span>
  <span>Right</span>
</div>

<!-- Direction -->
<div class="d-flex flex-column gap-2">
  <div>Top</div>
  <div>Middle</div>
  <div>Bottom</div>
</div>

<!-- Flex wrapping -->
<div class="d-flex flex-wrap gap-2">
  <div class="p-2 bg-primary text-white">Tag 1</div>
  <div class="p-2 bg-primary text-white">Tag 2</div>
  <div class="p-2 bg-primary text-white">Tag 3</div>
</div>

<!-- Flex grow/shrink -->
<div class="d-flex">
  <div class="flex-grow-1 bg-success text-white p-2">Grows to fill space</div>
  <div class="flex-shrink-0 bg-danger text-white p-2">Fixed size</div>
</div>

<!-- Order utilities -->
<div class="d-flex">
  <div class="order-3 bg-info p-2">First in HTML, shows 3rd</div>
  <div class="order-1 bg-warning p-2">Second in HTML, shows 1st</div>
  <div class="order-2 bg-success p-2">Third in HTML, shows 2nd</div>
</div>

<!-- Justify content options -->
<!-- justify-content-start | end | center | between | around | evenly -->
<div class="d-flex justify-content-evenly">
  <div class="p-2 bg-primary text-white">A</div>
  <div class="p-2 bg-secondary text-white">B</div>
  <div class="p-2 bg-success text-white">C</div>
</div>

<!-- Align items options -->
<!-- align-items-start | end | center | baseline | stretch -->
<div class="d-flex align-items-center" style="height:80px; background:#f0f0f0">
  <div class="p-2 bg-danger text-white">Vertically Centered</div>
</div>
```

---

## 7. UI Components

### Buttons

```html
<!-- Solid buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-light">Light</button>
<button class="btn btn-dark">Dark</button>

<!-- Outline buttons -->
<button class="btn btn-outline-primary">Outline Primary</button>
<button class="btn btn-outline-danger">Outline Danger</button>

<!-- Sizes -->
<button class="btn btn-primary btn-lg">Large Button</button>
<button class="btn btn-primary btn-sm">Small Button</button>

<!-- Full-width (block) button -->
<button class="btn btn-success w-100">Full Width</button>

<!-- Disabled state -->
<button class="btn btn-primary" disabled>Disabled</button>

<!-- Button with badge -->
<button class="btn btn-primary">
  Notifications <span class="badge bg-danger">4</span>
</button>

<!-- Button group -->
<div class="btn-group">
  <button class="btn btn-outline-primary">Left</button>
  <button class="btn btn-outline-primary">Middle</button>
  <button class="btn btn-outline-primary">Right</button>
</div>
```

### Cards

```html
<!-- Standard card -->
<div class="card" style="width: 18rem;">
  <img src="https://via.placeholder.com/300x150" class="card-img-top" alt="Card image">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">A simple card with body text, an image header, and a button.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<!-- Card with header and footer -->
<div class="card">
  <div class="card-header">Featured Article</div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-muted">2 days ago</div>
</div>

<!-- Horizontal card -->
<div class="card">
  <div class="row g-0">
    <div class="col-4">
      <img src="https://via.placeholder.com/200" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-8">
      <div class="card-body">
        <h5 class="card-title">Horizontal Card</h5>
        <p class="card-text">This is a wider card with a photo on the side.</p>
      </div>
    </div>
  </div>
</div>

<!-- Card group (equal height cards) -->
<div class="card-group">
  <div class="card">
    <div class="card-body"><h5 class="card-title">Card 1</h5><p class="card-text">Short content.</p></div>
  </div>
  <div class="card">
    <div class="card-body"><h5 class="card-title">Card 2</h5><p class="card-text">Longer content here makes all cards equal height.</p></div>
  </div>
  <div class="card">
    <div class="card-body"><h5 class="card-title">Card 3</h5><p class="card-text">Medium.</p></div>
  </div>
</div>
```

### Navbar

```html
<!-- Full responsive navbar -->
<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <!-- Brand logo/name -->
    <a class="navbar-brand" href="#">MyApp</a>

    <!-- Hamburger toggle for mobile -->
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapsible nav links -->
    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action 1</a></li>
            <li><a class="dropdown-item" href="#">Action 2</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
      <!-- Right-aligned items -->
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
```

### Modal

```html
<!-- Trigger button -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch Demo Modal
</button>

<!-- Modal structure -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalLabel">Modal Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        This is the modal body. You can put any HTML content here.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Save Changes</button>
      </div>
    </div>
  </div>
</div>
```

### Forms

```html
<form>
  <!-- Text input -->
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="name@example.com">
    <div class="form-text">We'll never share your email with anyone else.</div>
  </div>

  <!-- Password -->
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password">
  </div>

  <!-- Select dropdown -->
  <div class="mb-3">
    <label for="roleSelect" class="form-label">Role</label>
    <select class="form-select" id="roleSelect">
      <option selected>Choose a role...</option>
      <option value="1">Student</option>
      <option value="2">Teacher</option>
      <option value="3">Admin</option>
    </select>
  </div>

  <!-- Checkbox -->
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="acceptTerms">
    <label class="form-check-label" for="acceptTerms">Accept Terms & Conditions</label>
  </div>

  <!-- Radio buttons -->
  <div class="mb-3">
    <div class="form-check">
      <input class="form-check-input" type="radio" name="gender" id="male" value="male">
      <label class="form-check-label" for="male">Male</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="gender" id="female" value="female">
      <label class="form-check-label" for="female">Female</label>
    </div>
  </div>

  <!-- Textarea -->
  <div class="mb-3">
    <label for="message" class="form-label">Message</label>
    <textarea class="form-control" id="message" rows="4" placeholder="Your message..."></textarea>
  </div>

  <!-- File input -->
  <div class="mb-3">
    <label for="fileUpload" class="form-label">Upload File</label>
    <input class="form-control" type="file" id="fileUpload">
  </div>

  <!-- Validation states -->
  <div class="mb-3">
    <label class="form-label">Valid Input</label>
    <input type="text" class="form-control is-valid" value="Correct value">
    <div class="valid-feedback">Looks good!</div>
  </div>
  <div class="mb-3">
    <label class="form-label">Invalid Input</label>
    <input type="text" class="form-control is-invalid">
    <div class="invalid-feedback">This field is required.</div>
  </div>

  <!-- Input group -->
  <div class="input-group mb-3">
    <span class="input-group-text">@</span>
    <input type="text" class="form-control" placeholder="Username">
  </div>

  <button type="submit" class="btn btn-primary w-100">Submit Form</button>
</form>
```

### Alerts & Toasts

```html
<!-- Dismissible alert -->
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Warning!</strong> Your session will expire in 5 minutes.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<!-- Static alerts (no dismiss) -->
<div class="alert alert-info">ℹ️ System maintenance scheduled for Sunday 2AM.</div>
<div class="alert alert-success">✅ Your profile has been updated successfully.</div>
<div class="alert alert-danger">❌ Failed to connect to the server.</div>
```

### Accordion

```html
<div class="accordion" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
        What is Bootstrap?
      </button>
    </h2>
    <div id="q1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        Bootstrap is a free, open-source front-end framework for responsive web design.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
        Does Bootstrap 5 need jQuery?
      </button>
    </h2>
    <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        No. Bootstrap 5 dropped jQuery completely and now uses vanilla JavaScript only.
      </div>
    </div>
  </div>
</div>
```

### Progress Bar

```html
<!-- Basic progress -->
<div class="progress mb-3">
  <div class="progress-bar" role="progressbar" style="width: 65%;" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
</div>

<!-- Striped and animated -->
<div class="progress mb-3">
  <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" style="width: 80%"></div>
</div>

<!-- Multiple sections (stacked) -->
<div class="progress">
  <div class="progress-bar bg-success" style="width:40%">40%</div>
  <div class="progress-bar bg-warning" style="width:20%">20%</div>
  <div class="progress-bar bg-danger" style="width:15%">15%</div>
</div>
```

---

## 8. Exhaustive Class Cheatsheet Reference

### 📐 Layout & Grid

| Category | Classes | Description |
| :--- | :--- | :--- |
| **Containers** | `.container`, `.container-fluid`, `.container-{sm\|md\|lg\|xl\|xxl}` | Wrappers for grid |
| **Grid Base** | `.row`, `.col`, `.col-{1-12}` | 12-column flex grid |
| **Grid Responsive** | `.col-{sm\|md\|lg\|xl\|xxl}-{1-12}` | Breakpoint-specific columns |
| **Row Columns** | `.row-cols-{1-auto}` | Set equal width columns per row |
| **Offsets** | `.offset-{1-11}`, `.offset-{sm\|md\|lg\|xl\|xxl}-{1-11}` | Push columns to the right |
| **Gutters** | `.g-{0-5}`, `.gx-{0-5}`, `.gy-{0-5}` | Row/Column spacing gaps |

### 🎨 Colors & Backgrounds

| Category | Classes |
| :--- | :--- |
| **Text Color** | `.text-primary`, `.text-secondary`, `.text-success`, `.text-danger`, `.text-warning`, `.text-info`, `.text-light`, `.text-dark`, `.text-muted`, `.text-white`, `.text-black` |
| **Backgrounds**| `.bg-primary`, `.bg-secondary`, `.bg-success`, `.bg-danger`, `.bg-warning`, `.bg-info`, `.bg-light`, `.bg-dark`, `.bg-white`, `.bg-transparent` |
| **Subtle BG**  | `.bg-primary-subtle`, `.bg-success-subtle`, `.bg-danger-subtle` *(Bootstrap 5.3+)* |

### 📏 Spacing (Margins & Padding)

*Format:* `{property}{sides}-{size}` or `{property}{sides}-{breakpoint}-{size}`
*Sizes:* `0`, `1`, `2`, `3`, `4`, `5`, `auto`

| Property | Sides | Examples |
| :--- | :--- | :--- |
| **Margin (m)** | `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (horiz), `y` (vert), blank (all) | `.mt-3`, `.mb-0`, `.mx-auto`, `.ms-sm-4`, `.m-5` |
| **Padding (p)** | `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (horiz), `y` (vert), blank (all) | `.pt-4`, `.pb-2`, `.px-3`, `.py-1`, `.p-0` |
| **Gap** | N/A | `.gap-1`, `.gap-2`, `.gap-3`, `.gap-md-4` |

### 🔠 Typography

| Category | Classes |
| :--- | :--- |
| **Headings** | `.h1` to `.h6`, `.display-1` to `.display-6` |
| **Font Weight**| `.fw-bold`, `.fw-bolder`, `.fw-semibold`, `.fw-normal`, `.fw-light`, `.fw-lighter` |
| **Text Align** | `.text-start`, `.text-center`, `.text-end`, `.text-sm-center` |
| **Text Transform** | `.text-lowercase`, `.text-uppercase`, `.text-capitalize` |
| **Other** | `.lead`, `.fst-italic`, `.text-decoration-none`, `.text-decoration-underline`, `.text-truncate`, `.text-wrap`, `.text-nowrap` |

### 📐 Flexbox (`.d-flex`, `.d-inline-flex`)

| Category | Classes |
| :--- | :--- |
| **Direction** | `.flex-row`, `.flex-column`, `.flex-row-reverse`, `.flex-column-reverse` |
| **Justify (X)** | `.justify-content-start`, `.justify-content-end`, `.justify-content-center`, `.justify-content-between`, `.justify-content-around`, `.justify-content-evenly` |
| **Align (Y)** | `.align-items-start`, `.align-items-end`, `.align-items-center`, `.align-items-baseline`, `.align-items-stretch` |
| **Wrap** | `.flex-wrap`, `.flex-nowrap`, `.flex-wrap-reverse` |
| **Grow/Shrink**| `.flex-grow-0`, `.flex-grow-1`, `.flex-shrink-0`, `.flex-shrink-1` |
| **Order** | `.order-0` to `.order-5`, `.order-first`, `.order-last` |

### 📦 Borders, Shadows & Display

| Category | Classes |
| :--- | :--- |
| **Borders** | `.border`, `.border-0`, `.border-top`, `.border-primary`, `.border-2`, `.border-3` |
| **Radius** | `.rounded`, `.rounded-0`, `.rounded-circle`, `.rounded-pill`, `.rounded-top` |
| **Shadows** | `.shadow-none`, `.shadow-sm`, `.shadow`, `.shadow-lg` |
| **Display** | `.d-none`, `.d-block`, `.d-inline`, `.d-inline-block`, `.d-flex`, `.d-grid` |
| **Position** | `.position-static`, `.position-relative`, `.position-absolute`, `.position-fixed`, `.position-sticky` |
| **Opacity** | `.opacity-0`, `.opacity-25`, `.opacity-50`, `.opacity-75`, `.opacity-100` |

---

## 9. Utility Classes Code Examples

```html
<!-- Display utilities -->
<div class="d-none d-md-block">Hidden on mobile, visible on md+</div>
<div class="d-block d-lg-none">Visible on mobile, hidden on lg+</div>

<!-- Position utilities -->
<div class="position-relative">
  <span class="position-absolute top-0 end-0 badge bg-danger">New</span>
  Content with badge in corner
</div>

<!-- Shadow utilities -->
<div class="shadow-sm p-3 mb-3">Small shadow</div>
<div class="shadow p-3 mb-3">Regular shadow</div>
<div class="shadow-lg p-3 mb-3">Large shadow</div>

<!-- Rounded corners -->
<img class="rounded" src="img.jpg" alt="">
<img class="rounded-circle" src="img.jpg" alt="" style="width:64px;height:64px;">
<img class="rounded-pill" src="img.jpg" alt="">

<!-- Border utilities -->
<div class="border border-primary p-2">Blue border</div>
<div class="border-0 p-2">No border</div>
<div class="border border-2 rounded p-2">Thick border + rounded</div>

<!-- Overflow utilities -->
<div class="overflow-auto" style="max-height:150px;">Scrollable content...</div>
<div class="overflow-hidden">Clipped content</div>

<!-- Z-index -->
<div class="z-0">Base layer</div>
<div class="z-3">Elevated layer</div>

<!-- Opacity utilities -->
<div class="opacity-75">75% opaque</div>
<div class="opacity-50">50% opaque</div>
<div class="opacity-25">25% opaque</div>
```

---

## 9. Live Showcase: Bootstrap Complete Demo

**Full Bootstrap page with grid, navbar, cards, forms, modals, and components:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap 5 Full Demo</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
  <div class="container">
    <a class="navbar-brand fw-bold">🚀 MyApp</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">About</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>

<!-- Hero Banner -->
<div class="bg-primary text-white py-5">
  <div class="container text-center">
    <h1 class="display-4 fw-bold">Welcome to Bootstrap 5</h1>
    <p class="lead">Build responsive, mobile-first projects on the web with the world's most popular framework.</p>
    <button class="btn btn-light btn-lg me-2" data-bs-toggle="modal" data-bs-target="#demoModal">
      Open Modal
    </button>
    <button class="btn btn-outline-light btn-lg">Learn More</button>
  </div>
</div>

<!-- Alert Banner -->
<div class="container mt-3">
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    ✅ <strong>Bootstrap 5 loaded!</strong> All components ready.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  </div>
</div>

<!-- Card Grid -->
<div class="container my-5">
  <h2 class="mb-4">Feature Cards</h2>
  <div class="row g-4">
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">🎨 Responsive Grid</h5>
          <p class="card-text">12-column flexbox grid that works on all devices seamlessly.</p>
          <div class="progress">
            <div class="progress-bar bg-success" style="width:90%">90%</div>
          </div>
        </div>
        <div class="card-footer"><small class="text-muted">Core Feature</small></div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm border-primary">
        <div class="card-body">
          <h5 class="card-title text-primary">⚡ JS Components</h5>
          <p class="card-text">Modals, dropdowns, tooltips, and more via vanilla JavaScript.</p>
          <div class="progress">
            <div class="progress-bar bg-primary" style="width:75%">75%</div>
          </div>
        </div>
        <div class="card-footer"><small class="text-muted">Interactive</small></div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">🎯 Utility Classes</h5>
          <p class="card-text">Hundreds of spacing, color, display, and flex utilities.</p>
          <div class="progress">
            <div class="progress-bar progress-bar-striped bg-warning" style="width:85%">85%</div>
          </div>
        </div>
        <div class="card-footer"><small class="text-muted">Styling</small></div>
      </div>
    </div>
  </div>
</div>

<!-- Form Section -->
<div class="container my-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow">
        <div class="card-header bg-dark text-white fw-bold">Contact Form</div>
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" placeholder="Your name">
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" placeholder="email@example.com">
            </div>
            <div class="mb-3">
              <label class="form-label">Subject</label>
              <select class="form-select">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Message</label>
              <textarea class="form-control" rows="3"></textarea>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="terms">
              <label class="form-check-label" for="terms">I accept the Terms & Conditions</label>
            </div>
            <button type="submit" class="btn btn-primary w-100">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Accordion FAQ -->
<div class="container my-5">
  <h2 class="mb-4">FAQ</h2>
  <div class="accordion" id="faq">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#a1">
          What is Bootstrap 5?
        </button>
      </h2>
      <div id="a1" class="accordion-collapse collapse show" data-bs-parent="#faq">
        <div class="accordion-body">Bootstrap 5 is an open-source CSS framework that provides responsive grid, components, and utilities without jQuery.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#a2">
          How many columns does the grid have?
        </button>
      </h2>
      <div id="a2" class="accordion-collapse collapse" data-bs-parent="#faq">
        <div class="accordion-body">Bootstrap uses a 12-column grid system built on CSS Flexbox. Columns can span 1–12 columns.</div>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="demoModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Bootstrap Modal</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>This is a Bootstrap 5 modal dialog. Modals require the JS bundle to function.</p>
        <div class="alert alert-info mb-0">💡 Modals are built entirely with vanilla JS in Bootstrap 5!</div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-primary">Confirm</button>
      </div>
    </div>
  </div>
</div>

<!-- Footer -->
<footer class="bg-dark text-white py-4 mt-5">
  <div class="container text-center">
    <p class="mb-0">Built with <strong>Bootstrap 5</strong> · © 2026 MyApp</p>
    <div class="d-flex justify-content-center gap-3 mt-2">
      <span class="badge bg-primary">Grid</span>
      <span class="badge bg-success">Components</span>
      <span class="badge bg-warning text-dark">Utilities</span>
      <span class="badge bg-danger">No jQuery!</span>
    </div>
  </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

<iframe srcdoc='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></head><body><nav class="navbar navbar-expand-lg bg-dark navbar-dark"><div class="container"><a class="navbar-brand fw-bold">🚀 MyApp</a><div class="navbar-nav ms-auto d-none d-lg-flex"><a class="nav-link active" href="#">Home</a><a class="nav-link" href="#">About</a><a class="nav-link" href="#">Contact</a></div></div></nav><div class="bg-primary text-white py-4"><div class="container text-center"><h1 class="display-5 fw-bold">Bootstrap 5 Live Demo</h1><p class="lead mb-3">Responsive grid, components &amp; utilities — no jQuery!</p><span class="badge bg-light text-dark me-1">Grid</span><span class="badge bg-warning text-dark me-1">Components</span><span class="badge bg-success me-1">Forms</span><span class="badge bg-danger">Modals</span></div></div><div class="container my-4"><div class="alert alert-success alert-dismissible fade show"><strong>✅ Bootstrap 5 is loaded!</strong> All components ready.<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div><div class="row g-3 mb-4"><div class="col-md-4"><div class="card h-100 shadow-sm"><div class="card-body"><h5 class="card-title">🎨 Responsive Grid</h5><p class="card-text small">12-column flexbox grid working on all devices.</p><div class="progress mt-2"><div class="progress-bar bg-success" style="width:90%">90%</div></div></div></div></div><div class="col-md-4"><div class="card h-100 shadow-sm border-primary"><div class="card-body"><h5 class="card-title text-primary">⚡ JS Components</h5><p class="card-text small">Modals, dropdowns, tooltips via vanilla JS.</p><div class="progress mt-2"><div class="progress-bar bg-primary" style="width:75%">75%</div></div></div></div></div><div class="col-md-4"><div class="card h-100 shadow-sm"><div class="card-body"><h5 class="card-title">🎯 Utilities</h5><p class="card-text small">Hundreds of spacing, color, and flex utilities.</p><div class="progress mt-2"><div class="progress-bar progress-bar-striped bg-warning" style="width:85%">85%</div></div></div></div></div></div><div class="row g-3 mb-4"><div class="col-md-6"><div class="card shadow"><div class="card-header bg-dark text-white">Contact Form</div><div class="card-body"><div class="mb-2"><input type="text" class="form-control form-control-sm" placeholder="Your name"></div><div class="mb-2"><input type="email" class="form-control form-control-sm" placeholder="email@example.com"></div><div class="mb-2"><select class="form-select form-select-sm"><option>General Inquiry</option><option>Support</option></select></div><div class="mb-2"><textarea class="form-control form-control-sm" rows="2" placeholder="Message..."></textarea></div><button class="btn btn-primary btn-sm w-100">Send Message</button></div></div></div><div class="col-md-6"><div class="accordion" id="faq"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button py-2" type="button" data-bs-toggle="collapse" data-bs-target="#a1">What is Bootstrap 5?</button></h2><div id="a1" class="accordion-collapse collapse show" data-bs-parent="#faq"><div class="accordion-body small">Bootstrap 5 is an open-source CSS framework providing responsive grid, components, and utilities — now without jQuery.</div></div></div><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse" data-bs-target="#a2">Grid columns?</button></h2><div id="a2" class="accordion-collapse collapse" data-bs-parent="#faq"><div class="accordion-body small">Bootstrap uses a 12-column Flexbox grid. Columns span 1–12.</div></div></div></div><div class="d-flex gap-2 mt-3"><button class="btn btn-primary btn-sm">Primary</button><button class="btn btn-outline-danger btn-sm">Outline</button><button class="btn btn-success btn-sm">Success</button></div></div></div></div><footer class="bg-dark text-white py-3"><div class="container text-center"><p class="mb-1 small">Built with <strong>Bootstrap 5</strong></p><div class="d-flex justify-content-center gap-2"><span class="badge bg-primary">Grid</span><span class="badge bg-success">Components</span><span class="badge bg-danger">No jQuery</span></div></div></footer><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script></body></html>' width="100%" height="700" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

> [!IMPORTANT]
> Interactive components like Navbars, Modals, Dropdowns, and Accordions require the Bootstrap JavaScript bundle (`bootstrap.bundle.min.js`) which includes Popper.js for positioning.
