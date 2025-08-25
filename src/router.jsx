import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/pages/Home";
import Movies from "./components/pages/Movies";
import Movie from "./components/pages/Movie";
import Login from "./components/pages/Login";

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/movies",
				element: <Movies />,
			},
			{
				path: "/movies/:id",
				element: <Movie />,
			},
			{
				path: "/tv",
				element: <h1>this is tv page!</h1>,
			},
			{
				path: "/people",
				element: <h1>this is person page!</h1>,
			},
			{
				path: "/more",
				element: <h1>this is more page!</h1>,
			},
			{
				path: "/login",
				element: <Login/>,
			},
		],
	},
]);
