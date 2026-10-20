// EditBook.jsx
// Form page for editing an existing book in Firestore.
// Loads the book data from Firestore by document ID (from the URL).

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { updateBook } from '../services/bookService';
import { useAuth } from '../context/AuthContext';
import BookForm from '../components/BookForm';

const EditBook = () => {
  const { id } = useParams();      // Firestore document ID from the URL
  const { user } = useAuth();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');

  // Load the book from Firestore when the page opens
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookRef = doc(db, 'books', id);
        const bookSnap = await getDoc(bookRef);

        if (!bookSnap.exists()) {
          setError('Book not found.');
          return;
        }

        const data = bookSnap.data();

        // Make sure this book belongs to the current user
        if (data.userId !== user.uid) {
          setError('You are not authorized to edit this book.');
          return;
        }

        setBook({ id: bookSnap.id, ...data });
      } catch (err) {
        console.error(err);
        setError('Failed to load book.');
      } finally {
        setFetchLoading(false);
      }
    };

    if (user) fetchBook();
  }, [id, user]);

  const handleSubmit = async (formData) => {
    setError('');
    setSaveLoading(true);
    try {
      await updateBook(id, formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  if (fetchLoading) return <div className="loading">Loading book...</div>;

  return (
    <div className="book-form-page">
      <h2>Edit Book</h2>
      <p className="page-subtitle">Update the details for this book.</p>

      {error && (
        <div className="alert alert-error" role="alert">{error}</div>
      )}

      {book && (
        <div className="book-form-card">
          <BookForm
            initialData={book}
            onSubmit={handleSubmit}
            loading={saveLoading}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </div>
  );
};

export default EditBook;
