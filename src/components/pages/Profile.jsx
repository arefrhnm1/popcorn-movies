import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate, } from "react-router-dom";

export default function Profile() {
	const { user, session } = useContext(UserContext);


	return session ? (
		<>
			<div className="pt-52">Profile</div>
			<h1>{user?.name}</h1>
		</>
	) : (
		<Navigate to={'/auth'} replace/>
	)
}
