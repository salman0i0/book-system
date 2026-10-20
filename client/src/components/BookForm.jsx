// BookForm.jsx — 2-column grid on desktop, all logic unchanged

import { useState } from 'react';

const CATEGORIES = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology', 'Self-Help', 'Other'];

const BookForm = ({ initialData = {}, onSubmit, loading, submitLabel = 'Save Book' }) => {
  const [form, setForm] = useState({
    title:       initialData.title       || '',
    author:      initialData.author      || '',
    category:    initialData.category    || '',
    description: initialData.description || '',
    status:      initialData.status      || 'Not Read',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* 2-column grid — collapses to 1 column on mobile via CSS */}
      <div className="book-form-grid">

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Book title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            id="author"
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            required
            placeholder="Author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="Not Read">Not Read</option>
            <option value="Read">Read</option>
          </select>
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional — a short note about this book…"
          />
        </div>

      </div>

      <div className="book-form-footer">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Saving…
            </>
          ) : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
