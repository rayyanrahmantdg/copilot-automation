import { useEffect, useState } from "react";

const API = "/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setTodos)
      .catch((err) => console.error("Failed to load todos:", err));
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
    });
    const todo = await res.json();
    setTodos((prev) => [...prev, todo]);
    setText("");
  }

  async function toggleTodo(todo) {
    const res = await fetch(`${API}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function deleteTodo(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <form onSubmit={addTodo} className="add-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty">No todos yet.</p>
      ) : (
        <ul className="list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo)}
                />
                {editingId === todo.id ? (
                  <input
                    autoFocus
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={async () => {
                      const value = editingText.trim();
                      setEditingId(null);
                      if (!value || value === todo.text) return;
                      try {
                        const res = await fetch(`${API}/${todo.id}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ text: value }),
                        });
                        const updated = await res.json();
                        setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
                      } catch (err) {
                        console.error("Failed to update todo:", err);
                      }
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                  />
                ) : (
                  <span onDoubleClick={() => { setEditingId(todo.id); setEditingText(todo.text); }}>{todo.text}</span>
                )}
              </label>
              <button onClick={() => deleteTodo(todo.id)} className="delete">
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
