import React from "react";

export default function ExploreTabs({ tab, setTab, setPage }) {
  const handleClick = (type) => {
    setTab(type);
    setPage(1); // reset pagination
  };

  return (
    <div className="flex justify-center gap-6 [&>*]:cursor-pointer [&>*]:px-2 [&>*]:py-1">
      <button
        className={` ${
          tab === "movie" ? "g-zinc-800/60 backdrop-blur-xs border border-white/30 text-white rounded-xl" : "text-white border border-transparent"
        }`}
        onClick={() => handleClick("movie")}
      >
        Movies
      </button>
      <button
        className={` ${
          tab === "tv" ? "g-zinc-800/60 backdrop-blur-xs border border-white/30 text-white rounded-xl" : "text-white border border-transparent"
        }`}
        onClick={() => handleClick("tv")}
      >
        TV Shows
      </button>
    </div>
  );
}
