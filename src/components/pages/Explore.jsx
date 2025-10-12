import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fench } from "../../services/fench";
import ExploreFilters from "../ExploreFilters";
import ExploreTabs from "../ExploreTabs";
import MovieCard from "../movies/MovieCard";
import SearchBox from "../header/searchbox/SearchBox";

export default function Explore() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("query");
	const [tab, setTab] = useState("movie"); // movie | tv
	const [filters, setFilters] = useState({
		genre: "",
		year: "",
		minVote: "",
		language: "",
	});
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	// fetch data from TMDB
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const { data } = await fench(`discover/${tab}`, {
					params: {
						with_genres: filters.genre || undefined,
						...(tab === "movie"
							? {
									primary_release_year:
										filters.year || undefined,
								}
							: {
									first_air_date_year:
										filters.year || undefined,
								}),
						"vote_average.gte": filters.minVote || undefined,
						with_original_language: filters.language || undefined,
						sort_by: "popularity.desc",
						page,
					},
				});
				if (page === 1) {
					setResults(data.results);
				} else {
					setResults((prev) => [...prev, ...data.results]);
				}
			} catch (err) {
				console.error("Error fetching explore data:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [tab, filters, page]);

	return (
		<div className="relative container mx-auto px-8 py-12 text-white bg-[url(/exploreBackgroundImage.jpg)] bg-fixed bg-cover bg-center">
			<div className="absolute -mb-1 inset-0 bg-gradient-to-t from-black/100 via-black/0 to-black/70" />
			<div className="relative z-10">
				<SearchBox />
				<div className="flex flex-col mt-10 gap-5 w-full">
					{/* Tabs */}
					<ExploreTabs tab={tab} setTab={setTab} setPage={setPage} />

					{/* Filters */}
					<ExploreFilters
						tab={tab}
						filters={filters}
						setFilters={setFilters}
						setPage={setPage}
					/>
				</div>

				{/* Results */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
					{loading && page === 1
						? Array.from({ length: 10 }).map((_, i) => (
								<div
									key={i}
									className="w-full h-[250px] bg-gray-700 animate-pulse rounded-md"
								/>
							))
						: results.map((item) => (
								<MovieCard
									key={item.id}
									movie={item}
									type={tab}
								/>
							))}
				</div>

				{/* Load More */}
				{results.length > 0 && (
					<div className="flex justify-center mt-8">
						<button
							onClick={() => setPage((p) => p + 1)}
							className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-semibold"
						>
							Load More
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
