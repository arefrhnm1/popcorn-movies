import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Profile() {
	const { user, session } = useContext(UserContext);


	return session ? (
		<>
			<div>Profile</div>
			<h1>{user.name}</h1>
		</>
	) : (
		<Navigate to={'/login'} replace/>
	)
}
