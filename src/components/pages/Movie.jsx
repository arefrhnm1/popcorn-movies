import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Movie() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);

	async function loadMovie() {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}?api_key=23815a8126ebea2361be84d5f37a213d`
		);
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
				</div>
			) : (
				<h1>loading...</h1>
			)}
		</div>
	);
}
