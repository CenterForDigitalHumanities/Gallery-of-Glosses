"use client";

import { useEffect, useState, useRef } from "react";
import ContentCard from "./ContentCard";
import CustomScrollbar from "./CustomScrollbar";
import { aboutSections } from "@/data/constants";

// The AboutContent component displays information about the Gallery of Glosses
// in a horizontally scrolling track, controlled by the mouse wheel.
export const AboutContent = () => {
  // State to keep track of the horizontal scroll position
  const [scroll, setScroll] = useState(0);
  // Ref to the div that will be scrolled
  const scrollDiv = useRef<HTMLDivElement | null>(null);

  // This effect attaches an event listener to the scrollDiv,
  // to handle the 'wheel' event for custom horizontal scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Calculate the new scroll position
      let newScroll = scroll - e.deltaY / 15;
      // Restrict the scroll position to between -48 and 0
      if (newScroll < -48) newScroll = -48;
      if (newScroll > 0) newScroll = 0;
      setScroll(newScroll);
    };

    const scrollDivCurrent = scrollDiv.current;
    if (scrollDivCurrent) {
      scrollDivCurrent.addEventListener("wheel", handleWheel);
    }

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      if (scrollDivCurrent) {
        scrollDivCurrent.removeEventListener("wheel", handleWheel);
      }
    };
  }, [scroll]); // Re-run the effect if the scroll position changes

  return (
    <div>
      <h1 className="text-4xl text-white ml-2">About Gallery of Glosses</h1>
      <div
        className="overflow-hidden h-[75vh] flex items-center"
        ref={scrollDiv}
      >
        {/* The transform property is used to create the scrolling effect */}
        <div
          style={{
            transform: `translate(${scroll}%)`,
            transition: "transform 1s ease-out",
          }}
          className="card-track"
        >
          {/* Each section from aboutSections is displayed in a ContentCard */}
          {aboutSections.map((section, index) => (
            <ContentCard
              key={index}
              title={section.title}
              content={section.content}
            >
              <div className="pt-[5vh]" />
            </ContentCard>
          ))}
        </div>
      </div>
      {/* CustomScrollbar component displays the current scroll position */}
      <CustomScrollbar scroll={scroll} total={-48} />
    </div>
  );
};
