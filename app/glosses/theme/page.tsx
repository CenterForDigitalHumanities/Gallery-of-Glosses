"use client";

import { useEffect, useState } from "react";
import { GlossColumns } from "../components/GlossColumns";
import { DataTable } from "@/components/DataTable";
import { Gloss } from "@/lib/Gloss";
import Sidebar from "../components/Sidebar";
import Box from "@/components/Box";
import LoadingBox from "@/components/LoadingBox";

export default function Theme() {
  const [theme, setTheme] = useState(""); // Added state to manage book selection
  const [glosses, setGlosses] = useState<Gloss[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Initially set to false

  // Fetch objects by theme
  const fetchObjectsByTheme = async (theme: string) => {
    // TODO: ONCE THEME IS IMPLEMENTED
  };

  const handleBrowseClick = () => {
    setIsLoading(true); // Set loading state to true when button is clicked
    fetchObjectsByTheme(theme); // Fetch glosses for the selected theme
  };

  // disables scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex gap-4 p-8">
      <Box className="h-[77vh] rounded-md p-8 overflow-auto flex gap-4">
        <div className="w-[75%] bg-gray-100 p-4 rounded-md">
          <DataTable columns={GlossColumns} data={glosses} />
        </div>
        <div className="w-[25%] bg-gray-100 p-4 rounded-md">
          <Sidebar />
          <p className="py-2">
            The same theme or topic could be addressed in various glosses on
            different authoritative texts. Here you can browse collections of
            glosses that have been curated around specific research themes.
          </p>
          <select
            className="mb-2 border-2 border-gray-200 rounded-sm w-full p-2 px-3"
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="">Show All Glosses</option>
            {/* Add more options as needed */}
          </select>
          <button
            className="hover:bg-primaryHover shadow-sm bg-primary text-white px-4 rounded-md py-1 items-center gap-1"
            onClick={handleBrowseClick}
          >
            Browse by this Theme
          </button>

          {isLoading && <LoadingBox label="Glosses" />}
        </div>
      </Box>
    </div>
  );
}
