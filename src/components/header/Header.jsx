import React, { useState } from "react";
import SearchBox from "./searchbox/SearchBox";
import HeaderSlider from "./HeaderSlider";
import { useLocation } from "react-router-dom";
import { useMovieDB } from "../../hooks/useMovieDB";

export default function Header() {
	const { data, loading } = useMovieDB(`movie/popular`);
	const movies = data?.results || [];

	const [activeIndex, setActiveIndex] = useState(0);
	const location = useLocation();

	const backdrop = movies?.[activeIndex]?.backdrop_path;

	return (
		<header
			className={`relative py-12 w-full h-[95vh] transition-all duration-500 ${location.pathname !== "/" && "opacity-0 pointer-events-none"}`}
			style={{
				backgroundImage: backdrop
					? `url(https://image.tmdb.org/t/p/w1280${backdrop})`
					: "none",
				backgroundSize: "cover",
				backgroundPosition: "center",
				
			}}
		>
			{/* لایه تیره */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/0 to-black/100 z-0" />

			<div className="relative z-10 flex flex-col h-full container mx-auto px-8">
				<SearchBox />
				<div>
					{
						<HeaderSlider
							movies={movies}
							onSlideChange={setActiveIndex}
							loading={loading}
						/>
					}
				</div>
			</div>
		</header>
	);
}
