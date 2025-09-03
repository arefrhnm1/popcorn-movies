import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, type='movie' }) {
	return (
		<Link to={`/${type === "movie" ? 'movies' : 'tv'}/${movie.id}`}>
			<div className="bg-yellow-300 aspec t-[2/3] relative rounded overflow-hidden">
				<img
					src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
					alt=""
					className="object-cover w-full h-full"
				/>
				<div className="p-8 text-white bg-gradient-to-b to-yellow-800/50 flex shadow-md flex-col justify-end absolute bottom-0 left-0 w-full h-full hover:to-yellow-800/70">
					<h3>{movie.title || movie.name}</h3>
					<div className="flex gap-2 mt-2 ">
						<span className="text-yellow-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-star-fill"
								viewBox="0 0 16 16"
							>
								<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
							</svg>
						</span>
						<span>
							{parseFloat(movie.vote_average).toFixed(1)} / 10
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
