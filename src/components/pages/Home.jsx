import React, { useState } from "react";
import MoviesListSlider from "../main/MoviesListSlider";
import { Helmet } from "react-helmet";
import Title from "../Title";
import Header from "../header/Header";
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
		return tab === moviesActiveTap ? "bg-yellow-800 rounded-2xl" : "";
	}

	function activeTvClassName(tab) {
		return tab === tvActiveTab ? "bg-yellow-800 rounded-2xl" : "";
	}
	return (
		<div className="container mx-auto">
			<Title>Home</Title>
			<Header/>
			<div className="md:flex items-baseline gap-8">
				<h2 className="text-yellow-300 text-3xl">Movies</h2>
				<ul className="my-6 flex flex-col gap-2 text-yellow-100 md:flex-row md:gap-4 [&>*]:cursor-pointer [&>*]:px-4 [&>*]:py-2">
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
			<div className="md:flex items-baseline gap-8 pt-8">
				<h2 className="text-yellow-300 text-3xl">TV - Series</h2>
				<ul className="my-6 flex flex-col gap-2 text-yellow-100 md:flex-row md:gap-4 [&>*]:cursor-pointer [&>*]:px-4 [&>*]:py-2">
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
