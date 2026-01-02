import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "./carousel.css";

// source: https://stackoverflow.com/questions/66526268/react-swiper-doesnt-show-images
// source: https://create-react-app.dev/docs/adding-images-fonts-and-files/
// Something to consider if many images: https://stackoverflow.com/questions/64922587/import-multiple-images-on-react

import thumb1 from "../assets/1/portfolio1.png";
import thumb2 from "../assets/2/portfolio2.png";
import thumb3 from "../assets/3/portfolio3.png";
// .txt path
// portfolioImg path

function CreateModal(){
    return(
        <div className="modal">
            <div className="modalHeader">
                <h1></h1>
                <button>
                    <p>X</p>
                </button>
            </div>
            <div className="modalBody">
                
            </div>
        </div>
    );
}


//image in carousel is a button where clicking it opens a modal with info
//about the art + wip/process of art
// Source: https://stackoverflow.com/questions/70548113/image-onclick-in-react

/*

export default function createPopup(){
    const imageClick = () => {
        // stuff
    }
    return //stuff
}

// Source: https://stackoverflow.com/questions/34857458/reading-local-text-file-into-a-javascript-array
// Source: https://stackoverflow.com/questions/50539756/how-to-import-a-txt-file-from-my-source

function populateModalTitle(portfolioImageNum){
    // make .txt file of titles, and use that
     
}

// Source: https://www.geeksforgeeks.org/html/how-to-insert-image-in-html-from-folder/
function populateModalImages(portfolioImageNum){
    // 
}

function showModal(portfolioImageNum){
    //set attributes to visible/interactable
}

function closeModal(portfolioImageNum){
    //set attributes to invisible/uninteractable
}
*/

// Source: https://swiperjs.com/react
// Source: https://stackoverflow.com/questions/63052586/react-swiperjs-autoplay-not-making-the-swiper-to-auto-swipe
// Source: https://www.freecodecamp.org/news/how-to-set-up-swiper-element-in-a-react-application/#heading-lazy-loading-images
export default function CreateCarousel(){
    const thumbnails = [];
    const titles = [];
    return (
        <Swiper
            modules={[ Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            centeredSlides={true}
            slidesPerView={1}
            navigation
            loop
            pagination={{ 
                clickable: true 
            }}
            autoplay={{
                delay: 4000,
                pauseOnMouseEnter: true,
            }}
        >

            <CreateModal />
            <SwiperSlide lazy="true">
                <img loading="lazy" className="swiper-image" src = {thumb1} alt = "1"/>
            </SwiperSlide>

            <SwiperSlide lazy="true">
                <img loading="lazy" className="swiper-image" src = {thumb2} alt = "2"/>
            </SwiperSlide>

            <SwiperSlide lazy="true">
                <img loading="lazy" className="swiper-image" src = {thumb3} alt = "3"/>
            </SwiperSlide>
        </Swiper>
    );
}