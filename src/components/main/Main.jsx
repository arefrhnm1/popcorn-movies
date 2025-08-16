import React from "react";
import MoviesList from "./MoviesList";

export default function Main({movies}) {
	return (
		<div className="bg-yellow-950">
			<MoviesList movies={movies}/>
		</div>
	);
}
