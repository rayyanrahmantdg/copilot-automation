import { Button } from "@mui/material";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <li className={todo.done ? "done" : ""}>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo)}
        />
        <span>{todo.text}</span>
      </label>
      <div>
        <Button size="small" onClick={() => onEdit(todo)} className="edit">
          Edit
        </Button>
        <button onClick={() => onDelete(todo.id)} className="delete">
          ✕
        </button>
      </div>
    </li>
  );
}
