import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function HeaderSlider() {
    return (
        <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 2000 }}
            spaceBetween={10}
            slidesPerView={1}
            className="mt-8"
            breakpoints={{
                // when window width is >= 320px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                // when window width is >= 480px
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                // when window width is >= 640px
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
            }}
        >
            <SwiperSlide>
                <img className="w-full rounded" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className="w-full rounded" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className="w-full rounded" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className="w-full rounded" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className="w-full rounded" src="/sliderImage.jpg" alt="" />
            </SwiperSlide>
        </Swiper>
    );
}
