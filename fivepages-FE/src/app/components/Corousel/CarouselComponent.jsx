"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React,{ useCallback } from "react";

// Memoize CarouselComponent to avoid unnecessary re-renders
const CarouselComponent = React.memo(({ books }) => {
  const router = useRouter();

  if (!books || books.length === 0) {
    return <p className="text-xl text-center my-2">Loading images...</p>;
  }

  // Memoize the handleClick function using useCallback
  const handleClick = useCallback((id) => {
    router.push(`/novels/${id}`);
  }, [router]);

  return (
    <div className="w-full my-4 bg-white p-4">
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
        {books.map((book) => (
          <SwiperSlide key={book._id} className="p-4 my-4">
            <button
              onClick={() => handleClick(book._id)} // Single onClick handler
              className="w-full"
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-[32rem] object-cover rounded-lg shadow-md cursor-pointer"
                loading="lazy" // Lazy load images
              />
            </button>
            <h3 className="text-center mt-2 font-semibold">{book.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default CarouselComponent;
