# Implementation Plan — Edit existing todo text

This plan implements the change described in `CHANGES.md`: add inline edit
for an existing todo's text (double-click to edit, save via `PUT /api/todos/:id`).

## Change 1 — Edit existing todo text

- **Summary**: Add inline editing to todo items. Double-clicking the todo text
  turns it into an input. On blur or Enter the app calls `PUT /api/todos/:id`
  with `{ text: "..." }` and updates local state.
- **Affected files**:
  - frontend/src/App.jsx (exists)
- **Approach**:
  1. Add component-level state: `editingId` (string|null) and `editingText` (string).
  2. Render an `<input>` in place of the `<span>` when `editingId === todo.id`.
  3. On double-click of the text, set `editingId` and `editingText`.
  4. When the input loses focus (`onBlur`) or Enter is pressed, call `PUT /api/todos/:id`
     with `{ text: editingText }` and update `todos` state with the response.
  5. If the request fails, leave the text unchanged and log the error.
  6. Keep behavior for toggle and delete unchanged.
- **Verification**:
  - Manual: Run the frontend and backend, create a todo, double-click its text,
    change it, then press Enter or click away. Confirm the UI updates and the
    backend `todos.json` contains the new text.
  - Commands:
    - Start backend: `cd backend && npm start` (or `node server.js`).
    - Start frontend: `cd frontend && npm run dev`.
- **Risks / open questions**:
  - UX decisions: should Esc cancel edits? Current plan does not implement Esc.
  - No debounce or optimistic UI — plan uses server response to update state.

---

No application code will be modified in this phase; changes will be implemented
only after you review and approve this plan.
