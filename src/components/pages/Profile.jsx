import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Watchlist from "../WatchList";
import FavoriteMovies from "../FavoritesMovies";

export default function Profile() {
  const { user, logout } = useContext(UserContext);

  if (!user)
    return <p className="text-white text-center mt-10">Please log in to view your profile.</p>;

  return (
    <div className="container mx-auto p-6 text-white">
      {/* User info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
        <img
          src={`https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=200`}
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-yellow-400"
        />
        <div>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <button
            onClick={logout}
            className="mt-2 text-sm bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-1 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sections */}
      <Watchlist />
      <FavoriteMovies />
    </div>
  );
}
