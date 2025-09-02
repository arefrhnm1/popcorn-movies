import React, { useEffect, useState } from "react";
import { fench } from "../../../services/fench";
import TV from "./items/TV";
import Movie from "./items/Movie";
import Person from "./items/Person";

export default function SearchBox() {
	const [query, setQuery] = useState("");
	const [searchResult, setSearchResult] = useState([]);

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

	return (
		<section className="mt-12">
			<div className="relative">
				<input
					type="text"
					className="w-full text-xl text-white placeholder:text-sm placeholder:text-white placeholder:opacity-70 bg-yellow-700 opacity-80 px-4 py-2 outline-none rounded-md"
					placeholder="Search for movie ..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<div
					className={`bg-yellow-950/90 mt-1 text-yellow-100 flex flex-col gap-2 absolute w-full z-10 rounded-md transition-all duration-200
                     ${
							searchResult.length && query
								? "max-h-[300px] overflow-auto p-2"
								: "h-0 overflow-hidden"
						}`}
				>
					{searchResult.map((item) => (
						<div
							className="border-b-2 border-yellow-700/30 pb-2"
							onClick={() => {
								setSearchResult([]);
								setQuery('')
							}}
						>
							{showItem(item)}
						</div>
					))}
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="size-6 absolute text-white right-3 top-1/2 -translate-y-1/2"
				>
					<path
						fillRule="evenodd"
						d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
		</section>
	);
}
