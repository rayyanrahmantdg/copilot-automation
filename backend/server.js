import express from "express";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, "todos.json");
const PORT = 4000;

// --- local file persistence (no database) ---
async function readTodos() {
  if (!existsSync(DATA_FILE)) return [];
  const raw = await readFile(DATA_FILE, "utf8");
  return raw.trim() ? JSON.parse(raw) : [];
}

async function writeTodos(todos) {
  await writeFile(DATA_FILE, JSON.stringify(todos, null, 2));
}

const app = express();
app.use(express.json());

app.get("/api/todos", async (_req, res) => {
  res.json(await readTodos());
});

app.post("/api/todos", async (req, res) => {
  const text = (req.body.text || "").trim();
  if (!text) return res.status(400).json({ error: "text is required" });

  const todos = await readTodos();
  const todo = { id: Date.now().toString(), text, done: false };
  todos.push(todo);
  await writeTodos(todos);
  res.status(201).json(todo);
});

app.put("/api/todos/:id", async (req, res) => {
  const todos = await readTodos();
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: "not found" });

  if (typeof req.body.done === "boolean") todo.done = req.body.done;
  if (typeof req.body.text === "string") todo.text = req.body.text.trim();
  await writeTodos(todos);
  res.json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  const todos = await readTodos();
  const next = todos.filter((t) => t.id !== req.params.id);
  if (next.length === todos.length) return res.status(404).json({ error: "not found" });
  await writeTodos(next);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Todo backend running on http://localhost:${PORT}`);
});
