import { useState, useEffect } from "react";
import { fench } from "../../services/fench"; // هوک یا فانکشن fetch خودت
import MovieCard from "../movies/MovieCard";
import { useMovieDB } from "../../hooks/useMovieDB";

export default function TopRated() {
	const [activeTab, setActiveTab] = useState("movie"); // movie | tv
	const { data, loading } = useMovieDB(`${activeTab}/top_rated`);

	const moviesOrTvData = data?.results || [];

	
	return (
		<div className="container mx-auto px-6 py-8 pt-35">
			{/* دکمه‌های بالای صفحه */}
			<div className="flex gap-4 mb-6 justify-center">
				<button
					onClick={() => setActiveTab("movie")}
					className={`px-4 py-2 rounded font-semibold transition ${
						activeTab === "movie"
							? "bg-yellow-400 text-black"
							: "bg-zinc-800 text-white hover:bg-zinc-700"
					}`}
				>
					Movies
				</button>
				<button
					onClick={() => setActiveTab("tv")}
					className={`px-4 py-2 rounded font-semibold transition ${
						activeTab === "tv"
							? "bg-yellow-400 text-black"
							: "bg-zinc-800 text-white hover:bg-zinc-700"
					}`}
				>
					TV Shows
				</button>
			</div>

			{/* لیست */}
			{loading ? (
				<p className="text-white">Loading...</p>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
					{moviesOrTvData.map((item) => (
						<MovieCard
							key={item.id}
							movie={item}
							type={activeTab} // برای لینک درست (movie/tv)
						/>
					))}
				</div>
			)}
		</div>
	);
}
