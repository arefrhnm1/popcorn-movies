import React from "react";

export default function ExploreTabs({ tab, setTab, setPage }) {
  const handleClick = (type) => {
    setTab(type);
    setPage(1); // reset pagination
  };

  return (
    <div className="flex gap-4 mb-6 mt-10">
      <button
        className={`px-4 py-2 rounded font-semibold ${
          tab === "movie" ? "bg-yellow-500 text-black" : "bg-gray-800"
        }`}
        onClick={() => handleClick("movie")}
      >
        Movies
      </button>
      <button
        className={`px-4 py-2 rounded font-semibold ${
          tab === "tv" ? "bg-yellow-500 text-black" : "bg-gray-800"
        }`}
        onClick={() => handleClick("tv")}
      >
        TV Shows
      </button>
    </div>
  );
}
