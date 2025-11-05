import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SummaryCards from "../components/SummaryCards";


function SimpleBarChartSVG({ data }) {
  if (!data.length) return <div className="small">No year data</div>;
  const max = Math.max(...data.map(d => d.count), 1);
  const w = 500; const h = 160;
  const padding = 20;
  const barWidth = (w - padding*2) / data.length;
  return (
    <svg className="bar-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="year distribution">
      <g transform={`translate(${padding},0)`}>
        {data.map((d, i) => {
          const barH = (d.count / max) * (h - 40);
          const x = i * barWidth + 2;
          const y = h - barH - 20;
          return (
            <g key={d.year}>
              <rect x={x} y={y} width={barWidth - 6} height={barH} fill="#60a5fa" />
              <text x={x + (barWidth-6)/2} y={h - 6} fontSize="10" textAnchor="middle" fill="#334155">{d.year}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    // fetch once on mount
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=40");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const items = (json.items || []).map(it => {
          const info = it.volumeInfo || {};
          return {
            id: it.id,
            title: info.title || "Untitled",
            authors: info.authors || ["Unknown"],
            publishedDate: info.publishedDate || null,
            pageCount: info.pageCount || 0,
            categories: info.categories || [],
            description: info.description || "",
            thumbnail: info.imageLinks?.thumbnail || null,
            infoLink: info.infoLink || null
          };
        });
        setBooks(items);
      } catch (err) {
        setError(err.message || "Fetch failed");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const categoryOptions = useMemo(() => {
    const count = {};
    books.forEach(b => (b.categories || []).forEach(c => { count[c] = (count[c]||0) + 1; }));
    return ["all", ...Object.keys(count).slice(0,25)];
  }, [books]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return books.filter(b => {
      const matchesSearch = q === "" ||
        (b.title && b.title.toLowerCase().includes(q)) ||
        b.authors.some(a => a.toLowerCase().includes(q));
      const matchesCat = categoryFilter === "all" || (b.categories || []).includes(categoryFilter);
      return matchesSearch && matchesCat;
    });
  }, [books, search, categoryFilter]);

  const stats = useMemo(() => {
    const total = books.length;
    const sumPages = books.reduce((s,b) => s + (b.pageCount || 0), 0);
    const avgPages = total ? Math.round((sumPages/total)) : 0;
    const catCount = {};
    books.forEach(b => (b.categories || []).forEach(c => catCount[c] = (catCount[c] || 0) + 1));
    const topEntry = Object.entries(catCount).sort((a,b) => b[1] - a[1])[0];
    const topCategory = topEntry ? topEntry[0] : "N/A";
    const topCount = topEntry ? topEntry[1] : 0;
    const topPercent = total ? Math.round((topCount/total) * 100) : 0;
    return { total, avgPages, topCategory, topCount, topPercent };
  }, [books]);


  const topCategories = useMemo(() => {
    const count = {};
    books.forEach(b => (b.categories || []).forEach(c => count[c] = (count[c]||0) + 1));
    return Object.entries(count).sort((a,b) => b[1] - a[1]).slice(0,6).map(([name, value]) => ({ name, value }));
  }, [books]);

  const yearsData = useMemo(() => {
    const years = {};
    books.forEach(b => {
      const y = b.publishedDate ? ("" + b.publishedDate).slice(0,4) : null;
      if (y && /^\d{4}$/.test(y)) years[y] = (years[y]||0) + 1;
    });
    return Object.entries(years).sort((a,b) => a[0] - b[0]).map(([year,count]) => ({ year, count }));
  }, [books]);

  return (
    <div>
      <SummaryCards stats={stats} />

      <section style={{ marginBottom:12 }}>
        <div className="controls" style={{ marginBottom:12 }}>
          <input
            type="text"
            placeholder="Search title or author..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={() => { setSearch(""); setCategoryFilter("all"); }}>Reset</button>
        </div>

        <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:12 }}>
          <div style={{ minWidth:260, maxWidth:420, background:"#fff", padding:12, borderRadius:8, border:"1px solid var(--border)" }}>
            <div style={{ fontSize:13, color:"var(--muted)", marginBottom:8 }}>Top categories</div>
            {/* simple horizontal bars built from data (easy to read) */}
            {topCategories.length === 0 && <div className="small">No category data</div>}
            {topCategories.map((c, idx) => {
              const max = Math.max(...topCategories.map(t => t.value), 1);
              const pct = Math.round((c.value / max) * 100);
              return (
                <div className="hbar" key={c.name}>
                  <div className="label" style={{ width:140 }}>{c.name}</div>
                  <div className="bar" style={{ width: `${pct}%`, maxWidth: 220 }} />
                  <div className="small" style={{ width:40, textAlign:"right" }}>{c.value}</div>
                </div>
              );
            })}
          </div>

          <div style={{ minWidth:260 }}>
            <div style={{ fontSize:13, color:"var(--muted)", marginBottom:8 }}>Publication years</div>
            <SimpleBarChartSVG data={yearsData} />
          </div>
        </div>
      </section>

      <section>
        {loading && <div>Loading books...</div>}
        {error && <div style={{ color:"red" }}>{error}</div>}

        {!loading && !error && (
          <>
            <div style={{ marginBottom:8, color:"var(--muted)" }}>
              Showing {filtered.length} results (filtered) — original {books.length}
            </div>

            <div className="list">
              {filtered.map(b => (
                <Link key={b.id} to={`/books/${encodeURIComponent(b.id)}`} style={{ textDecoration:"none", color:"inherit" }}>
                  <div className="row">
                    <div className="left">
                      <div className="title">{b.title}</div>
                      <div className="meta">{b.authors.join(", ")}</div>
                      <div className="small">{b.publishedDate ? ("Published: " + b.publishedDate) : "Year N/A"}</div>
                    </div>
                    <div style={{ minWidth:120, textAlign:"right" }}>
                      {b.thumbnail ? <img src={b.thumbnail} alt="" style={{ width:80, borderRadius:4 }} /> : <div className="small">No cover</div>}
                      <div className="small" style={{ marginTop:6 }}>{(b.categories||[]).slice(0,3).join(", ")}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
