import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Modal from 'react-bootstrap/Modal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "./carousel.css";

// Something to consider if many images: https://stackoverflow.com/questions/64922587/import-multiple-images-on-react
import thumb1 from "../thumbnail/thumbnail1.png";
import thumb2 from "../thumbnail/thumbnail2.png";
import thumb3 from "../thumbnail/thumbnail3.png";
import thumb4 from "../thumbnail/thumbnail4.png";
import thumb5 from "../thumbnail/thumbnail5.png";
import thumb6 from "../thumbnail/thumbnail6.png";
import thumb7 from "../thumbnail/thumbnail7.png";
import thumb8 from "../thumbnail/thumbnail8.png";

const txtFilePath =  "/title.txt";
const portfolioImgPath = "/portfolioContent/";
const maxImages = 8;

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
    // A promise is an object that represents the eventual
    // completion/failure of an asynchronous operation
    // A promise can be in 3 states:
        // Pending: Initial state, neither fufilled or rejected
        // Fufilled: Operation succeeded
        // Rejected: Operation failed 
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);

        img.src = imgPath;
    });
}

// Custom hook that gets all images of an associated artwork
function useGetPortfolioImagePaths(portfolioImgPath, currentImgId){
    const [portfolioImagePaths, setPortfolioImagePaths] = useState([]);

    useEffect(()=>{
        if (currentImgId == null){
            setPortfolioImagePaths([]);
            return;
        }

        // Asynchronous JS allows the program to run tasks concurrently!
        // Async/Await builds on promises, but makes it easier to read/understand/maintain
        // Async functions always return a promise
        // Await pause the execution of an async function until a promise is resolved/rejected
            // "Wait for the next step"
        const load = async () => {
            const checks = [];
            for (let i = 0; i < maxImages; i++){
                let imgPath = portfolioImgPath + currentImgId + "/" + (i) + ".png";
                //console.log(imgPath);

                const promise = validImageChecker(imgPath).then(valid => {
                    if (valid) {
                        // Because this is an async function, imgPath is 
                        // returned as a proise
                        return imgPath;
                    }
                    return null;
                });
                checks.push(promise);
            }
            // Waits until all promises are resolved
            const portfolioImageContainer = await Promise.all(checks);
            setPortfolioImagePaths(portfolioImageContainer.filter(Boolean));
        };

        load();

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
    const [swiperRef, setSwiperRef] = useState(null);

    // portfolioImagePaths updates when portfolioImgPath or currentImgId changes
    const portfolioImagePaths = useGetPortfolioImagePaths(portfolioImgPath, currentImgId);
    const titles = GetPortfolioTitles(txtFilePath);

    useEffect(()=>{
        let portfolioTitleArray = Number(currentImgId) - 1;
        setPortfolioTitle(titles[portfolioTitleArray]);
    }, [currentImgId, titles]);  

    // Equivalent w/o arrow function is:
        // function handleClose(){
        //      setShow(false);
        //  }
    const handleClose = () => closeModal();
    const handleShow = () => openModal(); 
    function setCurrentImgIdValue(selected){
        setCurrentImgId(selected.currentTarget.id);
    }

    function closeModal(){
        setShow(false);

        let swiperElement = document.querySelector(".swiper");
        swiperElement.classList.remove("hover");

        document.getElementById("overlay").style.display = "none";

        swiperRef.autoplay.resume();
        swiperRef.enabled = true;
        swiperRef.update();
    }

    function openModal(){
        setShow(true); 

        let swiperElement = document.querySelector(".swiper");
        swiperElement.classList.add("hover");

        document.getElementById("overlay").style.display = "block";

        swiperRef.autoplay.pause();
        swiperRef.enabled = false;
    }

    return (
        <>
            <Swiper
                onSwiper={(swiper) => {
                    setSwiperRef(swiper);
                }}    

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

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="4" 
                        src = {thumb4} 
                        alt = "4" 
                        onClick={(selected)=>{setCurrentImgIdValue(selected); handleShow();}}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="5" 
                        src = {thumb5} 
                        alt = "5" 
                        onClick={(selected)=>{setCurrentImgIdValue(selected); handleShow();}}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="6" 
                        src = {thumb6} 
                        alt = "6" 
                        onClick={(selected)=>{setCurrentImgIdValue(selected); handleShow();}}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="7" 
                        src = {thumb7} 
                        alt = "7" 
                        onClick={(selected)=>{setCurrentImgIdValue(selected); handleShow();}}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="8" 
                        src = {thumb8} 
                        alt = "8" 
                        onClick={(selected)=>{setCurrentImgIdValue(selected); handleShow();}}
                    />
                </SwiperSlide>
            </Swiper>

            {/* Source: https://react-bootstrap.github.io/docs/components/modal/ */}
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop = "static"
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 id="portfolioTitle">
                            {portfolioTitle}
                        </h1>
                    </Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}>X</button>
                </Modal.Header>

                <Modal.Body>
                    <div id="imageWrapper">
                        {CreatePortfolioImageElements(portfolioImagePaths)}
                    </div>
                </Modal.Body>
            </Modal>
            <div id="overlay"></div>
        </>
    );
}