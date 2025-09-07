import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav";



export function App() {
	return (
		<>
			<Header />
			<main className="bg-yellow-950 py-10">
				<Outlet />
			</main>
			<Footer />
			<Nav/>
			<Toaster/>
		</>
	);
}
export default App;
