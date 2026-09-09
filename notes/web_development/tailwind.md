# Tailwind CSS — Complete Utility-First Reference

Tailwind CSS is a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center`, and `rotate-90` that can be composed to build any design, directly in your markup.

> [!NOTE]
> Unlike Bootstrap, Tailwind does **not** provide pre-designed UI components. Instead, it gives you low-level utility classes to build completely custom designs without writing CSS.

---

## 1. CDN Setup (Play CDN)

The Tailwind Play CDN is for development and prototyping — it dynamically generates CSS at runtime. For production, use the Tailwind CLI or PostCSS build step.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind App</title>

  <!-- Tailwind CSS Play CDN (dev only — not for production) -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Optional: extend the default theme -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: '#0284c7'
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif']
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50 text-slate-900">
  <!-- Your content here -->
</body>
</html>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Tailwind App</title> <!-- Tailwind CSS Play CDN (dev only — not for production) --> <script src="https://cdn.tailwindcss.com"></script> <!-- Optional: extend the default theme --> <script> tailwind.config = { theme: { extend: { colors: { brand: &apos;#0284c7&apos; }, fontFamily: { sans: [&apos;Inter&apos;, &apos;system-ui&apos;, &apos;sans-serif&apos;] } } } } </script> </head> <body class="bg-slate-50 text-slate-900"> <!-- Your content here --> </body> </html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 2. Spacing — Margin & Padding

Tailwind's spacing scale is based on a **4px grid**: `1 unit = 0.25rem = 4px`.

| Class | Value |
| :--- | :--- |
| `p-0` | `padding: 0` |
| `p-1` | `padding: 0.25rem (4px)` |
| `p-2` | `padding: 0.5rem (8px)` |
| `p-4` | `padding: 1rem (16px)` |
| `p-8` | `padding: 2rem (32px)` |
| `p-16` | `padding: 4rem (64px)` |

```html
<!-- Padding all sides -->
<div class="p-4">Padding 1rem all around</div>
<div class="p-8">Padding 2rem all around</div>

<!-- Directional padding -->
<div class="pt-6 pb-2 pl-4 pr-4">Top 1.5rem, Bottom 0.5rem, L/R 1rem</div>
<div class="px-8 py-4">Horizontal 2rem, Vertical 1rem</div>

<!-- Margin -->
<div class="mt-8 mb-4">Margin top 2rem, bottom 1rem</div>
<div class="mx-auto max-w-md">Horizontally centered, max-width 28rem</div>
<div class="ml-auto">Pushed to the right</div>

<!-- Negative margin -->
<div class="-mt-4">Negative top margin (overlap)</div>

<!-- Space between children (flex/grid) -->
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Space-x / space-y (margin-based spacing) -->
<div class="flex space-x-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="flex flex-col space-y-2">
  <p>Row 1</p>
  <p>Row 2</p>
  <p>Row 3</p>
</div>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- Padding all sides --> <div class="p-4">Padding 1rem all around</div> <div class="p-8">Padding 2rem all around</div> <!-- Directional padding --> <div class="pt-6 pb-2 pl-4 pr-4">Top 1.5rem, Bottom 0.5rem, L/R 1rem</div> <div class="px-8 py-4">Horizontal 2rem, Vertical 1rem</div> <!-- Margin --> <div class="mt-8 mb-4">Margin top 2rem, bottom 1rem</div> <div class="mx-auto max-w-md">Horizontally centered, max-width 28rem</div> <div class="ml-auto">Pushed to the right</div> <!-- Negative margin --> <div class="-mt-4">Negative top margin (overlap)</div> <!-- Space between children (flex/grid) --> <div class="flex gap-4"> <div>Item 1</div> <div>Item 2</div> <div>Item 3</div> </div> <!-- Space-x / space-y (margin-based spacing) --> <div class="flex space-x-4"> <div>Item 1</div> <div>Item 2</div> </div> <div class="flex flex-col space-y-2"> <p>Row 1</p> <p>Row 2</p> <p>Row 3</p> </div> </body> </html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 3. Typography

```html
<!-- Font sizes -->
<p class="text-xs">Extra Small (12px)</p>
<p class="text-sm">Small (14px)</p>
<p class="text-base">Base (16px)</p>
<p class="text-lg">Large (18px)</p>
<p class="text-xl">XL (20px)</p>
<p class="text-2xl">2XL (24px)</p>
<p class="text-4xl">4XL (36px)</p>
<p class="text-6xl">6XL (60px)</p>
<p class="text-9xl">9XL (128px)</p>

<!-- Font weight -->
<p class="font-thin">Thin (100)</p>
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-extrabold">Extra Bold (800)</p>
<p class="font-black">Black (900)</p>

<!-- Text alignment -->
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
<p class="text-justify">Justified text spans the full width</p>

<!-- Text color (from color palette) -->
<p class="text-slate-900">Slate 900 (near black)</p>
<p class="text-blue-600">Blue 600</p>
<p class="text-emerald-500">Emerald 500</p>
<p class="text-red-400">Red 400</p>
<p class="text-zinc-400">Zinc 400 (muted)</p>

<!-- Line height -->
<p class="leading-none">Leading none (1)</p>
<p class="leading-tight">Leading tight (1.25)</p>
<p class="leading-normal">Leading normal (1.5)</p>
<p class="leading-relaxed">Leading relaxed (1.625)</p>
<p class="leading-loose">Leading loose (2)</p>

<!-- Letter spacing -->
<p class="tracking-tighter">Tighter tracking</p>
<p class="tracking-normal">Normal tracking</p>
<p class="tracking-widest">Widest tracking (0.1em)</p>

<!-- Text decoration & transform -->
<p class="underline">Underlined</p>
<p class="line-through">Strikethrough</p>
<p class="uppercase">uppercase transform</p>
<p class="lowercase">LOWERCASE TRANSFORM</p>
<p class="capitalize">capitalize each word</p>

<!-- Truncate long text -->
<p class="truncate max-w-xs">This very long text will be truncated with an ellipsis...</p>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- Font sizes --> <p class="text-xs">Extra Small (12px)</p> <p class="text-sm">Small (14px)</p> <p class="text-base">Base (16px)</p> <p class="text-lg">Large (18px)</p> <p class="text-xl">XL (20px)</p> <p class="text-2xl">2XL (24px)</p> <p class="text-4xl">4XL (36px)</p> <p class="text-6xl">6XL (60px)</p> <p class="text-9xl">9XL (128px)</p> <!-- Font weight --> <p class="font-thin">Thin (100)</p> <p class="font-light">Light (300)</p> <p class="font-normal">Normal (400)</p> <p class="font-medium">Medium (500)</p> <p class="font-semibold">Semibold (600)</p> <p class="font-bold">Bold (700)</p> <p class="font-extrabold">Extra Bold (800)</p> <p class="font-black">Black (900)</p> <!-- Text alignment --> <p class="text-left">Left aligned</p> <p class="text-center">Center aligned</p> <p class="text-right">Right aligned</p> <p class="text-justify">Justified text spans the full width</p> <!-- Text color (from color palette) --> <p class="text-slate-900">Slate 900 (near black)</p> <p class="text-blue-600">Blue 600</p> <p class="text-emerald-500">Emerald 500</p> <p class="text-red-400">Red 400</p> <p class="text-zinc-400">Zinc 400 (muted)</p> <!-- Line height --> <p class="leading-none">Leading none (1)</p> <p class="leading-tight">Leading tight (1.25)</p> <p class="leading-normal">Leading normal (1.5)</p> <p class="leading-relaxed">Leading relaxed (1.625)</p> <p class="leading-loose">Leading loose (2)</p> <!-- Letter spacing --> <p class="tracking-tighter">Tighter tracking</p> <p class="tracking-normal">Normal tracking</p> <p class="tracking-widest">Widest tracking (0.1em)</p> <!-- Text decoration & transform --> <p class="underline">Underlined</p> <p class="line-through">Strikethrough</p> <p class="uppercase">uppercase transform</p> <p class="lowercase">LOWERCASE TRANSFORM</p> <p class="capitalize">capitalize each word</p> <!-- Truncate long text --> <p class="truncate max-w-xs">This very long text will be truncated with an ellipsis...</p> </body> </html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 4. Colors — Full Palette Usage

```html
<!-- Background colors (50 = lightest, 950 = darkest) -->
<div class="bg-slate-50">Slate 50</div>
<div class="bg-blue-100">Blue 100</div>
<div class="bg-sky-500 text-white">Sky 500</div>
<div class="bg-indigo-700 text-white">Indigo 700</div>
<div class="bg-violet-900 text-white">Violet 900</div>

<!-- Tailwind color families -->
<!-- slate, gray, zinc, neutral, stone,
     red, orange, amber, yellow, lime,
     green, emerald, teal, cyan, sky,
     blue, indigo, violet, purple, fuchsia, pink, rose -->

<!-- Border colors -->
<div class="border-2 border-blue-500">Blue border</div>
<div class="border border-rose-300">Rose border</div>

<!-- Gradient backgrounds -->
<div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
  Left-to-right gradient
</div>
<div class="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 text-white p-4">
  Diagonal gradient with via
</div>
<div class="bg-gradient-to-b from-sky-100 to-white p-4">
  Top to bottom (light)
</div>

<!-- Ring (focus ring) -->
<button class="focus:ring-4 focus:ring-blue-300 focus:outline-none p-2">
  Focus me
</button>

<!-- Divide utilities -->
<div class="divide-y divide-slate-200">
  <p class="py-2">Section 1</p>
  <p class="py-2">Section 2</p>
  <p class="py-2">Section 3</p>
</div>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- Background colors (50 = lightest, 950 = darkest) --> <div class="bg-slate-50">Slate 50</div> <div class="bg-blue-100">Blue 100</div> <div class="bg-sky-500 text-white">Sky 500</div> <div class="bg-indigo-700 text-white">Indigo 700</div> <div class="bg-violet-900 text-white">Violet 900</div> <!-- Tailwind color families --> <!-- slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose --> <!-- Border colors --> <div class="border-2 border-blue-500">Blue border</div> <div class="border border-rose-300">Rose border</div> <!-- Gradient backgrounds --> <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4"> Left-to-right gradient </div> <div class="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 text-white p-4"> Diagonal gradient with via </div> <div class="bg-gradient-to-b from-sky-100 to-white p-4"> Top to bottom (light) </div> <!-- Ring (focus ring) --> <button class="focus:ring-4 focus:ring-blue-300 focus:outline-none p-2"> Focus me </button> <!-- Divide utilities --> <div class="divide-y divide-slate-200"> <p class="py-2">Section 1</p> <p class="py-2">Section 2</p> <p class="py-2">Section 3</p> </div> </body> </html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 5. Flexbox Layout

```html
<!-- ─── Basic flex ──────────────────────────────────────────────── -->
<div class="flex items-center gap-4 p-4 bg-slate-100 rounded">
  <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">AV</div>
  <div>
    <h3 class="font-semibold">Alice Johnson</h3>
    <p class="text-sm text-slate-500">Senior Developer</p>
  </div>
  <button class="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Follow</button>
</div>

<!-- ─── Justify content ─────────────────────────────────────────── -->
<div class="flex justify-start gap-2">  <!-- start (default) --></div>
<div class="flex justify-center gap-2"> <!-- center --></div>
<div class="flex justify-end gap-2">    <!-- end --></div>
<div class="flex justify-between gap-2"><!-- space between --></div>
<div class="flex justify-around gap-2"> <!-- space around --></div>
<div class="flex justify-evenly gap-2"> <!-- equal space --></div>

<!-- ─── Align items ────────────────────────────────────────────── -->
<div class="flex items-start h-24 bg-slate-100">  <!-- align to top --></div>
<div class="flex items-center h-24 bg-slate-100"> <!-- center vertical --></div>
<div class="flex items-end h-24 bg-slate-100">    <!-- align to bottom --></div>
<div class="flex items-stretch h-24 bg-slate-100"><!-- stretch to full height --></div>

<!-- ─── Flex direction ─────────────────────────────────────────── -->
<div class="flex flex-row gap-4">     <!-- horizontal (default) -->
  <div>Left</div><div>Right</div>
</div>
<div class="flex flex-col gap-4">    <!-- vertical -->
  <div>Top</div><div>Bottom</div>
</div>
<div class="flex flex-row-reverse">  <!-- reversed horizontal --></div>

<!-- ─── Flex wrap ─────────────────────────────────────────────── -->
<div class="flex flex-wrap gap-3 p-4">
  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
  <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Vue.js</span>
  <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Tailwind</span>
  <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Bootstrap</span>
  <span class="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
</div>

<!-- ─── Flex grow/shrink ────────────────────────────────────────── -->
<div class="flex gap-4">
  <div class="flex-1 bg-blue-200 p-3">Grows equally (flex-1)</div>
  <div class="flex-1 bg-blue-300 p-3">Grows equally (flex-1)</div>
  <div class="flex-none w-24 bg-blue-400 p-3">Fixed width</div>
</div>

<!-- ─── Self alignment ─────────────────────────────────────────── -->
<div class="flex items-start gap-4 h-32 bg-slate-100 p-2">
  <div class="self-start bg-red-200 p-2">Top</div>
  <div class="self-center bg-green-200 p-2">Middle</div>
  <div class="self-end bg-blue-200 p-2">Bottom</div>
  <div class="self-stretch bg-purple-200 p-2">Stretch</div>
</div>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- ─── Basic flex ──────────────────────────────────────────────── --> <div class="flex items-center gap-4 p-4 bg-slate-100 rounded"> <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">AV</div> <div> <h3 class="font-semibold">Alice Johnson</h3> <p class="text-sm text-slate-500">Senior Developer</p> </div> <button class="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Follow</button> </div> <!-- ─── Justify content ─────────────────────────────────────────── --> <div class="flex justify-start gap-2"> <!-- start (default) --></div> <div class="flex justify-center gap-2"> <!-- center --></div> <div class="flex justify-end gap-2"> <!-- end --></div> <div class="flex justify-between gap-2"><!-- space between --></div> <div class="flex justify-around gap-2"> <!-- space around --></div> <div class="flex justify-evenly gap-2"> <!-- equal space --></div> <!-- ─── Align items ────────────────────────────────────────────── --> <div class="flex items-start h-24 bg-slate-100"> <!-- align to top --></div> <div class="flex items-center h-24 bg-slate-100"> <!-- center vertical --></div> <div class="flex items-end h-24 bg-slate-100"> <!-- align to bottom --></div> <div class="flex items-stretch h-24 bg-slate-100"><!-- stretch to full height --></div> <!-- ─── Flex direction ─────────────────────────────────────────── --> <div class="flex flex-row gap-4"> <!-- horizontal (default) --> <div>Left</div><div>Right</div> </div> <div class="flex flex-col gap-4"> <!-- vertical --> <div>Top</div><div>Bottom</div> </div> <div class="flex flex-row-reverse"> <!-- reversed horizontal --></div> <!-- ─── Flex wrap ─────────────────────────────────────────────── --> <div class="flex flex-wrap gap-3 p-4"> <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span> <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Vue.js</span> <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Tailwind</span> <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Bootstrap</span> <span class="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">JavaScript</span> </div> <!-- ─── Flex grow/shrink ────────────────────────────────────────── --> <div class="flex gap-4"> <div class="flex-1 bg-blue-200 p-3">Grows equally (flex-1)</div> <div class="flex-1 bg-blue-300 p-3">Grows equally (flex-1)</div> <div class="flex-none w-24 bg-blue-400 p-3">Fixed width</div> </div> <!-- ─── Self alignment ─────────────────────────────────────────── --> <div class="flex items-start gap-4 h-32 bg-slate-100 p-2"> <div class="self-start bg-red-200 p-2">Top</div> <div class="self-center bg-green-200 p-2">Middle</div> <div class="self-end bg-blue-200 p-2">Bottom</div> <div class="self-stretch bg-purple-200 p-2">Stretch</div> </div> </body> </html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 6. CSS Grid Layout

```html
<!-- ─── Basic grid ─────────────────────────────────────────────── -->
<div class="grid grid-cols-3 gap-4">
  <div class="bg-blue-100 p-4 rounded">Col 1</div>
  <div class="bg-blue-200 p-4 rounded">Col 2</div>
  <div class="bg-blue-300 p-4 rounded">Col 3</div>
</div>

<!-- ─── Responsive grid ────────────────────────────────────────── -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <div class="bg-white border rounded-lg p-4 shadow-sm">Card 1</div>
  <div class="bg-white border rounded-lg p-4 shadow-sm">Card 2</div>
  <div class="bg-white border rounded-lg p-4 shadow-sm">Card 3</div>
  <div class="bg-white border rounded-lg p-4 shadow-sm">Card 4</div>
</div>

<!-- ─── Column spanning ────────────────────────────────────────── -->
<div class="grid grid-cols-6 gap-4">
  <div class="col-span-4 bg-blue-100 p-4">Wide (4 cols)</div>
  <div class="col-span-2 bg-blue-200 p-4">Narrow (2 cols)</div>
  <div class="col-span-2 bg-green-100 p-4">2 cols</div>
  <div class="col-span-2 bg-green-200 p-4">2 cols</div>
  <div class="col-span-2 bg-green-300 p-4">2 cols</div>
</div>

<!-- ─── Auto-fill responsive grid ─────────────────────────────── -->
<div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
  <div class="bg-slate-100 p-4 rounded">Auto card 1</div>
  <div class="bg-slate-100 p-4 rounded">Auto card 2</div>
  <div class="bg-slate-100 p-4 rounded">Auto card 3</div>
</div>

<!-- ─── Grid rows + areas ──────────────────────────────────────── -->
<div class="grid grid-rows-3 grid-flow-col gap-4">
  <div class="row-span-2 bg-indigo-100 p-4">Spans 2 rows</div>
  <div class="bg-indigo-200 p-4">Cell</div>
  <div class="bg-indigo-200 p-4">Cell</div>
  <div class="bg-indigo-200 p-4">Cell</div>
</div>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- ─── Basic grid ─────────────────────────────────────────────── --> <div class="grid grid-cols-3 gap-4"> <div class="bg-blue-100 p-4 rounded">Col 1</div> <div class="bg-blue-200 p-4 rounded">Col 2</div> <div class="bg-blue-300 p-4 rounded">Col 3</div> </div> <!-- ─── Responsive grid ────────────────────────────────────────── --> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> <div class="bg-white border rounded-lg p-4 shadow-sm">Card 1</div> <div class="bg-white border rounded-lg p-4 shadow-sm">Card 2</div> <div class="bg-white border rounded-lg p-4 shadow-sm">Card 3</div> <div class="bg-white border rounded-lg p-4 shadow-sm">Card 4</div> </div> <!-- ─── Column spanning ────────────────────────────────────────── --> <div class="grid grid-cols-6 gap-4"> <div class="col-span-4 bg-blue-100 p-4">Wide (4 cols)</div> <div class="col-span-2 bg-blue-200 p-4">Narrow (2 cols)</div> <div class="col-span-2 bg-green-100 p-4">2 cols</div> <div class="col-span-2 bg-green-200 p-4">2 cols</div> <div class="col-span-2 bg-green-300 p-4">2 cols</div> </div> <!-- ─── Auto-fill responsive grid ─────────────────────────────── --> <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4"> <div class="bg-slate-100 p-4 rounded">Auto card 1</div> <div class="bg-slate-100 p-4 rounded">Auto card 2</div> <div class="bg-slate-100 p-4 rounded">Auto card 3</div> </div> <!-- ─── Grid rows + areas ──────────────────────────────────────── --> <div class="grid grid-rows-3 grid-flow-col gap-4"> <div class="row-span-2 bg-indigo-100 p-4">Spans 2 rows</div> <div class="bg-indigo-200 p-4">Cell</div> <div class="bg-indigo-200 p-4">Cell</div> <div class="bg-indigo-200 p-4">Cell</div> </div> </body> </html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 7. Responsive Design (Mobile-First)

Every Tailwind utility can be prefixed with a breakpoint to apply conditionally.

| Prefix | Min Width | Typical Target |
| :--- | :--- | :--- |
| *(none)* | 0px | All screens (mobile base) |
| `sm:` | 640px | Large phones / small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Wide monitors |

```html
<!-- Text size: sm on mobile, larger on desktop -->
<h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
  Responsive Heading
</h1>

<!-- Grid: 1 col → 2 col → 4 col -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  <div>Card</div><div>Card</div><div>Card</div><div>Card</div>
</div>

<!-- Sidebar layout: stacked on mobile, side-by-side on lg+ -->
<div class="flex flex-col lg:flex-row gap-6">
  <aside class="w-full lg:w-64 bg-slate-100 p-4">Sidebar</aside>
  <main class="flex-1 bg-white p-4">Main Content</main>
</div>

<!-- Hide/show at breakpoints -->
<nav class="hidden lg:flex items-center gap-6">Desktop Nav</nav>
<button class="lg:hidden">☰ Mobile Menu</button>

<!-- Padding responsive -->
<div class="p-4 md:p-8 xl:p-16">Responsive padding</div>

<!-- Rounded: change at breakpoints -->
<div class="rounded-none sm:rounded-md lg:rounded-xl">
  Corner radius changes at breakpoints
</div>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- Text size: sm on mobile, larger on desktop --> <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold"> Responsive Heading </h1> <!-- Grid: 1 col → 2 col → 4 col --> <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"> <div>Card</div><div>Card</div><div>Card</div><div>Card</div> </div> <!-- Sidebar layout: stacked on mobile, side-by-side on lg+ --> <div class="flex flex-col lg:flex-row gap-6"> <aside class="w-full lg:w-64 bg-slate-100 p-4">Sidebar</aside> <main class="flex-1 bg-white p-4">Main Content</main> </div> <!-- Hide/show at breakpoints --> <nav class="hidden lg:flex items-center gap-6">Desktop Nav</nav> <button class="lg:hidden">☰ Mobile Menu</button> <!-- Padding responsive --> <div class="p-4 md:p-8 xl:p-16">Responsive padding</div> <!-- Rounded: change at breakpoints --> <div class="rounded-none sm:rounded-md lg:rounded-xl"> Corner radius changes at breakpoints </div> </body> </html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 8. State Variants & Interactive Modifiers

```html
<!-- ─── Hover ─────────────────────────────────────────────────── -->
<button class="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
  Hover to darken
</button>

<div class="text-slate-600 hover:text-blue-600 cursor-pointer transition-colors">
  Hover to change color
</div>

<div class="transform hover:scale-105 hover:shadow-xl transition-all duration-200">
  Hover to scale up
</div>

<!-- ─── Focus ─────────────────────────────────────────────────── -->
<input class="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none rounded-lg px-4 py-2"
       placeholder="Focus to highlight">

<!-- ─── Active (during click) ─────────────────────────────────── -->
<button class="bg-blue-500 active:bg-blue-800 active:scale-95 text-white px-6 py-3 rounded-lg transition-all">
  Press me
</button>

<!-- ─── Disabled state ─────────────────────────────────────────── -->
<button class="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg" disabled>
  Disabled Button
</button>

<!-- ─── Group hover (parent triggers child styles) ────────────── -->
<div class="group bg-white hover:bg-blue-600 p-6 rounded-xl border transition-all duration-200 cursor-pointer">
  <h3 class="group-hover:text-white font-bold transition-colors">Card Title</h3>
  <p class="text-slate-500 group-hover:text-blue-100 text-sm transition-colors">
    Entire card changes when you hover
  </p>
</div>

<!-- ─── Peer modifier (sibling affects sibling) ─────────────────── -->
<div>
  <input type="checkbox" id="toggle" class="peer hidden">
  <label for="toggle" class="cursor-pointer bg-slate-200 peer-checked:bg-blue-500 text-sm px-4 py-2 rounded-full transition-colors">
    Toggle
  </label>
  <p class="hidden peer-checked:block mt-2 text-blue-600">Revealed by checkbox!</p>
</div>

<!-- ─── Dark mode ────────────────────────────────────────────── -->
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6">
  Adapts to OS dark mode
</div>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- ─── Hover ─────────────────────────────────────────────────── --> <button class="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"> Hover to darken </button> <div class="text-slate-600 hover:text-blue-600 cursor-pointer transition-colors"> Hover to change color </div> <div class="transform hover:scale-105 hover:shadow-xl transition-all duration-200"> Hover to scale up </div> <!-- ─── Focus ─────────────────────────────────────────────────── --> <input class="border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none rounded-lg px-4 py-2" placeholder="Focus to highlight"> <!-- ─── Active (during click) ─────────────────────────────────── --> <button class="bg-blue-500 active:bg-blue-800 active:scale-95 text-white px-6 py-3 rounded-lg transition-all"> Press me </button> <!-- ─── Disabled state ─────────────────────────────────────────── --> <button class="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg" disabled> Disabled Button </button> <!-- ─── Group hover (parent triggers child styles) ────────────── --> <div class="group bg-white hover:bg-blue-600 p-6 rounded-xl border transition-all duration-200 cursor-pointer"> <h3 class="group-hover:text-white font-bold transition-colors">Card Title</h3> <p class="text-slate-500 group-hover:text-blue-100 text-sm transition-colors"> Entire card changes when you hover </p> </div> <!-- ─── Peer modifier (sibling affects sibling) ─────────────────── --> <div> <input type="checkbox" id="toggle" class="peer hidden"> <label for="toggle" class="cursor-pointer bg-slate-200 peer-checked:bg-blue-500 text-sm px-4 py-2 rounded-full transition-colors"> Toggle </label> <p class="hidden peer-checked:block mt-2 text-blue-600">Revealed by checkbox!</p> </div> <!-- ─── Dark mode ────────────────────────────────────────────── --> <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6"> Adapts to OS dark mode </div> </body> </html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 9. Borders, Shadows & Effects

```html
<!-- ─── Borders ──────────────────────────────────────────────── -->
<div class="border">Default 1px border</div>
<div class="border-2 border-blue-500">2px blue border</div>
<div class="border-4 border-dashed border-red-400">4px dashed red</div>
<div class="border-0">No border</div>
<div class="border-t-2 border-blue-500">Top border only</div>

<!-- ─── Border radius ─────────────────────────────────────────── -->
<div class="rounded-none p-2">Sharp corners</div>
<div class="rounded p-2">Default rounded (4px)</div>
<div class="rounded-md p-2">Medium (6px)</div>
<div class="rounded-lg p-2">Large (8px)</div>
<div class="rounded-xl p-2">Extra large (12px)</div>
<div class="rounded-2xl p-2">2XL (16px)</div>
<div class="rounded-full p-2">Full pill</div>
<img class="rounded-full w-16 h-16" src="avatar.jpg" alt="Avatar">

<!-- ─── Box shadows ────────────────────────────────────────────── -->
<div class="shadow-none p-4">No shadow</div>
<div class="shadow-sm p-4">Small shadow</div>
<div class="shadow p-4">Default shadow</div>
<div class="shadow-md p-4">Medium shadow</div>
<div class="shadow-lg p-4">Large shadow</div>
<div class="shadow-xl p-4">XL shadow</div>
<div class="shadow-2xl p-4">2XL shadow</div>
<div class="shadow-inner p-4">Inset shadow</div>
<div class="shadow-blue-500/50 shadow-lg p-4">Colored shadow</div>

<!-- ─── Opacity ────────────────────────────────────────────────── -->
<div class="opacity-100">100% opaque</div>
<div class="opacity-75">75%</div>
<div class="opacity-50">50%</div>
<div class="opacity-25">25%</div>
<div class="opacity-0">Invisible</div>

<!-- ─── Image filters ──────────────────────────────────────────── -->
<img class="grayscale" src="img.jpg" alt="">           <!-- Black & white -->
<img class="grayscale hover:grayscale-0 transition" src="img.jpg" alt=""> <!-- Color on hover -->
<img class="blur-sm" src="img.jpg" alt="">             <!-- Slight blur -->
<img class="brightness-50" src="img.jpg" alt="">       <!-- Darker -->
<img class="brightness-125" src="img.jpg" alt="">      <!-- Brighter -->
<img class="contrast-150" src="img.jpg" alt="">        <!-- High contrast -->
<img class="saturate-200" src="img.jpg" alt="">        <!-- Vivid colors -->
<img class="sepia" src="img.jpg" alt="">               <!-- Sepia tone -->
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- ─── Borders ──────────────────────────────────────────────── --> <div class="border">Default 1px border</div> <div class="border-2 border-blue-500">2px blue border</div> <div class="border-4 border-dashed border-red-400">4px dashed red</div> <div class="border-0">No border</div> <div class="border-t-2 border-blue-500">Top border only</div> <!-- ─── Border radius ─────────────────────────────────────────── --> <div class="rounded-none p-2">Sharp corners</div> <div class="rounded p-2">Default rounded (4px)</div> <div class="rounded-md p-2">Medium (6px)</div> <div class="rounded-lg p-2">Large (8px)</div> <div class="rounded-xl p-2">Extra large (12px)</div> <div class="rounded-2xl p-2">2XL (16px)</div> <div class="rounded-full p-2">Full pill</div> <img class="rounded-full w-16 h-16" src="avatar.jpg" alt="Avatar"> <!-- ─── Box shadows ────────────────────────────────────────────── --> <div class="shadow-none p-4">No shadow</div> <div class="shadow-sm p-4">Small shadow</div> <div class="shadow p-4">Default shadow</div> <div class="shadow-md p-4">Medium shadow</div> <div class="shadow-lg p-4">Large shadow</div> <div class="shadow-xl p-4">XL shadow</div> <div class="shadow-2xl p-4">2XL shadow</div> <div class="shadow-inner p-4">Inset shadow</div> <div class="shadow-blue-500/50 shadow-lg p-4">Colored shadow</div> <!-- ─── Opacity ────────────────────────────────────────────────── --> <div class="opacity-100">100% opaque</div> <div class="opacity-75">75%</div> <div class="opacity-50">50%</div> <div class="opacity-25">25%</div> <div class="opacity-0">Invisible</div> <!-- ─── Image filters ──────────────────────────────────────────── --> <img class="grayscale" src="img.jpg" alt=""> <!-- Black & white --> <img class="grayscale hover:grayscale-0 transition" src="img.jpg" alt=""> <!-- Color on hover --> <img class="blur-sm" src="img.jpg" alt=""> <!-- Slight blur --> <img class="brightness-50" src="img.jpg" alt=""> <!-- Darker --> <img class="brightness-125" src="img.jpg" alt=""> <!-- Brighter --> <img class="contrast-150" src="img.jpg" alt=""> <!-- High contrast --> <img class="saturate-200" src="img.jpg" alt=""> <!-- Vivid colors --> <img class="sepia" src="img.jpg" alt=""> <!-- Sepia tone --> </body> </html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 10. Arbitrary Values

When you need a value not in the default scale, use bracket syntax `[]`:

```html
<!-- Exact pixel size -->
<div class="w-[380px] h-[220px]">Exact 380×220</div>

<!-- Exact color (hex, hsl, rgb) -->
<div class="bg-[#bada55] text-[#1a1a2e]">Custom hex color</div>
<div class="bg-[hsl(210,100%,56%)]">HSL color</div>

<!-- CSS variables -->
<div class="bg-[var(--brand-color)]">CSS variable</div>

<!-- Exact spacing -->
<div class="mt-[117px]">Exact 117px top margin</div>
<div class="px-[3.75rem]">Exact horizontal padding</div>

<!-- Arbitrary font size -->
<p class="text-[13px] leading-[1.4]">Exact font-size and line-height</p>

<!-- Grid with arbitrary template -->
<div class="grid grid-cols-[1fr_2fr_1fr]">
  <div>25%</div>
  <div>50%</div>
  <div>25%</div>
</div>

<!-- Complex background -->
<div class="bg-[url('hero.jpg')] bg-cover bg-center h-64">Hero image</div>

<!-- Calc() -->
<div class="w-[calc(100%-2rem)]">Full width minus 2rem</div>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- Exact pixel size --> <div class="w-[380px] h-[220px]">Exact 380×220</div> <!-- Exact color (hex, hsl, rgb) --> <div class="bg-[#bada55] text-[#1a1a2e]">Custom hex color</div> <div class="bg-[hsl(210,100%,56%)]">HSL color</div> <!-- CSS variables --> <div class="bg-[var(--brand-color)]">CSS variable</div> <!-- Exact spacing --> <div class="mt-[117px]">Exact 117px top margin</div> <div class="px-[3.75rem]">Exact horizontal padding</div> <!-- Arbitrary font size --> <p class="text-[13px] leading-[1.4]">Exact font-size and line-height</p> <!-- Grid with arbitrary template --> <div class="grid grid-cols-[1fr_2fr_1fr]"> <div>25%</div> <div>50%</div> <div>25%</div> </div> <!-- Complex background --> <div class="bg-[url(&apos;hero.jpg&apos;)] bg-cover bg-center h-64">Hero image</div> <!-- Calc() --> <div class="w-[calc(100%-2rem)]">Full width minus 2rem</div> </body> </html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

## 11. Transitions & Animations

```html
<!-- ─── Transition utilities ──────────────────────────────────── -->
<button class="bg-blue-500 hover:bg-blue-700 transition-colors duration-300">
  Color transition (300ms)
</button>

<div class="transform hover:scale-110 transition-transform duration-200 ease-in-out">
  Scale on hover
</div>

<div class="opacity-0 hover:opacity-100 transition-opacity duration-500">
  Fade in on hover
</div>

<!-- transition-all: transitions all properties at once -->
<div class="hover:scale-105 hover:shadow-2xl hover:bg-blue-50 transition-all duration-300">
  All properties transition
</div>

<!-- Timing functions -->
<div class="transition-transform ease-linear duration-300">Linear</div>
<div class="transition-transform ease-in duration-300">Ease in (slow start)</div>
<div class="transition-transform ease-out duration-300">Ease out (slow end)</div>
<div class="transition-transform ease-in-out duration-300">Ease in-out</div>

<!-- ─── Built-in animations ────────────────────────────────────── -->
<div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full">
  <!-- Loading spinner --></div>
<div class="animate-ping h-4 w-4 bg-green-500 rounded-full"><!-- Ping/ripple --></div>
<div class="animate-pulse bg-slate-200 h-4 w-48 rounded"><!-- Skeleton loader --></div>
<div class="animate-bounce">⬇️ Bouncing arrow</div>

<!-- Skeleton loader pattern -->
<div class="animate-pulse space-y-3">
  <div class="h-4 bg-slate-200 rounded w-3/4"></div>
  <div class="h-4 bg-slate-200 rounded"></div>
  <div class="h-4 bg-slate-200 rounded w-5/6"></div>
</div>
```

<iframe srcdoc='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <script src="https://cdn.tailwindcss.com"></script> <style>body { background: #f8fafc; color: #0f172a; padding: 16px; }</style> </head> <body> <!-- ─── Transition utilities ──────────────────────────────────── --> <button class="bg-blue-500 hover:bg-blue-700 transition-colors duration-300"> Color transition (300ms) </button> <div class="transform hover:scale-110 transition-transform duration-200 ease-in-out"> Scale on hover </div> <div class="opacity-0 hover:opacity-100 transition-opacity duration-500"> Fade in on hover </div> <!-- transition-all: transitions all properties at once --> <div class="hover:scale-105 hover:shadow-2xl hover:bg-blue-50 transition-all duration-300"> All properties transition </div> <!-- Timing functions --> <div class="transition-transform ease-linear duration-300">Linear</div> <div class="transition-transform ease-in duration-300">Ease in (slow start)</div> <div class="transition-transform ease-out duration-300">Ease out (slow end)</div> <div class="transition-transform ease-in-out duration-300">Ease in-out</div> <!-- ─── Built-in animations ────────────────────────────────────── --> <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"> <!-- Loading spinner --></div> <div class="animate-ping h-4 w-4 bg-green-500 rounded-full"><!-- Ping/ripple --></div> <div class="animate-pulse bg-slate-200 h-4 w-48 rounded"><!-- Skeleton loader --></div> <div class="animate-bounce">⬇️ Bouncing arrow</div> <!-- Skeleton loader pattern --> <div class="animate-pulse space-y-3"> <div class="h-4 bg-slate-200 rounded w-3/4"></div> <div class="h-4 bg-slate-200 rounded"></div> <div class="h-4 bg-slate-200 rounded w-5/6"></div> </div> </body> </html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

---

---

## 12. Exhaustive Class Cheatsheet Reference

### 📐 Layout & Core

| Category | Classes | Description |
| :--- | :--- | :--- |
| **Container** | `container` | Sets `max-width` to match min-width of current breakpoint |
| **Display** | `block`, `inline-block`, `inline`, `flex`, `grid`, `hidden` | Sets CSS `display` |
| **Box Sizing** | `box-border`, `box-content` | Controls how element size is calculated |
| **Position** | `static`, `fixed`, `absolute`, `relative`, `sticky` | Sets CSS `position` |
| **Top/Right/Bottom/Left** | `inset-0`, `top-4`, `bottom-0`, `left-auto`, `-right-2` | Placement of positioned elements |
| **Z-Index** | `z-0`, `z-10`, `z-20`, `z-50`, `z-auto` | Controls stack order |

### 📏 Spacing & Sizing

| Category | Classes |
| :--- | :--- |
| **Padding** | `p-0` to `p-96`, `px-4`, `py-2`, `pt-1`, `pb-8`, `pl-auto`, `pr-3` |
| **Margin** | `m-0` to `m-96`, `mx-auto`, `my-4`, `mt-2`, `mb-8`, `-ml-4` *(negative margin)* |
| **Space Between**| `space-x-4`, `space-y-2`, `space-x-reverse` |
| **Width** | `w-0` to `w-96`, `w-full`, `w-screen`, `w-min`, `w-max`, `w-fit`, `w-1/2`, `w-1/3` |
| **Min/Max Width**| `min-w-0`, `min-w-full`, `max-w-sm`, `max-w-md`, `max-w-screen-lg` |
| **Height** | `h-0` to `h-96`, `h-full`, `h-screen`, `h-min`, `h-max`, `h-fit` |

### 🔠 Typography

| Category | Classes |
| :--- | :--- |
| **Font Family**| `font-sans`, `font-serif`, `font-mono` |
| **Font Size** | `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` to `text-9xl` |
| **Font Weight**| `font-thin`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-black` |
| **Text Align** | `text-left`, `text-center`, `text-right`, `text-justify` |
| **Text Color** | `text-slate-500`, `text-blue-600`, `text-emerald-400`, `text-white`, `text-transparent` |
| **Decoration** | `underline`, `overline`, `line-through`, `no-underline` |
| **Line Height**| `leading-none`, `leading-tight`, `leading-snug`, `leading-normal`, `leading-relaxed`, `leading-loose` |

### 🎨 Backgrounds & Borders

| Category | Classes |
| :--- | :--- |
| **Background Color**| `bg-slate-50`, `bg-blue-600`, `bg-transparent`, `bg-black` |
| **Gradient Base** | `bg-gradient-to-t`, `bg-gradient-to-r`, `bg-gradient-to-b`, `bg-gradient-to-l`, `bg-gradient-to-br` |
| **Gradient Stops** | `from-blue-500`, `via-purple-500`, `to-pink-500` |
| **Border Radius**| `rounded-none`, `rounded-sm`, `rounded`, `rounded-md`, `rounded-lg`, `rounded-full` |
| **Border Width** | `border-0`, `border-2`, `border-4`, `border-t-2`, `border-b-4` |
| **Border Color** | `border-slate-200`, `border-blue-500`, `border-transparent` |
| **Outline (Ring)** | `ring-0`, `ring-2`, `ring-4`, `ring-blue-500`, `ring-offset-2` |

### 📐 Flexbox & Grid

| Category | Classes |
| :--- | :--- |
| **Flex Direction**| `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse` |
| **Flex Wrap** | `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse` |
| **Justify Content**| `justify-start`, `justify-center`, `justify-end`, `justify-between`, `justify-around`, `justify-evenly` |
| **Align Items** | `items-start`, `items-center`, `items-end`, `items-baseline`, `items-stretch` |
| **Flex Children** | `flex-1`, `flex-auto`, `flex-none`, `grow`, `grow-0`, `shrink`, `shrink-0` |
| **Grid Cols/Rows**| `grid-cols-1` to `grid-cols-12`, `grid-rows-1` to `grid-rows-6` |
| **Grid Spanning** | `col-span-2`, `row-span-3`, `col-start-1`, `col-end-4` |
| **Gap** | `gap-0` to `gap-96`, `gap-x-4`, `gap-y-2` |

### 🚀 Effects & Filters

| Category | Classes |
| :--- | :--- |
| **Box Shadow** | `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-inner`, `shadow-none` |
| **Opacity** | `opacity-0`, `opacity-10`, `opacity-50`, `opacity-100` |
| **Mix Blend** | `mix-blend-normal`, `mix-blend-multiply`, `mix-blend-screen`, `mix-blend-overlay` |
| **Blur** | `blur-none`, `blur-sm`, `blur`, `blur-md`, `blur-xl` |
| **Drop Shadow**| `drop-shadow-sm`, `drop-shadow`, `drop-shadow-lg` |
| **Grayscale** | `grayscale-0`, `grayscale` |

### ⏳ Transitions & Transforms

| Category | Classes |
| :--- | :--- |
| **Transition** | `transition-none`, `transition-all`, `transition`, `transition-colors`, `transition-transform` |
| **Duration** | `duration-75`, `duration-150`, `duration-300`, `duration-500`, `duration-1000` |
| **Easing** | `ease-linear`, `ease-in`, `ease-out`, `ease-in-out` |
| **Scale** | `scale-0`, `scale-50`, `scale-90`, `scale-100`, `scale-110`, `scale-150` |
| **Rotate** | `rotate-0`, `rotate-45`, `rotate-90`, `rotate-180`, `-rotate-90` |
| **Translate** | `translate-x-4`, `-translate-y-2`, `translate-x-full` |

---

## 13. Live Showcase: Full Tailwind UI Page

**Complete modern landing page with navbar, hero, cards, form, and footer:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind CSS Demo</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-900">

  <!-- Navbar -->
  <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
      <span class="text-xl font-bold text-blue-600">⚡ TailwindApp</span>
      <div class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Home</a>
        <a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
        <a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
    <div class="max-w-4xl mx-auto text-center px-6">
      <h1 class="text-4xl md:text-6xl font-black text-slate-900 mb-4 leading-tight">
        Build Faster with <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tailwind CSS</span>
      </h1>
      <p class="text-xl text-slate-500 mb-8 max-w-2xl mx-auto">
        Utility-first CSS framework that lets you build beautiful, responsive UIs without leaving your HTML.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-blue-200 transition-all">
          Start Building
        </button>
        <button class="bg-white text-slate-700 hover:bg-slate-50 font-semibold px-8 py-3 rounded-xl border border-slate-200 shadow-sm transition-all">
          View Docs
        </button>
      </div>
    </div>
  </section>

  <!-- Feature Cards -->
  <section class="max-w-5xl mx-auto px-6 py-12">
    <h2 class="text-2xl font-bold text-center mb-8">Why Tailwind?</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
        <h3 class="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">Utility-First</h3>
        <p class="text-slate-500 text-sm">Apply single-purpose classes directly. No more switching files or naming conventions.</p>
      </div>
      <div class="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300">
        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
        <h3 class="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors">JIT Compiler</h3>
        <p class="text-slate-500 text-sm">Generates only the CSS you use. Final bundles are tiny — often under 10KB.</p>
      </div>
      <div class="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
        <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📱</div>
        <h3 class="font-bold text-lg mb-2 group-hover:text-emerald-600 transition-colors">Responsive</h3>
        <p class="text-slate-500 text-sm">Mobile-first responsive prefixes (sm:, md:, lg:) on every utility class.</p>
      </div>
    </div>
  </section>

  <!-- Contact Form -->
  <section class="bg-white py-12">
    <div class="max-w-md mx-auto px-6">
      <h2 class="text-2xl font-bold mb-6 text-center">Get in Touch</h2>
      <div class="space-y-4">
        <input type="text" placeholder="Your Name"
               class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
        <input type="email" placeholder="Email Address"
               class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
        <select class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-500">
          <option>Select topic</option>
          <option>General Inquiry</option>
          <option>Support</option>
        </select>
        <textarea placeholder="Your message..." rows="4"
                  class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"></textarea>
        <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
          Send Message →
        </button>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-slate-900 text-white py-8">
    <div class="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span class="text-lg font-bold text-blue-400">⚡ TailwindApp</span>
      <div class="flex flex-wrap gap-3">
        <span class="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">Utility-First</span>
        <span class="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">JIT</span>
        <span class="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm">Responsive</span>
        <span class="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">Dark Mode</span>
      </div>
      <p class="text-slate-400 text-sm">© 2026 Built with Tailwind CSS</p>
    </div>
  </footer>

</body>
</html>
```

<iframe srcdoc='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-slate-50 text-slate-900"><nav class="bg-white border-b border-slate-200 sticky top-0 z-50"><div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between"><span class="text-lg font-bold text-blue-600">⚡ TailwindApp</span><div class="flex items-center gap-4 text-sm font-medium"><a href="#" class="text-slate-500 hover:text-blue-600 transition-colors">Home</a><a href="#" class="text-slate-500 hover:text-blue-600 transition-colors">Features</a><button class="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">Get Started</button></div></div></nav><section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-10"><div class="max-w-3xl mx-auto text-center px-4"><h1 class="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">Build Faster with <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tailwind CSS</span></h1><p class="text-slate-500 mb-6 max-w-xl mx-auto text-sm">Utility-first CSS framework. Beautiful, responsive UIs without leaving your HTML.</p><div class="flex flex-wrap justify-center gap-3"><button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg transition-all active:scale-95">Start Building</button><button class="bg-white text-slate-700 hover:bg-slate-50 font-semibold px-6 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all">View Docs</button></div></div></section><section class="max-w-4xl mx-auto px-4 py-8"><h2 class="text-xl font-bold text-center mb-6">Why Tailwind?</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"><div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">🎨</div><h3 class="font-bold mb-1 group-hover:text-blue-600 transition-colors">Utility-First</h3><p class="text-slate-500 text-xs">Apply single-purpose classes. No more naming or context switching.</p></div><div class="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300"><div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">⚡</div><h3 class="font-bold mb-1 group-hover:text-purple-600 transition-colors">JIT Compiler</h3><p class="text-slate-500 text-xs">Generates only CSS you use. Final bundles under 10KB.</p></div><div class="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300"><div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">📱</div><h3 class="font-bold mb-1 group-hover:text-emerald-600 transition-colors">Responsive</h3><p class="text-slate-500 text-xs">Mobile-first responsive prefixes on every utility class.</p></div></div></section><section class="bg-white py-8"><div class="max-w-sm mx-auto px-4"><h2 class="text-xl font-bold mb-4 text-center">Get in Touch</h2><div class="space-y-3"><input type="text" placeholder="Your Name" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"><input type="email" placeholder="Email Address" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"><textarea placeholder="Your message..." rows="3" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition resize-none"></textarea><button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 text-sm">Send Message →</button></div></div></section><footer class="bg-slate-900 text-white py-6 mt-4"><div class="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3"><span class="font-bold text-blue-400">⚡ TailwindApp</span><div class="flex flex-wrap gap-2"><span class="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs">Utility-First</span><span class="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full text-xs">JIT</span><span class="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-xs">Responsive</span></div><p class="text-slate-400 text-xs">© 2026 Built with Tailwind CSS</p></div></footer></body></html>' width="100%" height="750" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

> [!TIP]
> While arbitrary values `[...]` are incredibly powerful, use them sparingly. Over-relying on them defeats the purpose of a constrained design system and makes maintenance harder.
