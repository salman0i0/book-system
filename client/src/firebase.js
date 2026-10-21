// firebase.js
// Initializes the Firebase app and exports the auth and db objects
// that the rest of the app uses.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config — values from Firebase Console > Project Settings > Your app
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || "AIzaSyDoes9vL0KqAZasMPkrJTHFc9qRy_Dx6TE",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || "book-management-9afc4.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || "book-management-9afc4",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || "book-management-9afc4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "645669043340",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || "1:645669043340:web:05a946ad034a37900b8fa9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication instance
export const auth = getAuth(app);

// Firestore database instance
export const db = getFirestore(app);
