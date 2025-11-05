import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Books Dashboard</h1>
          <div className="lead">Simple dashboard using Google Books API — no extra libraries</div>
        </div>

        <nav>
          <Link to="/" style={{ marginRight: 12 }}>Dashboard</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
