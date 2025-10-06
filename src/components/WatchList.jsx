import React, { useEffect, useState, useContext } from "react";
import MovieCard from "../components/movies/MovieCard";
import { getWatchlist, toggleWatchlist } from "../services/account";
import { UserContext } from "../context/UserContext";

export default function Watchlist() {
  const { user, session } = useContext(UserContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchWatchlist() {
    const { data } = await getWatchlist(user.id);
    setWatchlist(data.results);
    setLoading(false);
  }

  useEffect(() => {
    if (user) fetchWatchlist();
  }, [user]);

  const removeFromWatchlist = async (movieId) => {
    await toggleWatchlist(user.id, movieId, "movie", false);
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  if (loading) return <p className="text-white text-center">Loading Watchlist...</p>;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-400">No movies in your watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="absolute top-2 right-2 bg-black/60 text-yellow-400 px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
