// src/pages/MediaDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fench } from "../../services/fench";
import { UserContext } from "../../context/UserContext";
import MediaHero from "../media/MediaHero";
import CastList from "../media/CastList";
import Recommendations from "../media/Recommendations";
import Providers from "../media/Providers";

export default function MediaDetail() {
  const { type, id } = useParams(); // type: "movie" | "tv"
  const { user, session } = useContext(UserContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const { data } = await fench.get(`${type}/${id}`, {
          params: {
            append_to_response: "videos,credits,recommendations,similar,images,watch/providers",
            include_image_language: "en,null",
          },
        });
        setData(data);
      } catch (err) {
        console.error("fetch detail error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [type, id]);

  if (loading) return <div className="p-8 text-center text-white">Loading...</div>;
  if (!data) return <div className="p-8 text-center text-white">Not found</div>;

  return (
    <div className="text-white">
      <MediaHero data={data} type={type} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Main column */}
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3">Overview</h3>
              <p className="text-gray-300">{data.overview}</p>
            </section>

            <CastList cast={data.credits?.cast || []} />
            <Recommendations items={data.recommendations?.results || data.similar?.results || []} />
            {/* Reviews could be added similarly by fetching /{type}/{id}/reviews */}
          </div>

          {/* Right column (meta) */}
          <aside className="space-y-6">
            <Providers providers={data["watch/providers"]} />
            <div className="bg-zinc-900 p-4 rounded">
              <h4 className="font-semibold mb-2">Details</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li><strong>Release:</strong> {data.release_date || data.first_air_date}</li>
                <li><strong>Runtime:</strong> {data.runtime ? `${data.runtime} min` : data.episode_run_time?.[0] ? `${data.episode_run_time[0]} min` : "-"}</li>
                <li><strong>Genres:</strong> {data.genres?.map(g => g.name).join(", ")}</li>
                <li><strong>Original Language:</strong> {data.original_language}</li>
                <li><strong>Budget:</strong> {data.budget ? `$${data.budget.toLocaleString()}` : "-"}</li>
                <li><strong>Revenue:</strong> {data.revenue ? `$${data.revenue.toLocaleString()}` : "-"}</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
