import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav";
import TopBar from "./components/TopBar";
import Header from "./components/header/Header";

export function App() {
	return (
		<>
			<TopBar />
			<Header />
			<main className="bg-black">
				<Outlet />
			</main>
			<Footer />
			<Nav />
			<Toaster />
		</>
	);
}
export default App;
