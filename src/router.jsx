import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import UserProvider from "./context/UserContext";
import Profile from "./components/pages/Profile";
import Explore from "./components/pages/Explore";
import Toprated from "./components/pages/Toprated";
import People from "./components/pages/People";
import MediaDetail from "./components/pages/MediaDetail";

export const router = createBrowserRouter([
	{
		element: (
			<UserProvider>
				<App />
			</UserProvider>
		),
		children: [
			{
				path: "/",
				element: <Home />,
			},
			
			{
				path: "/media/:type/:id",
				element: <MediaDetail />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/explore",
				element: <Explore />,
			},
			{
				path: "/toprated",
				element: <Toprated />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			
			{
				path: "/people/:id",
				element: <People />,
			},
		],
	},
]);
