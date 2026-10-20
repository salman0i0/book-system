# Module 1 — Project Setup: Design

## Architecture Overview

```
book-management-system/
  client/    ← Vite + React SPA (port 5173)
  server/    ← Node + Express REST API (port 5000)
```

The two processes run independently. The client communicates with the server only through HTTP (`/api/*`). They share no code.

## Frontend Design

- **Entry:** `client/src/main.jsx` → renders `<App>` into `#root`.
- **App.jsx:** wraps everything in `<AuthProvider>` and `<BrowserRouter>`, defines routes.
- **Routing (Module 1 placeholder routes):**
  - `/` → redirect to `/dashboard`
  - `/login` → `<Login>` (placeholder)
  - `/register` → `<Register>` (placeholder)
  - `/dashboard` → `<Dashboard>` (placeholder)
- **Navbar:** always visible at the top; shows app name.
- **`services/api.js`:** Axios instance with `baseURL = VITE_API_URL`.

## Backend Design

- **Entry:** `server/server.js`
  1. Load `.env` with `dotenv.config()`.
  2. Call `connectDB()`.
  3. Create Express app, add `cors`, `express.json()`.
  4. Mount health-check route.
  5. Listen on `process.env.PORT || 5000`.

- **Health check:** `GET /api/health` → `200 { success: true, message: "Server is running" }`.

- **Error handling:** global `errorHandler` middleware catches all unhandled errors.

## Data Models (none in Module 1)
Models are added in Module 2 (Book) and Module 4 (User).

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `MONGO_URI` | `server/.env` | MongoDB Atlas connection string |
| `JWT_SECRET` | `server/.env` | JWT signing key |
| `PORT` | `server/.env` | Server port (default 5000) |
| `CLIENT_URL` | `server/.env` | Allowed CORS origin |
| `VITE_API_URL` | `client/.env` | Backend base URL |
