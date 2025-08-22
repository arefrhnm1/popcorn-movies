import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MovieCard from "../movies/MovieCard";
import axios from "axios";

export default function HeaderSlider() {
	const [movies, setMovies] = useState([]);

	async function loadMovies() {
		const { data } = await axios.get(
			"https://api.themoviedb.org/3/movie/popular?api_key=23815a8126ebea2361be84d5f37a213d"
		);
		setMovies(data.results);
	}

	useEffect(() => {
		loadMovies();
	}, []);
	console.log(movies);

	return (
		<Swiper
			modules={[Autoplay]}
			loop
			autoplay={{ delay: 2000 }}
			spaceBetween={10}
			slidesPerView={1}
			className="mt-8"
			breakpoints={{
				// when window width is >= 320px
				640: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				// when window width is >= 480px
				768: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
				// when window width is >= 640px
				1024: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			}}
		>
			{movies.map((movie) => (
				<SwiperSlide>
					<div>
						<MovieCard
							img={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
							title={movie.title}
							rate={movie.vote_average}
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
