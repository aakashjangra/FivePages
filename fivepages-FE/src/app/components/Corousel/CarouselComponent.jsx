"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CarouselComponent = ({ books }) => {
  const router = useRouter();

  if (!books || books.length === 0) {
    return <p className="text-xl text-center my-2">Loading images...</p>;
  }

  const handleClick = (id) => {
    router.push(`/novels/${id}`); // ✅ Navigate to novel details page
  };

  return (
    <div className="w-full my-4">
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-lg shadow-lg"
      >
        {books.map((book, index) => (
          <SwiperSlide key={index} className="p-4">
            <button onClick={() => router.push(`/novels/${book._id}`)}>
            <img
             onClick={() => handleClick(book._id)}
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-[32rem] object-cover rounded-lg shadow-md cursor-pointer"
              
            />
            </button>
            <h3 className="text-center mt-2 font-semibold">{book.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
