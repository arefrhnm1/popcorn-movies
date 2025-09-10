import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function LoginForm() {
	const { login } = useContext(UserContext);
	const [submitting, setSubmitting] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			await login({ username, password });
		} catch (err) {
			console.error("Login error:", err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<input
				type="text"
				placeholder="Username"
				className="p-3 rounded bg-zinc-700 text-white focus:outline-none"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				className="p-3 rounded bg-zinc-700 text-white focus:outline-none"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button
				type="submit"
				disabled={submitting}
				className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded"
			>
				{submitting ? "Logging in..." : "Login"}
			</button>
		</form>
	);
}
