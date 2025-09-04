import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fench } from "../services/fench";

export const UserContext = createContext();

export default function UserProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [session, setSession] = useState(() =>
		localStorage.getItem("session")
	);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	async function getUserData() {
		const { data } = await fench.get("account");
		fetchFavoriteMovies(data.id);
		setUser(data);
	}

	async function fetchFavoriteMovies(id = user.id) {
		const favResult = await fench.get(`account/${id}/favorite/movies`);
		setFavoriteMovies(favResult.data.results);
	}

	useEffect(() => {
		if (session) {
			getUserData();
		}
	}, [session]);

	function logout() {
		setUser({});
		setSession(null);
		localStorage.clear();
		delete window.fench.defaults.params.session_id;
	}

	async function login(username, password) {
		try {
			const tokenResult = await fench.get(`authentication/token/new`);

			const authorize = await fench.post(
				`authentication/token/validate_with_login`,
				{
					username,
					password,
					request_token: tokenResult.data.request_token,
				}
			);
			const session = await fench.post(`authentication/session/new`, {
				request_token: tokenResult.data.request_token,
			});
			setSession(session.data.session_id);
			localStorage.setItem("session", session.data.session_id);
			window.fench.defaults.params.session_id = session.data.session_id;
			navigate("/profile", { replace: true });
		} catch {
			toast.error("Invalid username and password!");
		}
	}

	return (
		<UserContext.Provider
			value={{
				user,
				login,
				session,
				logout,
				favoriteMovies,
				fetchFavoriteMovies,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
