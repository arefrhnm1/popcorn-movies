// src/components/media/MediaHero.jsx
import React from "react";
import MediaActions from "./MediaActions";

export default function MediaHero({ data, type }) {
  console.log(data);
  
	const backdrop = data.backdrop_path;
	const poster = data.poster_path;
	return (
		<header className="relative h-[65vh] overflow-hidden pb-15">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage: backdrop
						? `url(https://image.tmdb.org/t/p/original${backdrop})`
						: "none",
				}}
			/>
			<div className="absolute inset-0 bg-black/60" />
			<div className="container mx-auto px-4 h-full relative z-10 flex items-end">
				<div className="flex flex-col gap-6">
					<div className="flex gap-2">
						<img
							src={
								poster
									? `https://image.tmdb.org/t/p/w342${poster}`
									: "/fallback-poster.jpg"
							}
							alt={data.title || data.name}
							className="w-44 aspect-[2/3] object-contain rounded shadow-lg"
						/>
						<div className="text-white max-w-3xl">
							<h1 className="text-2xl md:text-4xl font-bold">
								{data.title || data.name}{" "}
								<span className="text-gray-300 text-sm">
									(
									{(
										data.release_date ||
										data.first_air_date ||
										""
									).slice(0, 4)}
									)
								</span>
							</h1>
							<div className="mt-2 text-sm line-clamp-9 text-gray-300">
								{data.overview}
                
							</div>
							<div className="mt-4 flex items-center gap-4">
								<div className="text-yellow-400 font-semibold">
									{parseFloat(data.vote_average).toFixed(1)} /
									10
								</div>
								<div className="text-sm text-gray-300">
									{data.vote_count} votes
								</div>
							</div>
						</div>

					</div>
						<div className="mt-4">
							<MediaActions data={data} type={type} />
						</div>
				</div>
			</div>
		</header>
	);
}
