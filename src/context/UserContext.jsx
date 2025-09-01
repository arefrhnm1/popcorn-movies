import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const api_key = "23815a8126ebea2361be84d5f37a213d";
const baseUrl = "https://api.themoviedb.org/3";

export default function UserProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [session, setSession] = useState(() =>
		localStorage.getItem("session")
	);

	async function getUserData() {
		const { data } = await axios.get(
			`${baseUrl}/account?api_key=${api_key}&session_id=${session}`
		);
		setUser(data);
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
			console.log(username);
			const tokenResult = await axios.get(
				`${baseUrl}/authentication/token/new?api_key=${api_key}`
			);

			const authorize = await axios.post(
				`${baseUrl}/authentication/token/validate_with_login?api_key=${api_key}`,
				{
					username,
					password,
					request_token: tokenResult.data.request_token,
				}
			);
			const session = await axios.post(
				`${baseUrl}/authentication/session/new?api_key=${api_key}`,
				{
					request_token: tokenResult.data.request_token,
				}
			);
			setSession(session.data.session_id);
			localStorage.setItem("session", session.data.session_id);
			window.fench.defaults.params.session_id = session.data.session_id;
			navigate("/", { replace: true });
		} catch {
			toast.error("Invalid username and password!");
		}
	}

	return (
		<UserContext.Provider value={{ user, login, session, logout }}>
			{children}
		</UserContext.Provider>
	);
}
