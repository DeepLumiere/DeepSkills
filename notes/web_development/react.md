# React.js — Complete Framework Reference

React is a declarative, component-based JavaScript library for building user interfaces. It uses a Virtual DOM for efficient updates and composable, isolated component architecture.

> [!NOTE]
> React uses JSX (JavaScript XML) which must be transpiled (via Babel or a bundler like Vite). For quick demos without a build step, use the Babel CDN in-browser transpiler.

---

## 1. Setup — CDN with Babel (No Build Step)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React CDN App</title>

  <!-- React + ReactDOM (Development builds) -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  <!-- Babel: In-browser JSX transpiler (dev only — never in production!) -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  <!-- type="text/babel" tells Babel to transpile this block -->
  <script type="text/babel">
    function App() {
      return <h1>Hello, React 18!</h1>;
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

---

## 2. Core Concepts

### Virtual DOM & Reconciliation

React maintains a lightweight copy of the real DOM called the **Virtual DOM (VDOM)**. On every state change:

1. React re-renders the component tree into a new Virtual DOM.
2. A **Diffing Algorithm** ($O(n)$ heuristic) compares old and new VDOM trees.
3. Only the **minimal set of actual DOM mutations** is applied (reconciliation).

This makes React updates highly efficient — avoiding full DOM re-renders.

### JSX (JavaScript XML)

JSX is syntactic sugar for `React.createElement()` calls. It looks like HTML inside JavaScript.

```jsx
// JSX:
const element = <h1 className="title">Hello, {name}!</h1>;

// Compiled to:
const element = React.createElement('h1', { className: 'title' }, 'Hello, ', name, '!');
```

**JSX Rules:**
- Use `className` instead of `class`
- Use `htmlFor` instead of `for`
- All tags must be closed: `<br />`, `<img />`
- Return a single root element (wrap in `<div>` or `<>...</>` Fragment)
- JavaScript expressions in `{...}` curly braces
- `camelCase` for event handlers: `onClick`, `onChange`, `onSubmit`

```jsx
// Correct JSX:
function Profile({ user }) {
  return (
    <>
      <h1 className="title">{user.name}</h1>
      <img src={user.avatar} alt="Profile" />
      <p style={{ color: '#64748b', fontSize: '14px' }}>
        {user.bio || 'No bio available.'}
      </p>
    </>
  );
}
```

---

## 3. Functional Components & Props

```jsx
// ─── Basic Functional Component ──────────────────────────────────────
function Welcome(props) {
  return <h2>Hello, {props.name}!</h2>;
}

// ─── Arrow function component with destructured props ─────────────────
const Greeting = ({ name, age, isStudent = false }) => (
  <div>
    <h3>{name}, Age {age}</h3>
    {isStudent && <span className="badge">Student</span>}
  </div>
);

// ─── Component with children prop ─────────────────────────────────────
const Card = ({ title, children, className = '' }) => (
  <div className={`card ${className}`}>
    <h4 className="card-title">{title}</h4>
    <div className="card-body">{children}</div>
  </div>
);

// ─── Using components ─────────────────────────────────────────────────
function App() {
  const user = { name: 'Alice', age: 22, isStudent: true };
  return (
    <>
      <Welcome name="Bob" />
      <Greeting {...user} />
      <Card title="My Card">
        <p>This is the card body content passed as children.</p>
        <button>Click me</button>
      </Card>
    </>
  );
}
```

---

## 4. State with useState Hook

```jsx
import React, { useState } from 'react';

// ─── Counter: basic state ─────────────────────────────────────────────
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <p>{count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero'}</p>
      <input type="number" value={step} onChange={e => setStep(Number(e.target.value))} min="1" />
      <button onClick={decrement}>−{step}</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+{step}</button>
    </div>
  );
}

// ─── Form input: controlled component ────────────────────────────────
function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setSuccess(true);
    console.log('Login:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>Logged in as {formData.email}!</div>}

      <div>
        <label>Email:</label>
        <input
          type="email" name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password" name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
      </div>
      <div>
        <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} id="rem" />
        <label htmlFor="rem">Remember me</label>
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
}

// ─── Array state: Todo list ───────────────────────────────────────────
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Hooks', done: false },
    { id: 2, text: 'Build a project', done: false }
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Todo List ({todos.filter(t => !t.done).length} remaining)</h2>
      <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="New todo..."
               onKeyDown={e => e.key === 'Enter' && addTodo()} />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#94a3b8' : 'inherit' }}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
            {' '}{todo.text}
            <button onClick={() => deleteTodo(todo.id)} style={{marginLeft:'8px', color:'red', background:'none', border:'none', cursor:'pointer'}}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 5. Side Effects with useEffect Hook

```jsx
import React, { useState, useEffect } from 'react';

// ─── Dependency array rules: ──────────────────────────────────────────
// useEffect(() => {}, undefined)   → Runs after EVERY render
// useEffect(() => {}, [])          → Runs ONCE on mount (componentDidMount)
// useEffect(() => {}, [dep])       → Runs when dep changes (componentDidUpdate)
// useEffect(() => () => cleanup)   → Return function = cleanup (componentWillUnmount)

// ─── Timer: runs once on mount, cleans up on unmount ─────────────────
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;     // Only run when timer is active
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);   // CLEANUP: stop interval when paused/unmounted
  }, [running]);              // Re-runs effect when `running` changes

  return (
    <div>
      <h2>Timer: {seconds}s</h2>
      <button onClick={() => setRunning(r => !r)}>
        {running ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => { setSeconds(0); setRunning(false); }}>Reset</button>
    </div>
  );
}

// ─── Fetch API data on component mount ───────────────────────────────
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;  // Prevent state update on unmounted component

    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setUsers(data.slice(0, 5));  // Take first 5
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchUsers();
    return () => { cancelled = true; };  // Cleanup: ignore if unmounted
  }, []);  // Empty array: run once on mount

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.email}
        </li>
      ))}
    </ul>
  );
}

// ─── Window resize watcher ────────────────────────────────────────────
function WindowSizer() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);  // Cleanup listener
  }, []);

  return <p>Window: {size.width} × {size.height}px</p>;
}
```

---

## 6. Conditional Rendering & Lists

```jsx
// ─── Conditional rendering approaches ────────────────────────────────
function UserStatus({ isLoggedIn, user, isAdmin, notifications }) {
  // Approach 1: Ternary operator
  const greeting = isLoggedIn ? `Welcome back, ${user.name}!` : 'Please log in.';

  return (
    <div>
      <h2>{greeting}</h2>

      {/* Approach 2: Logical && (render only when true) */}
      {isLoggedIn && <p>Your account is active.</p>}

      {/* Approach 3: Ternary in JSX */}
      {isAdmin ? (
        <span style={{background:'red', color:'white', padding:'2px 8px', borderRadius:'4px'}}>Admin</span>
      ) : (
        <span style={{background:'blue', color:'white', padding:'2px 8px', borderRadius:'4px'}}>User</span>
      )}

      {/* Approach 4: Short-circuit for null guard */}
      {notifications > 0 && (
        <div>{notifications} unread notification{notifications > 1 ? 's' : ''}</div>
      )}

      {/* Approach 5: Early return pattern (above the JSX) */}
    </div>
  );
}

// ─── List rendering with map() ────────────────────────────────────────
function ProductGrid({ products }) {
  // Always provide a unique `key` prop on list items!
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px,1fr))', gap:'16px'}}>
      {products.map(product => (
        <div key={product.id} style={{border:'1px solid #e2e8f0', borderRadius:'8px', padding:'16px'}}>
          <h4>{product.name}</h4>
          <p style={{color:'#64748b'}}>₹{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

// ─── Filter + Map pattern ─────────────────────────────────────────────
function ActiveUsers({ users }) {
  return (
    <ul>
      {users
        .filter(user => user.active)           // Filter first
        .sort((a, b) => a.name.localeCompare(b.name))  // Sort
        .map(user => (                          // Then render
          <li key={user.id}>{user.name}</li>
        ))
      }
    </ul>
  );
}
```

---

## 7. Event Handling

```jsx
function EventDemo() {
  const [log, setLog] = useState('No events yet');

  // ─── Click events ─────────────────────────────────────────────────
  const handleClick = (e) => {
    setLog(`Clicked at (${e.clientX}, ${e.clientY})`);
  };

  const handleClickWithArg = (color, e) => {
    setLog(`Clicked ${color} button at (${e.clientX}, ${e.clientY})`);
  };

  // ─── Form events ─────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();  // Must call explicitly in React
    setLog('Form submitted!');
  };

  // ─── Keyboard events ─────────────────────────────────────────────
  const handleKeyDown = (e) => {
    setLog(`Key pressed: ${e.key} (code: ${e.code})`);
    if (e.key === 'Escape') setLog('Escape pressed — closed!');
  };

  // ─── Event propagation ────────────────────────────────────────────
  const handleParent = () => setLog('Parent div clicked');
  const handleChild = (e) => {
    e.stopPropagation();  // Stop event bubbling to parent
    setLog('Child button clicked (propagation stopped)');
  };

  return (
    <div>
      <p>Last event: {log}</p>

      <button onClick={handleClick}>Click (coords)</button>
      <button onClick={(e) => handleClickWithArg('red', e)} style={{background:'red',color:'white'}}>Red</button>
      <button onClick={(e) => handleClickWithArg('blue', e)} style={{background:'blue',color:'white'}}>Blue</button>

      <form onSubmit={handleSubmit}>
        <input onKeyDown={handleKeyDown} placeholder="Type & press keys" />
        <button type="submit">Submit</button>
      </form>

      <div onClick={handleParent} style={{padding:'16px', background:'#f1f5f9', cursor:'pointer'}}>
        Parent div (click me)
        <button onClick={handleChild} style={{marginLeft:'8px'}}>Child (stop propagation)</button>
      </div>
    </div>
  );
}
```

---

## 8. Context API — Global State

```jsx
import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
const ThemeContext = createContext('light');

// 2. Provider wraps your tree
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consumer uses useContext
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      style={{
        background: theme === 'dark' ? '#1e293b' : '#f1f5f9',
        color: theme === 'dark' ? 'white' : '#0f172a'
      }}
    >
      Toggle Theme (currently: {theme})
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
      <ThemedButton />  {/* Both share same context! */}
    </ThemeProvider>
  );
}
```

---

## 9. Fetch Data from REST API

```jsx
import React, { useState, useEffect } from 'react';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);  // Re-fetch when page changes

  if (loading) return <p>⏳ Loading...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} style={{borderBottom:'1px solid #e2e8f0', padding:'12px 0'}}>
          <h4 style={{margin:'0 0 4px'}}>{post.title}</h4>
          <p style={{margin:0, color:'#64748b', fontSize:'14px'}}>{post.body}</p>
        </div>
      ))}
      <div style={{display:'flex', gap:'8px', marginTop:'16px'}}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next →</button>
      </div>
    </div>
  );
}
```

---

## 10. Live Showcase: Complete React App

**React 18 Todo App with full CRUD, filtering, and local persistence:**

```jsx
// Full React Todo Application with CDN + Babel
```

<iframe srcdoc='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>React App</title><script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script><script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;background:#f8fafc;padding:16px;color:#0f172a}.container{max-width:600px;margin:0 auto}.title{font-size:1.5rem;font-weight:700;color:#0284c7;margin-bottom:16px}.input-row{display:flex;gap:8px;margin-bottom:12px}input[type=text]{flex:1;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:14px}button{padding:7px 14px;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500}.btn-add{background:#0284c7;color:white}.btn-del{background:none;color:#ef4444;font-size:16px}.btn-filter{padding:5px 12px;background:#f1f5f9}.btn-filter.active{background:#0284c7;color:white}.todo-item{display:flex;align-items:center;gap:10px;padding:10px;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:6px;background:white;transition:opacity .2s}.todo-item.done{opacity:.5}.todo-text{flex:1;font-size:14px}.todo-text.done{text-decoration:line-through;color:#94a3b8}.filters{display:flex;gap:6px;margin-bottom:12px}.stats{font-size:12px;color:#64748b;margin-top:12px;display:flex;justify-content:space-between}</style></head><body><div id="root"></div><script type="text/babel">const{useState,useEffect}=React;function App(){const[todos,setTodos]=useState([{id:1,text:"Learn React Hooks",done:true},{id:2,text:"Build a Todo App",done:false},{id:3,text:"Deploy to GitHub Pages",done:false}]);const[input,setInput]=useState("");const[filter,setFilter]=useState("all");const add=()=>{if(!input.trim())return;setTodos(p=>[...p,{id:Date.now(),text:input.trim(),done:false}]);setInput("")};const toggle=id=>setTodos(p=>p.map(t=>t.id===id?{...t,done:!t.done}:t));const del=id=>setTodos(p=>p.filter(t=>t.id!==id));const clearDone=()=>setTodos(p=>p.filter(t=>!t.done));const filtered=todos.filter(t=>filter==="all"?true:filter==="active"?!t.done:t.done);const remaining=todos.filter(t=>!t.done).length;return(<div className="container"><div className="title">⚛️ React 18 Todo App</div><div className="input-row"><input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Add a new task... (Enter to add)"/><button className="btn-add" onClick={add}>+ Add</button></div><div className="filters">{["all","active","done"].map(f=>(<button key={f} className={`btn-filter${filter===f?" active":""}`} onClick={()=>setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>))}</div>{filtered.length===0&&<p style={{textAlign:"center",color:"#94a3b8",padding:"24px"}}>No tasks to show! {filter==="all"?"Add one above ↑":""}</p>}{filtered.map(todo=>(<div key={todo.id} className={`todo-item${todo.done?" done":""}`}><input type="checkbox" checked={todo.done} onChange={()=>toggle(todo.id)}/><span className={`todo-text${todo.done?" done":""}`}>{todo.text}</span><button className="btn-del" onClick={()=>del(todo.id)}>✕</button></div>))}<div className="stats"><span>{remaining} task{remaining!==1?"s":""} remaining</span>{todos.some(t=>t.done)&&<button onClick={clearDone} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:"12px"}}>Clear completed</button>}</div></div>);}</script><script type="text/babel">const root=ReactDOM.createRoot(document.getElementById("root"));root.render(<App/>);</script></body></html>' width="100%" height="500" style="border:1px solid #cbd5e1;border-radius:8px;margin:12px 0;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);" loading="lazy"></iframe>

> [!IMPORTANT]
> **Props are strictly read-only.** A component must never modify its own props. State (`useState`) is mutable and local to the component; props are immutable and passed from the parent.

> [!WARNING]
> Don't use array indices as keys when the order of items may change. This causes subtle bugs with component state. Always use stable, unique IDs from your data.
