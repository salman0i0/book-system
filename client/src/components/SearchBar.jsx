// SearchBar.jsx — search icon added, selects styled, logic unchanged

const CATEGORIES = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology', 'Self-Help', 'Other'];

const SearchBar = ({ search, setSearch, category, setCategory, status, setStatus }) => {
  return (
    <div className="search-filter-bar">
      {/* Search input with icon */}
      <div className="search-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          placeholder="Search by title or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search books"
        />
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        aria-label="Filter by status"
      >
        <option value="">All Statuses</option>
        <option value="Read">Read</option>
        <option value="Not Read">Not Read</option>
      </select>
    </div>
  );
};

export default SearchBar;
