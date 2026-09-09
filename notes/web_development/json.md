# JSON — JavaScript Object Notation: Complete Reference

JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is language-independent, easy for humans to read and write, and easy for machines to parse and generate.

---

## 1. JSON Syntax Rules & Data Types

### The 6 JSON Value Types

| Data Type | Format | Valid Example | Invalid Example |
| :--- | :--- | :--- | :--- |
| **String** | Double-quoted UTF-8 text | `"name": "Alice"` | `'name': 'Alice'` (single quotes) |
| **Number** | Integer or float, no quotes | `"age": 22`, `"gpa": 3.85` | `"age": "22"` (string) |
| **Boolean** | Lowercase `true` / `false` | `"isActive": true` | `"isActive": True` (uppercase) |
| **Null** | Lowercase `null` | `"middleName": null` | `"middleName": undefined` |
| **Object** | `{}` with string keys | `{"id": 1, "name": "Bob"}` | `{id: 1}` (unquoted key) |
| **Array** | `[]` ordered sequence | `"tags": ["js", "vue"]` | — |

### Strict Rules

```json
{
  "name": "Alice Johnson",
  "age": 22,
  "gpa": 3.85,
  "isEnrolled": true,
  "middleName": null,
  "grades": [90, 85, 92, 88],
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "pincode": "400001"
  },
  "courses": [
    { "code": "CS101", "name": "Data Structures", "credits": 4 },
    { "code": "CS202", "name": "Algorithms", "credits": 4 }
  ]
}
```

### JSON vs JavaScript Object Comparison

| Feature | JSON | JavaScript Object |
| :--- | :--- | :--- |
| **Key quoting** | Required (`"key"`) | Optional (`key` or `"key"`) |
| **String quotes** | Double quotes only | Single or double |
| **Trailing comma** | ❌ Not allowed | ✅ Allowed |
| **Comments** | ❌ Not allowed | ✅ Allowed (`//`, `/* */`) |
| **Functions** | ❌ Not allowed | ✅ Allowed |
| **`undefined`** | ❌ Not allowed | ✅ Allowed |
| **`NaN` / `Infinity`** | ❌ Not allowed | ✅ Allowed |

---

## 2. Nested & Complex JSON Structures

```json
{
  "university": {
    "name": "IIT Bombay",
    "established": 1958,
    "departments": [
      {
        "id": "CSE",
        "name": "Computer Science & Engineering",
        "hod": {
          "name": "Dr. Sharma",
          "email": "sharma@iitb.ac.in"
        },
        "courses": [
          {
            "code": "CS101",
            "title": "Introduction to Programming",
            "credits": 4,
            "semester": 1,
            "prerequisites": [],
            "students": [
              { "rollNo": "19CS001", "name": "Alice", "cgpa": 9.2 },
              { "rollNo": "19CS002", "name": "Bob", "cgpa": 8.7 }
            ]
          }
        ]
      }
    ],
    "contact": {
      "phone": "+91-22-2572-2545",
      "email": "info@iitb.ac.in",
      "website": "https://www.iitb.ac.in"
    }
  }
}
```

---

## 3. JSON Serialization & Parsing (JavaScript)

### `JSON.stringify()` — Object → JSON String

```javascript
const student = {
  id: 101,
  name: 'Alice Johnson',
  age: 22,
  gpa: 9.1,
  courses: ['CS101', 'CS202', 'CS303'],
  address: { city: 'Mumbai', pincode: '400001' },
  dob: undefined,       // undefined → OMITTED from output
  greet: function() {}  // functions → OMITTED from output
};

// 1. Compact JSON string
const compact = JSON.stringify(student);
// '{"id":101,"name":"Alice Johnson","age":22,"gpa":9.1,"courses":["CS101","CS202","CS303"],"address":{"city":"Mumbai","pincode":"400001"}}'

// 2. Pretty-printed (indented) — readable format
const pretty = JSON.stringify(student, null, 2);
/*
{
  "id": 101,
  "name": "Alice Johnson",
  ...
}
*/

// 3. Replacer ARRAY: include only specified keys
const filtered = JSON.stringify(student, ['id', 'name', 'gpa'], 2);
/*
{
  "id": 101,
  "name": "Alice Johnson",
  "gpa": 9.1
}
*/

// 4. Replacer FUNCTION: custom transformation
const custom = JSON.stringify(student, (key, value) => {
  if (key === 'age') return undefined;  // Omit age
  if (typeof value === 'number') return Math.round(value * 10) / 10;  // Round numbers
  return value;
}, 2);

// 5. toJSON method: control custom serialization
class Course {
  constructor(code, name, credits) {
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.internalData = 'secret'; // don't serialize this
  }
  toJSON() {
    return { code: this.code, name: this.name }; // Only expose these
  }
}
const c = new Course('CS101', 'Algorithms', 4);
JSON.stringify(c); // '{"code":"CS101","name":"Algorithms"}'
```

### `JSON.parse()` — JSON String → JavaScript Object

```javascript
const rawJson = '{"id":101,"name":"Alice","gpa":9.1,"courses":["CS101","CS202"]}';

// 1. Basic parsing
const student = JSON.parse(rawJson);
console.log(student.name);        // 'Alice'
console.log(student.courses[0]);  // 'CS101'
console.log(typeof student.gpa);  // 'number' (not string!)

// 2. Safe parsing (always use try-catch for external data!)
function safeParse(jsonString) {
  try {
    return { data: JSON.parse(jsonString), error: null };
  } catch (e) {
    return { data: null, error: `Invalid JSON: ${e.message}` };
  }
}

const result = safeParse('{"broken": json}');
console.log(result.error); // "Invalid JSON: ..."

const valid = safeParse('{"ok": true}');
console.log(valid.data);   // { ok: true }

// 3. Reviver function: transform values during parsing
const dateJson = '{"name":"Event","date":"2026-09-09T10:00:00Z"}';
const parsed = JSON.parse(dateJson, (key, value) => {
  if (key === 'date') return new Date(value);  // Convert string → Date object
  return value;
});
console.log(parsed.date instanceof Date); // true

// 4. Deep clone an object using stringify + parse
const original = { a: 1, b: { c: [1, 2, 3] } };
const deepClone = JSON.parse(JSON.stringify(original));
deepClone.b.c.push(4);  // Doesn't affect original!
console.log(original.b.c); // [1, 2, 3]
```

---

## 4. JSON Fetch API — REST Integration

### GET Request

```javascript
// Fetch a list of users from JSONPlaceholder
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // Always check HTTP status!
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const users = await response.json();  // Parses JSON body into JS object
    console.log(`Fetched ${users.length} users`);

    users.forEach(user => {
      console.log(`${user.id}: ${user.name} (${user.email})`);
    });

    return users;

  } catch (error) {
    console.error('Fetch failed:', error.message);
    return [];
  }
}

getUsers();
```

### POST Request

```javascript
async function createPost(title, body, userId) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',      // Tell server we're sending JSON
        'Accept': 'application/json',             // We want JSON back
        'Authorization': 'Bearer YOUR_TOKEN'      // Auth header (if needed)
      },
      body: JSON.stringify({ title, body, userId })  // Serialize JS → JSON string
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const newPost = await response.json();
    console.log('Created post:', newPost);
    // { id: 101, title: ..., body: ..., userId: ... }
    return newPost;

  } catch (error) {
    console.error('POST failed:', error.message);
  }
}

createPost('My New Article', 'This is the content.', 1);
```

### PUT & DELETE Requests

```javascript
// PUT: Replace an entire resource
async function updatePost(id, data) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// PATCH: Update specific fields only
async function patchPost(id, fields) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields)   // Only the fields to update
  });
  return res.json();
}

// DELETE: Remove a resource
async function deletePost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE'
  });
  if (res.ok) console.log(`Post ${id} deleted.`);
}

// Usage:
updatePost(1, { id: 1, title: 'Updated Title', body: 'New body', userId: 1 });
patchPost(1, { title: 'Partial Update' });
deletePost(1);
```

---

## 5. JSON in Node.js (File I/O)

```javascript
const fs = require('fs').promises;
const path = require('path');

// ─── Write JSON to file ────────────────────────────────────────────
async function saveJson(data, filepath) {
  try {
    const jsonStr = JSON.stringify(data, null, 2);  // Pretty-print
    await fs.writeFile(filepath, jsonStr, 'utf8');
    console.log(`Saved to ${filepath}`);
  } catch (error) {
    console.error('Failed to save JSON:', error.message);
    throw error;
  }
}

// ─── Read JSON from file ───────────────────────────────────────────
async function loadJson(filepath) {
  try {
    const raw = await fs.readFile(filepath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`File not found: ${filepath}`);
      return null;
    }
    console.error('Failed to read/parse JSON:', error.message);
    throw error;
  }
}

// ─── Merge/update JSON data ────────────────────────────────────────
async function updateJson(filepath, updates) {
  const existing = await loadJson(filepath) || {};
  const merged = { ...existing, ...updates };
  await saveJson(merged, filepath);
  return merged;
}

// ─── Practical usage ──────────────────────────────────────────────
(async () => {
  const dbPath = path.join(__dirname, 'students.json');

  // Load existing data
  const students = await loadJson(dbPath) || [];

  // Add a new student
  students.push({ id: Date.now(), name: 'Alice', gpa: 9.2 });

  // Save back to file
  await saveJson(students, dbPath);

  // Read it back
  const loaded = await loadJson(dbPath);
  console.log(`Total students: ${loaded.length}`);
})();
```

---

## 6. Advanced JSON Data Manipulation in JS

When working with JSON in JavaScript, you typically parse it into arrays of objects. Here are all the core patterns for mutating and querying that data.

```javascript
// Sample JSON-derived dataset
let db = {
  users: [
    { id: 1, name: 'Alice', role: 'admin', tags: ['js', 'vue'] },
    { id: 2, name: 'Bob', role: 'editor', tags: ['css'] }
  ]
};
```

### A. Appending / Inserting (Create)

```javascript
// 1. Mutative Append (push to end)
db.users.push({ id: 3, name: 'Charlie', role: 'viewer', tags: [] });

// 2. Mutative Prepend (unshift to beginning)
db.users.unshift({ id: 0, name: 'Zero', role: 'viewer', tags: [] });

// 3. Immutable Append (using Spread Operator - React/Redux preferred)
const newUsers = [...db.users, { id: 4, name: 'Dave', role: 'editor', tags: [] }];

// 4. Insert at specific index (splice)
// Splice: (startIndex, deleteCount, item1, item2...)
db.users.splice(1, 0, { id: 1.5, name: 'Inserted', role: 'viewer', tags: [] });
```

### B. Searching & Querying (Read)

```javascript
// 1. Find a single object (returns first match or undefined)
const bob = db.users.find(user => user.id === 2);
console.log(bob?.name); // 'Bob'

// 2. Find index of an object (returns index or -1)
const bobIndex = db.users.findIndex(user => user.name === 'Bob');

// 3. Filter multiple objects (returns new array)
const editors = db.users.filter(user => user.role === 'editor');

// 4. Check if ANY object matches condition (returns true/false)
const hasAdmins = db.users.some(user => user.role === 'admin');

// 5. Check if ALL objects match condition (returns true/false)
const allHaveTags = db.users.every(user => user.tags.length > 0);

// 6. Deep search across nested arrays
const vueUsers = db.users.filter(user => user.tags.includes('vue'));
```

### C. Updating / Modifying (Update)

```javascript
// 1. Mutative Update (find and modify directly)
const userToUpdate = db.users.find(u => u.id === 1);
if (userToUpdate) {
  userToUpdate.role = 'superadmin';
  userToUpdate.tags.push('react'); // Update nested array
}

// 2. Immutable Update (Map - React/Redux preferred)
const updatedUsers = db.users.map(user => 
  user.id === 2 ? { ...user, role: 'admin', tags: [...user.tags, 'html'] } : user
);

// 3. Object.assign for bulk property updates
const target = db.users[0];
Object.assign(target, { name: 'Alicia', lastActive: '2026-09-09' });

// 4. Deep Cloning for safe modifications
const deepClone = JSON.parse(JSON.stringify(db.users));
// Note: structuredClone(db.users) is the modern native alternative!
```

### D. Deleting / Removing (Delete)

```javascript
// 1. Immutable Delete (Filter - React/Redux preferred)
// Removes user with ID 2 by keeping everyone ELSE
db.users = db.users.filter(user => user.id !== 2);

// 2. Mutative Delete (Splice by index)
const indexToRemove = db.users.findIndex(u => u.id === 3);
if (indexToRemove !== -1) {
  db.users.splice(indexToRemove, 1);
}

// 3. Delete a specific property from a JSON object
const userObj = db.users[0];
delete userObj.lastActive; // Removes the key entirely

// 4. Immutable Property Deletion (Destructuring Rest Pattern)
const { role, ...userWithoutRole } = userObj;
// userWithoutRole has all properties EXCEPT 'role'
```

---

## 7. JSON Schema Validation

While JSON doesn't have built-in validation, you can validate structure manually or with libraries like `ajv`:

```javascript
// Manual validation
function validateStudent(student) {
  const errors = [];

  if (typeof student.id !== 'number') errors.push('id must be a number');
  if (typeof student.name !== 'string' || student.name.trim() === '')
    errors.push('name must be a non-empty string');
  if (typeof student.gpa !== 'number' || student.gpa < 0 || student.gpa > 10)
    errors.push('gpa must be between 0 and 10');
  if (!Array.isArray(student.courses))
    errors.push('courses must be an array');

  return { valid: errors.length === 0, errors };
}

const student = { id: 1, name: 'Alice', gpa: 9.2, courses: ['CS101'] };
const result = validateStudent(student);
console.log(result); // { valid: true, errors: [] }

const badStudent = { id: 'one', name: '', gpa: 15 };
console.log(validateStudent(badStudent));
// { valid: false, errors: ['id must be a number', 'name must be a non-empty string', 'gpa must be between 0 and 10'] }
```

---

## 7. Common JSON Pitfalls & Edge Cases

> [!WARNING]
> **Always wrap `JSON.parse()` in `try...catch`** when processing external data (APIs, user input, files). Invalid JSON throws a synchronous `SyntaxError` that will crash your application if uncaught.

> [!CAUTION]
> **`undefined`, functions, and symbols are silently dropped** during `JSON.stringify()`. If you rely on these values being preserved, JSON is the wrong transport format.

```javascript
// ── Pitfall 1: undefined is dropped ──────────────────────────────
JSON.stringify({ a: 1, b: undefined, c: null });
// '{"a":1,"c":null}'  — 'b' is completely gone!

// ── Pitfall 2: Dates serialize as ISO strings, not Date objects ───
const obj = { created: new Date() };
const json = JSON.stringify(obj);
// '{"created":"2026-09-09T06:00:00.000Z"}'  (string!)
const back = JSON.parse(json);
back.created instanceof Date  // false — it's a string!
// Fix with reviver:
const fixed = JSON.parse(json, (k, v) => k === 'created' ? new Date(v) : v);
fixed.created instanceof Date  // true

// ── Pitfall 3: Circular references throw ────────────────────────
const a = {};
a.self = a;
JSON.stringify(a); // TypeError: Converting circular structure to JSON!

// ── Pitfall 4: response.json() can only be called once ───────────
const res = await fetch(url);
const data1 = await res.json();   // ✅ Works
const data2 = await res.json();   // ❌ TypeError: body already used!
// Fix: clone the response before reading
const res2 = await fetch(url);
const clone = res2.clone();
const data = await res2.json();
const rawText = await clone.text();

// ── Pitfall 5: JSON numbers lose precision beyond 2^53 ───────────
// Large integer IDs from databases may lose precision
const bigId = 9007199254740993;
JSON.stringify({ id: bigId });    // '{"id":9007199254740992}'  (wrong!)
// Fix: transmit large integers as strings
JSON.stringify({ id: bigId.toString() }); // '{"id":"9007199254740993"}'
```

---

## 8. Live Showcase: JSON Data Explorer

**Interactive JSON fetch + display with pretty-print and structured rendering:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JSON API Explorer</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 20px auto; padding: 0 16px; background: #f8fafc; }
    button { background: #0284c7; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; }
    button:hover { background: #0369a1; }
    .card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    pre { background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow: auto; font-size: 13px; }
    .user-card { display: flex; gap: 12px; align-items: flex-start; }
    .avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #7c3aed); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }
  </style>
</head>
<body>
  <h1>📦 JSON API Explorer</h1>
  <p>Demonstrates fetching, parsing, and displaying JSON from a REST API.</p>

  <div class="card">
    <h2>Fetch Users (GET)</h2>
    <button onclick="fetchUsers()">Fetch Users from JSONPlaceholder</button>
    <div id="users-output"></div>
  </div>

  <div class="card">
    <h2>Create Post (POST)</h2>
    <input id="post-title" placeholder="Post title" style="padding:8px;border:1px solid #e2e8f0;border-radius:6px;width:100%;margin-bottom:8px;box-sizing:border-box;">
    <input id="post-body" placeholder="Post content" style="padding:8px;border:1px solid #e2e8f0;border-radius:6px;width:100%;margin-bottom:8px;box-sizing:border-box;">
    <button onclick="createPost()">POST to API</button>
    <div id="post-output"></div>
  </div>

  <div class="card">
    <h2>JSON stringify/parse Demo</h2>
    <button onclick="demoStringify()">Demo stringify() & parse()</button>
    <div id="stringify-output"></div>
  </div>

  <script>
    async function fetchUsers() {
      document.getElementById('users-output').innerHTML = '<p>⏳ Loading...</p>';
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const users = await res.json();
        const html = users.slice(0, 4).map(u => `
          <div class="user-card" style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
            <div class="avatar">${u.name.charAt(0)}</div>
            <div>
              <strong>${u.name}</strong> <span style="color:#64748b;font-size:13px;">@${u.username}</span><br>
              <small style="color:#64748b;">${u.email} · ${u.address.city} · ${u.company.name}</small>
            </div>
          </div>
        `).join('');
        document.getElementById('users-output').innerHTML = `<div style="margin-top:12px">${html}</div>
          <details style="margin-top:12px"><summary style="cursor:pointer;color:#0284c7;">View Raw JSON</summary>
          <pre>${JSON.stringify(users.slice(0,2), null, 2)}</pre></details>`;
      } catch (e) {
        document.getElementById('users-output').innerHTML = `<p style="color:red">Error: ${e.message}</p>`;
      }
    }

    async function createPost() {
      const title = document.getElementById('post-title').value || 'Test Post';
      const body = document.getElementById('post-body').value || 'This is a test.';
      document.getElementById('post-output').innerHTML = '<p>⏳ Sending...</p>';
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body, userId: 1 })
        });
        const created = await res.json();
        document.getElementById('post-output').innerHTML =
          `<p style="color:green;margin-top:8px">✅ Post created with ID: ${created.id}</p>
           <pre>${JSON.stringify(created, null, 2)}</pre>`;
      } catch (e) {
        document.getElementById('post-output').innerHTML = `<p style="color:red">Error: ${e.message}</p>`;
      }
    }

    function demoStringify() {
      const obj = {
        name: 'Alice', age: 22, gpa: 9.175,
        enrolled: true, courses: ['CS101', 'CS202'],
        address: { city: 'Mumbai' },
        secret: undefined,
        fn: () => 'ignored'
      };

      const compact = JSON.stringify(obj);
      const pretty = JSON.stringify(obj, null, 2);
      const filtered = JSON.stringify(obj, ['name', 'gpa', 'courses'], 2);
      const clone = JSON.parse(JSON.stringify(obj));

      document.getElementById('stringify-output').innerHTML = `
        <h4 style="margin:12px 0 4px">Compact:</h4>
        <pre>${compact}</pre>
        <h4 style="margin:8px 0 4px">Pretty (indent=2):</h4>
        <pre>${pretty}</pre>
        <h4 style="margin:8px 0 4px">Filtered (name,gpa,courses only):</h4>
        <pre>${filtered}</pre>
        <p style="color:#64748b;font-size:13px;">Notice: undefined and functions are omitted!</p>
      `;
    }
  </script>
</body>
</html>
```

<iframe srcdoc='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;padding:16px;background:#f8fafc;color:#0f172a}h1{font-size:1.3rem;font-weight:700;color:#0284c7;margin-bottom:12px}.card{background:white;border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin-bottom:10px}h2{font-size:1rem;font-weight:600;margin-bottom:8px}button{background:#0284c7;color:white;border:none;padding:7px 14px;border-radius:6px;cursor:pointer;font-size:13px;margin-bottom:8px}button:hover{background:#0369a1}input{width:100%;padding:7px 10px;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:6px;font-size:13px}pre{background:#1e293b;color:#e2e8f0;padding:12px;border-radius:6px;font-size:11px;overflow:auto;margin-top:6px;max-height:200px}.avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#0284c7,#7c3aed);color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;flex-shrink:0;font-size:14px}.urow{display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #f1f5f9}</style></head><body><h1>📦 JSON API Explorer</h1><div class="card"><h2>Fetch Users (GET)</h2><button onclick="fetchUsers()">Fetch from JSONPlaceholder</button><div id="uo"></div></div><div class="card"><h2>Create Post (POST)</h2><input id="pt" placeholder="Post title"><input id="pb" placeholder="Post content"><button onclick="createPost()">POST to API</button><div id="po"></div></div><div class="card"><h2>JSON stringify/parse Demo</h2><button onclick="demoStr()">Run Demo</button><div id="so"></div></div><script>async function fetchUsers(){document.getElementById("uo").innerHTML="<p style=color:#64748b>⏳ Loading...</p>";try{const r=await fetch("https://jsonplaceholder.typicode.com/users");const u=await r.json();const h=u.slice(0,4).map(x=>`<div class="urow"><div class="avatar">${x.name[0]}</div><div><strong>${x.name}</strong> <span style="color:#64748b;font-size:12px">@${x.username}</span><br><small style="color:#94a3b8">${x.email}</small></div></div>`).join("");document.getElementById("uo").innerHTML=h+`<details style="margin-top:8px"><summary style="cursor:pointer;color:#0284c7;font-size:13px">View JSON</summary><pre>${JSON.stringify(u[0],null,2)}</pre></details>`}catch(e){document.getElementById("uo").innerHTML=`<p style=color:red>Error: ${e.message}</p>`}}async function createPost(){const t=document.getElementById("pt").value||"Test Post";const b=document.getElementById("pb").value||"Content here.";document.getElementById("po").innerHTML="<p style=color:#64748b>⏳ Posting...</p>";try{const r=await fetch("https://jsonplaceholder.typicode.com/posts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t,body:b,userId:1})});const d=await r.json();document.getElementById("po").innerHTML=`<p style="color:green;margin-top:6px">✅ Post created! ID: ${d.id}</p><pre>${JSON.stringify(d,null,2)}</pre>`}catch(e){document.getElementById("po").innerHTML=`<p style=color:red>Error: ${e.message}</p>`}}function demoStr(){const obj={name:"Alice",age:22,gpa:9.175,enrolled:true,courses:["CS101","CS202"],address:{city:"Mumbai"},secret:undefined,fn:()=>"ignored"};const compact=JSON.stringify(obj);const pretty=JSON.stringify(obj,null,2);const filtered=JSON.stringify(obj,["name","gpa","courses"],2);document.getElementById("so").innerHTML=`<p style="font-size:12px;color:#64748b;margin:6px 0">Compact:</p><pre>${compact}</pre><p style="font-size:12px;color:#64748b;margin:6px 0">Pretty (null,2):</p><pre>${pretty}</pre><p style="font-size:12px;color:#64748b;margin:6px 0">Filtered keys [name,gpa,courses]:</p><pre>${filtered}</pre><p style="color:#f59e0b;font-size:12px;margin-top:4px">⚠️ undefined &amp; functions are silently dropped!</p>`}</script></body></html>' width="100%" height="700" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

> [!IMPORTANT]
> `response.json()` consumes the response body stream. It can only be called **once** per response. If you need to read it multiple times, clone the response first using `response.clone()` before calling `.json()`.
