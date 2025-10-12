// src/components/media/MediaActions.jsx
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import {
	getAccountStates,
	toggleFavorite,
	toggleWatchlist,
	submitRating,
} from "../../services/account";
import VideosSection from "./VideosSection";
import { BookmarkMinus, BookmarkPlus, HeartMinus, HeartPlus } from "lucide-react";

export default function MediaActions({ data, type }) {
	const { user, session, fetchFavoriteMovies } = useContext(UserContext);
	const [accountState, setAccountState] = useState(null);
	const [ratingValue, setRatingValue] = useState(null);
	const [showVideoModal, setShowVideoModal] = useState(false);
	const videos = data.videos?.results || [];

	useEffect(() => {
		async function loadAccountState() {
			if (!session || !data) return;
			try {
				const { data: st } = await getAccountStates(
					type,
					data.id,
					session
				);
				setAccountState(st);
				setRatingValue(
					st.rated
						? typeof st.rated === "object"
							? st.rated.value / 2
							: st.rated / 2
						: null
				);
			} catch (err) {
				console.warn("account state error", err);
			}
		}
		loadAccountState();
	}, [data, session]);

	async function onToggleFavorite() {
		if (!session) return toast.error("Please login to favorite.");
		try {
			await toggleFavorite(
				user.id,
				type,
				data.id,
				!accountState.favorite,
				session
			);
			setAccountState((prev) => ({ ...prev, favorite: !prev.favorite }));
			fetchFavoriteMovies?.();
			toast.success(
				accountState?.favorite
					? "Removed from favorites"
					: "Added to favorites"
			);
		} catch (err) {
			console.error(err);
			toast.error("Action failed");
		}
	}

	async function onToggleWatchlist() {
		if (!session) return toast.error("Please login to manage watchlist.");
		try {
			await toggleWatchlist(
				user.id,
				type,
				data.id,
				!accountState.watchlist,
				session
			);
			setAccountState((prev) => ({
				...prev,
				watchlist: !prev.watchlist,
			}));
			toast.success(
				accountState?.watchlist
					? "Removed from watchlist"
					: "Added to watchlist"
			);
		} catch (err) {
			console.error(err);
			toast.error("Action failed");
		}
	}

	async function onRate(value) {
		if (!session) return toast.error("Please login to rate.");
		try {
			// value is in stars (1-5); TMDB rating expects 0.5-10 scale; we multiply by 2
			await submitRating(type, data.id, value * 2, session);
			setRatingValue(value);
			toast.success("Rating submitted");
		} catch (err) {
			console.error(err);
			toast.error("Rating failed");
		}
	}

	const trailer = videos.find(
		(v) => v.type === "Trailer" && v.site === "YouTube"
	);

	return (
		
		<div className="flex gap-3 items-center">
			{trailer && (
				<>
					<button
						onClick={() => setShowVideoModal(true)}
						className="px-3 py-2 rounded bg-red-600 text-white"
					>
						Play Trailer
					</button>
					{showVideoModal && (
						<VideosSection
							videos={data.videos?.results || []}
							onClose={() => setShowVideoModal(false)}
						/>
					)}
				</>
			)}
			<button
				onClick={onToggleFavorite}
				className={`px-3 py-2 rounded ${accountState?.favorite ? "bg-yellow-400 text-black" : "bg-zinc-800/60 text-white"}`}
			>
				{accountState?.favorite ? <HeartMinus/> : <HeartPlus/>}
			</button>

			<button
				onClick={onToggleWatchlist}
				className={`px-3 py-2 rounded ${accountState?.watchlist ? "bg-yellow-400 text-black" : "bg-zinc-800/60 text-white"}`}
			>
				{accountState?.watchlist ? <BookmarkMinus/> : <BookmarkPlus/>}
			</button>
			

			<div className="flex items-center gap-2 bg-zinc-800/60 px-2 py-1 rounded">
				<label className="text-sm text-white">Rate:</label>
				<select
					value={ratingValue ?? ""}
					onChange={(e) => onRate(Number(e.target.value))}
					className="bg-zinc-800/60 px-2 py-1 rounded outline-none"
				>
					<option value="">—</option>
					<option value={0.5}>0.5</option>
					<option value={1}>1</option>
					<option value={1.5}>1.5</option>
					<option value={2}>2</option>
					<option value={2.5}>2.5</option>
					<option value={3}>3</option>
					<option value={3.5}>3.5</option>
					<option value={4}>4</option>
					<option value={4.5}>4.5</option>
					<option value={5}>5</option>
				</select>
			</div>

			
		</div>
	);
}
