// BookCard.jsx — styling update, all logic unchanged

import { useState } from 'react';
import { Link } from 'react-router-dom';

// Styled delete-confirm modal (replaces browser alert — same logic)
const DeleteModal = ({ title, onConfirm, onCancel }) => (
  <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div className="modal">
      <h3 id="modal-title">Delete this book?</h3>
      <p>
        <strong>"{title}"</strong> will be permanently removed from your library.
        This action cannot be undone.
      </p>
      <div className="modal-actions">
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-sm" style={{ background: 'var(--danger)', color: '#fff' }} onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

const BookCard = ({ book, onDelete, onToggleStatus }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => setShowModal(true);
  const handleConfirm     = () => { setShowModal(false); onDelete(book.id); };
  const handleCancel      = () => setShowModal(false);

  const isRead = book.status === 'Read';

  return (
    <>
      {/* The is-read class controls the left strip color */}
      <article className={`book-card ${isRead ? 'is-read' : ''}`}>
        <h3>{book.title}</h3>
        <p className="book-author">by {book.author}</p>

        {book.category && (
          <span className="book-category">{book.category}</span>
        )}

        {book.description && (
          <p className="book-description">{book.description}</p>
        )}

        <span className={`book-status ${isRead ? 'read' : 'not-read'}`}>
          {book.status}
        </span>

        <div className="book-actions">
          <button
            className={`btn btn-sm ${isRead ? 'btn-warning' : 'btn-success'}`}
            onClick={() => onToggleStatus(book.id, book.status)}
            aria-label={`Mark as ${isRead ? 'Not Read' : 'Read'}`}
          >
            {isRead ? 'Mark Not Read' : 'Mark Read'}
          </button>

          <Link
            to={`/edit-book/${book.id}`}
            className="btn btn-secondary btn-sm"
            aria-label={`Edit ${book.title}`}
          >
            Edit
          </Link>

          <button
            className="btn btn-danger btn-sm"
            onClick={handleDeleteClick}
            aria-label={`Delete ${book.title}`}
          >
            Delete
          </button>
        </div>
      </article>

      {showModal && (
        <DeleteModal
          title={book.title}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default BookCard;
