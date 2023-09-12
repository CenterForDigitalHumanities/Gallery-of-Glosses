"use client";

import { useState } from "react";
import { getImages } from "@/services";
import Image from "next/image";

interface ImageSliderProps {
  baseProject: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ baseProject }) => {
  // State to hold the current index of the image to display
  const [currentIndex, setCurrentIndex] = useState(0);

  // Retrieve the image URLs from the getImages function
  const imageUrls = getImages(baseProject);

  // Function to decrease the currentIndex (move left in the image slider)
  const goLeft = () =>
    setCurrentIndex((currentIndex - 1 + imageUrls.length) % imageUrls.length);

  // Function to increase the currentIndex (move right in the image slider)
  const goRight = () => setCurrentIndex((currentIndex + 1) % imageUrls.length);

  // If there are no images, display a message instead of an image slider
  if (imageUrls.length === 0) return <div> No Images Available</div>;

  // Image slider component
  return (
    <div className="image-slider shadow-lg">
      {/* Display the image on the left if it exists */}
      {currentIndex !== 0 && (
        <Image
          width={1000}
          height={1000}
          alt={""}
          onClick={goLeft}
          src={imageUrls[currentIndex - 1]}
          loading="lazy"
          className="left-img-slider"
        />
      )}

      {/* Display the main image */}
      <Image
        width={1000}
        height={1000}
        className="main-img-slider"
        src={imageUrls[currentIndex]}
        loading="lazy"
        alt="Manuscript image"
      />

      {/* Display the image on the right if it exists */}
      {currentIndex !== imageUrls.length - 1 && (
        <Image
          width={1000}
          height={1000}
          alt={""}
          onClick={goRight}
          src={imageUrls[currentIndex + 1]}
          loading="lazy"
          className="right-img-slider"
        />
      )}

      {/* Navigation bar with buttons to jump to a specific image */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center space-x-3 p-4">
        {imageUrls.map((_, index) => (
          <button
            className={`w-4 h-4 rounded-full transition-all duration-200 ease-in-out ${
              currentIndex === index
                ? "bg-black"
                : "bg-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => setCurrentIndex(index)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
