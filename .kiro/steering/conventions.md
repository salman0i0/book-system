# Code Conventions

## Naming
- Files and folders: camelCase for JS files (e.g. `authController.js`), PascalCase for React components (e.g. `BookCard.jsx`).
- Variables and functions: camelCase.
- Constants: UPPER_SNAKE_CASE (e.g. `JWT_SECRET`).
- MongoDB collections: lowercase plural (handled automatically by Mongoose).

## Async / Await
- Always use `async/await` instead of `.then()/.catch()` chains.
- Wrap every async controller function in a try/catch block.

## Error Handling
- All errors must be passed to `next(err)` in Express controllers.
- The global `errorHandler.js` middleware sends the standard error response.
- Standard error response format:
  ```json
  { "success": false, "message": "Description of the problem" }
  ```
- Use correct HTTP status codes: 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error).

## REST Response Format
- Success responses:
  ```json
  { "success": true, "data": <payload> }
  ```
- For lists, include a `count` field:
  ```json
  { "success": true, "count": 5, "data": [...] }
  ```

## Security
- Never store plain-text passwords — always hash with bcryptjs (salt rounds: 10).
- Keep `MONGO_URI` and `JWT_SECRET` in `.env`; add `.env` to `.gitignore`.
- Set JWT expiry to `7d`.
- Verify JWT on every protected route via `authMiddleware.js`.
- Check book ownership before update/delete: `book.user.toString() === req.user.id`.
- Validate all incoming request data on the server using express-validator.

## Frontend
- Use React functional components and hooks only — no class components.
- Store the JWT in localStorage under the key `token`.
- Attach the token to every API request via an Axios request interceptor in `services/api.js`.
- Use `AuthContext` for global auth state (user, token, login, logout).
- Redirect unauthenticated users to `/login` using a `ProtectedRoute` wrapper.
