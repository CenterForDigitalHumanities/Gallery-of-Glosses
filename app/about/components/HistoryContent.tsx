import Image from "next/image";
import HistoryCard from "./HistoryCard";
import ContentCard from "./ContentCard";
import { useEffect, useState, useRef } from "react";
import CustomScrollbar from "./CustomScrollbar";
import { historySections } from "@/data/constants";

// The HistoryContent component displays the project's history with a custom horizontal scroll effect
export const HistoryContent = () => {
  // State to manage the horizontal scroll position
  const [scroll, setScroll] = useState(0);
  // Ref to the div that will have the custom scroll behavior
  const scrollDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Function to handle the wheel event, providing custom scroll behavior
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      let newScroll = scroll - e.deltaY / 15;
      // Limits for the scroll position
      if (newScroll < -10) newScroll = -10;
      if (newScroll > 0) newScroll = 0;
      setScroll(newScroll);
    };

    const scrollDivCurrent = scrollDiv.current;
    if (scrollDivCurrent) {
      // Attaches the handleWheel function as a listener for the wheel event
      scrollDivCurrent.addEventListener("wheel", handleWheel);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (scrollDivCurrent) {
        scrollDivCurrent.removeEventListener("wheel", handleWheel);
      }
    };
  }, [scroll]);

  return (
    <>
      <h1 className="text-4xl mb-6 text-white ml-2">Project History</h1>
      <div
        className="overflow-hidden h-[75vh] flex items-center"
        ref={scrollDiv}
      >
        <div
          style={{
            transform: `translate(${scroll}%)`,
            transition: "transform 1s ease-out",
          }}
          className="card-track"
        >
          {historySections.map(({ date, image, content }, index) => (
            // Renders each section in historySections as a ContentCard
            <ContentCard key={index} title={date} content={content}>
              {image ? (
                // If an image URL is provided, display a HistoryCard
                <HistoryCard imglocation={image} />
              ) : (
                // Otherwise, display a placeholder image
                <Image
                  src=""
                  alt="placeholder"
                  className="w-full object-cover rounded"
                  width={200}
                  height={64}
                />
              )}
            </ContentCard>
          ))}
        </div>
      </div>
      <CustomScrollbar scroll={scroll} total={-10} />
    </>
  );
};
