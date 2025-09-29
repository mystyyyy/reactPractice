import React, { useEffect } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import "./carousel.css";

function Carousel(){
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: false}, [Autoplay()]);

    useEffect(() => {
        if (emblaApi){
            console.log(emblaApi.slideNodes());
        }
    })

    return(
        <div className = "embla" ref ={emblaRef}>
            <div className = "embla__container">
                <div className = "embla__slide"><img src = "" alt = "1"/></div>
                <div className = "embla__slide"><img src = "" alt = "2"/></div>
                <div className = "embla__slide"><img src = "" alt = "3"/></div>
            </div>
        </div>
    );
}

export default function CreateCarousel(){
    return (
        <Carousel />
    );
}