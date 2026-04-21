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
                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="1"
                        src = {carouselImages.thumb1} 
                        alt = "1" 
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="2" 
                        src = {carouselImages.thumb2} 
                        alt = "2" 
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="3" 
                        src = {carouselImages.thumb3} 
                        alt = "3" 
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="4" 
                        src = {carouselImages.thumb4} 
                        alt = "4" 
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="5" 
                        src = {carouselImages.thumb5} 
                        alt = "5" 
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="6" 
                        src = {carouselImages.thumb6} 
                        alt = "6" 
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="7" 
                        src = {carouselImages.thumb7} 
                        alt = "7" 
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img 
                        loading="lazy" 
                        className="swiper-image" 
                        id="8" 
                        src = {carouselImages.thumb8} 
                        alt = "8" 
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}