import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import MovieCard from "../movies/MovieCard";

import "swiper/css";
import "swiper/css/effect-cards";

export default function HeaderSlider({ movies, onSlideChange }) {
	const swiperRef = useRef(null);

	return (
		<div
			onMouseEnter={() => swiperRef.current?.autoplay.stop()}
			onMouseLeave={() => swiperRef.current?.autoplay.start()}
			className="p-10"
		>
			<Swiper
				effect="cards"
				modules={[Autoplay, EffectCards]}
				grabCursor
				loop
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				autoplay={{ delay: 4000 }}
				onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
				className="mt-2 mySwiper"
			>
				{movies.map((movie) => (
					<SwiperSlide key={movie.id}>
						<MovieCard movie={movie} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
