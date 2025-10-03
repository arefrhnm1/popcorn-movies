import React, { useState } from "react";
import MoviesListSlider from "../main/MoviesListSlider";
import Title from "../Title";
import { Clapperboard, FilmIcon, TvIcon } from "lucide-react";
export default function Home() {
	const [moviesActiveTap, setMovieActiveTab] = useState("upcoming");
	const [tvActiveTab, setTvActiveTab] = useState("popular");

	function handleChangeMoviesActiveTab(tab) {
		setMovieActiveTab(tab);
	}
	function handleChangeTvActiveTab(tab) {
		setTvActiveTab(tab);
	}

	function activeClass(tab) {
		return tab === moviesActiveTap ? "bg-zinc-800/60 backdrop-blur-xs border border-white/30 text-white rounded-xl" : "text-white border border-transparent";
	}

	function activeTvClassName(tab) {
		return tab === tvActiveTab ? "bg-zinc-800/60 backdrop-blur-xs border border-white/30 text-white rounded-xl" : "text-white border border-transparent";
	}
	return (
		<div className="container mx-auto pt-15">
			<Title>Home</Title>
			<div className="flex flex-col gap-6 items-center">
				<h2 className="text-white font-bold flex items-center gap-1 text-3xl">Movies <FilmIcon/></h2>
				<ul className="flex text-sm gap-1 [&>*]:cursor-pointer [&>*]:px-2 [&>*]:py-1">
					<li
						onClick={() => handleChangeMoviesActiveTab("upcoming")}
						className={activeClass("upcoming")}
					>
						Upcoming
					</li>
					<li
						onClick={() =>
							handleChangeMoviesActiveTab("now_playing")
						}
						className={activeClass("now_playing")}
					>
						Now Playing
					</li>
					<li
						onClick={() => handleChangeMoviesActiveTab("popular")}
						className={activeClass("popular")}
					>
						Popular
					</li>
					<li
						onClick={() => handleChangeMoviesActiveTab("top_rated")}
						className={activeClass("top_rated")}
					>
						Top rated
					</li>
				</ul>
			</div>
			<MoviesListSlider type="movie" activeTab={moviesActiveTap} />
			<div className="flex flex-col gap-6 items-center pt-15">
				<h2 className="text-white font-bold flex items-center gap-2 text-3xl">TV - Series <Clapperboard /></h2>
				<ul className="flex text-sm gap-1 [&>*]:cursor-pointer [&>*]:px-2 [&>*]:py-1">
					<li
						onClick={() => handleChangeTvActiveTab("popular")}
						className={activeTvClassName("popular")}
					>
						Popular
					</li>
					<li
						onClick={() => handleChangeTvActiveTab("top_rated")}
						className={activeTvClassName("top_rated")}
					>
						Top Rated
					</li>
					<li
						onClick={() => handleChangeTvActiveTab("airing_today")}
						className={activeTvClassName("airing_today")}
					>
						Airing Today
					</li>
					<li
						onClick={() => handleChangeTvActiveTab("on_the_air")}
						className={activeTvClassName("on_the_air")}
					>
						On The Air
					</li>
				</ul>
			</div>
			<MoviesListSlider type="tv" activeTab={tvActiveTab}/>
		</div>
	);
}
