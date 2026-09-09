# Vue.js Comprehensive Guide

Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.

## 1. Vue Application Instance

Every Vue application starts by creating a new **application instance** with the `createApp` function.

```javascript
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})

// Mount the app to a DOM element
app.mount('#app')
```

---

## 2. Declarative Rendering & Template Syntax

Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data.

### Text Interpolation

The most basic form of data binding is text interpolation using the "Mustache" syntax (double curly braces).

```html
<span>Message: {{ msg }}</span>
```

### Raw HTML

The double mustaches interpret the data as plain text, not HTML. In order to output real HTML, you will need to use the `v-html` directive:

```html
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

> [!CAUTION]
> Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to XSS vulnerabilities. Only use `v-html` on trusted content and **never** on user-provided content.

---

## 3. Directives

Directives are special attributes with the `v-` prefix. Directive attribute values are expected to be a single JavaScript expression.

### Data Binding (`v-bind`)

Used to reactively update an HTML attribute.
Shortcut: `:`

```html
<a v-bind:href="url">Link</a>
<!-- Shortcut -->
<a :href="url">Link</a>

<!-- Binding Classes -->
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
```

### Conditional Rendering (`v-if`, `v-else-if`, `v-else`, `v-show`)

- `v-if`: Conditionally renders a block. The block will only be rendered if the directive's expression returns a truthy value.
- `v-show`: Conditionally displays an element using CSS `display` property.

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>

<!-- v-show only toggles visibility (display: none) -->
<h1 v-show="ok">Hello!</h1>
```

> [!TIP]
> **`v-if` vs `v-show`**
> `v-if` has higher toggle costs (destroys and recreates DOM nodes) while `v-show` has higher initial render costs (always rendered, just hidden). Use `v-show` if you need to toggle something very often, and prefer `v-if` if the condition is unlikely to change at runtime.

### List Rendering (`v-for`)

Used to render a list of items based on an array. Always provide a unique `key` attribute.

```html
<ul>
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }} - {{ item.message }}
  </li>
</ul>
```

### Event Handling (`v-on`)

Used to listen to DOM events and run some JavaScript when they're triggered.
Shortcut: `@`

```html
<button v-on:click="counter++">Add 1</button>
<!-- Shortcut -->
<button @click="greet">Greet</button>

<!-- Event Modifiers -->
<form @submit.prevent="onSubmit">...</form> <!-- Prevents default behavior (page reload) -->
<button @click.stop="doThis">...</button> <!-- Stops event propagation -->
```

### Two-Way Binding (`v-model`)

Creates two-way data bindings on form input, textarea, and select elements.

```html
<input v-model="message" placeholder="edit me" />
<p>Message is: {{ message }}</p>
```

---

## 4. Component Architecture

Components allow us to split the UI into independent and reusable pieces.

### Global vs Local Registration

```javascript
// Global Registration
const app = createApp({})
app.component('MyComponent', {
  /* ... */
})

// Local Registration (in a Single-File Component or another component)
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
```

### Props (Passing Data Down)

Props are custom attributes you can register on a component. When a value is passed to a prop attribute, it becomes a property on that component instance.

```javascript
// Child Component
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

```html
<!-- Parent Component -->
<BlogPost title="My journey with Vue" :likes="42" />
```

### Emitting Events (Passing Data Up)

Child components can emit custom events to their parents using `$emit`.

```javascript
// Child Component
export default {
  methods: {
    submitForm() {
      this.$emit('form-submitted', this.formData)
    }
  }
}
```

```html
<!-- Parent Component -->
<ChildComponent @form-submitted="handleSubmission" />
```

---

## 5. Composition API vs Options API

Vue 3 introduced the Composition API as an alternative to the traditional Options API.

### Options API (Classic)

Code is grouped by options (`data`, `methods`, `computed`, `watch`, `mounted`).

```javascript
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
```

### Composition API (Modern)

Code is grouped logically by feature using the `<script setup>` syntax and reactivity APIs (`ref`, `reactive`).

```html
<script setup>
import { ref, computed } from 'vue'

// Reactive state
const count = ref(0)

// Computed property
const doubleCount = computed(() => count.value * 2)

// Method
function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
  <p>Double: {{ doubleCount }}</p>
</template>
```

> [!NOTE]
> The Composition API provides better logic reuse, more flexible code organization, and excellent TypeScript support. It is the recommended approach for new Vue 3 projects.

---

## 6. Lifecycle Hooks

Each Vue component instance goes through a series of initialization steps when it's created, mounted, updated, and destroyed.

- `onMounted()` / `mounted()`: Called after the component has been mounted to the DOM. Good for fetching initial data.
- `onUpdated()` / `updated()`: Called after a reactive state change has caused the component's DOM tree to update.
- `onUnmounted()` / `unmounted()`: Called after the component has been unmounted. Good for cleaning up event listeners or timers.
