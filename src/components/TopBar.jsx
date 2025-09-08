import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { LogIn, LogOut, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";

export default function TopBar() {
	const { logout, user } = useContext(UserContext);

	return (
		<div className="flex fixed z-40 top-0 right-0 left-0 bg-zinc-800/60 backdrop-blur-xs border border-white/30 text-white justify-between p-4 items-center rounded-b-4xl">
			<Link to={"/"} className="text-2xl text-yellow-500">
				Popcorn <span className="text-xl text-white">Movies</span>
			</Link>
			{!user ? (
				<div className="flex gap-4 mr-2">
					<UserRoundPlus size={16} />
					<LogIn size={16} />
				</div>
			) : (
				<div className="flex gap-2 items-center">
					<button
						onClick={logout}
						className="flex gap-2 bg-neutral-500/30 p-2 rounded-full text-xs"
					>
						<LogOut size={16} />
					</button>

					<ProfileAvatar user={user} />
				</div>
			)}
		</div>
	);
}
