# Module 1 — Project Setup: Tasks

Check each task off as you complete it. Test after each one before moving to the next.

## Backend

- [ ] **Task 1.1** — Create `server/` with `package.json`, install dependencies:
  `express`, `mongoose`, `dotenv`, `cors`, `bcryptjs`, `jsonwebtoken`, `express-validator`
  and dev dependency `nodemon`.

- [ ] **Task 1.2** — Create `server/.env` from `.env.example`; fill in your real `MONGO_URI` and `JWT_SECRET`.

- [ ] **Task 1.3** — Create `server/config/db.js` with `connectDB()` using `mongoose.connect(MONGO_URI)`.

- [ ] **Task 1.4** — Create `server/middleware/errorHandler.js` (global error handler).

- [ ] **Task 1.5** — Create `server/server.js`: load env, call `connectDB()`, add CORS + JSON middleware, mount health-check route, start server.

- [ ] **Task 1.6** — Run `npm run dev` in `server/`. Verify:
  - Console shows `MongoDB connected: <host>` and `Server running on port 5000`.
  - `GET http://localhost:5000/api/health` returns `{ success: true, message: "Server is running" }`.

## Frontend

- [ ] **Task 1.7** — Create `client/` with `package.json`, `vite.config.js`, `index.html`.
  Install: `react`, `react-dom`, `react-router-dom`, `axios`.
  Dev: `vite`, `@vitejs/plugin-react`.

- [ ] **Task 1.8** — Create `client/.env` from `.env.example`; set `VITE_API_URL=http://localhost:5000/api`.

- [ ] **Task 1.9** — Create `client/src/index.css` with global styles.

- [ ] **Task 1.10** — Create `client/src/services/api.js` with Axios instance and JWT interceptor.

- [ ] **Task 1.11** — Create `client/src/context/AuthContext.jsx` with `AuthProvider` and `useAuth`.

- [ ] **Task 1.12** — Create placeholder pages: `Login.jsx`, `Register.jsx`, `Dashboard.jsx`.

- [ ] **Task 1.13** — Create `Navbar.jsx` and `ProtectedRoute.jsx` components.

- [ ] **Task 1.14** — Create `App.jsx` with `<BrowserRouter>` and all routes.

- [ ] **Task 1.15** — Create `main.jsx` entry point.

- [ ] **Task 1.16** — Run `npm run dev` in `client/`. Verify the app loads at `http://localhost:5173`.

## Kiro Setup

- [ ] **Task 1.17** — Confirm `.kiro/steering/tech.md`, `structure.md`, `conventions.md` all exist.

## Git

- [ ] **Task 1.18** — `git init`, add `.gitignore` at repo root, make initial commit:
  `"Module 1: Project setup — MERN boilerplate, steering files, health check"`.
