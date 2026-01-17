import "./navBar.css";

// Source: https://www.codeconcisely.com/posts/react-navigation/
function CreateNavBar(){
    return(    
        <>
            <nav id="navBar">
                <div id="linksContainer">
                    <ul id = "navLinkList">
                        <li className = "navLink"><a href = "../pages/home.jsx"><h1>Mysty</h1></a></li>
                        <li className = "navLink"><a href = "../pages/home.jsx">Portfolio</a></li>
                    </ul>
                    <div id="socialsContainer">
                        <a href="">instagram</a>
                        <a href="">twitter</a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default function CreateNav(){
    return (
        <CreateNavBar />
    );
}