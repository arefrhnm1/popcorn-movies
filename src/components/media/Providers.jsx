// src/components/media/Providers.jsx
import React from "react";

export default function Providers({ providers }) {
  // providers structure: { results: { US: { flatrate: [..], rent:[..], buy:[..] } } }
  const vp = providers?.results || {};
  const country = Object.keys(vp)[0]; // show first available country (or choose user's locale)
  const items = country ? (vp[country].flatrate || vp[country].buy || vp[country].rent || []) : [];

  if (!items || !items.length) return null;

  return (
    <div className="bg-zinc-900 p-4 rounded">
      <h4 className="font-semibold mb-2">Where to watch</h4>
      <div className="flex gap-3 items-center">
        {items.map(p => (
          <div key={p.provider_id} className="w-12 h-8">
            <img src={`https://image.tmdb.org/t/p/w92${p.logo_path}`} alt={p.provider_name} className="w-full h-full object-contain"/>
          </div>
        ))}
      </div>
    </div>
  );
}
