import React from "react";

export default function Header({ subtitle }) {
  return (
    <div className="header">
      <div>
        <h1>📚 Books Dashboard</h1>
        <div className="lead">{subtitle}</div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div style={{ color: "#6b7280", fontSize: 13 }}>Data source: Google Books API</div>
        <div style={{ marginTop: 6 }}>
          <a href="https://developers.google.com/books" target="_blank" rel="noreferrer">developers.google.com/books</a>
        </div>
      </div>
    </div>
  );
}
