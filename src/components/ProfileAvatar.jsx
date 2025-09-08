import React, { useState } from "react";

export default function ProfileAvatar({ user }) {
	const [loaded, setLoaded] = useState(false);
	const defaultAvatar = "/default_profile.jpg";

	const avatarUrl = user?.avatar?.tmdb?.avatar_path
		? `https://image.tmdb.org/t/p/w185${user.avatar.tmdb.avatar_path}`
		: null;

	return (
		<div className="relative w-13 h-13">
			<img
				src={defaultAvatar}
				alt="default avatar"
				className={`absolute inset-0 w-13 h-13 rounded-full object-cover transition-opacity duration-300 ${
					loaded ? "opacity-0" : "opacity-100"
				}`}
			/>

			{avatarUrl && (
				<img
					src={avatarUrl}
					alt="user avatar"
					onLoad={() => setLoaded(true)}
					className={`absolute inset-0 w-13 h-13 rounded-full object-cover transition-opacity duration-300 ${
						loaded ? "opacity-100" : "opacity-0"
					}`}
				/>
			)}
		</div>
	);
}
