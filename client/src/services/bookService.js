// bookService.js
// All Firestore database operations for books.
// Every function is scoped to the logged-in user's uid so users
// can only see and change their own books.

import {
  collection,      // reference to a Firestore collection
  addDoc,          // add a new document (auto-generates ID)
  getDocs,         // fetch multiple documents
  doc,             // reference to a single document by ID
  updateDoc,       // update fields in a document
  deleteDoc,       // delete a document
  query,           // build a query
  where,           // filter: field == value
  serverTimestamp, // let Firestore set the timestamp (avoids clock issues)
} from 'firebase/firestore';
import { db } from '../firebase';

// The name of our Firestore collection
const BOOKS_COLLECTION = 'books';

// ─── Add a new book ───────────────────────────────────────────────────────────
// book: { title, author, category, description, status }
// uid:  the logged-in user's Firebase uid
export const addBook = async (book, uid) => {
  await addDoc(collection(db, BOOKS_COLLECTION), {
    ...book,
    userId: uid,           // link book to this user
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// ─── Get all books for a user ─────────────────────────────────────────────────
// Returns an array of book objects, each with an `id` field.
// Note: we sort in JavaScript instead of Firestore to avoid needing
// a composite index (userId + createdAt) which requires manual setup.
export const getBooks = async (uid) => {
  // Query: only books belonging to this user
  const q = query(
    collection(db, BOOKS_COLLECTION),
    where('userId', '==', uid)
  );

  const snapshot = await getDocs(q);

  const books = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));

  // Sort newest first in JavaScript (no composite index needed)
  books.sort((a, b) => {
    const timeA = a.createdAt?.seconds ?? 0;
    const timeB = b.createdAt?.seconds ?? 0;
    return timeB - timeA;
  });

  return books;
};

// ─── Update a book ────────────────────────────────────────────────────────────
// id:   Firestore document ID
// data: fields to update (e.g. { title, author, category, description, status })
export const updateBook = async (id, data) => {
  const bookRef = doc(db, BOOKS_COLLECTION, id);
  await updateDoc(bookRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// ─── Delete a book ────────────────────────────────────────────────────────────
export const deleteBook = async (id) => {
  const bookRef = doc(db, BOOKS_COLLECTION, id);
  await deleteDoc(bookRef);
};

// ─── Toggle Read / Not Read status ───────────────────────────────────────────
export const toggleStatus = async (id, currentStatus) => {
  const bookRef = doc(db, BOOKS_COLLECTION, id);
  const newStatus = currentStatus === 'Read' ? 'Not Read' : 'Read';
  await updateDoc(bookRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
  return newStatus;
};
