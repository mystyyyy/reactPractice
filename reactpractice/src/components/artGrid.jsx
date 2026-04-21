import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./artGrid.css";

const txtFilePath =  "/title.txt";
const portfolioImgPath = "/portfolioContent/";
const maxImages = 9;



// Source: https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget

// FUNCTION NO LONGER NEEDED
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
                setTitles(text.split(/\r?\n/));
            })
    }, [txtFile]);

    return titles;
}

// Source: https://cloudinary.com/guides/front-end-development/how-to-check-if-image-src-is-valid-javascript
// FUNCTION NO LONGER NEEDED
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

// Make a function to set current set of images to an empty array

// Custom hook that gets all images of an associated artwork
function useGetPortfolioImagePaths(portfolioImgPath, currentImgId){
    const [portfolioImagePaths, setPortfolioImagePaths] = useState([]);

    useEffect(()=>{
        if (currentImgId == null){
            setPortfolioImagePaths([]);
            return;
        }

        // Prevent any image "overlap" when loading
        setPortfolioImagePaths([]);

        // Asynchronous JS allows the program to run tasks concurrently!
        // Async/Await builds on promises, but makes it easier to read/understand/maintain
        // Async functions always return a promise
        // Await pause the execution of an async function until a promise is resolved/rejected
            // "Wait for the next step"
        const load = async () => {
            const checks = [];
            for (let i = 0; i < maxImages; i++){
                let imgPath = portfolioImgPath + currentImgId + "/" + (i) + ".png";
                console.log(imgPath);

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
            {portfolioImagePaths.map((imgPath, i) => 
                <img className = "modalImage" key = {i} src= {imgPath} alt= {i}/>
            )}
        </>
    );
}

export default function Createmodal({imageSet}){
    const [show, setShow] = useState(false);
    const [currentImgId, setCurrentImgId] = useState(null);
    const [portfolioTitle, setPortfolioTitle] = useState("");

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
        document.getElementById("overlay").style.display = "none";
    }

    function openModal(){
        setShow(true); 
        document.getElementById("overlay").style.display = "block";
    }

    return (
        <>
            <div id="imgGridContainer">
                {imageSet[0].map((thumb, i) => 
                    <>
                        <button onClick="">
                            <img 
                                className="imageThumbnail" 
                                id={i} 
                                src={thumb.img} 
                                alt={thumb.alt} 
                                style={{
                                    gridColumnStart: thumb.gridColumnStart,
                                    gridColumnEnd: thumb.gridColumnEnd,
                                    gridRowStart: thumb.gridRowStart,
                                    gridRowEnd: thumb.gridRowEnd                              
                                }}
                            />
                        </button>
                    </>
                )}
            </div>

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
    )
}