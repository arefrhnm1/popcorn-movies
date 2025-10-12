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
			<div className="flex mb-10 justify-center gap-5 [&>*]:cursor-pointer [&>*]:px-2 [&>*]:py-1">
				<button
					onClick={() => setActiveTab("movie")}
					className={`${
						activeTab === "movie"
							? "bg-zinc-800/60 backdrop-blur-xs border border-white/30 text-white rounded-xl"
							: "text-white border border-transparent"
					}`}
				>
					Movies
				</button>
				<button
					onClick={() => setActiveTab("tv")}
					className={`${
						activeTab === "tv"
							? "bg-zinc-800/60 backdrop-blur-xs border border-white/30 text-white rounded-xl"
							: "text-white border border-transparent"
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
