"use client";

import { useEffect, useState } from "react";
import {
  AboutContent,
  HistoryContent,
  TermsContent,
  Sections,
} from "./components";

// The About page component
export default function About() {
  // State variable for controlling the visibility of the menu
  const [menu, setMenu] = useState(false);

  // State variable for controlling the currently displayed content
  const [content, setContent] = useState("About");

  // Function to change the displayed content
  const handleChangeContent = (scene: string) => {
    setContent(scene);
    setMenu(false);
  };

  // Effect hook to disable scrolling on the home page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Menu component that changes visibility based on state */}
      <div className={`menu ${menu ? "menu-open" : "menu-close"}`}>
        <Sections handleChangeContent={handleChangeContent} />
      </div>

      {/* Toggle button for menu */}
      <button
        id="menu-toggle"
        className={`relative ${menu ? "button-open" : "button-close"}`}
        type="button"
        onClick={() => setMenu(!menu)}
      />

      {/* Content display that changes based on state and closes the menu when clicked */}
      <div onClick={() => setMenu(false)}>
        <div
          className={`bg-neutral-900 border-black border-2 w-[93vw] ml-auto rounded-md p-8 ${
            menu ? "move-page-up" : ""
          }`}
        >
          {content === "About" ? (
            <AboutContent />
          ) : content === "History" ? (
            <HistoryContent />
          ) : (
            <TermsContent />
          )}
        </div>
      </div>
    </>
  );
}
