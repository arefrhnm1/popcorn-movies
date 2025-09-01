import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { fench } from "../../services/fench";

export default function Movie() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const { user, session } = useContext(UserContext);

	async function handleAddToWatchList() {
		const result = await fench.post(`$account/${user.id}/favorite`, {
			media_type: "movie",
			media_id: movie.id,
			favorite: true,
		});
		toast.success(`${movie.title} has been added to your favorites.`);
	}

	async function loadMovie() {
		const { data } = await fench.get(`movie/${id}`);
		setMovie(data);
	}

	useEffect(() => {
		loadMovie();
	}, [id]);

	return (
		<div>
			{movie ? (
				<div>
					<h1>{movie.title}</h1>
					<img
						src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
						alt={movie.title}
					/>
					<button
						className="p-4 bg-white rounded "
						onClick={handleAddToWatchList}
					>
						Add to watch List!
					</button>
				</div>
			) : (
				<h1>loading...</h1>
			)}
		</div>
	);
}
