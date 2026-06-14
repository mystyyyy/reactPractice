import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./artGrid.css";

// Sources Used
// Modal: https://react-bootstrap.github.io/docs/components/modal/

export default function Createmodal({imageSet}){
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [images, setImages] = useState([]);
    const thumbnailInformation = imageSet[0];

    const handleClose = () => closeModal();
    const handleShow = () => openModal(); 

    function closeModal(){
        setShow(false);
        document.getElementById("overlay").style.display = "none";
    }

    function openModal(){
        setShow(true); 
        document.getElementById("overlay").style.display = "block";
    }

    function updateImageModal(e){
        const targetImgId = parseInt(e.target.id) + 1;
        const targetTitle = thumbnailInformation[e.target.id].title;
        const targetYear = thumbnailInformation[e.target.id].year;
        const imgArrayObj = imageSet[targetImgId];
        
        setTitle(targetTitle);
        setYear(targetYear);
        setImages(imgArrayObj);
        handleShow();
    }

    return (
        <>
            <div id="imgGridContainer">
                {thumbnailInformation.map((thumb, i) => 
                    <>
                        <div className="thumbnailContainer"
                            style={{
                                gridColumn: `${thumb.gridColumnStart} / span ${thumb.gridColumnSpan}`,
                                gridRow: `${thumb.gridRowStart} / span ${thumb.gridRowSpan}`                             
                            }}
                        >
                            <div className="buttonOverlay">
                                <h1>{thumb.title}</h1>
                            </div>
                            <div className="thumbnail">
                                <button 
                                    className="imageButton" 
                                    onClick={(e)=>updateImageModal(e)}
                                >
                                    <img 
                                        className="imageThumbnail" 
                                        id={i} 
                                        src={thumb.img} 
                                        alt={thumb.alt} 
                                    />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Modal 
                show={show}
                onHide={handleClose}
                backdrop = "static"
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 id="portfolioTitle">
                            {title} ({year})
                        </h1>
                    </Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}>X</button>
                </Modal.Header>

                <Modal.Body>
                    <div id="imageContainer">
                        {images.map((image, i) => 
                            <img className = "modalImage" key = {i} src= {image.img} alt= {image.alt}/>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
            <div id="overlay"></div>
        </>
    )
}