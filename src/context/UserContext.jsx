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

	async function getUserData() {
		const { data } = await fench.get('account');
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
			const tokenResult = await fench.get(
				`authentication/token/new`
			);

			const authorize = await fench.post(
				`authentication/token/validate_with_login`,
				{
					username,
					password,
					request_token: tokenResult.data.request_token,
				}
			);
			const session = await fench.post(
				`authentication/session/new`,
				{
					request_token: tokenResult.data.request_token,
				}
			);
			setSession(session.data.session_id);
			localStorage.setItem("session", session.data.session_id);
			window.fench.defaults.params.session_id = session.data.session_id;
			navigate("/profile", { replace: true });
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
