# React.js Comprehensive Guide

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## 1. Core Concepts

### Virtual DOM
React keeps a lightweight representation of the real DOM in memory called the Virtual DOM. When the state of an object changes, React updates the Virtual DOM first, compares it with the previous version (a process called "diffing"), and computes the minimal set of changes needed to update the actual DOM (called "reconciliation"). This makes React highly performant.

### JSX (JavaScript XML)
JSX is a syntax extension for JavaScript that looks similar to HTML. It is used with React to describe what the UI should look like. JSX produces React "elements".

```jsx
const name = "Alice";
const element = <h1>Hello, {name}</h1>;
```

> [!CAUTION]
> Browsers don't understand JSX natively. It must be transpiled into standard JavaScript (usually via Babel) before running in the browser.

---

## 2. Components

Components are the building blocks of any React application.

### Functional Components
The modern and recommended way to write React components. They are simple JavaScript functions that take `props` as an argument and return React elements.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Props (Properties)
Props are read-only components arguments. They are how data is passed from a parent component down to a child component.

```jsx
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
    </div>
  );
}
```

> [!IMPORTANT]
> **Props are strictly read-only.** Whether you declare a component as a function or a class, it must never modify its own props.

---

## 3. State and Lifecycle (Hooks)

Hooks let you use state and other React features without writing a class.

### `useState`
The `useState` hook allows you to add state to functional components. It returns an array with two values: the current state and a function to update it.

```jsx
import React, { useState } from 'react';

function Counter() {
  // Declare a state variable named "count", initialized to 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### `useEffect`
The `useEffect` hook lets you perform side effects in function components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes.

Side effects include data fetching, setting up a subscription, and manually changing the DOM.

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // This runs after every render
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function (runs before component unmounts)
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs ONCE on mount

  return <div>Timer: {seconds} seconds</div>;
}
```

#### Dependency Array Rules:
- `undefined` (No array): Runs after *every* render.
- `[]` (Empty array): Runs *only once* after the initial render (like `componentDidMount`).
- `[prop, state]`: Runs only when the specified variables change.

---

## 4. Conditional Rendering and Lists

### Conditional Rendering
In React, you can create distinct components that encapsulate behavior you need, and render only some of them depending on the state of your application using JavaScript operators like `if` or the conditional operator `? :`.

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  
  // Using ternary operator
  return (
    <div>
      {isLoggedIn ? <UserGreeting /> : <GuestGreeting />}
    </div>
  );
}
```

### Rendering Lists
You can build collections of elements and include them in JSX using the array `map()` function. 

**Keys:** A "key" is a special string attribute you need to include when creating lists of elements. Keys help React identify which items have changed, are added, or are removed.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  
  return (
    <ul>{listItems}</ul>
  );
}
```

> [!WARNING]
> Don't use array indices as keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Use unique IDs from your data instead.

---

## 5. Handling Events

Handling events with React elements is very similar to handling events on DOM elements, with some syntactic differences:
- React events are named using camelCase, rather than lowercase (e.g., `onClick` instead of `onclick`).
- With JSX you pass a function as the event handler, rather than a string.

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault(); // You must call preventDefault explicitly in React
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
