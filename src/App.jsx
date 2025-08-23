import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";



export function App() {
	return (
		<>
			<Header />
			<main className="bg-yellow-950 py-10">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
export default App;
