import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import MovieCard from "../movies/MovieCard";
import { useMovieDB } from "../../hooks/useMovieDB";

import 'swiper/css';
import 'swiper/css/effect-cards';


export default function HeaderSlider({ setBg, resetBg }) {
	const [data] = useMovieDB(`movie/popular`);
	const swiperRef = useRef(null);

	return (
		<div
			onMouseEnter={() => swiperRef.current?.autoplay.stop()}
			onMouseLeave={() => swiperRef.current?.autoplay.start()}
			className="p-10"
		>
			<Swiper
			effect="cards"
				modules={[Autoplay,EffectCards]}
				grabCursor={true}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				loop
				autoplay={{ delay: 2000 }}
				className="mt-8 mySwiper"
			>
				{data?.results?.map((movie) => (
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
							<MovieCard movie={movie} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
