import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { fench } from "../../services/fench";
// import ReactStars from "react-rating-stars-component";

export default function Movie() {
	const [movie, setMovie] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const { id } = useParams();
	const { user, session, favoriteMovies, fetchFavoriteMovies } =
		useContext(UserContext);

	useEffect(() => {
		if (movie && favoriteMovies.length) {
			const favMovie = favoriteMovies.find((f) => f.id === movie?.id);
			setIsFavorite(Boolean(favMovie));
			console.log(favMovie);
		}
	}, [movie, favoriteMovies]);

	async function handleFavorite() {
		if (session) {
			const result = await fench.post(`account/${user.id}/favorite`, {
				media_type: "movie",
				media_id: movie.id,
				favorite: !isFavorite,
			});
			fetchFavoriteMovies();

			toast.success(
				`${movie.title} ${isFavorite ? "removed" : "added"} to your favorites.`
			);
		} else {
			toast.error("Please login!");
		}
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
					{isFavorite ? (
						<button
							className="p-4 bg-white rounded "
							onClick={handleFavorite}
						>
							remove to watch List!
						</button>
					) : (
						<button
							className="p-4 bg-white rounded "
							onClick={handleFavorite}
						>
							Add to watch List!
						</button>
					)}
					{/* <ReactStars
						count={5}
						oncha

					/> */}
				</div>
			) : (
				<h1>loading...</h1>
			)}
		</div>
	);
}
