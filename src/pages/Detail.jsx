import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const info = json.volumeInfo || {};
        setBook({
          id: json.id,
          title: info.title,
          authors: info.authors || [],
          publishedDate: info.publishedDate,
          pageCount: info.pageCount,
          categories: info.categories || [],
          description: info.description || "",
          thumbnail: info.imageLinks?.thumbnail || null,
          infoLink: info.infoLink || null
        });
      } catch (err) {
        setError(err.message || "Fetch failed");
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [id]);

  if (loading) return <div>Loading book details…</div>;
  if (error) return <div style={{ color:"red" }}>Error: {error}</div>;
  if (!book) return <div>Book not found.</div>;

  const year = book.publishedDate ? ("" + book.publishedDate).slice(0,4) : "N/A";

  return (
    <div>
      <div style={{ marginBottom:12 }}>
        <button onClick={() => navigate(-1)} style={{ marginRight:12 }}>← Back</button>
      </div>

      <div style={{ display:"flex", gap:18, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:320 }}>
          <h2 style={{ marginTop:0 }}>{book.title}</h2>
          <div style={{ color:"var(--muted)" }}>{book.authors.join(", ")}</div>
          <div style={{ marginTop:8, color:"var(--muted)" }}>Published: {book.publishedDate || "N/A"} • Pages: {book.pageCount || "N/A"}</div>

          {book.categories && book.categories.length > 0 && (
            <div style={{ marginTop:8 }}>
              <strong>Categories:</strong> {book.categories.join(", ")}
            </div>
          )}

          <div style={{ marginTop:18 }}>
            <h3>Description</h3>
            <div dangerouslySetInnerHTML={{ __html: book.description || "<i>No description available.</i>" }} />
          </div>

          <div style={{ marginTop:18 }}>
            {book.infoLink && <a href={book.infoLink} target="_blank" rel="noreferrer">More on Google Books</a>}
          </div>
        </div>

        <aside style={{ width:260 }}>
          {book.thumbnail ? <img src={book.thumbnail} alt={book.title} style={{ width:"100%", borderRadius:6 }} /> : <div style={{ color:"var(--muted)" }}>No cover</div>}
          <div style={{ marginTop:12, padding:12, borderRadius:8, background:"#fff", border:"1px solid var(--border)" }}>
            <div style={{ fontWeight:700, marginBottom:6 }}>Quick facts</div>
            <div className="small">Pages: {book.pageCount || "N/A"}</div>
            <div className="small">Year: {year}</div>
            <div className="small">Categories: {(book.categories||[]).slice(0,3).join(", ") || "—"}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
