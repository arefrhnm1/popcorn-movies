import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MovieCard from "../movies/MovieCard";
import { useMovieDB } from "../../hooks/useMovieDB";

export default function MoviesListSlider({ type, activeTab }) {
	const {data} = useMovieDB(`${type}/${activeTab}`);

	return (
		<Swiper
			modules={[Autoplay]}
			loop
			autoplay={{ delay: 4000 }}
			centeredSlides
			className="mt-8"
			slidesPerView={2}
			spaceBetween={20}
			breakpoints={{
				// when window width is >= 320px
				640: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				// when window width is >= 480px
				768: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
				// when window width is >= 640px
				1024: {
					slidesPerView: 6,
					spaceBetween: 20,
				},
			}}
		>
			{data?.results?.map((movie) => (
				<SwiperSlide key={movie.id}>
					<MovieCard movie={movie} type={type} />
				</SwiperSlide>
			))}
		</Swiper>
	);
}
