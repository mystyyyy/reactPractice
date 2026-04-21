import CreateNav from "../components/navBar.jsx";
import CreateModal from "../components/artGrid.jsx";
import illustrationImages from "../assets/illustrationImages.js";
import "./generalWebsite.css";


export default function HomePage(){
    return (
        <>
            <title>Illustrations</title>
            <CreateNav />
            <CreateModal 
                imageSet = {illustrationImages}
            />
        </>
    );
}