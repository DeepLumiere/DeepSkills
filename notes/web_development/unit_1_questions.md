# Unit 1: Full Stack Basics - Question Bank & Detailed Notes

This document contains a curated list of possible exam/interview questions for Unit 1, along with detailed answers based on the core full-stack web development curriculum.

## Q1: Explain the 3-Tier Enterprise Architecture Rules.

**Answer:**
The 3-tier architecture is a software design pattern that separates applications into three logical and physical computing tiers. This separation of concerns improves scalability, maintainability, and security.

1.  **Presentation Tier (UI Layer):** 
    *   **Role:** Handles user interaction, rendering the UI, and collecting input.
    *   **Technologies:** HTML, CSS, JavaScript, React, Vue, browsers.
    *   **Rule:** Communicates **strictly** with the Business Tier. It has no direct access to the database.
2.  **Business Tier (Logic Layer):**
    *   **Role:** Contains the core business rules, validation logic, and algorithms. It processes data between the user and the database.
    *   **Technologies:** Node.js, Express, Python (Django), Java (Spring Boot).
    *   **Rule:** Communicates with both the Presentation Tier (upstream) and Data Access Tier (downstream). It must be UI-agnostic and Database-agnostic.
3.  **Data Access Tier (Database Layer):**
    *   **Role:** Executes CRUD (Create, Read, Update, Delete) transactions and manages data persistence.
    *   **Technologies:** MySQL, PostgreSQL, MongoDB, ORMs.
    *   **Rule:** Communicates **only** with the Business Tier.

## Q2: Differentiate between a Front-End, Back-End, and Full-Stack Developer.

**Answer:**

| Feature | Front-End Developer | Back-End Developer | Full-Stack Developer |
| :--- | :--- | :--- | :--- |
| **Focus** | Client-side, UI/UX, browser interactions, DOM manipulation. | Server-side logic, API routing, database management, security. | Both client-side and server-side end-to-end architecture. |
| **Technologies** | HTML, CSS, JS, React, Vue, Tailwind. | Node.js, Express, SQL, NoSQL, Python, Java. | MERN, MEAN, LAMP stacks. |
| **Data Flow** | Consumes JSON APIs and displays data to the user. | Creates REST APIs, queries databases, handles authentication. | Models the DB schema, builds APIs, and creates the UI to consume them. |

## Q3: What is JSON? Describe its strict structural rules.

**Answer:**
JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is language-independent but uses conventions familiar to C-family languages.

**Strict Structural Rules:**
*   **Keys:** Must be explicitly wrapped in **double quotes** (e.g., `"name": "John"`). Single quotes are invalid.
*   **Strings:** Must be wrapped in **double quotes**.
*   **Data Types:** Supports String, Number, Boolean (`true`/`false`), Null (`null`), Object ( `{}` ), and Array ( `[]` ).
*   **Trailing Commas:** Strictly prohibited (e.g., `[1, 2, 3,]` is invalid).
*   **Unsupported Types:** Cannot contain functions, `undefined`, or `Date` objects. Comments are also natively unsupported.

## Q4: How do you parse and serialize JSON in JavaScript?

**Answer:**
JavaScript provides a built-in `JSON` object with two primary methods:

1.  **Serialization (`JSON.stringify`):** Converts a JS object into a JSON string. Used when sending data to a server or saving to `localStorage`.
    ```javascript
    const obj = { name: "Alice", age: 25 };
    const jsonString = JSON.stringify(obj); // '{"name":"Alice","age":25}'
    ```

2.  **Parsing (`JSON.parse`):** Converts a JSON string back into a JS object. Used when receiving data from a server.
    ```javascript
    const jsonStr = '{"status":"success"}';
    const parsedObj = JSON.parse(jsonStr);
    console.log(parsedObj.status); // success
    ```
    *Safety note:* Always wrap `JSON.parse` in a `try...catch` block to prevent application crashes from malformed JSON strings.

## Q5: Explain the Fetch API and how it handles asynchronous requests.

**Answer:**
The `fetch()` API provides an interface for fetching resources asynchronously across the network. It returns a Promise that resolves to the `Response` object representing the response to the request.

**Typical Workflow:**
1. Call `fetch(url, options)`.
2. The returned Promise resolves with a `Response` object.
3. Check `response.ok` to ensure the HTTP status code is 200-299.
4. Call `response.json()` (or `.text()`) to read the body. This also returns a Promise.
5. Handle the parsed data.

**Example:**
```javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) throw new Error("HTTP Error");
    const data = await response.json(); // Consumes the body stream
    console.log(data);
  } catch (error) {
    console.error("Fetch failed", error);
  }
}
```

## Q6: What are the primary RESTful HTTP methods and their typical use cases?

**Answer:**
*   **GET:** Retrieves a representation of a resource. Safe and idempotent (doesn't change state).
*   **POST:** Submits new data to the server to create a new resource. Not idempotent.
*   **PUT:** Replaces all current representations of the target resource with the uploaded payload (full update). Idempotent.
*   **PATCH:** Applies partial modifications to a resource.
*   **DELETE:** Removes the target resource.

## Q7: Contrast `localStorage` and `sessionStorage`.

**Answer:**
Both provide synchronous key-value storage in the browser (around 5-10MB limit), but they differ in lifespan:
*   **`localStorage`:** Data persists indefinitely until explicitly cleared by the user (via browser settings) or by code (`localStorage.removeItem()`). It survives browser restarts.
*   **`sessionStorage`:** Data is tied to the specific browser tab session. The data is wiped as soon as the tab or window is closed. It survives page reloads within the same tab.
