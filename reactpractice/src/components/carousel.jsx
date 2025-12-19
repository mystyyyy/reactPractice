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
import thumb1 from "../assets/portfolio1.png";
import thumb2 from "../assets/portfolio2.png";
import thumb3 from "../assets/portfolio3.png";


// Source: https://swiperjs.com/react
// Source: https://stackoverflow.com/questions/63052586/react-swiperjs-autoplay-not-making-the-swiper-to-auto-swipe
export default function CreateCarousel(){
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
            <SwiperSlide>
                <img classname="swiper-image" src = {thumb1} alt = "1"/>
            </SwiperSlide>

            <SwiperSlide>
                <img classname="swiper-image" src = {thumb2} alt = "2"/>
            </SwiperSlide>

            <SwiperSlide>
                <img classname="swiper-image" src = {thumb3} alt = "3"/>
            </SwiperSlide>
        </Swiper>
    );
}