"use client";
import { useEffect, useState } from "react";
import { fetchCarouselImages } from "../../utlis/api";

const CarouselComponent = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const carouselData = await fetchCarouselImages();
      setImages(carouselData);
    };

    fetchData();
  }, []);

  return (
    <div className="carousel-container">
      {images.length > 0 ? (
        images.map((image, index) => (
          <img key={index} src={image.url} alt={`Slide ${index + 1}`} className="carousel-image" />
        ))
      ) : (
        <p className="text-xl text-center my-2">Loading images...</p>
      )}
    </div>
  );
};

export default CarouselComponent;
