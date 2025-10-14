import "./navBar.css";

function CreateNavBar(){
    return(    
        <nav id="navBar">
            <h1>Mysty</h1>
            <ul id = "navLinkList">
                <li class = "navLink"><a href="../pages/home.jsx">Portfolio</a></li>
                <li class = "navLink"><a href="../pages/home.jsx">About Me</a></li>
            </ul>
        </nav>
    );
}

export default function CreateNav(){
    return (
        <CreateNavBar />
    );
}