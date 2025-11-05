import React from "react";

export default function BookRow({ book }) {
  const year = book.publishedDate ? ("" + book.publishedDate).slice(0,4) : "N/A";
  return (
    <div className="row" role="listitem" aria-label={book.title}>
      <div className="left">
        <div className="title">{book.title}</div>
        <div className="meta">{book.authors.join(", ")}</div>
        <div className="small">Published: {year} • Pages: {book.pageCount || "N/A"}</div>
        {book.categories && book.categories.length > 0 && (
          <div className="small">Categories: {book.categories.slice(0,4).join(", ")}</div>
        )}
      </div>

      <div style={{ minWidth:120, textAlign:"right" }}>
        {book.thumbnail ? (
          <a href={book.infoLink} target="_blank" rel="noreferrer">
            <img src={book.thumbnail} alt={`${book.title} cover`} style={{ width:80, borderRadius:4 }} />
          </a>
        ) : (
          <div className="small">No cover</div>
        )}
      </div>
    </div>
  );
}
