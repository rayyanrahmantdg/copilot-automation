# Implementation Plan for "Edit existing todo text"

## Summary
Enable inline editing of a todo item by double-clicking its text in the frontend. The edit should update the todo via the existing backend `PUT /api/todos/:id` endpoint using a new `text` value.

## Affected files
- `frontend/src/App.jsx`
- `plans/IMPLEMENTATION-PLAN.md`

## Approach
1. In `frontend/src/App.jsx`, add local state to track the todo currently being edited and the draft text.
2. Render a text input in place of the todo text when a todo is in edit mode.
3. Start edit mode when the todo text `<span>` is double-clicked.
4. Update the draft text state as the user types.
5. Submit the updated text when the user presses Enter or when the input loses focus.
6. Call `PUT /api/todos/:id` with `{ text: updatedText }` and update the `todos` state with the response.
7. Cancel edit mode if the user presses Escape (keeping the original text).

## Verification
- Run the frontend and backend together (as existing project setup allows).
- Load the app and double-click a todo item text.
- Confirm the text becomes editable.
- Change the todo text and press Enter.
- Confirm the UI updates and the backend persists the change.

## Risks / open questions
- The app currently has no edit-specific styling; the plan keeps the change minimal and reuses the existing app structure.
- If the backend response is slow or fails, we will preserve the previous state and log errors.
