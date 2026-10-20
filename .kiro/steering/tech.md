# Tech Stack

## Rule: JavaScript Only
All code must be written in JavaScript (ES6+). Do NOT use TypeScript.

## Frontend
- Library: React.js (with JSX)
- Build tool: Vite
- Routing: React Router v6
- State management: React Hooks (useState, useEffect, useMemo) + Context API

## Backend — Firebase (no Express or Node.js server)
- Authentication: Firebase Authentication (Email/Password)
- Database: Cloud Firestore
- Hosting: Firebase Hosting
- SDK: Firebase JavaScript SDK v10 (modular / tree-shakeable imports)

## There is NO Express server, NO MongoDB, NO Mongoose, NO JWT, NO Axios.
All backend functionality is handled by the Firebase SDK directly from the React app.

## Tools
- IDE: Kiro AI
- Version control: Git + GitHub
- Firebase CLI: firebase-tools (for deploying)
- Database hosting: Cloud Firestore (Firebase)
- Frontend hosting: Firebase Hosting
