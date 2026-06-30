import { useEffect, useState } from "react";
import EditTodoDialog from "./components/EditTodoDialog";
import TodoItem from "./components/TodoItem";

const API = "/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
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

  function openEditDialog(todo) {
    setEditingTodo(todo);
    setEditingText(todo.text);
    setEditOpen(true);
  }

  function closeEditDialog() {
    setEditOpen(false);
    setEditingTodo(null);
    setEditingText("");
  }

  async function saveEdit(textValue) {
    if (!editingTodo) return;

    const value = textValue.trim();
    if (!value) return;

    const res = await fetch(`${API}/${editingTodo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
    });
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    closeEditDialog();
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
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={openEditDialog}
            />
          ))}
        </ul>
      )}

      <EditTodoDialog
        open={editOpen}
        value={editingText}
        onClose={closeEditDialog}
        onSave={saveEdit}
      />
    </div>
  );
}
