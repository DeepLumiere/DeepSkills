# Chapter 3: Responsive Web Design & HTML5 Web APIs

> **Course Title:** Full Stack Web Development (FSD)
> **Source Material:** `UNIT-2 Frontend Frameworks.docx`, `unit2code/`

---

## 1. Chapter Overview
This chapter explores the responsive layout mechanics and browser-native platform APIs essential for modern web engineering. It encompasses:
- Viewport configuration mechanics (`<meta name="viewport">`) and mobile rendering traps.
- Responsive image scaling (`max-width: 100%` vs `width: 100%`) and art direction using `<picture>`.
- Fluid typography utilizing viewport units (`vw`, `vh`, `vmin`, `vmax`).
- Multi-condition CSS3 media queries and print stylesheets.
- HTML5 semantic structure elements (`<header>`, `<footer>`, `<figure>`, `<figcaption>`).
- HTML5 Canvas 2D raster graphics engine.
- Geolocation API, Web Storage API (`localStorage` vs `sessionStorage`), and HTML5 Drag & Drop.
- Embedded interactive sandboxes for testing responsive design, Canvas graphics, and Drag-and-Drop storage mechanics.

---

## 2. Responsive Web Design (RWD) Foundations

### 2.1 Viewport Configuration Mechanics
Mobile browser engines default to a simulated desktop layout viewport (typically $980\text{px}$) downscaled to fit screen width. The HTML5 `<meta name="viewport">` tag overrides this:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

| Directive | Permissible Values | Functional Role |
| :--- | :--- | :--- |
| `width` | `device-width` or integer px | Sets logical viewport width in CSS pixels to match physical screen width. |
| `initial-scale` | Float between `0.1` and `10.0` | Sets initial zoom ratio upon page render ($1.0 = 1:1$). |
| `maximum-scale` | Float between `0.1` and `10.0` | Constrains maximum user zoom magnification. |
| `user-scalable` | `yes` or `no` | Controls whether user pinch-to-zoom is enabled. *(Must be `yes` for accessibility)*. |

---

### 2.2 Responsive Image Strategies
- **Fluid `width: 100%`:** Forces asset to expand to container width, causing severe pixelation if container exceeds asset resolution.
- **Constrained `max-width: 100%; height: auto;`:** Scales asset down when container narrows, but prevents stretching beyond intrinsic pixel resolution.
- **Art Direction with `<picture>`:**

```html
<picture>
  <source srcset="mobile_crop.jpg" media="(max-width: 600px)">
  <source srcset="tablet_crop.jpg" media="(max-width: 1200px)">
  <img src="desktop_full.jpg" alt="Hero Banner" style="max-width: 100%; height: auto;">
</picture>
```

---

### 2.3 Viewport Typography Units

| Unit | Mathematical Basis | Application |
| :--- | :--- | :--- |
| `1vw` | $1\%$ of viewport width | Continuous fluid headline scaling. |
| `1vh` | $1\%$ of viewport height | Full-screen hero sections (`min-height: 100vh`). |
| `1vmin` | $1\%$ of $\min(\text{width}, \text{height})$ | Square UI elements that fit both orientations. |
| `1vmax` | $1\%$ of $\max(\text{width}, \text{height})$ | Dynamic background sizing across orientation changes. |

```css
h1 {
  font-size: clamp(1.5rem, 4vw, 3.5rem);
}
```

---

## 3. HTML5 Web Platform APIs

### 3.1 Web Storage API (`localStorage` vs `sessionStorage`)

| Dimension | `localStorage` | `sessionStorage` |
| :--- | :--- | :--- |
| **Persistence** | Permanent until explicitly deleted by code/user. | Destroyed when tab/window closes. |
| **Capacity** | $\approx 5\text{MB} - 10\text{MB}$ per origin. | $\approx 5\text{MB}$ per origin. |
| **API Methods** | `setItem`, `getItem`, `removeItem`, `clear`. | `setItem`, `getItem`, `removeItem`, `clear`. |

```javascript
// Serialization & Storage
localStorage.setItem("user_settings", JSON.stringify({ theme: "dark", fontSize: 16 }));

// Retrieval & Parsing
const savedSettings = JSON.parse(localStorage.getItem("user_settings") || "{}");
```

---

### 3.2 Native HTML5 Drag and Drop API
Enables DOM elements to become draggable objects.

> **CRITICAL REQUIREMENT:** The `ondragover` handler **must call `event.preventDefault()`** to permit dropping; otherwise the browser prohibits the drop operation!

```html
<div id="dragItem" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', event.target.id)">
  Drag Me
</div>

<div ondragover="event.preventDefault()" ondrop="dropHandler(event)">
  Drop Zone
</div>

<script>
  function dropHandler(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    event.currentTarget.appendChild(document.getElementById(id));
  }
</script>
```

---

## 4. Live Interactive UI Sandboxes

### Sandbox 1: Responsive Breakpoints & Viewport Unit Sandbox
```html
<iframe srcdoc='<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 14px; background: #f8fafc; color: #0f172a; }
    .card { background: white; border-radius: 8px; padding: 14px; border: 1px solid #cbd5e1; }
    .fluid-text { font-size: clamp(1.2rem, 3.5vw, 2.2rem); font-weight: 700; color: #0284c7; margin: 0 0 10px 0; }
    .res-box { width: 100%; height: 70px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; transition: background 0.3s; }
    @media (max-width: 500px) { .res-box { background: #ef4444; } .res-box::after { content: "Mobile View (<=500px)"; } }
    @media (min-width: 501px) and (max-width: 800px) { .res-box { background: #f59e0b; } .res-box::after { content: "Tablet View (501px - 800px)"; } }
    @media (min-width: 801px) { .res-box { background: #10b981; } .res-box::after { content: "Desktop View (>800px)"; } }
  </style>
</head>
<body>
  <div class="card">
    <div class="fluid-text">Fluid Viewport Typography</div>
    <div class="res-box"></div>
  </div>
</body>
</html>' width="100%" height="220" style="border: 1px solid #cbd5e1; border-radius: 8px; margin: 12px 0;" loading="lazy"></iframe>
```

---

## 5. Formula Sheet

- **Viewport Typography Dimension Equation:**

$$
\text{Font Size (px)} = \text{Viewport Width (px)} \times \left( \frac{\text{vw}}{100} \right)
$$

---

## 6. Definition Sheet

1. **Responsive Web Design (RWD):** An engineering approach where layouts dynamically adjust across device screen dimensions using fluid grids, flexible images, and CSS media queries.
2. **Viewport:** The visible rectangle area of a web page within the browser frame.
3. **`localStorage`:** A synchronous client-side key-value string storage engine that persists data across browser sessions.
4. **DataTransfer Object:** The browser object utilized within the Drag and Drop API to pass payload data between drag sources and drop targets.

---

## 7. Exam-Oriented Review

1. Differentiate between `width: 100%` and `max-width: 100%` for responsive image rendering.
2. Explain why `event.preventDefault()` must be executed during `ondragover` in HTML5 Drag and Drop.
3. Compare `localStorage` and `sessionStorage` in terms of lifespan, capacity, and network overhead.
