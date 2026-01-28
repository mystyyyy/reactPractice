import { Link } from 'react-router-dom';
import "./navBar.css";
import InstagramIcon from "../instagram.png";

// Source: https://www.codeconcisely.com/posts/react-navigation/
function CreateNavBar(){
    return(    
        <>
            <nav id="navBar">
                <div id="linksContainer">
                    <ul id="navLinkList">
                        <Link className = "navLink" to = "/"><h1>Mysty</h1></Link>
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