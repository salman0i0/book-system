# Module 1 — Project Setup: Requirements

## User Stories

### US-1: Repository and folder structure
**As a developer**, I want a clean repository with separate `client` and `server` folders so that frontend and backend code stay isolated.

**Acceptance criteria:**
- The repo root contains `client/`, `server/`, `.kiro/`, and `README.md`.
- Each folder has its own `package.json`.
- `.env` is listed in both `.gitignore` files.

### US-2: React frontend boots
**As a developer**, I want to run `npm run dev` inside `client/` and see a working Vite React app at `http://localhost:5173`.

**Acceptance criteria:**
- Vite config is present and uses `@vitejs/plugin-react`.
- A basic `<Navbar>` and placeholder pages exist.
- React Router is installed and `<BrowserRouter>` wraps the app.

### US-3: Express server boots
**As a developer**, I want to run `npm run dev` inside `server/` and see "Server running on port 5000" in the console.

**Acceptance criteria:**
- `server.js` uses Express, CORS, and dotenv.
- `GET /api/health` returns `{ success: true, message: "Server is running" }`.
- Nodemon restarts the server on file changes.

### US-4: MongoDB connects
**As a developer**, I want the server to connect to MongoDB Atlas on startup.

**Acceptance criteria:**
- `config/db.js` calls `mongoose.connect()` using `MONGO_URI` from `.env`.
- A successful connection logs: `MongoDB connected: <host>`.
- A failed connection logs the error and exits with code 1.

### US-5: Steering files in place
**As a developer**, I want `.kiro/steering/` to contain `tech.md`, `structure.md`, and `conventions.md` so Kiro follows project rules automatically.

**Acceptance criteria:**
- All three steering files exist and accurately describe the stack, folder layout, and conventions.
