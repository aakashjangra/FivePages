"use client";

import "./Corousel.module.css"; // ✅ Renamed to avoid conflict
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CarouselComponent() {
  // ✅ Renamed component to avoid conflict
  return (
    <div className="carouselContainer ">
      {/* <div className="carouselContainer_heading overflow-hidden ">
        <div className="animate-slide-in text-3xl bg-blue-200 text-center font-bold p-4">
          Day of the Novel
        </div>
      </div> */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="swiper"
      >
        <SwiperSlide className="w-full">
          <img
            className="w-full h-[25rem] object-cover"
            src="/logo.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide className="w-full">
          <img
            className="w-full h-[29.8rem] object-cover"
            src="/logo.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide className="w-full">
          <img
            className="w-full h-[29.8rem] object-cover"
            src="/logo.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide className="w-full">
          <img
            className="w-full h-[29.8rem] object-cover"
            src="/logo.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide className="w-full">
          <img
            className="w-full h-[29.8rem] object-cover"
            src="/logo.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}