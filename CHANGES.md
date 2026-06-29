# Proposed Changes

A short list of improvements for the todo app.

## 1. Edit existing todo text
Currently a todo can only be added, toggled, or deleted. Add an inline edit
(double-click the text to make it editable) that calls the existing
`PUT /api/todos/:id` endpoint with a new `text` value — the backend already
supports it.
