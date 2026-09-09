# Tailwind CSS Comprehensive Guide

Tailwind CSS is a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center`, and `rotate-90` that can be composed to build any design, directly in your markup.

> [!NOTE]
> Unlike Bootstrap, Tailwind does not provide pre-designed UI components (like a `.card` or `.navbar`). Instead, it provides low-level utility classes that let you build completely custom designs without leaving your HTML.

## 1. Utility-First Architecture & JIT Compiler

The core philosophy of Tailwind is applying single-purpose CSS classes directly to HTML elements.

Tailwind's Just-In-Time (JIT) compiler scans your HTML/JS files for class names and generates the corresponding CSS on demand. This ensures your final CSS bundle is extremely small, as it only includes the classes you actually used.

```html
<!-- Building a "Card" component from scratch using utilities -->
<div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
  <div class="font-bold text-xl mb-2 text-gray-800">The Coldest Sunset</div>
  <p class="text-gray-700 text-base">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </p>
</div>
```

---

## 2. Core Utility Categories

### Spacing (Margin & Padding)

Tailwind's spacing scale is based on a `4px` grid. $1\text{ unit} = 0.25\text{rem} = 4\text{px}$.

- `p-{size}`: Padding all sides (e.g., `p-4` = $1\text{rem}$)
- `px-{size}`: Padding x-axis (left/right)
- `py-{size}`: Padding y-axis (top/bottom)
- `pt-{size}`, `pr-{size}`, `pb-{size}`, `pl-{size}`: Specific sides
- `m-{size}`: Margin (follows same axis/side rules as padding)

```html
<div class="pt-6 px-4 mb-8">...</div>
```

### Typography

Controls font family, size, weight, color, and alignment.

- **Size**: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.
- **Weight**: `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- **Alignment**: `text-left`, `text-center`, `text-right`, `text-justify`
- **Color**: `text-{color}-{shade}` (e.g., `text-blue-500`)

```html
<h1 class="text-3xl font-bold text-slate-900 text-center">Hello World</h1>
```

### Color Palette

Tailwind provides an extensive default color palette ranging from `50` (lightest) to `950` (darkest).

- **Backgrounds**: `bg-{color}-{shade}` (e.g., `bg-red-500`)
- **Text**: `text-{color}-{shade}`
- **Borders**: `border-{color}-{shade}`

---

## 3. Flexbox & Grid Layouts

Tailwind makes building complex layouts easy without writing custom CSS.

### Flexbox

```html
<div class="flex flex-row justify-between items-center gap-4">
  <div class="flex-1 bg-blue-200 p-4">Item 1</div>
  <div class="flex-none bg-blue-300 p-4">Item 2</div>
</div>
```
- `flex`: Sets `display: flex`
- `flex-row` / `flex-col`: Direction
- `justify-{start|center|end|between|around}`: Main axis alignment
- `items-{start|center|end|stretch}`: Cross axis alignment
- `gap-{size}`: Spacing between flex items

### CSS Grid

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="bg-gray-100 p-4">Col 1</div>
  <div class="bg-gray-100 p-4">Col 2</div>
  <div class="bg-gray-100 p-4">Col 3</div>
</div>
```
- `grid`: Sets `display: grid`
- `grid-cols-{n}`: Specifies the number of columns
- `col-span-{n}`: Makes an item span multiple columns

---

## 4. Modifiers (Hover, Focus, and States)

Tailwind allows you to conditionally apply utility classes using modifier prefixes.

### State Modifiers
- `hover:`: Applies when the mouse is over the element.
- `focus:`: Applies when the element is focused.
- `active:`: Applies when the element is being clicked.
- `disabled:`: Applies when the element is disabled.

```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring-4 focus:ring-blue-300">
  Click me
</button>
```

### Group and Peer Modifiers
- `group-hover:`: Styles an element based on the hover state of a parent (requires the parent to have the `group` class).
- `peer-invalid:`: Styles an element based on the state of a sibling element (requires the sibling to have the `peer` class).

---

## 5. Responsive Design

Every utility class in Tailwind can be applied conditionally at different breakpoints using screen size prefixes. Tailwind uses a mobile-first approach.

| Prefix | Minimum Width | CSS Media Query |
| :--- | :--- | :--- |
| `sm:` | $640\text{px}$ | `@media (min-width: 640px) { ... }` |
| `md:` | $768\text{px}$ | `@media (min-width: 768px) { ... }` |
| `lg:` | $1024\text{px}$| `@media (min-width: 1024px) { ... }` |
| `xl:` | $1280\text{px}$| `@media (min-width: 1280px) { ... }` |
| `2xl:`| $1536\text{px}$| `@media (min-width: 1536px) { ... }` |

```html
<!-- 
  Mobile: 1 column
  Tablet (md): 2 columns
  Desktop (lg): 4 columns
-->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Content -->
</div>
```

---

## 6. Arbitrary Values

If you need a specific value that isn't included in the design system, you can use the JIT compiler's arbitrary value syntax using square brackets `[]`.

```html
<!-- Uses an exact hex color -->
<div class="bg-[#bada55]">...</div>

<!-- Uses an exact pixel value for top margin -->
<div class="mt-[117px]">...</div>

<!-- Uses CSS variables -->
<div class="w-[var(--my-width)]">...</div>
```

> [!TIP]
> While arbitrary values are incredibly powerful, use them sparingly. Relying too heavily on them defeats the purpose of having a constrained design system.
