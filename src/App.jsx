import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

const movies = [
    "/sliderImage.jpg",
    "/sliderImage.jpg",
    "/sliderImage.jpg",
    "/sliderImage.jpg",
    "/sliderImage.jpg",
    "/sliderImage.jpg",
    "/sliderImage.jpg",
    "/sliderImage.jpg",
]

function App() {
    return  (
        
        <>
            <Header movies={movies}/>
            <Main movies={movies}/>
            <Footer/>
        </>
    );
}
export default App;

