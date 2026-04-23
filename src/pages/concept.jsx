import CreateNav from "../components/navBar.jsx";
import ArtGrid from "../components/artGrid.jsx";
import conceptArtImages from "../assets/conceptArtImages.js";
import "./generalWebsite.css";


export default function HomePage(){
    return (
        <>
            <title>Concept Art</title>
            <CreateNav />
            <ArtGrid 
                imageSet = {conceptArtImages}
            />
        </>
    );
}