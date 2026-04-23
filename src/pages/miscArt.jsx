import CreateNav from "../components/navBar.jsx";
import ArtGrid from "../components/artGrid.jsx";
import miscImages from "../assets/miscImages.js";
import "./generalWebsite.css";


export default function HomePage(){
    return (
        <>
            <title>Misc. Art</title>
            <CreateNav />
            <ArtGrid 
                imageSet = {miscImages}
            />
        </>
    );
}