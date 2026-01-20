import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Modal from 'react-bootstrap/Modal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "./carousel.css";

// source: https://stackoverflow.com/questions/66526268/react-swiper-doesnt-show-images
// source: https://create-react-app.dev/docs/adding-images-fonts-and-files/
// Something to consider if many images: https://stackoverflow.com/questions/64922587/import-multiple-images-on-react
import thumb1 from "../thumbnail/thumbnail1.png";
import thumb2 from "../thumbnail/thumbnail2.png";
import thumb3 from "../thumbnail/thumbnail3.png";

const txtFilePath =  "/title.txt";
const portfolioImgPath = "/portfolioContent/";

// Source: https://stackoverflow.com/questions/55830414/how-to-read-text-file-in-react
// Source: https://react.dev/reference/react/useEffect
// Custom hooks are functions that lets devs share stateful logic
// Syntax: Custom hooks must start with "get" i.e. getName
function GetPortfolioTitles(txtFile){
    const [titles, setTitles] = useState([]);

    // useEffects allows you to run side effects (fetch data, update UI, etc.)
    // in response to changes in your component
    // Syntax: useEffect(setup, dependencies)
        // In this case, the setup is fetching the file,
        // and the dependency is the txt file itself.
    useEffect(() => {
        fetch(txtFile)
            .then(response => 
                response.text()
            )
            .then(text => {
                setTitles(text.split('\r\n'));
            })
    }, [txtFile]);

    return titles;
}

// Source: https://cloudinary.com/guides/front-end-development/how-to-check-if-image-src-is-valid-javascript
function validImageChecker(imgPath){
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);

        img.src = imgPath;
    });
}

function useGetPortfolioImagePaths(portfolioImgPath, currentImgId){
    const [portfolioImagePaths, setPortfolioImagePaths] = useState([]);
    const maxImages = 12;

    useEffect(()=>{
        if (currentImgId == null){
            setPortfolioImagePaths([]);
            return;
        }

        let portfolioImageContainer = [];
        for(let i = 0; i < maxImages; i++){
            let imgPath = portfolioImgPath + currentImgId + "/" + (i) + ".png";
            validImageChecker(imgPath)
                .then(isValid => {
                    if (isValid) {
                        console.log(imgPath);
                        portfolioImageContainer.push(imgPath);
                    } else {
                        return false;
                    }
            });
        };

        setPortfolioImagePaths(portfolioImageContainer);
    }, [portfolioImgPath, currentImgId]);

    return portfolioImagePaths;
}

function CreatePortfolioImageElements(portfolioImagePaths){
    // map() creates a new array based on the arguments given
    // Syntax: array.map(value, index)
        // value is the current value
        // index is the current number (index)
        // Only the value is required
    // Source: https://codesweetly.com/rendering-lists-of-react-elements/
    // Source: https://codesweetly.com/javascript-map-method/
    return (
        <>
            {portfolioImagePaths.map((imgPath, i) => <img className = "modalImage" key = {i} src= {imgPath} alt= {i}/>)}
        </>
    );
}

// Source: https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
// Source: https://swiperjs.com/react
// Source: https://stackoverflow.com/questions/63052586/react-swiperjs-autoplay-not-making-the-swiper-to-auto-swipe
// Source: https://www.freecodecamp.org/news/how-to-set-up-swiper-element-in-a-react-application/#heading-lazy-loading-images
export default function CreateCarousel(){
    // useState provides a way to have state variables, AKA
    // ways for values to persist between renders, and can
    // trigger React to update the component w/ the new value
    // Syntax: const [state, setState] = useState(initialState)
        // state is the state variable, or the thing that holds the value
        // setState updates the value (state variable)
        // initialState is the default (initial) value
    const [show, setShow] = useState(false);
    const [currentImgId, setCurrentImgId] = useState(null);
    const [portfolioTitle, setPortfolioTitle] = useState("");
    //const [portfolioImages, setPortfolioImages] = useState(null);

    const portfolioImagePaths = useGetPortfolioImagePaths(portfolioImgPath, currentImgId);
    const titles = GetPortfolioTitles(txtFilePath);

    function setCurrentImgIdValue(selected){
        setCurrentImgId(selected.currentTarget.id);
    }

    function closeModal(){
        setShow(false);
        // need to initialize swiper for this method to work
        //swiper.enable();
    }

    function openModal(){
        setShow(true); 
        //swiper.disable();
    }

    useEffect(()=>{
        let portfolioTitleArray = Number(currentImgId) - 1;
        setPortfolioTitle(titles[portfolioTitleArray]);
        
        //setPortfolioImages(CreatePortfolioImageElements(portfolioImagePaths));
        //console.log("Portfolio Images: " + portfolioImages);
    }, [currentImgId, titles]);  

    // Passing an array as a dependency is wacky
    // Source: https://stackoverflow.com/questions/57859484/useeffect-runs-infinite-loop-despite-no-change-in-dependencies

    // Equivalent w/o arrow function is:
        // function handleClose(){
        //      setShow(false);
        //  }
    const handleClose = () => closeModal();
    const handleShow = () => openModal(); 

    return (
        <>
            <div id="modalDarkenBg"></div>
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
                    delay: 5000,
                    pauseOnMouseEnter: true,
                }}
            >
                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="1"
                        src = {thumb1} 
                        alt = "1" 
                        onClick={(selected)=>{setCurrentImgIdValue(selected); handleShow();}}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="2" 
                        src = {thumb2} 
                        alt = "2" 
                        onClick={(selected)=>{setCurrentImgIdValue(selected); handleShow();}}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="3" 
                        src = {thumb3} 
                        alt = "3" 
                        onClick={(selected)=>{setCurrentImgIdValue(selected); handleShow();}}
                    />
                </SwiperSlide>
            </Swiper>

            {/* Source: https://react-bootstrap.github.io/docs/components/modal/ */}
            <Modal 
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 id="portfolioTitle">
                            {portfolioTitle}
                        </h1>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div id="imageWrapper">
                        {CreatePortfolioImageElements(portfolioImagePaths)}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}