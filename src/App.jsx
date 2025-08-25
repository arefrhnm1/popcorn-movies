import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Toaster } from "react-hot-toast";



export function App() {
	return (
		<>
			<Header />
			<main className="bg-yellow-950 py-10">
				<Outlet />
			</main>
			<Footer />
			<Toaster/>
		</>
	);
}
export default App;
