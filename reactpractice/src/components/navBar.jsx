import "./navBar.css";
import InstagramIcon from "../instagram.png";
// import Home from "../pages/home.jsx";
// import About from "../pages/about.jsx";
// import Contact from "../pages/contact.jsx";

// Source: https://www.codeconcisely.com/posts/react-navigation/
function CreateNavBar(){
    return(    
        <>
            <nav id="navBar">
                <div id="linksContainer">
                    <ul id="navLinkList">
                        <li className = "navLink"><a href = "../pages/home.jsx"><h1>Mysty</h1></a></li>
                        <li className = "navLink"><a href = "../pages/home.jsx">Portfolio</a></li>
                        {/*<li className = "navLink"><a href = "../pages/about.jsx">About</a></li>*}
                        {/*<li className = "navLink"><a href = "../pages/contact.jsx">Contact</a></li>*/}
                    </ul>

                    <div id="socialsContainer">
                        <a href="https://www.instagram.com/mystyyyy_/">
                            <img className = "socials" src= {InstagramIcon} alt="instagram link" />
                        </a>
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