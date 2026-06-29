# Todo App

A basic todo app: a React (Vite) frontend and a Node/Express backend, in separate
folders. Data is stored locally in a JSON file (`backend/todos.json`) — no database.

## Structure

```
backend/    Express REST API, persists todos to todos.json
frontend/   React UI (Vite), proxies /api to the backend
```

## Run locally

Open two terminals.

**Backend** (port 4000):

```bash
cd backend
npm install
npm start
```

**Frontend** (port 5173):

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173. The Vite dev server proxies `/api/*` requests to
the backend on port 4000, so both run on a single origin in the browser.

## API

| Method | Path             | Body                    | Description        |
|--------|------------------|-------------------------|--------------------|
| GET    | /api/todos       | —                       | List all todos     |
| POST   | /api/todos       | `{ "text": "..." }`     | Create a todo      |
| PUT    | /api/todos/:id   | `{ "done": true }` etc. | Update a todo      |
| DELETE | /api/todos/:id   | —                       | Delete a todo      |
