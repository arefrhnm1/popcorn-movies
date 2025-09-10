import React, { useEffect, useState } from "react";
import { fench } from "../../../services/fench";
import TV from "./items/TV";
import Movie from "./items/Movie";
import Person from "./items/Person";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBox() {
	const [query, setQuery] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const timeout = setTimeout(async () => {
			if (query) {
				const { data } = await fench("search/multi", {
					params: { query },
				});
				setSearchResult(data.results);
			} else {
				setSearchResult([]);
			}
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [query]);

	function showItem(item) {
		console.log(item);

		switch (item.media_type) {
			case "tv":
				return <TV key={item.id} item={item} />;
			case "person":
				return <Person key={item.id} item={item} />;
			case "movie":
				return <Movie key={item.id} item={item} />;
		}
	}
	const handleSearch = () => {
		if (query.trim() === "") return;
		navigate(`/explore?query=${encodeURIComponent(query)}`);
	};
	return (
		<section className="mt-12">
			<div className="relative">
				<input
					type="text"
					className="w-full text-xl text-white placeholder:text-sm placeholder:text-white placeholder:opacity-30  bg-zinc-800/60 backdrop-blur-xs border border-white/30 opacity-80 px-4 py-2 outline-none rounded-md"
					placeholder="Search for a Movie, TV Show, Person ..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<div
					className={` bg-zinc-800/80 mt-2 backdrop-blur-xs text-white flex flex-col gap-2 absolute w-full z-10 rounded-md transition-all duration-200
                     ${
							searchResult.length && query
								? "max-h-[260px] overflow-auto p-2"
								: "h-0 overflow-hidden"
						}`}
				>
					{searchResult.map((item) => (
						<div
							key={item.id}
							className="border-b-2 border-white/10 pb-2"
							onClick={() => {
								setSearchResult([]);
								setQuery("");
							}}
						>
							{showItem(item)}
						</div>
					))}
				</div>
				<button onClick={handleSearch}>
					<Search strokeWidth={1} className="text-white absolute top-1/2 -translate-y-1/2 right-3" />
				</button>
			</div>
		</section>
	);
}
