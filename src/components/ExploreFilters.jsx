import React, { useEffect, useState } from "react";
import { fench } from "../services/fench";

export default function ExploreFilters({ tab, filters, setFilters, setPage }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data } = await fench(`genre/${tab}/list`);
        setGenres(data.genres);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    }
    fetchGenres();
  }, [tab]);

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      {/* Genre */}
      <select
        className="bg-gray-800 px-3 py-2 rounded"
        value={filters.genre}
        onChange={(e) => handleChange("genre", e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      {/* Year */}
      <input
        type="number"
        placeholder="Year"
        className="bg-gray-800 px-3 py-2 rounded w-24"
        value={filters.year}
        onChange={(e) => handleChange("year", e.target.value)}
      />

      {/* Min Vote */}
      <input
        type="number"
        placeholder="Min Vote"
        className="bg-gray-800 px-3 py-2 rounded w-24"
        value={filters.minVote}
        onChange={(e) => handleChange("minVote", e.target.value)}
      />

      {/* Language */}
      <input
        type="text"
        placeholder="Lang (e.g. en, fr, fa)"
        className="bg-gray-800 px-3 py-2 rounded w-24"
        value={filters.language}
        onChange={(e) => handleChange("language", e.target.value)}
      />
    </div>
  );
}
