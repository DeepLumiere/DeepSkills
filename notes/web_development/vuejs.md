# Vue.js — Complete Framework Reference

Vue (pronounced /vjuː/, like "view") is a progressive JavaScript framework for building user interfaces. Unlike monolithic frameworks, Vue is designed to be incrementally adoptable.

> [!NOTE]
> Vue 3 with the Composition API is the current recommended standard. Vue 2 reached End-of-Life in December 2023.

---

## 1. Setup & CDN Usage

### CDN (No Build Step — Perfect for Learning)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue 3 App</title>
  <!-- Vue 3 CDN (Global Build) -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">{{ message }}</div>

  <script>
    const { createApp } = Vue;

    createApp({
      data() {
        return {
          message: 'Hello Vue 3!'
        };
      }
    }).mount('#app');
  </script>
</body>
</html>
```

---

## 2. Declarative Rendering & Template Syntax

```html
<div id="app">
  <!-- Text Interpolation: double mustaches -->
  <h1>{{ title }}</h1>
  <p>{{ greeting + ' ' + name }}</p>
  <p>Count doubled: {{ count * 2 }}</p>

  <!-- Raw HTML rendering (⚠ use only with trusted content) -->
  <p v-html="rawHtml"></p>

  <!-- One-time rendering (does not update on data change) -->
  <span v-once>{{ message }}</span>
</div>

<script>
createApp({
  data() {
    return {
      title: 'Vue 3 Demo',
      greeting: 'Hello',
      name: 'Alice',
      count: 5,
      rawHtml: '<strong style="color:red">Bold Red Text via v-html</strong>',
      message: 'This renders only once'
    };
  }
}).mount('#app');
</script>
```

---

## 3. All Vue Directives — Complete Reference

### v-bind `:` — Attribute Binding

```html
<div id="app">
  <!-- Bind a single attribute -->
  <img :src="imageUrl" :alt="imageAlt" :width="imgWidth">
  <a :href="linkUrl" :class="linkClass">Dynamic Link</a>

  <!-- Bind an object of attributes at once -->
  <img v-bind="imgAttrs">

  <!-- Class binding: object syntax -->
  <div :class="{ active: isActive, 'text-danger': hasError }">
    Object Class Binding
  </div>

  <!-- Class binding: array syntax (multiple classes) -->
  <div :class="[primaryClass, isLarge ? 'large' : '']">Array Binding</div>

  <!-- Style binding: object syntax -->
  <p :style="{ color: textColor, fontSize: fontSize + 'px', fontWeight: 'bold' }">
    Styled Text
  </p>

  <!-- Style binding: array of objects -->
  <div :style="[baseStyle, overrideStyle]">Multiple Style Objects</div>

  <!-- Disabled button based on condition -->
  <button :disabled="isLoading">{{ isLoading ? 'Loading...' : 'Submit' }}</button>
</div>

<script>
createApp({
  data() {
    return {
      imageUrl: 'https://via.placeholder.com/150',
      imageAlt: 'Placeholder',
      imgWidth: 150,
      imgAttrs: { src: 'img.png', alt: 'Image', width: 100 },
      linkUrl: 'https://vuejs.org',
      linkClass: 'btn-primary',
      isActive: true,
      hasError: false,
      primaryClass: 'text-lg',
      isLarge: true,
      textColor: '#0284c7',
      fontSize: 18,
      baseStyle: { padding: '8px', borderRadius: '4px' },
      overrideStyle: { background: '#e0f2fe' },
      isLoading: false
    };
  }
}).mount('#app');
</script>
```

---

### 🌟 Deep Dive: Class & Style Bindings (All Possible Cases)

Vue provides special enhancements when `v-bind` is used with `class` and `style`.

#### 1. Binding HTML Classes (`:class`)

```html
<div id="app">
  <!-- 1. String Syntax (Standard but dynamic) -->
  <div :class="activeClass">String syntax</div>

  <!-- 2. Object Syntax (Toggle classes based on truthiness) -->
  <div :class="{ active: isActive, 'text-danger': hasError }">Object syntax</div>

  <!-- 3. Bound to a data object directly -->
  <div :class="classObject">Data Object syntax</div>

  <!-- 4. Bound to a computed property (Most powerful & common pattern!) -->
  <div :class="computedClassObject">Computed Object syntax</div>

  <!-- 5. Array Syntax (Apply multiple classes) -->
  <div :class="[activeClass, errorClass]">Array syntax</div>

  <!-- 6. Array Syntax with Ternary expressions -->
  <div :class="[isActive ? activeClass : '', errorClass]">Array with Ternary</div>

  <!-- 7. Array with Nested Object Syntax (Cleanest for mixing logic) -->
  <div :class="[{ active: isActive }, errorClass]">Array with Object syntax</div>
  
  <!-- 8. Component Class Inheritance -->
  <!-- If MyButton template has class="btn", the resulting HTML is class="btn btn-large" -->
  <my-button :class="['btn-large']"></my-button>
</div>

<script>
createApp({
  data() {
    return {
      isActive: true,
      hasError: false,
      activeClass: 'active-item',
      errorClass: 'text-danger',
      classObject: {
        active: true,
        'text-danger': false
      }
    }
  },
  computed: {
    computedClassObject() {
      return {
        active: this.isActive && !this.hasError,
        'text-danger': this.hasError && this.isActive
      }
    }
  }
})
</script>
```

#### 2. Binding Inline Styles (`:style`)

```html
<div id="app">
  <!-- 1. Object Syntax (CamelCase keys) -->
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">Inline Object</div>

  <!-- 2. Object Syntax (Kebab-case keys in quotes) -->
  <div :style="{ 'background-color': bgColor }">Kebab-case</div>

  <!-- 3. Bound to a data object -->
  <div :style="styleObject">Data Object Style</div>

  <!-- 4. Bound to a computed property -->
  <div :style="computedStyles">Computed Style</div>

  <!-- 5. Array Syntax (Merge multiple style objects) -->
  <div :style="[baseStyles, overridingStyles]">Array of Styles</div>

  <!-- 6. Auto-prefixing (Vue adds browser prefixes like -webkit- automatically) -->
  <div :style="{ transform: 'rotate(10deg)' }">Auto-prefixed</div>

  <!-- 7. Multiple Values (Vue chooses the last one the browser supports) -->
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">Multiple Values</div>
</div>

<script>
createApp({
  data() {
    return {
      activeColor: 'red',
      fontSize: 30,
      bgColor: '#f4f4f4',
      styleObject: {
        color: 'blue',
        fontSize: '24px'
      },
      baseStyles: { margin: '10px', padding: '20px' },
      overridingStyles: { padding: '10px', color: 'green' }
    }
  },
  computed: {
    computedStyles() {
      return {
        fontWeight: this.isActive ? 'bold' : 'normal',
        opacity: this.hasError ? 0.5 : 1
      }
    }
  }
})
</script>
```

---

### v-model — Two-Way Data Binding

```html
<div id="app">
  <!-- Text input -->
  <input v-model="username" placeholder="Enter username">
  <p>Username: {{ username }}</p>

  <!-- Textarea -->
  <textarea v-model="bio" placeholder="Write your bio..."></textarea>
  <p>Bio: {{ bio }}</p>

  <!-- Checkbox: boolean -->
  <input type="checkbox" v-model="agreed" id="terms">
  <label for="terms">Agree to Terms</label>
  <p>Agreed: {{ agreed }}</p>

  <!-- Checkbox: array of selected values -->
  <label><input type="checkbox" v-model="languages" value="JavaScript"> JavaScript</label>
  <label><input type="checkbox" v-model="languages" value="Python"> Python</label>
  <label><input type="checkbox" v-model="languages" value="Java"> Java</label>
  <p>Selected: {{ languages }}</p>

  <!-- Radio buttons -->
  <label><input type="radio" v-model="gender" value="male"> Male</label>
  <label><input type="radio" v-model="gender" value="female"> Female</label>
  <p>Gender: {{ gender }}</p>

  <!-- Select dropdown -->
  <select v-model="country">
    <option disabled value="">Select country</option>
    <option value="IN">India</option>
    <option value="US">United States</option>
    <option value="UK">United Kingdom</option>
  </select>
  <p>Country: {{ country }}</p>

  <!-- Multi-select -->
  <select v-model="skills" multiple>
    <option>HTML</option>
    <option>CSS</option>
    <option>JavaScript</option>
    <option>Vue.js</option>
  </select>
  <p>Skills: {{ skills }}</p>

  <!-- v-model modifiers -->
  <input v-model.trim="trimmedName" placeholder="Trim whitespace">   <!-- .trim -->
  <input v-model.number="age" type="number" placeholder="Age">        <!-- .number: auto converts to Number -->
  <input v-model.lazy="lazyText" placeholder="Updates on blur">       <!-- .lazy: sync on change, not input -->
</div>

<script>
createApp({
  data() {
    return {
      username: '',
      bio: '',
      agreed: false,
      languages: [],
      gender: '',
      country: '',
      skills: [],
      trimmedName: '',
      age: 0,
      lazyText: ''
    };
  }
}).mount('#app');
</script>
```

---

### v-if / v-else-if / v-else / v-show — Conditional Rendering

```html
<div id="app">
  <!-- v-if: Completely removes/re-inserts element from DOM -->
  <div v-if="score >= 90">🏆 Grade A — Excellent!</div>
  <div v-else-if="score >= 75">😊 Grade B — Good</div>
  <div v-else-if="score >= 60">📘 Grade C — Average</div>
  <div v-else>❌ Grade F — Failed</div>

  <!-- v-show: Toggles CSS display (element stays in DOM) -->
  <!-- Use v-show when frequently toggling; use v-if for rare changes -->
  <div v-show="isLoggedIn">Welcome back, user!</div>
  <div v-show="!isLoggedIn">Please login to continue.</div>

  <!-- Group multiple elements with <template> (no extra DOM node) -->
  <template v-if="userLoaded">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <p>{{ user.role }}</p>
  </template>

  <!-- Controls -->
  <input type="range" v-model.number="score" min="0" max="100"> {{ score }}
  <button @click="isLoggedIn = !isLoggedIn">Toggle Login</button>
</div>

<script>
createApp({
  data() {
    return {
      score: 85,
      isLoggedIn: false,
      userLoaded: true,
      user: { name: 'Alice', email: 'alice@example.com', role: 'Admin' }
    };
  }
}).mount('#app');
</script>
```

---

### v-for — List Rendering

```html
<div id="app">
  <!-- Array of primitives -->
  <ul>
    <li v-for="(fruit, index) in fruits" :key="index">
      {{ index + 1 }}. {{ fruit }}
    </li>
  </ul>

  <!-- Array of objects -->
  <div v-for="student in students" :key="student.id" class="card">
    <h3>{{ student.name }}</h3>
    <p>Grade: {{ student.grade }} | Score: {{ student.score }}</p>
  </div>

  <!-- Iterating over an object's properties -->
  <ul>
    <li v-for="(value, key, index) in userProfile" :key="key">
      {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>

  <!-- Range-based loop (1 to 5) -->
  <span v-for="n in 5" :key="n">★ </span>

  <!-- v-for + v-if (use <template> to avoid conflicts) -->
  <template v-for="item in items" :key="item.id">
    <div v-if="item.active">{{ item.name }} (active)</div>
  </template>

  <!-- Controls to add/remove items -->
  <button @click="addFruit">Add Fruit</button>
  <button @click="removeFirst">Remove First</button>
</div>

<script>
createApp({
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Cherry'],
      students: [
        { id: 1, name: 'Alice', grade: 'A', score: 95 },
        { id: 2, name: 'Bob', grade: 'B', score: 82 },
        { id: 3, name: 'Carol', grade: 'A+', score: 98 }
      ],
      userProfile: { name: 'Dave', age: 22, department: 'CS' },
      items: [
        { id: 1, name: 'Widget A', active: true },
        { id: 2, name: 'Widget B', active: false },
        { id: 3, name: 'Widget C', active: true }
      ]
    };
  },
  methods: {
    addFruit() {
      const names = ['Mango', 'Grape', 'Kiwi', 'Papaya'];
      this.fruits.push(names[Math.floor(Math.random() * names.length)]);
    },
    removeFirst() {
      this.fruits.shift();
    }
  }
}).mount('#app');
</script>
```

---

### v-on `@` — Event Handling

```html
<div id="app">
  <!-- Basic click event -->
  <button @click="count++">Click me ({{ count }})</button>
  <button @click="resetCount">Reset</button>

  <!-- Method with event object -->
  <button @click="handleClick">Click with Event</button>
  <button @click="handleClickWithArg('hello', $event)">Pass Custom Arg</button>

  <!-- Event modifiers -->
  <form @submit.prevent="submitForm">        <!-- Prevent default form submit -->
    <input @keyup.enter="submitForm" type="text" v-model="formInput" placeholder="Press Enter...">
    <button type="submit">Submit</button>
  </form>

  <div @click="outerClick">
    <button @click.stop="innerClick">Stop Propagation</button>  <!-- .stop prevents bubbling -->
  </div>

  <!-- .once modifier: fires only once then removes listener -->
  <button @click.once="handleOnce">Click Once Only</button>

  <!-- Key modifiers -->
  <input @keyup.enter="onEnter" @keyup.escape="onEscape" placeholder="Key listeners">
  <input @keyup.up="moveUp" @keyup.down="moveDown" placeholder="Arrow keys">

  <!-- Mouse button modifiers -->
  <div @click.left="leftClick" @click.right.prevent="rightClick" @click.middle="middleClick">
    Click Zone (left/right/middle)
  </div>

  <!-- Computed results display -->
  <p>Last action: {{ lastAction }}</p>
</div>

<script>
createApp({
  data() {
    return {
      count: 0,
      formInput: '',
      lastAction: 'none'
    };
  },
  methods: {
    resetCount() { this.count = 0; },
    handleClick(event) {
      this.lastAction = `Clicked at (${event.clientX}, ${event.clientY})`;
    },
    handleClickWithArg(msg, event) {
      this.lastAction = `${msg} at (${event.clientX}, ${event.clientY})`;
    },
    submitForm() { this.lastAction = `Form submitted: "${this.formInput}"`; },
    outerClick() { this.lastAction = 'Outer div clicked'; },
    innerClick() { this.lastAction = 'Inner button clicked (propagation stopped)'; },
    handleOnce() { this.lastAction = 'One-time click fired!'; },
    onEnter() { this.lastAction = 'Enter key pressed'; },
    onEscape() { this.lastAction = 'Escape key pressed'; },
    moveUp() { this.lastAction = 'Arrow Up'; },
    moveDown() { this.lastAction = 'Arrow Down'; },
    leftClick() { this.lastAction = 'Left mouse click'; },
    rightClick() { this.lastAction = 'Right mouse click (default prevented)'; },
    middleClick() { this.lastAction = 'Middle mouse click'; }
  }
}).mount('#app');
</script>
```

---

## 4. Computed Properties & Watchers

```html
<div id="app">
  <h3>Shopping Cart</h3>
  <input v-model.number="quantity" type="number" min="1" max="99"> items
  <input v-model.number="pricePerUnit" type="number"> price each

  <!-- Computed: auto-updates when dependencies change -->
  <p>Subtotal: ₹{{ subtotal }}</p>
  <p>Tax (18%): ₹{{ tax }}</p>
  <p><strong>Total: ₹{{ total }}</strong></p>

  <!-- Watcher demo -->
  <input v-model="searchQuery" placeholder="Type to search...">
  <p>Search log: {{ searchLog }}</p>
</div>

<script>
createApp({
  data() {
    return {
      quantity: 2,
      pricePerUnit: 500,
      searchQuery: '',
      searchLog: ''
    };
  },
  computed: {
    // Computed: cached until reactive dependencies change
    subtotal() {
      return this.quantity * this.pricePerUnit;
    },
    tax() {
      return Math.round(this.subtotal * 0.18);
    },
    total() {
      return this.subtotal + this.tax;
    }
  },
  watch: {
    // Watch: runs a side effect when a value changes
    searchQuery(newVal, oldVal) {
      this.searchLog = `Changed from "${oldVal}" to "${newVal}"`;
      // Would trigger API call in real app
    },
    quantity: {
      // Deep/immediate watcher options
      handler(newVal) {
        if (newVal < 1) this.quantity = 1;
      },
      immediate: true  // Run on component creation
    }
  }
}).mount('#app');
</script>
```

---

## 5. Components Architecture

```html
<!-- Full component example in CDN mode -->
<div id="app">
  <user-card
    v-for="user in users"
    :key="user.id"
    :name="user.name"
    :role="user.role"
    :score="user.score"
    @promote="handlePromote"
  ></user-card>
  <p>Log: {{ promotionLog }}</p>
</div>

<script>
const app = createApp({
  data() {
    return {
      users: [
        { id: 1, name: 'Alice', role: 'Student', score: 95 },
        { id: 2, name: 'Bob', role: 'Student', score: 82 }
      ],
      promotionLog: ''
    };
  },
  methods: {
    handlePromote(userName) {
      this.promotionLog = `${userName} promoted to Graduate!`;
    }
  }
});

// Global component registration
app.component('user-card', {
  props: {
    name: { type: String, required: true },
    role: { type: String, default: 'User' },
    score: { type: Number, default: 0 }
  },
  emits: ['promote'],  // Declare emitted events
  template: `
    <div style="border:1px solid #ccc; padding:12px; margin:8px; border-radius:6px;">
      <h3>{{ name }}</h3>
      <p>Role: <strong>{{ role }}</strong> | Score: {{ score }}/100</p>
      <button @click="$emit('promote', name)" style="background:#0284c7;color:white;border:none;padding:4px 12px;border-radius:4px;cursor:pointer;">
        Promote
      </button>
    </div>
  `
});

app.mount('#app');
</script>
```

---

## 6. Options API vs Composition API

### Options API (Classic Vue 2/3)

```javascript
export default {
  name: 'CounterComponent',

  // Reactive data
  data() {
    return {
      count: 0,
      step: 1
    };
  },

  // Derived state (cached)
  computed: {
    doubled() { return this.count * 2; },
    isEven() { return this.count % 2 === 0; }
  },

  // Functions
  methods: {
    increment() { this.count += this.step; },
    decrement() { this.count -= this.step; },
    reset() { this.count = 0; }
  },

  // Reactive side effects
  watch: {
    count(newVal) {
      console.log('Count changed to', newVal);
    }
  },

  // Lifecycle hooks
  mounted() {
    console.log('Component mounted to DOM');
  },
  beforeUnmount() {
    console.log('Component about to be destroyed');
  }
};
```

### Composition API (Modern Vue 3 — Recommended)

```html
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

// Reactive state (ref for primitives)
const count = ref(0);
const step = ref(1);

// Computed properties
const doubled = computed(() => count.value * 2);
const isEven = computed(() => count.value % 2 === 0);

// Methods (plain functions)
function increment() { count.value += step.value; }
function decrement() { count.value -= step.value; }
function reset() { count.value = 0; }

// Watcher
watch(count, (newVal, oldVal) => {
  console.log(`Count: ${oldVal} → ${newVal}`);
});

// Lifecycle hooks
onMounted(() => console.log('Mounted!'));
onBeforeUnmount(() => console.log('Unmounting...'));
</script>

<template>
  <div>
    <p>Count: {{ count }} ({{ isEven ? 'even' : 'odd' }})</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="decrement">−</button>
    <button @click="reset">Reset</button>
    <button @click="increment">+</button>
  </div>
</template>
```

---

## 7. Custom Directives

### Vue 3 Custom Directive

```javascript
// Global custom directive: v-highlight
app.directive('highlight', {
  // Called when element is inserted into the DOM
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow';
    el.style.padding = '2px 6px';
    el.style.borderRadius = '3px';
  },
  // Called when component containing the element is updated
  updated(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow';
  }
});

// Usage:
// <p v-highlight="'#bbf7d0'">This text has a green highlight</p>
// <p v-highlight>This text has default yellow highlight</p>
```

```javascript
// v-focus: auto-focus an input on mount
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});
// <input v-focus placeholder="Auto-focused on load">

// v-click-outside: close dropdown when clicking outside
app.directive('click-outside', {
  mounted(el, binding) {
    el._clickOutsideHandler = (event) => {
      if (!el.contains(event.target)) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el._clickOutsideHandler);
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutsideHandler);
  }
});
// <div v-click-outside="closeDropdown">...</div>
```

---

## 8. Lifecycle Hooks

```javascript
// Full Composition API lifecycle sequence
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue';

onBeforeMount(() => {
  // DOM not yet created; data reactive but no DOM access
  console.log('1. Before Mount — DOM not ready');
});

onMounted(() => {
  // DOM is created and inserted; safe for DOM access, fetch calls, timers
  console.log('2. Mounted — DOM ready');
  // fetch('/api/data').then(...)
});

onBeforeUpdate(() => {
  // Reactive data changed; DOM not yet re-rendered
  console.log('3. Before Update');
});

onUpdated(() => {
  // DOM re-rendered after reactive data change
  console.log('4. Updated — DOM synced');
});

onBeforeUnmount(() => {
  // Component about to be destroyed; clean up timers, subscriptions
  console.log('5. Before Unmount — cleanup here');
  clearInterval(myTimer);
  window.removeEventListener('resize', myHandler);
});

onUnmounted(() => {
  // Component fully destroyed
  console.log('6. Unmounted');
});
```

---

## 9. Live Showcase: Complete Vue 3 App

**Full shopping cart with v-for, v-model, v-if, computed, events, and components:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue 3 Shopping Cart</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 700px; margin: 20px auto; padding: 0 16px; }
    .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; background: white; }
    button { padding: 6px 14px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
    .btn-primary { background: #0284c7; color: white; }
    .btn-danger { background: #ef4444; color: white; }
    .btn-sm { padding: 3px 10px; font-size: 13px; }
    input { padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px; }
    .total { font-size: 1.2rem; font-weight: bold; color: #0f172a; }
    .empty { text-align: center; padding: 40px; color: #94a3b8; }
  </style>
</head>
<body>
  <div id="app">
    <h1>🛒 Vue 3 Shopping Cart</h1>

    <!-- Product catalog -->
    <div class="card">
      <h2>Products</h2>
      <input v-model="searchTerm" placeholder="Search products..." style="width:100%;margin-bottom:12px;">
      <div v-for="product in filteredProducts" :key="product.id" style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f1f5f9;">
        <div>
          <strong>{{ product.name }}</strong>
          <span style="color:#64748b;margin-left:8px;">₹{{ product.price }}</span>
        </div>
        <button class="btn-primary btn-sm" @click="addToCart(product)">+ Add</button>
      </div>
      <p v-if="filteredProducts.length === 0" style="color:#94a3b8;text-align:center;">No products found.</p>
    </div>

    <!-- Cart -->
    <div class="card">
      <h2>Cart <span style="background:#0284c7;color:white;border-radius:50%;padding:2px 8px;font-size:14px;">{{ totalItems }}</span></h2>

      <div v-if="cart.length === 0" class="empty">
        <p>Your cart is empty. Add some products! 🛍️</p>
      </div>

      <template v-else>
        <div v-for="(item, index) in cart" :key="item.id"
             style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f1f5f9;">
          <div>
            <strong>{{ item.name }}</strong>
            <div style="font-size:13px;color:#64748b;">₹{{ item.price }} × {{ item.qty }}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button @click="changeQty(index, -1)" class="btn-sm" style="background:#e2e8f0;">−</button>
            <span>{{ item.qty }}</span>
            <button @click="changeQty(index, +1)" class="btn-sm" style="background:#e2e8f0;">+</button>
            <button @click="removeItem(index)" class="btn-danger btn-sm">✕</button>
          </div>
        </div>

        <!-- Order summary -->
        <div style="margin-top:16px;padding-top:16px;border-top:2px solid #e2e8f0;">
          <div style="display:flex;justify-content:space-between;"><span>Subtotal:</span><span>₹{{ subtotal }}</span></div>
          <div style="display:flex;justify-content:space-between;color:#64748b;"><span>GST (18%):</span><span>₹{{ tax }}</span></div>
          <div style="display:flex;justify-content:space-between;" class="total"><span>Total:</span><span>₹{{ grandTotal }}</span></div>
        </div>

        <button class="btn-primary" style="width:100%;margin-top:12px;padding:10px;" @click="checkout">
          ✅ Checkout ({{ totalItems }} items)
        </button>
        <button @click="clearCart" style="width:100%;margin-top:6px;background:#f1f5f9;">🗑 Clear Cart</button>
      </template>
    </div>

    <!-- Checkout confirmation -->
    <div v-if="checkoutMsg" class="card" style="background:#f0fdf4;border-color:#86efac;">
      <strong>{{ checkoutMsg }}</strong>
    </div>
  </div>

  <script>
    const { createApp } = Vue;

    createApp({
      data() {
        return {
          searchTerm: '',
          products: [
            { id: 1, name: 'Laptop Stand', price: 899 },
            { id: 2, name: 'Mechanical Keyboard', price: 2499 },
            { id: 3, name: 'USB-C Hub', price: 1299 },
            { id: 4, name: 'Webcam HD', price: 3499 },
            { id: 5, name: 'Desk Lamp', price: 699 },
          ],
          cart: [],
          checkoutMsg: ''
        };
      },
      computed: {
        filteredProducts() {
          const q = this.searchTerm.toLowerCase();
          return this.products.filter(p => p.name.toLowerCase().includes(q));
        },
        subtotal() {
          return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        },
        tax() {
          return Math.round(this.subtotal * 0.18);
        },
        grandTotal() {
          return this.subtotal + this.tax;
        },
        totalItems() {
          return this.cart.reduce((sum, item) => sum + item.qty, 0);
        }
      },
      methods: {
        addToCart(product) {
          const existing = this.cart.find(i => i.id === product.id);
          if (existing) {
            existing.qty++;
          } else {
            this.cart.push({ ...product, qty: 1 });
          }
          this.checkoutMsg = '';
        },
        changeQty(index, delta) {
          this.cart[index].qty += delta;
          if (this.cart[index].qty <= 0) this.cart.splice(index, 1);
        },
        removeItem(index) {
          this.cart.splice(index, 1);
        },
        clearCart() {
          this.cart = [];
          this.checkoutMsg = '';
        },
        checkout() {
          this.checkoutMsg = `✅ Order placed! ${this.totalItems} item(s) for ₹${this.grandTotal}. Thank you!`;
          this.cart = [];
        }
      }
    }).mount('#app');
  </script>
</body>
</html>
```

<iframe srcdoc='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Vue 3 Cart</title><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><style>body{font-family:system-ui,sans-serif;padding:16px;background:#f8fafc;color:#0f172a;margin:0}.card{border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-bottom:12px;background:white}button{padding:5px 12px;border:none;border-radius:5px;cursor:pointer;font-size:13px}.btn-p{background:#0284c7;color:white}.btn-d{background:#ef4444;color:white}.btn-s{padding:2px 8px;background:#e2e8f0}input{padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;width:100%;box-sizing:border-box;margin-bottom:10px}.row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #f1f5f9}.qty-ctrl{display:flex;align-items:center;gap:6px}</style></head><body><div id="app"><h2 style="margin:0 0 12px">🛒 Vue 3 Shopping Cart</h2><div class="card"><h3 style="margin:0 0 10px">Products</h3><input v-model="q" placeholder="Search products..."><div class="row" v-for="p in filtered" :key="p.id"><span><strong>{{p.name}}</strong> <span style="color:#64748b">₹{{p.price}}</span></span><button class="btn-p" @click="add(p)">+ Add</button></div><p v-if="!filtered.length" style="color:#94a3b8;text-align:center;padding:12px 0">No results</p></div><div class="card"><h3 style="margin:0 0 10px">Cart <span style="background:#0284c7;color:white;border-radius:50%;padding:1px 7px;font-size:12px">{{totalQty}}</span></h3><p v-if="!cart.length" style="color:#94a3b8;text-align:center;padding:16px">Empty cart 🛍️</p><template v-else><div class="row" v-for="(item,i) in cart" :key="item.id"><div><strong>{{item.name}}</strong><div style="font-size:12px;color:#64748b">₹{{item.price}} × {{item.qty}}</div></div><div class="qty-ctrl"><button class="btn-s" @click="chg(i,-1)">−</button><span>{{item.qty}}</span><button class="btn-s" @click="chg(i,1)">+</button><button class="btn-d" @click="rm(i)">✕</button></div></div><div style="margin-top:12px;padding-top:12px;border-top:2px solid #e2e8f0"><div class="row" style="border:none;padding:3px 0"><span>Subtotal</span><span>₹{{sub}}</span></div><div class="row" style="border:none;padding:3px 0;color:#64748b"><span>GST 18%</span><span>₹{{tax}}</span></div><div class="row" style="border:none;padding:3px 0;font-weight:700;font-size:1.1rem"><span>Total</span><span>₹{{total}}</span></div></div><button class="btn-p" style="width:100%;margin-top:10px;padding:9px" @click="checkout">✅ Checkout</button><button @click="cart=[];msg=&apos;&apos;" style="width:100%;margin-top:6px;background:#f1f5f9;border:none;border-radius:5px;padding:6px;cursor:pointer">Clear</button></template></div><div v-if="msg" style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:14px;color:#166534"><strong>{{msg}}</strong></div></div><script>const{createApp}=Vue;createApp({data(){return{q:"",products:[{id:1,name:"Laptop Stand",price:899},{id:2,name:"Keyboard",price:2499},{id:3,name:"USB-C Hub",price:1299},{id:4,name:"Webcam HD",price:3499},{id:5,name:"Desk Lamp",price:699}],cart:[],msg:""}},computed:{filtered(){const q=this.q.toLowerCase();return this.products.filter(p=>p.name.toLowerCase().includes(q))},sub(){return this.cart.reduce((s,i)=>s+i.price*i.qty,0)},tax(){return Math.round(this.sub*.18)},total(){return this.sub+this.tax},totalQty(){return this.cart.reduce((s,i)=>s+i.qty,0)}},methods:{add(p){const e=this.cart.find(i=>i.id===p.id);e?e.qty++:this.cart.push({...p,qty:1});this.msg=""},chg(i,d){this.cart[i].qty+=d;if(this.cart[i].qty<=0)this.cart.splice(i,1)},rm(i){this.cart.splice(i,1)},checkout(){this.msg=`✅ Order placed! ${this.totalQty} item(s) for ₹${this.total}. Thank you!`;this.cart=[]}}}).mount("#app");</script></body></html>' width="100%" height="650" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>
