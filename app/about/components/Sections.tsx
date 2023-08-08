import React from "react";
import { menuSections } from "@/data/constants";
import Image from "next/image";

// Interface for the props expected by the Sections component
interface SectionsProps {
  handleChangeContent: (scene: string) => void; // handleChangeContent is a function that accepts a string parameter and does not return anything (void return type)
}

// The Sections component receives a single prop: a function called handleChangeContent
export const Sections: React.FC<SectionsProps> = ({ handleChangeContent }) => (
  <section className="menu-sections">
    {/* 
      For each item in menuSections, render a div that represents a menu section.
      When the div is clicked, call the handleChangeContent function with the 
      content value from the current item.
    */}
    {menuSections.map(({ title, src, content }) => (
      <div
        key={src}
        className="menu-section"
        onClick={() => handleChangeContent(content)}
      >
        {/* Display the image associated with the current item */}
        <Image
          className="menu-section-image"
          src={src}
          width={1000}
          height={1000}
          alt={""}
        />
        {/* Display the title of the current item */}
        <div className="menu-section-label">{title}</div>
      </div>
    ))}
  </section>
);
