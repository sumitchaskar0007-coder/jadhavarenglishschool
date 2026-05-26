// src/components/ReviewList.jsx
import React from 'react';

export default function ReviewList({ reviews = [] }) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="text-gray-500 italic">No reviews available yet.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map(r => (
        <div key={r._id} className="bg-white rounded-2xl p-4 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold">{r.name}</h4>
              <div className="text-xs text-gray-500">{r.relation} • {new Date(r.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="text-sm font-bold">{r.rating} / 5</div>
          </div>
          <p className="text-gray-700">{r.message}</p>
        </div>
      ))}
    </div>
  );
}
