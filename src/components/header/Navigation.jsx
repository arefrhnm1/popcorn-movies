import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const menuItems = [
	{
		path: "movies",
		text: "Movies",
	},
	{
		path: "/tv",
		text: "TV Shows",
	},
	{
		path: "/people",
		text: "People",
	},
	{
		path: "/more",
		text: "More",
	},
];

export default function Navigation() {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const {user} = useContext(UserContext);
	

	function activeClass({ isActive }) {
		return isActive
			? "bg-yellow-900/30 rounded text-yellow-400 py-1 px-2"
			: "py-1 px-2";
	}

	return (
		<>
			<nav className="text-white items-baseline flex justify-between">
				<div className="flex gap-10 items-baseline">
					<Link to="/">
						<h1 className="text-2xl">
							<span className="text-3xl text-yellow-600 font-bold">
								Popcorn
							</span>{" "}
							Movies
						</h1>
					</Link>
					<ul className="gap-3 hidden md:flex">
						{menuItems.map((i) => (
							<li key={i.path}>
								<NavLink className={activeClass} to={i.path}>
									{i.text}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				<div>
					{Object.keys(user).length ? (
						<div>{user.name}</div>
					) : (
						<ul className="gap-3 hidden md:flex">
							<li>
								<NavLink to="/login">Login</NavLink>
							</li>
							<li>
								<NavLink
									to="signup"
									className="bg-yellow-900 px-4 py-2 rounded-xl"
								>
									Sign up
								</NavLink>
							</li>
						</ul>
					)}
				</div>
				<div className="md:hidden ">
					<button onClick={() => setIsOpenMenu(!isOpenMenu)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="size-6"
						>
							<path
								fillRule="evenodd"
								d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</nav>
			<div
				className={`md:hidden bg-yellow-950 text-yellow-200 text-center transition-all duration-300 overflow-hidden ${
					isOpenMenu
						? " border-t-2 border-yellow-700 h-full py-4"
						: "border-none py-0"
				}`}
				style={{ height: isOpenMenu ? 270 : 0 }}
			>
				<ul className="flex flex-col gap-4">
					{menuItems.map((i) => (
						<li key={i.path}>
							<NavLink
								onClick={() => setIsOpenMenu(false)}
								className={activeClass}
								to={i.path}
							>
								{i.text}
							</NavLink>
						</li>
					))}
				</ul>
				<div className="mt-8 flex gap-4 justify-center items-center border-t-2 pt-4 border-yellow-600">
					<NavLink to="/login" className="text-xl">
						Login
					</NavLink>
					<NavLink
						to="/signup"
						className="bg-yellow-800 rounded-xl py-2 px-4 text-white"
					>
						Sign Up
					</NavLink>
				</div>
			</div>
		</>
	);
}
