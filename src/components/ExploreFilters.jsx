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
    <div className="flex gap-4 items-center overflow-x-auto scrollbar-hide [&>*]:cursor-pointer [&>*]:px-2 [&>*]:py-1">
      {/* Genre */}
      <select
        className="g-zinc-800/60 backdrop-blur-xs border border-white/30 outline-none text-white rounded-xl"
        value={filters.genre}
        onChange={(e) => handleChange("genre", e.target.value)}
      >
        <option style={{ backgroundColor: "#18181b", color: "white" }} value="">All Genres</option>
        {genres.map((g) => (
          <option style={{ backgroundColor: "#18181b", color: "white" }} key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>نص

      {/* Year */}
      <input
        type="number"
        placeholder="Year"
        className="g-zinc-800/60 backdrop-blur-xs border border-white/30 outline-none text-white rounded-xl w-24"
        value={filters.year}
        onChange={(e) => handleChange("year", e.target.value)}
      />

      {/* Min Vote */}
      <input
        type="number"
        placeholder="Min Vote"
        className="g-zinc-800/60 backdrop-blur-xs border border-white/30 outline-none text-white rounded-xl w-24"
        value={filters.minVote}
        onChange={(e) => handleChange("minVote", e.target.value)}
      />

      {/* Language */}
      <input
        type="text"
        placeholder="Lang (e.g. en, fr, fa)"
        className="g-zinc-800/60 backdrop-blur-xs border border-white/30 text-white rounded-xl outline-none w-24"
        value={filters.language}
        onChange={(e) => handleChange("language", e.target.value)}
      />
    </div>
  );
}
