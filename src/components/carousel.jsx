import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "./carousel.css";

import carouselImages from '../assets/carouselImages.js';

// Source: https://swiperjs.com/react
// Source: https://stackoverflow.com/questions/63052586/react-swiperjs-autoplay-not-making-the-swiper-to-auto-swipe
// Source: https://www.freecodecamp.org/news/how-to-set-up-swiper-element-in-a-react-application/#heading-lazy-loading-images
export default function CreateCarousel(){
    return (
        <>
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
                {carouselImages.map((images, i) =>
                    <SwiperSlide>
                        <img 
                            loading="lazy" 
                            className="swiper-image" 
                            id="i"
                            src = {images.img} 
                            alt = {images.alt}
                        />
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    );
}