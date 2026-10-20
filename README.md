# Book Management System

A full-stack web application built with **React + Firebase** that lets users organize their personal book collection.

**Internship:** Muhammad Salman | ID: ZYNVEX-CERT-1858 | Zynvex Solutions — Batch 4

---

## Features

- Register and login with email and password (Firebase Auth)
- Add, view, edit, and delete books (Firestore)
- Search by title or author (client-side)
- Filter by category and Read / Not Read status
- Toggle each book's Read / Not Read status
- Each user sees only their own books (Firestore security rules)
- Responsive UI (mobile, tablet, desktop)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite, React Router |
| Authentication | Firebase Authentication (Email/Password) |
| Database | Cloud Firestore |
| Hosting | Firebase Hosting |

> There is no Express server or MongoDB. All backend functionality is handled by the Firebase SDK.

---

## Local Setup

### 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Sign-in method → **Email/Password**
4. Enable **Firestore Database** → Start in **test mode** (update rules before deploying)
5. Go to Project Settings → Your apps → Add a **Web app** → copy the config object

### 2. Configure environment variables

Open `client/.env` and paste your Firebase config values:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Install dependencies and run

```bash
cd client
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

---

## Firestore Security Rules

Copy the contents of `firestore.rules` into your Firebase Console:
**Firestore → Rules → Edit rules → Publish**

---

## Deployment (Firebase Hosting)

```bash
# Install Firebase CLI (once)
npm install -g firebase-tools

# Login
firebase login

# Build the React app
cd client && npm run build

# Deploy
cd ..
firebase deploy
```

Update `.firebaserc` with your real Firebase project ID before deploying.

---

## Live Link

_Add your Firebase Hosting URL here after deployment._
