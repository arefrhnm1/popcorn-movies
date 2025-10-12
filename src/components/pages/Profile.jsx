import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Watchlist from "../WatchList";
import FavoriteMovies from "../FavoritesMovies";
import { LogOutIcon } from "lucide-react";

export default function Profile() {
  const { user, logout } = useContext(UserContext);

  if (!user)
    return <p className="text-white text-center mt-30">Please log in to view your profile.</p>;

  return (
    <div className="container mx-auto p-6 text-white mt-30">
      {/* User info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
        <img
          src={`https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=200`}
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-yellow-400"
        />
        <div className=" bg-zinc-800/60 relative border  p-7 rounded-xl border-white/30 backdrop-blur-xs">
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <button
            onClick={logout}
            className="bg-yellow-400 text-black absolute -bottom-5 -right-10 items-center flex gap-2 rounded-xl px-2 py-1"
          >
            Logout
            <LogOutIcon size={16}/>
          </button>
        </div>
      </div>

      {/* Sections */}
      <Watchlist />
      <FavoriteMovies />
    </div>
  );
}
