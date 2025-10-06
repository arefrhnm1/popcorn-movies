import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/movies/MovieCard";
import { fench } from "../services/fench";
import { UserContext } from "../context/UserContext";

export default function FavoriteMovies() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchFavorites() {
    const { data } = await fench.get(`account/${user.id}/favorite/movies`);
    setFavorites(data.results);
    setLoading(false);
  }

  useEffect(() => {
    if (user) fetchFavorites();
  }, [user]);

  if (loading) return <p className="text-white text-center">Loading Favorites...</p>;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">My Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
