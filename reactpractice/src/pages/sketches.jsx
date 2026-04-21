import CreateNav from "../components/navBar.jsx";
import CreateModal from "../components/artGrid.jsx";
import "./generalWebsite.css";


export default function HomePage(){
    return (
        <>
            <title>Sketches</title>
            <CreateNav />
            <CreateModal />
        </>
    );
}