import React from "react";
import MoviesListSlider from "./MoviesListSlider";

export default function MoviesList({movies}) {
	return (
		<div className="container mx-auto">
			<div className="md:flex items-baseline gap-8">
				<h2 className="text-yellow-300 text-3xl">What's Popular</h2>
                <ul className="my-6 flex flex-col gap-2 text-yellow-100 md:flex-row md:gap-4">
                    <li>Streaming</li>
                    <li>On Tv</li>
                    <li>For Rent</li>
                    <li>In Theaters</li>
                </ul>
			</div>
			<MoviesListSlider movies={movies} />
			<div className="md:flex items-baseline gap-8 pt-8">
				<h2 className="text-yellow-300 text-3xl">Free to Watch</h2>
                <ul className="my-6 flex flex-col gap-2 text-yellow-100 md:flex-row md:gap-4">
                    <li>Movie</li>
                    <li>Tv</li>
                </ul>
			</div>
			<MoviesListSlider movies={movies} />
		</div>
	);
}
