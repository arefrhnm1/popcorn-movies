import axios from "axios";

const session_id = localStorage.getItem("session");

export const fench = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	params: {
		api_key: "23815a8126ebea2361be84d5f37a213d",
		...(session_id && { session_id }),
	},
});


window.fench = fench;