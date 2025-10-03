import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, type = "movie" }) {
	const imageUrl = movie.poster_path
		? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
		: "/fallback-poster.jpg";

	return (
		<Link to={`/media/${type === "movie" ? "movie" : "tv"}/${movie.id}`}>
			<div className="relative rounded overflow-hidden aspect-[2/3] bg-gray-800">
				<img
					src={imageUrl}
					alt={movie.title || movie.name || "Poster"}
					className="object-cover w-full h-full"
				/>

				<div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-4 text-white bg-gradient-to-b from-transparent to-black/70 hover:to-black/80 transition-colors">
					<h3 className="text-lg font-semibold">
						{movie.title || movie.name}
					</h3>
					<div className="flex items-center gap-2 mt-2 text-sm">
						<span className="text-yellow-400">⭐</span>
						<span>
							{movie.vote_average
								? `${parseFloat(movie.vote_average).toFixed(1)} / 10`
								: "N/A"}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
