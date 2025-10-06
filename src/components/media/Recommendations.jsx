// src/components/media/Recommendations.jsx
import React from "react";
import MovieCard from "../movies/MovieCard";

export default function Recommendations({ items = [] }) {
  if (!items.length) return null;
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">You might also like</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.slice(0, 12).map(item => (
          <MovieCard key={item.id} movie={item} type={item.media_type || "movie"} />
        ))}
      </div>
    </section>
  );
}
