import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function HeaderSlider() {
    return (
        <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 2000 }}
            spaceBetween={20}
            slidesPerView={4}
            className="mt-8"
        >
            <SwiperSlide>
                <img className="w-full" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className="w-full" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className="w-full" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img  className="w-full" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className="w-full" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
        </Swiper>
    );
}
