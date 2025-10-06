// src/components/media/CastList.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CastList({ cast = [] }) {
  if (!cast.length) return null;
  return (
    <section>
      <h3 className="text-xl font-semibold mb-3">Top Cast</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {cast.slice(0, 20).map(member => (
          <Link key={member.cast_id || member.credit_id} to={`/people/${member.id}`} className="min-w-[120px] group">
            <div className="w-28 h-36 rounded overflow-hidden bg-zinc-800">
              <img src={member.profile_path ? `https://image.tmdb.org/t/p/w185${member.profile_path}` : "/avatar.jpg"} alt={member.name} className="w-full h-full object-cover"/>
            </div>
            <div className="mt-2 text-sm text-white truncate">{member.name}</div>
            <div className="text-xs text-gray-400 truncate">{member.character}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
