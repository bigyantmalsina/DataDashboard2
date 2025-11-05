import React from "react";

export default function Filters({
  searchQuery,
  setSearchQuery,
  categoryOptions,
  categoryFilter,
  setCategoryFilter
}) {
  return (
    <div className="controls" role="search">
      <input
        className="search"
        type="text"
        placeholder="Search title or author..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search books by title or author"
      />

      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} aria-label="Filter by category">
        {categoryOptions.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button onClick={() => { setSearchQuery(""); setCategoryFilter("all"); }}>Reset</button>
    </div>
  );
}
