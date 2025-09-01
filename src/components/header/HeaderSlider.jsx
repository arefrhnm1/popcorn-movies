import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MovieCard from "../movies/MovieCard";
import { fench } from "../../services/fench";

export default function HeaderSlider({ setBg, resetBg }) {
	const [movies, setMovies] = useState([]);
	const swiperRef = useRef(null);

	async function loadMovies() {
		const { data } = await fench.get(
			"movie/popular"
		);
		setMovies(data.results);
	}

	useEffect(() => {
		loadMovies();
	}, []);

	return (
		<div
			onMouseEnter={() => swiperRef.current?.autoplay.stop()}
			onMouseLeave={() => swiperRef.current?.autoplay.start()}
		>
			<Swiper
				modules={[Autoplay]}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
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
						<div
							key={movie.id}
							className="cursor-pointer relative"
							onMouseEnter={() =>
								setBg(
									`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
								)
							}
							onMouseLeave={resetBg}
						>
							<MovieCard
								// title={movie.title}
								// rate={movie.vote_average}
								movie={movie}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
