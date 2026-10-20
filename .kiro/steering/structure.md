# Project Folder Structure

```
book-management-system/
  .kiro/
    specs/
    steering/
  client/                          (React + Vite frontend — the entire app)
    src/
      firebase.js                  (Firebase app init — exports auth and db)
      components/
        BookCard.jsx
        BookForm.jsx
        Navbar.jsx
        ProtectedRoute.jsx
        SearchBar.jsx
      pages/
        Login.jsx
        Register.jsx
        Dashboard.jsx
        AddBook.jsx
        EditBook.jsx
      context/
        AuthContext.jsx            (Firebase Auth state)
      services/
        bookService.js             (All Firestore operations)
    App.jsx
    main.jsx
    index.css
    package.json
    .env                           (VITE_FIREBASE_* keys — never commit)
    .env.example
  firestore.rules                  (Firestore security rules)
  firebase.json                    (Firebase Hosting config)
  .firebaserc                      (Firebase project alias)
  README.md
```

## Rules
- There is no /server folder. All backend logic lives in Firebase.
- All Firestore calls go through client/src/services/bookService.js.
- Firebase config is read from environment variables via import.meta.env.
