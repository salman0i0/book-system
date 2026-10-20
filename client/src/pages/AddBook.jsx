// AddBook.jsx
// Form page for adding a new book to Firestore.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addBook } from '../services/bookService';
import BookForm from '../components/BookForm';

const AddBook = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);
    try {
      // Pass the user's uid so the book is linked to this user
      await addBook(formData, user.uid);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-page">
      <h2>Add a New Book</h2>
      <p className="page-subtitle">Fill in the details and save it to your library.</p>

      {error && (
        <div className="alert alert-error" role="alert">{error}</div>
      )}

      <div className="book-form-card">
        <BookForm onSubmit={handleSubmit} loading={loading} submitLabel="Add Book" />
      </div>
    </div>
  );
};

export default AddBook;
