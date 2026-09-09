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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;  <meta charset="UTF-8">&#10;  <title>Vue 3 App</title>&#10;  <!-- Vue 3 CDN (Global Build) -->&#10;  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;</head>&#10;<body>&#10;  <div id="app">{{ message }}</div>&#10;&#10;  <script>&#10;    const { createApp } = Vue;&#10;&#10;    createApp({&#10;      data() {&#10;        return {&#10;          message: &apos;Hello Vue 3!&apos;&#10;        };&#10;      }&#10;    }).mount(&apos;#app&apos;);&#10;  </script>&#10;</body>&#10;</html>' width="100%" height="250" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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
const { createApp } = Vue;
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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app">&#10;  <!-- Text Interpolation: double mustaches -->&#10;  <h1>{{ title }}</h1>&#10;  <p>{{ greeting + &apos; &apos; + name }}</p>&#10;  <p>Count doubled: {{ count * 2 }}</p>&#10;&#10;  <!-- Raw HTML rendering (⚠ use only with trusted content) -->&#10;  <p v-html="rawHtml"></p>&#10;&#10;  <!-- One-time rendering (does not update on data change) -->&#10;  <span v-once>{{ message }}</span>&#10;</div>&#10;&#10;<script>&#10;const { createApp } = Vue;&#10;  createApp({&#10;  data() {&#10;    return {&#10;      title: &apos;Vue 3 Demo&apos;,&#10;      greeting: &apos;Hello&apos;,&#10;      name: &apos;Alice&apos;,&#10;      count: 5,&#10;      rawHtml: &apos;<strong style="color:red">Bold Red Text via v-html</strong>&apos;,&#10;      message: &apos;This renders only once&apos;&#10;    };&#10;  }&#10;}).mount(&apos;#app&apos;);&#10;</script>&#10;</body>&#10;</html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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
const { createApp } = Vue;
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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app">&#10;  <!-- Bind a single attribute -->&#10;  <img :src="imageUrl" :alt="imageAlt" :width="imgWidth">&#10;  <a :href="linkUrl" :class="linkClass">Dynamic Link</a>&#10;&#10;  <!-- Bind an object of attributes at once -->&#10;  <img v-bind="imgAttrs">&#10;&#10;  <!-- Class binding: object syntax -->&#10;  <div :class="{ active: isActive, &apos;text-danger&apos;: hasError }">&#10;    Object Class Binding&#10;  </div>&#10;&#10;  <!-- Class binding: array syntax (multiple classes) -->&#10;  <div :class="[primaryClass, isLarge ? &apos;large&apos; : &apos;&apos;]">Array Binding</div>&#10;&#10;  <!-- Style binding: object syntax -->&#10;  <p :style="{ color: textColor, fontSize: fontSize + &apos;px&apos;, fontWeight: &apos;bold&apos; }">&#10;    Styled Text&#10;  </p>&#10;&#10;  <!-- Style binding: array of objects -->&#10;  <div :style="[baseStyle, overrideStyle]">Multiple Style Objects</div>&#10;&#10;  <!-- Disabled button based on condition -->&#10;  <button :disabled="isLoading">{{ isLoading ? &apos;Loading...&apos; : &apos;Submit&apos; }}</button>&#10;</div>&#10;&#10;<script>&#10;const { createApp } = Vue;&#10;  createApp({&#10;  data() {&#10;    return {&#10;      imageUrl: &apos;https://via.placeholder.com/150&apos;,&#10;      imageAlt: &apos;Placeholder&apos;,&#10;      imgWidth: 150,&#10;      imgAttrs: { src: &apos;img.png&apos;, alt: &apos;Image&apos;, width: 100 },&#10;      linkUrl: &apos;https://vuejs.org&apos;,&#10;      linkClass: &apos;btn-primary&apos;,&#10;      isActive: true,&#10;      hasError: false,&#10;      primaryClass: &apos;text-lg&apos;,&#10;      isLarge: true,&#10;      textColor: &apos;#0284c7&apos;,&#10;      fontSize: 18,&#10;      baseStyle: { padding: &apos;8px&apos;, borderRadius: &apos;4px&apos; },&#10;      overrideStyle: { background: &apos;#e0f2fe&apos; },&#10;      isLoading: false&#10;    };&#10;  }&#10;}).mount(&apos;#app&apos;);&#10;</script>&#10;</body>&#10;</html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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
const { createApp } = Vue;
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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app">&#10;  <!-- 1. String Syntax (Standard but dynamic) -->&#10;  <div :class="activeClass">String syntax</div>&#10;&#10;  <!-- 2. Object Syntax (Toggle classes based on truthiness) -->&#10;  <div :class="{ active: isActive, &apos;text-danger&apos;: hasError }">Object syntax</div>&#10;&#10;  <!-- 3. Bound to a data object directly -->&#10;  <div :class="classObject">Data Object syntax</div>&#10;&#10;  <!-- 4. Bound to a computed property (Most powerful & common pattern!) -->&#10;  <div :class="computedClassObject">Computed Object syntax</div>&#10;&#10;  <!-- 5. Array Syntax (Apply multiple classes) -->&#10;  <div :class="[activeClass, errorClass]">Array syntax</div>&#10;&#10;  <!-- 6. Array Syntax with Ternary expressions -->&#10;  <div :class="[isActive ? activeClass : &apos;&apos;, errorClass]">Array with Ternary</div>&#10;&#10;  <!-- 7. Array with Nested Object Syntax (Cleanest for mixing logic) -->&#10;  <div :class="[{ active: isActive }, errorClass]">Array with Object syntax</div>&#10;  &#10;  <!-- 8. Component Class Inheritance -->&#10;  <!-- If MyButton template has class="btn", the resulting HTML is class="btn btn-large" -->&#10;  <my-button :class="[&apos;btn-large&apos;]"></my-button>&#10;</div>&#10;&#10;<script>&#10;const { createApp } = Vue;&#10;  createApp({&#10;  data() {&#10;    return {&#10;      isActive: true,&#10;      hasError: false,&#10;      activeClass: &apos;active-item&apos;,&#10;      errorClass: &apos;text-danger&apos;,&#10;      classObject: {&#10;        active: true,&#10;        &apos;text-danger&apos;: false&#10;      }&#10;    }&#10;  },&#10;  computed: {&#10;    computedClassObject() {&#10;      return {&#10;        active: this.isActive && !this.hasError,&#10;        &apos;text-danger&apos;: this.hasError && this.isActive&#10;      }&#10;    }&#10;  }&#10;})&#10;</script>&#10;</body>&#10;</html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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
const { createApp } = Vue;
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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app">&#10;  <!-- 1. Object Syntax (CamelCase keys) -->&#10;  <div :style="{ color: activeColor, fontSize: fontSize + &apos;px&apos; }">Inline Object</div>&#10;&#10;  <!-- 2. Object Syntax (Kebab-case keys in quotes) -->&#10;  <div :style="{ &apos;background-color&apos;: bgColor }">Kebab-case</div>&#10;&#10;  <!-- 3. Bound to a data object -->&#10;  <div :style="styleObject">Data Object Style</div>&#10;&#10;  <!-- 4. Bound to a computed property -->&#10;  <div :style="computedStyles">Computed Style</div>&#10;&#10;  <!-- 5. Array Syntax (Merge multiple style objects) -->&#10;  <div :style="[baseStyles, overridingStyles]">Array of Styles</div>&#10;&#10;  <!-- 6. Auto-prefixing (Vue adds browser prefixes like -webkit- automatically) -->&#10;  <div :style="{ transform: &apos;rotate(10deg)&apos; }">Auto-prefixed</div>&#10;&#10;  <!-- 7. Multiple Values (Vue chooses the last one the browser supports) -->&#10;  <div :style="{ display: [&apos;-webkit-box&apos;, &apos;-ms-flexbox&apos;, &apos;flex&apos;] }">Multiple Values</div>&#10;</div>&#10;&#10;<script>&#10;const { createApp } = Vue;&#10;  createApp({&#10;  data() {&#10;    return {&#10;      activeColor: &apos;red&apos;,&#10;      fontSize: 30,&#10;      bgColor: &apos;#f4f4f4&apos;,&#10;      styleObject: {&#10;        color: &apos;blue&apos;,&#10;        fontSize: &apos;24px&apos;&#10;      },&#10;      baseStyles: { margin: &apos;10px&apos;, padding: &apos;20px&apos; },&#10;      overridingStyles: { padding: &apos;10px&apos;, color: &apos;green&apos; }&#10;    }&#10;  },&#10;  computed: {&#10;    computedStyles() {&#10;      return {&#10;        fontWeight: this.isActive ? &apos;bold&apos; : &apos;normal&apos;,&#10;        opacity: this.hasError ? 0.5 : 1&#10;      }&#10;    }&#10;  }&#10;})&#10;</script>&#10;</body>&#10;</html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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
const { createApp } = Vue;
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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app">&#10;  <!-- Text input -->&#10;  <input v-model="username" placeholder="Enter username">&#10;  <p>Username: {{ username }}</p>&#10;&#10;  <!-- Textarea -->&#10;  <textarea v-model="bio" placeholder="Write your bio..."></textarea>&#10;  <p>Bio: {{ bio }}</p>&#10;&#10;  <!-- Checkbox: boolean -->&#10;  <input type="checkbox" v-model="agreed" id="terms">&#10;  <label for="terms">Agree to Terms</label>&#10;  <p>Agreed: {{ agreed }}</p>&#10;&#10;  <!-- Checkbox: array of selected values -->&#10;  <label><input type="checkbox" v-model="languages" value="JavaScript"> JavaScript</label>&#10;  <label><input type="checkbox" v-model="languages" value="Python"> Python</label>&#10;  <label><input type="checkbox" v-model="languages" value="Java"> Java</label>&#10;  <p>Selected: {{ languages }}</p>&#10;&#10;  <!-- Radio buttons -->&#10;  <label><input type="radio" v-model="gender" value="male"> Male</label>&#10;  <label><input type="radio" v-model="gender" value="female"> Female</label>&#10;  <p>Gender: {{ gender }}</p>&#10;&#10;  <!-- Select dropdown -->&#10;  <select v-model="country">&#10;    <option disabled value="">Select country</option>&#10;    <option value="IN">India</option>&#10;    <option value="US">United States</option>&#10;    <option value="UK">United Kingdom</option>&#10;  </select>&#10;  <p>Country: {{ country }}</p>&#10;&#10;  <!-- Multi-select -->&#10;  <select v-model="skills" multiple>&#10;    <option>HTML</option>&#10;    <option>CSS</option>&#10;    <option>JavaScript</option>&#10;    <option>Vue.js</option>&#10;  </select>&#10;  <p>Skills: {{ skills }}</p>&#10;&#10;  <!-- v-model modifiers -->&#10;  <input v-model.trim="trimmedName" placeholder="Trim whitespace">   <!-- .trim -->&#10;  <input v-model.number="age" type="number" placeholder="Age">        <!-- .number: auto converts to Number -->&#10;  <input v-model.lazy="lazyText" placeholder="Updates on blur">       <!-- .lazy: sync on change, not input -->&#10;</div>&#10;&#10;<script>&#10;const { createApp } = Vue;&#10;  createApp({&#10;  data() {&#10;    return {&#10;      username: &apos;&apos;,&#10;      bio: &apos;&apos;,&#10;      agreed: false,&#10;      languages: [],&#10;      gender: &apos;&apos;,&#10;      country: &apos;&apos;,&#10;      skills: [],&#10;      trimmedName: &apos;&apos;,&#10;      age: 0,&#10;      lazyText: &apos;&apos;&#10;    };&#10;  }&#10;}).mount(&apos;#app&apos;);&#10;</script>&#10;</body>&#10;</html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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
const { createApp } = Vue;
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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app">&#10;  <!-- v-if: Completely removes/re-inserts element from DOM -->&#10;  <div v-if="score >= 90">🏆 Grade A — Excellent!</div>&#10;  <div v-else-if="score >= 75">😊 Grade B — Good</div>&#10;  <div v-else-if="score >= 60">📘 Grade C — Average</div>&#10;  <div v-else>❌ Grade F — Failed</div>&#10;&#10;  <!-- v-show: Toggles CSS display (element stays in DOM) -->&#10;  <!-- Use v-show when frequently toggling; use v-if for rare changes -->&#10;  <div v-show="isLoggedIn">Welcome back, user!</div>&#10;  <div v-show="!isLoggedIn">Please login to continue.</div>&#10;&#10;  <!-- Group multiple elements with <template> (no extra DOM node) -->&#10;  <template v-if="userLoaded">&#10;    <h2>{{ user.name }}</h2>&#10;    <p>{{ user.email }}</p>&#10;    <p>{{ user.role }}</p>&#10;  </template>&#10;&#10;  <!-- Controls -->&#10;  <input type="range" v-model.number="score" min="0" max="100"> {{ score }}&#10;  <button @click="isLoggedIn = !isLoggedIn">Toggle Login</button>&#10;</div>&#10;&#10;<script>&#10;const { createApp } = Vue;&#10;  createApp({&#10;  data() {&#10;    return {&#10;      score: 85,&#10;      isLoggedIn: false,&#10;      userLoaded: true,&#10;      user: { name: &apos;Alice&apos;, email: &apos;alice@example.com&apos;, role: &apos;Admin&apos; }&#10;    };&#10;  }&#10;}).mount(&apos;#app&apos;);&#10;</script>&#10;</body>&#10;</html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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
const { createApp } = Vue;
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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app">&#10;  <!-- Array of primitives -->&#10;  <ul>&#10;    <li v-for="(fruit, index) in fruits" :key="index">&#10;      {{ index + 1 }}. {{ fruit }}&#10;    </li>&#10;  </ul>&#10;&#10;  <!-- Array of objects -->&#10;  <div v-for="student in students" :key="student.id" class="card">&#10;    <h3>{{ student.name }}</h3>&#10;    <p>Grade: {{ student.grade }} | Score: {{ student.score }}</p>&#10;  </div>&#10;&#10;  <!-- Iterating over an object&apos;s properties -->&#10;  <ul>&#10;    <li v-for="(value, key, index) in userProfile" :key="key">&#10;      {{ index }}. {{ key }}: {{ value }}&#10;    </li>&#10;  </ul>&#10;&#10;  <!-- Range-based loop (1 to 5) -->&#10;  <span v-for="n in 5" :key="n">★ </span>&#10;&#10;  <!-- v-for + v-if (use <template> to avoid conflicts) -->&#10;  <template v-for="item in items" :key="item.id">&#10;    <div v-if="item.active">{{ item.name }} (active)</div>&#10;  </template>&#10;&#10;  <!-- Controls to add/remove items -->&#10;  <button @click="addFruit">Add Fruit</button>&#10;  <button @click="removeFirst">Remove First</button>&#10;</div>&#10;&#10;<script>&#10;const { createApp } = Vue;&#10;  createApp({&#10;  data() {&#10;    return {&#10;      fruits: [&apos;Apple&apos;, &apos;Banana&apos;, &apos;Cherry&apos;],&#10;      students: [&#10;        { id: 1, name: &apos;Alice&apos;, grade: &apos;A&apos;, score: 95 },&#10;        { id: 2, name: &apos;Bob&apos;, grade: &apos;B&apos;, score: 82 },&#10;        { id: 3, name: &apos;Carol&apos;, grade: &apos;A+&apos;, score: 98 }&#10;      ],&#10;      userProfile: { name: &apos;Dave&apos;, age: 22, department: &apos;CS&apos; },&#10;      items: [&#10;        { id: 1, name: &apos;Widget A&apos;, active: true },&#10;        { id: 2, name: &apos;Widget B&apos;, active: false },&#10;        { id: 3, name: &apos;Widget C&apos;, active: true }&#10;      ]&#10;    };&#10;  },&#10;  methods: {&#10;    addFruit() {&#10;      const names = [&apos;Mango&apos;, &apos;Grape&apos;, &apos;Kiwi&apos;, &apos;Papaya&apos;];&#10;      this.fruits.push(names[Math.floor(Math.random() * names.length)]);&#10;    },&#10;    removeFirst() {&#10;      this.fruits.shift();&#10;    }&#10;  }&#10;}).mount(&apos;#app&apos;);&#10;</script>&#10;</body>&#10;</html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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
const { createApp } = Vue;
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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app">&#10;  <!-- Basic click event -->&#10;  <button @click="count++">Click me ({{ count }})</button>&#10;  <button @click="resetCount">Reset</button>&#10;&#10;  <!-- Method with event object -->&#10;  <button @click="handleClick">Click with Event</button>&#10;  <button @click="handleClickWithArg(&apos;hello&apos;, $event)">Pass Custom Arg</button>&#10;&#10;  <!-- Event modifiers -->&#10;  <form @submit.prevent="submitForm">        <!-- Prevent default form submit -->&#10;    <input @keyup.enter="submitForm" type="text" v-model="formInput" placeholder="Press Enter...">&#10;    <button type="submit">Submit</button>&#10;  </form>&#10;&#10;  <div @click="outerClick">&#10;    <button @click.stop="innerClick">Stop Propagation</button>  <!-- .stop prevents bubbling -->&#10;  </div>&#10;&#10;  <!-- .once modifier: fires only once then removes listener -->&#10;  <button @click.once="handleOnce">Click Once Only</button>&#10;&#10;  <!-- Key modifiers -->&#10;  <input @keyup.enter="onEnter" @keyup.escape="onEscape" placeholder="Key listeners">&#10;  <input @keyup.up="moveUp" @keyup.down="moveDown" placeholder="Arrow keys">&#10;&#10;  <!-- Mouse button modifiers -->&#10;  <div @click.left="leftClick" @click.right.prevent="rightClick" @click.middle="middleClick">&#10;    Click Zone (left/right/middle)&#10;  </div>&#10;&#10;  <!-- Computed results display -->&#10;  <p>Last action: {{ lastAction }}</p>&#10;</div>&#10;&#10;<script>&#10;const { createApp } = Vue;&#10;  createApp({&#10;  data() {&#10;    return {&#10;      count: 0,&#10;      formInput: &apos;&apos;,&#10;      lastAction: &apos;none&apos;&#10;    };&#10;  },&#10;  methods: {&#10;    resetCount() { this.count = 0; },&#10;    handleClick(event) {&#10;      this.lastAction = `Clicked at (${event.clientX}, ${event.clientY})`;&#10;    },&#10;    handleClickWithArg(msg, event) {&#10;      this.lastAction = `${msg} at (${event.clientX}, ${event.clientY})`;&#10;    },&#10;    submitForm() { this.lastAction = `Form submitted: "${this.formInput}"`; },&#10;    outerClick() { this.lastAction = &apos;Outer div clicked&apos;; },&#10;    innerClick() { this.lastAction = &apos;Inner button clicked (propagation stopped)&apos;; },&#10;    handleOnce() { this.lastAction = &apos;One-time click fired!&apos;; },&#10;    onEnter() { this.lastAction = &apos;Enter key pressed&apos;; },&#10;    onEscape() { this.lastAction = &apos;Escape key pressed&apos;; },&#10;    moveUp() { this.lastAction = &apos;Arrow Up&apos;; },&#10;    moveDown() { this.lastAction = &apos;Arrow Down&apos;; },&#10;    leftClick() { this.lastAction = &apos;Left mouse click&apos;; },&#10;    rightClick() { this.lastAction = &apos;Right mouse click (default prevented)&apos;; },&#10;    middleClick() { this.lastAction = &apos;Middle mouse click&apos;; }&#10;  }&#10;}).mount(&apos;#app&apos;);&#10;</script>&#10;</body>&#10;</html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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
const { createApp } = Vue;
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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app">&#10;  <h3>Shopping Cart</h3>&#10;  <input v-model.number="quantity" type="number" min="1" max="99"> items&#10;  <input v-model.number="pricePerUnit" type="number"> price each&#10;&#10;  <!-- Computed: auto-updates when dependencies change -->&#10;  <p>Subtotal: ₹{{ subtotal }}</p>&#10;  <p>Tax (18%): ₹{{ tax }}</p>&#10;  <p><strong>Total: ₹{{ total }}</strong></p>&#10;&#10;  <!-- Watcher demo -->&#10;  <input v-model="searchQuery" placeholder="Type to search...">&#10;  <p>Search log: {{ searchLog }}</p>&#10;</div>&#10;&#10;<script>&#10;const { createApp } = Vue;&#10;  createApp({&#10;  data() {&#10;    return {&#10;      quantity: 2,&#10;      pricePerUnit: 500,&#10;      searchQuery: &apos;&apos;,&#10;      searchLog: &apos;&apos;&#10;    };&#10;  },&#10;  computed: {&#10;    // Computed: cached until reactive dependencies change&#10;    subtotal() {&#10;      return this.quantity * this.pricePerUnit;&#10;    },&#10;    tax() {&#10;      return Math.round(this.subtotal * 0.18);&#10;    },&#10;    total() {&#10;      return this.subtotal + this.tax;&#10;    }&#10;  },&#10;  watch: {&#10;    // Watch: runs a side effect when a value changes&#10;    searchQuery(newVal, oldVal) {&#10;      this.searchLog = `Changed from "${oldVal}" to "${newVal}"`;&#10;      // Would trigger API call in real app&#10;    },&#10;    quantity: {&#10;      // Deep/immediate watcher options&#10;      handler(newVal) {&#10;        if (newVal < 1) this.quantity = 1;&#10;      },&#10;      immediate: true  // Run on component creation&#10;    }&#10;  }&#10;}).mount(&apos;#app&apos;);&#10;</script>&#10;</body>&#10;</html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<!-- Full component example in CDN mode -->&#10;<div id="app">&#10;  <user-card&#10;    v-for="user in users"&#10;    :key="user.id"&#10;    :name="user.name"&#10;    :role="user.role"&#10;    :score="user.score"&#10;    @promote="handlePromote"&#10;  ></user-card>&#10;  <p>Log: {{ promotionLog }}</p>&#10;</div>&#10;&#10;<script>&#10;const app = createApp({&#10;  data() {&#10;    return {&#10;      users: [&#10;        { id: 1, name: &apos;Alice&apos;, role: &apos;Student&apos;, score: 95 },&#10;        { id: 2, name: &apos;Bob&apos;, role: &apos;Student&apos;, score: 82 }&#10;      ],&#10;      promotionLog: &apos;&apos;&#10;    };&#10;  },&#10;  methods: {&#10;    handlePromote(userName) {&#10;      this.promotionLog = `${userName} promoted to Graduate!`;&#10;    }&#10;  }&#10;});&#10;&#10;// Global component registration&#10;app.component(&apos;user-card&apos;, {&#10;  props: {&#10;    name: { type: String, required: true },&#10;    role: { type: String, default: &apos;User&apos; },&#10;    score: { type: Number, default: 0 }&#10;  },&#10;  emits: [&apos;promote&apos;],  // Declare emitted events&#10;  template: `&#10;    <div style="border:1px solid #ccc; padding:12px; margin:8px; border-radius:6px;">&#10;      <h3>{{ name }}</h3>&#10;      <p>Role: <strong>{{ role }}</strong> | Score: {{ score }}/100</p>&#10;      <button @click="$emit(&apos;promote&apos;, name)" style="background:#0284c7;color:white;border:none;padding:4px 12px;border-radius:4px;cursor:pointer;">&#10;        Promote&#10;      </button>&#10;    </div>&#10;  `&#10;});&#10;&#10;app.mount(&apos;#app&apos;);&#10;</script>&#10;</body>&#10;</html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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

This explicitly demonstrates **Reactivity & Data Updates**. We use `ref` and `computed` inside a `setup()` function to manage state, and standard JavaScript functions to update the data. Vue automatically reacts to these updates and re-renders the DOM.

```html
<div id="app-composition">
  <p>Count: {{ count }} ({{ isEven ? 'even' : 'odd' }})</p>
  <p>Doubled: {{ doubled }}</p>
  
  <!-- Updating data via events triggers reactivity -->
  <button @click="decrement">−</button>
  <button @click="reset">Reset</button>
  <button @click="increment">+</button>
</div>

<script>
/* Extract Composition API functions from global Vue object */
const { createApp, ref, computed, watch, onMounted, onBeforeUnmount } = Vue;

createApp({
  setup() {
    /* Reactive state (ref for primitives) */
    const count = ref(0);
    const step = ref(1);

    /* Computed properties (derive state) */
    const doubled = computed(() => count.value * 2);
    const isEven = computed(() => count.value % 2 === 0);

    /* Methods (plain functions that update reactive data) */
    function increment() { count.value += step.value; }
    function decrement() { count.value -= step.value; }
    function reset() { count.value = 0; }

    /* Watcher (run side effects when data updates) */
    watch(count, (newVal, oldVal) => {
      console.log(`Count changed: ${oldVal} → ${newVal}`);
    });

    /* Lifecycle hooks */
    onMounted(() => console.log('Component Mounted!'));
    onBeforeUnmount(() => console.log('Component Unmounting...'));

    /* Expose properties to the template */
    return { count, step, doubled, isEven, increment, decrement, reset };
  }
}).mount('#app-composition');
</script>
```

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;<meta charset="UTF-8">&#10;<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;<style>body { padding: 16px; font-family: system-ui, sans-serif; background: #f8fafc; color: #0f172a; }</style>&#10;</head>&#10;<body>&#10;<div id="app-composition">&#10;  <p>Count: {{ count }} ({{ isEven ? &apos;even&apos; : &apos;odd&apos; }})</p>&#10;  <p>Doubled: {{ doubled }}</p>&#10;  &#10;  <!-- Updating data via events triggers reactivity -->&#10;  <button @click="decrement">−</button>&#10;  <button @click="reset">Reset</button>&#10;  <button @click="increment">+</button>&#10;</div>&#10;&#10;<script>&#10;/* Extract Composition API functions from global Vue object */&#10;const { createApp, ref, computed, watch, onMounted, onBeforeUnmount } = Vue;&#10;&#10;createApp({&#10;  setup() {&#10;    /* Reactive state (ref for primitives) */&#10;    const count = ref(0);&#10;    const step = ref(1);&#10;&#10;    /* Computed properties (derive state) */&#10;    const doubled = computed(() => count.value * 2);&#10;    const isEven = computed(() => count.value % 2 === 0);&#10;&#10;    /* Methods (plain functions that update reactive data) */&#10;    function increment() { count.value += step.value; }&#10;    function decrement() { count.value -= step.value; }&#10;    function reset() { count.value = 0; }&#10;&#10;    /* Watcher (run side effects when data updates) */&#10;    watch(count, (newVal, oldVal) => {&#10;      console.log(`Count changed: ${oldVal} → ${newVal}`);&#10;    });&#10;&#10;    /* Lifecycle hooks */&#10;    onMounted(() => console.log(&apos;Component Mounted!&apos;));&#10;    onBeforeUnmount(() => console.log(&apos;Component Unmounting...&apos;));&#10;&#10;    /* Expose properties to the template */&#10;    return { count, step, doubled, isEven, increment, decrement, reset };&#10;  }&#10;}).mount(&apos;#app-composition&apos;);&#10;</script>&#10;</body>&#10;</html>' width="100%" height="400" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>


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

<iframe srcdoc='<!DOCTYPE html>&#10;<html lang="en">&#10;<head>&#10;  <meta charset="UTF-8">&#10;  <title>Vue 3 Shopping Cart</title>&#10;  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>&#10;  <style>&#10;    body { font-family: system-ui, sans-serif; max-width: 700px; margin: 20px auto; padding: 0 16px; }&#10;    .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; background: white; }&#10;    button { padding: 6px 14px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }&#10;    .btn-primary { background: #0284c7; color: white; }&#10;    .btn-danger { background: #ef4444; color: white; }&#10;    .btn-sm { padding: 3px 10px; font-size: 13px; }&#10;    input { padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px; }&#10;    .total { font-size: 1.2rem; font-weight: bold; color: #0f172a; }&#10;    .empty { text-align: center; padding: 40px; color: #94a3b8; }&#10;  </style>&#10;</head>&#10;<body>&#10;  <div id="app">&#10;    <h1>🛒 Vue 3 Shopping Cart</h1>&#10;&#10;    <!-- Product catalog -->&#10;    <div class="card">&#10;      <h2>Products</h2>&#10;      <input v-model="searchTerm" placeholder="Search products..." style="width:100%;margin-bottom:12px;">&#10;      <div v-for="product in filteredProducts" :key="product.id" style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f1f5f9;">&#10;        <div>&#10;          <strong>{{ product.name }}</strong>&#10;          <span style="color:#64748b;margin-left:8px;">₹{{ product.price }}</span>&#10;        </div>&#10;        <button class="btn-primary btn-sm" @click="addToCart(product)">+ Add</button>&#10;      </div>&#10;      <p v-if="filteredProducts.length === 0" style="color:#94a3b8;text-align:center;">No products found.</p>&#10;    </div>&#10;&#10;    <!-- Cart -->&#10;    <div class="card">&#10;      <h2>Cart <span style="background:#0284c7;color:white;border-radius:50%;padding:2px 8px;font-size:14px;">{{ totalItems }}</span></h2>&#10;&#10;      <div v-if="cart.length === 0" class="empty">&#10;        <p>Your cart is empty. Add some products! 🛍️</p>&#10;      </div>&#10;&#10;      <template v-else>&#10;        <div v-for="(item, index) in cart" :key="item.id"&#10;             style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f1f5f9;">&#10;          <div>&#10;            <strong>{{ item.name }}</strong>&#10;            <div style="font-size:13px;color:#64748b;">₹{{ item.price }} × {{ item.qty }}</div>&#10;          </div>&#10;          <div style="display:flex;align-items:center;gap:8px;">&#10;            <button @click="changeQty(index, -1)" class="btn-sm" style="background:#e2e8f0;">−</button>&#10;            <span>{{ item.qty }}</span>&#10;            <button @click="changeQty(index, +1)" class="btn-sm" style="background:#e2e8f0;">+</button>&#10;            <button @click="removeItem(index)" class="btn-danger btn-sm">✕</button>&#10;          </div>&#10;        </div>&#10;&#10;        <!-- Order summary -->&#10;        <div style="margin-top:16px;padding-top:16px;border-top:2px solid #e2e8f0;">&#10;          <div style="display:flex;justify-content:space-between;"><span>Subtotal:</span><span>₹{{ subtotal }}</span></div>&#10;          <div style="display:flex;justify-content:space-between;color:#64748b;"><span>GST (18%):</span><span>₹{{ tax }}</span></div>&#10;          <div style="display:flex;justify-content:space-between;" class="total"><span>Total:</span><span>₹{{ grandTotal }}</span></div>&#10;        </div>&#10;&#10;        <button class="btn-primary" style="width:100%;margin-top:12px;padding:10px;" @click="checkout">&#10;          ✅ Checkout ({{ totalItems }} items)&#10;        </button>&#10;        <button @click="clearCart" style="width:100%;margin-top:6px;background:#f1f5f9;">🗑 Clear Cart</button>&#10;      </template>&#10;    </div>&#10;&#10;    <!-- Checkout confirmation -->&#10;    <div v-if="checkoutMsg" class="card" style="background:#f0fdf4;border-color:#86efac;">&#10;      <strong>{{ checkoutMsg }}</strong>&#10;    </div>&#10;  </div>&#10;&#10;  <script>&#10;    const { createApp } = Vue;&#10;&#10;    createApp({&#10;      data() {&#10;        return {&#10;          searchTerm: &apos;&apos;,&#10;          products: [&#10;            { id: 1, name: &apos;Laptop Stand&apos;, price: 899 },&#10;            { id: 2, name: &apos;Mechanical Keyboard&apos;, price: 2499 },&#10;            { id: 3, name: &apos;USB-C Hub&apos;, price: 1299 },&#10;            { id: 4, name: &apos;Webcam HD&apos;, price: 3499 },&#10;            { id: 5, name: &apos;Desk Lamp&apos;, price: 699 },&#10;          ],&#10;          cart: [],&#10;          checkoutMsg: &apos;&apos;&#10;        };&#10;      },&#10;      computed: {&#10;        filteredProducts() {&#10;          const q = this.searchTerm.toLowerCase();&#10;          return this.products.filter(p => p.name.toLowerCase().includes(q));&#10;        },&#10;        subtotal() {&#10;          return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);&#10;        },&#10;        tax() {&#10;          return Math.round(this.subtotal * 0.18);&#10;        },&#10;        grandTotal() {&#10;          return this.subtotal + this.tax;&#10;        },&#10;        totalItems() {&#10;          return this.cart.reduce((sum, item) => sum + item.qty, 0);&#10;        }&#10;      },&#10;      methods: {&#10;        addToCart(product) {&#10;          const existing = this.cart.find(i => i.id === product.id);&#10;          if (existing) {&#10;            existing.qty++;&#10;          } else {&#10;            this.cart.push({ ...product, qty: 1 });&#10;          }&#10;          this.checkoutMsg = &apos;&apos;;&#10;        },&#10;        changeQty(index, delta) {&#10;          this.cart[index].qty += delta;&#10;          if (this.cart[index].qty <= 0) this.cart.splice(index, 1);&#10;        },&#10;        removeItem(index) {&#10;          this.cart.splice(index, 1);&#10;        },&#10;        clearCart() {&#10;          this.cart = [];&#10;          this.checkoutMsg = &apos;&apos;;&#10;        },&#10;        checkout() {&#10;          this.checkoutMsg = `✅ Order placed! ${this.totalItems} item(s) for ₹${this.grandTotal}. Thank you!`;&#10;          this.cart = [];&#10;        }&#10;      }&#10;    }).mount(&apos;#app&apos;);&#10;  </script>&#10;</body>&#10;</html>' width="100%" height="600" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

