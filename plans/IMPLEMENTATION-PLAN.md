# Implementation Plan

## Change 1: Edit existing todo text

### Summary
Add a Material UI popup editor for each todo item so a user can open an edit dialog from the todo row, change the text, and save it through the existing todo update API.

### Affected files
- frontend/src/App.jsx
- frontend/package.json

### Approach
1. Add a Material UI-based edit dialog to the todo row UI in frontend/src/App.jsx.
2. Provide an edit action on each todo item that opens the popup with the current text prefilled.
3. Save the updated value by calling the existing PUT /api/todos/:id endpoint with a new text field.
4. Keep the change scoped to the existing frontend behavior and preserve the current toggle/delete flows.

### Verification
- Start the backend and frontend apps.
- Create at least one todo, open the edit popup, update the text, and confirm the new value appears immediately.
- Refresh the page and confirm the new text persists.

### Risks / open questions
- The app currently does not include Material UI dependencies, so the popup implementation will need the appropriate package support.
- If the save request fails, the UI should avoid silently losing the user’s edit; this may need a simple error-handling fallback.
