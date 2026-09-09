# JSON (JavaScript Object Notation) Comprehensive Guide

JSON is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard.

## 1. Syntax Rules and Data Types

A valid JSON object must strictly adhere to the following rules:
- **Keys:** Must be enclosed in double quotes `"key"`. Single quotes are invalid.
- **Values:** Can be a string (double-quoted), number, boolean (`true` or `false`), `null`, object, or array.
- **No Trailing Commas:** `{"a": 1,}` is invalid.
- **No Functions or Undefined:** You cannot store JavaScript functions or `undefined`.
- **No Comments:** JSON does not support comments natively (though some parsers allow them, standard JSON does not).

### Data Types Reference

| Data Type | Rule | Example |
| :--- | :--- | :--- |
| **String** | Double-quoted UTF-8 text. | `"name": "Alice"` |
| **Number** | Integer or float. No quotes. | `"age": 22`, `"gpa": 3.85` |
| **Boolean** | Lowercase `true` or `false`. | `"isEnrolled": true` |
| **Null** | Lowercase `null`. | `"middleName": null` |
| **Object** | Unordered key-value pairs in `{}`. | `{"id": 101, "dept": "CS"}` |
| **Array** | Ordered sequence of values in `[]`. | `"grades": [88, 92, 95]` |

### JSON vs. JavaScript Object

| Feature | JSON | JS Object |
| :--- | :--- | :--- |
| **Key quoting** | Required (`"key"`) | Optional (`key` or `"key"`) |
| **String quotes** | Double only | Single or double |
| **Trailing comma**| ❌ Not allowed | ✅ Allowed |
| **Comments** | ❌ Not allowed | ✅ Allowed |
| **Functions** | ❌ Not allowed | ✅ Allowed |
| **`undefined`** | ❌ Not allowed | ✅ Allowed |

---

## 2. JSON Serialization & Parsing (JavaScript)

JavaScript provides the built-in `JSON` object to convert between JavaScript objects and JSON strings.

### A. Serialization (`JSON.stringify`)

Converts a JavaScript object or value to a JSON string.

```javascript
const user = {
  id: 101,
  name: "Alice Johnson",
  roles: ["admin", "editor"],
  profile: { age: 24 }
};

// 1. Basic Stringification
const jsonCompact = JSON.stringify(user);
// '{"id":101,"name":"Alice Johnson","roles":["admin","editor"],"profile":{"age":24}}'

// 2. Pretty-Printed JSON (4-space indentation)
const jsonPretty = JSON.stringify(user, null, 4);

// 3. Replacer Array (Filter keys)
const jsonFiltered = JSON.stringify(user, ["id", "name"], 2);
```

### B. Parsing (`JSON.parse`)

Parses a JSON string, constructing the JavaScript value or object described by the string.

```javascript
const rawJson = '{"amount": 249.99, "status": "completed"}';

// 1. Basic Parsing
const orderObj = JSON.parse(rawJson);
console.log(orderObj.amount); // 249.99

// 2. Safe Parsing
function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("Invalid JSON string", e);
    return null;
  }
}
```

> [!WARNING]
> Always wrap `JSON.parse` in a `try...catch` block when parsing user input or external API data, as invalid JSON will throw a synchronous exception and crash the application.

---

## 3. Working with JSON Files (Node.js)

In a Node.js environment, the `fs` module (specifically `fs.promises`) is used to read and write JSON files asynchronously.

```javascript
const fs = require('fs').promises;

// Write JSON File
async function saveJson(data, filepath) {
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    await fs.writeFile(filepath, jsonStr, 'utf8');
  } catch (error) {
    console.error("Failed to save JSON", error);
  }
}

// Read JSON File
async function loadJson(filepath) {
  try {
    const raw = await fs.readFile(filepath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to read/parse JSON", error);
    return null;
  }
}
```

---

## 4. Consuming JSON APIs (`fetch`)

The `fetch` API is the modern browser standard for making HTTP requests and returning Promises.

### GET Request

```javascript
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json(); // Parses the JSON body
    console.log(users);
  } catch (error) {
    console.error("Fetch failed", error);
  }
}
```

### POST Request

```javascript
async function createUser(userData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error("Post failed", error);
  }
}
```

> [!IMPORTANT]
> The `response.json()` method consumes the response stream. It can only be called **once** per request. If you need to read the body multiple times, you must clone the response first using `response.clone()`.
