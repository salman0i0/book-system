// Dashboard.jsx — no logic changes, styling improvements only

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBooks, deleteBook, toggleStatus } from '../services/bookService';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

// Skeleton placeholder while books are loading
const SkeletonGrid = () => (
  <div className="books-grid">
    {[1, 2, 3, 4, 5, 6].map((n) => (
      <div key={n} className="skeleton-card">
        <div className="skeleton-line h-title" />
        <div className="skeleton-line h-author" />
        <div className="skeleton-line h-desc" />
        <div className="skeleton-line h-desc2" />
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();

  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const books = await getBooks(user.uid);
        setAllBooks(books);
      } catch (err) {
        console.error(err);
        setError('Failed to load books. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBooks();
  }, [user]);

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const term = search.toLowerCase();
      const matchesSearch =
        !search ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term);
      const matchesCategory = !category || book.category === category;
      const matchesStatus   = !status   || book.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [allBooks, search, category, status]);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setAllBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete book.');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = await toggleStatus(id, currentStatus);
      setAllBooks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update status.');
    }
  };

  const readCount    = allBooks.filter((b) => b.status === 'Read').length;
  const notReadCount = allBooks.filter((b) => b.status === 'Not Read').length;
  const hasFilters   = search || category || status;

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setStatus('');
  };

  return (
    <main className="container dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-text">
          <h1>Your Library</h1>
          <p className="subtitle">
            {user?.displayName
              ? `Welcome back, ${user.displayName}.`
              : 'Manage and track your personal book collection.'}
          </p>
        </div>
        <Link to="/add-book" className="btn btn-primary">+ Add Book</Link>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{allBooks.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{readCount}</div>
          <div className="stat-label">Read</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{notReadCount}</div>
          <div className="stat-label">Not Read</div>
        </div>
      </div>

      {/* Search & Filters */}
      <SearchBar
        search={search}     setSearch={setSearch}
        category={category} setCategory={setCategory}
        status={status}     setStatus={setStatus}
      />

      {error && (
        <div className="alert alert-error" role="alert">{error}</div>
      )}

      {loading ? (
        <SkeletonGrid />
      ) : filteredBooks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-emoji">{hasFilters ? '🔍' : '📚'}</span>
          <h3>{hasFilters ? 'No books match your search.' : 'Your shelf is empty.'}</h3>
          <p>
            {hasFilters
              ? 'Try adjusting your filters or search term.'
              : 'Start building your library by adding your first book.'}
          </p>
          {hasFilters ? (
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear filters
            </button>
          ) : (
            <Link to="/add-book" className="btn btn-primary">Add your first book</Link>
          )}
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
