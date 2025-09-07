import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav";
import TopBar from "./components/TopBar";



export function App() {
	return (
		<>
			<TopBar/>
			<main className="bg-yellow-950">
				<Outlet />
			</main>
			<Footer />
			<Nav/>
			<Toaster/>
		</>
	);
}
export default App;
