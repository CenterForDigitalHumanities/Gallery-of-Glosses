"use client";

import Image from "next/image";
import React, { useState } from "react";

interface HistoryCardProps {
  // Image URL to be displayed in the card
  imglocation: string;
}

// HistoryCard is a component that displays an image,
// which can be clicked to view in a full-screen modal.
const HistoryCard: React.FC<HistoryCardProps> = ({ imglocation }) => {
  // State to manage the visibility of the full-screen image modal
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4">
      <Image
        src={imglocation}
        alt={imglocation}
        // CSS classes applied to the image, includes pointer on hover and animations
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md w-full h-[12vw]"
        width={1000}
        height={1000}
        // Opens the full-screen image modal when the image is clicked
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div
          // Full-screen modal overlay, with semi-transparent black background
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          // Closes the full-screen image modal when the overlay is clicked
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-h-[80vh] overflow-auto">
            <Image
              src={imglocation}
              alt={imglocation}
              width={1000}
              height={1000}
              // CSS classes applied to the full-screen image
              className="transition duration shadow-xl rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryCard;
