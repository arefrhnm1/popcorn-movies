import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Login() {
	const { login, session } = useContext(UserContext);

	function handleLogin(e) {
		e.preventDefault();

		const { username, password } = e.target.elements;

		login(username.value, password.value);
	}


	return (
		<div className="flex flex-col justify-self-center gap-10">
			<h1 className="text-white text-3xl text-center">Login page</h1>
			<div className="">
				<p>{session}</p>
				<form
					className="gap-5 flex flex-col"
					action=""
					onSubmit={handleLogin}
				>
					<input
						placeholder="User"
						className="bg-white p-4"
						type="text"
						name="username"
					/>
					<input
						placeholder="Password"
						className="bg-white p-4"
						type="password"
						name="password"
					/>
					<input
						className="bg-white p-4"
						type="submit"
						value="Login"
					/>
				</form>
			</div>
		</div>
	);
}
