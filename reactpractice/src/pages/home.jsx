import CreateNav from "../components/navBar.jsx";
import CreateCarousel from "../components/carousel.jsx";
import "./generalWebsite.css";

export default function HomePage(){
    return (
        <>
            <title>Mysty</title>
            <CreateNav />
            <CreateCarousel />
        </>
    );
}