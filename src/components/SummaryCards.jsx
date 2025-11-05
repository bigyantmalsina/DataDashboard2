import React from "react";

export default function SummaryCards({ stats }) {
  return (
    <div className="cards" role="region" aria-label="summary statistics">
      <div className="card">
        <div className="label">Total books</div>
        <div className="value">{stats.total}</div>
      </div>

      <div className="card">
        <div className="label">Average pages</div>
        <div className="value">{stats.avgPages}</div>
      </div>

      <div className="card">
        <div className="label">Top category</div>
        <div className="value">{stats.topCategory}</div>
        <div className="small">{stats.topCount} books • {stats.topPercent}%</div>
      </div>
    </div>
  );
}
