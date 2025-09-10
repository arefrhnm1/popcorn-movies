import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fench } from "../services/fench";

export const UserContext = createContext();

export default function UserProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [session, setSession] = useState(() =>
		localStorage.getItem("session")
	);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	async function getUserData() {
		if (!loading) setLoading(true);
		const { data } = await fench.get("account");

		fetchFavoriteMovies(data.id);
		setUser(data);
		setLoading(false);
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
		setUser(null);
		setSession(null);
		localStorage.clear();
		delete window.fench.defaults.params.session_id;
	}

	async function login({ username, password }) {
		try {
			// step 1
			const tokenResult = await fench.get(`authentication/token/new`);
			const requestToken = tokenResult.data.request_token;

			// step 2
			const authorize = await fench.post(
				`authentication/token/validate_with_login`,
				{
					username,
					password,
					request_token: requestToken,
				},
				{
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
				}
			);

			// step 3
			const session = await fench.post(
				`authentication/session/new`,
				{
					request_token: authorize.data.request_token,
				},
				{
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
				}
			);

			setSession(session.data.session_id);
			localStorage.setItem("session", session.data.session_id);
			window.fench.defaults.params.session_id = session.data.session_id;
			navigate("/profile", { replace: true });
		} catch (err) {
			toast.error("Login error:", err.response?.data || err.message);
		}
	}

	return (
		<UserContext.Provider
			value={{
				user,
				loading,
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
