import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { fench } from "../../services/fench";
import ReactStars from "react-rating-stars-component";
import { useMovieDB } from "../../hooks/useMovieDB";
import Title from "../Title";

export default function MediaDetail() {
	const { type, id } = useParams();
	const {data: movie, loading} = useMovieDB(`${type}/${id}`);

	const [isFavorite, setIsFavorite] = useState(false);
	const { user, session, favoriteMovies, fetchFavoriteMovies } =
		useContext(UserContext);

	useEffect(() => {
		if (movie && favoriteMovies.length) {
			const favMovie = favoriteMovies.find((f) => f.id === movie?.id);
			setIsFavorite(Boolean(favMovie));
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

	async function ratingChanged(rate) {
		await fench.post(`movie/${movie.id}/rating`, {
			value: rate * 2,
		});
		toast.success(`Your vote is submitted.`);
        
	}

	return (
		<div className="pt-52">
			<Title>{movie?.title || movie?.name || "Loading..."}</Title>
			{movie ? (
				<div>
					<h1>{movie.title || movie.name}</h1>
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
					<div className="grid grid-cols-4 border-t-2 text-yellow-300 border-yellow-800 border-b-2 mt-8">
						<div className="col-span-1 flex items-center gap-4 border-r-2 border-yellow-800">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-9 text-yellow-"
							>
								<path
									fillRule="evenodd"
									d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="flex flex-col">
								<div>{parseInt(movie.vote_average)} / 10</div>
								<div>{movie.vote_count} reviews</div>
							</div>
						</div>
						<div className="col-span-3 p-3 pl-4 flex gap-3 ">
							<p>Rate this movie: </p>
							<ReactStars
								count={5}
								onChange={ratingChanged}
								value={parseInt(movie.vote_average) / 2}
								edit={true}
								emptyIcon={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
										/>
									</svg>
								}
								filledIcon={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="size-6"
									>
										<path
											fillRule="evenodd"
											d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
											clipRule="evenodd"
										/>
									</svg>
								}
							/>
						</div>
					</div>
				</div>
			) : (
				<h1>loading...</h1>
			)}
		</div>
	);
}
