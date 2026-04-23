import CreateNav from "../components/navBar.jsx";
import ArtGrid from "../components/artGrid.jsx";
import illustrationImages from "../assets/illustrationImages.js";
import "./generalWebsite.css";


export default function HomePage(){
    return (
        <>
            <title>Illustrations</title>
            <CreateNav />
            <ArtGrid 
                imageSet = {illustrationImages}
            />
        </>
    );
}