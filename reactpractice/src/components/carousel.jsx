import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import "./carousel.css";

export function Carousel() {
    const swiper = new Swiper('.swiper', {
        loop: true,
        
        pagination: {
            el: '.swiper-pagination',
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        autoplay: {
            delay: 4000,
            pauseOnMouseEnter: true,
        },
    });

    return(
        <>
            <h1>My Portfolio!</h1>


            <div class = "swiper">
                <div class = "swiper-wrapper">
                    <div class = "swiper-slide">1</div>
                    <div class = "swiper-slide">2</div>
                    <div class = "swiper-slide">3</div>  
                </div>

                <div clasas = "swiper-pagination"></div>

                <div class = "swiper-button-prev"></div>
                <div class = "swiper-button-next"></div>      
            </div>  
        </>
    );
}

export default function CreateCarousel(){
    return (
        <Carousel />
    );
}