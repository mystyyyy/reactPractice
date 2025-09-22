import CreateNav from "../components/navBar.jsx";
import CreateCarousel from "../components/carousel.jsx";
import "./generalWebsite.css";

export default function HomePage(){
    return (
        <>
            <CreateNav />
            <CreateCarousel />
        </>
    );
}