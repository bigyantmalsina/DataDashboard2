import React from "react";
import BookRow from "./BookRow";

export default function BookList({ items }) {
  if (!items.length) return <div style={{ color:"#6b7280" }}>No results match your search/filter.</div>;
  return (
    <div className="list" role="list">
      {items.map(b => <BookRow key={b.id} book={b} />)}
    </div>
  );
}
