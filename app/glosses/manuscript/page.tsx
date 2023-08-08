"use client";

import { useEffect, useState } from "react";
import { GlossColumns } from "../components/GlossColumns";
import { DataTable } from "@/components/DataTable";
import { Gloss } from "@/lib/Gloss";
import Sidebar from "../components/Sidebar";
import { useFetchedManuscripts } from "@/hooks/useFetchedManuscripts";
import Box from "@/components/Box";
import LoadingBox from "@/components/LoadingBox";

export default function ManuscriptPage() {
  // Use state to handle selected manuscript and its corresponding glosses
  const [selectedManuscript, setSelectedManuscript] = useState("");
  const [glosses, setGlosses] = useState<Gloss[]>([]);

  // Use state to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // Fetch manuscripts from "Glossing-Matthew"
  const { manuscripts, isLoading: isLoadingManuscripts } =
    useFetchedManuscripts("Glossing-Matthew");

  // Define a function to fetch objects by manuscript
  const fetchObjectsByManuscript = async (manuscript: string) => {
    // TODO: Fetch glosses related to the selected manuscript
  };

  // Handle click on "Browse" button
  const handleBrowseClick = () => {
    setIsLoading(true);
    fetchObjectsByManuscript(selectedManuscript);
  };

  // Prevent scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Render ManuscriptPage component
  return (
    <div className="flex gap-4 p-8">
      <Box className="h-[77vh] rounded-md p-8 overflow-auto flex gap-4">
        <div className="w-[75%] bg-gray-100 p-4 rounded-md">
          <DataTable columns={GlossColumns} data={glosses} />
          {isLoading && <LoadingBox label="Glosses" />}
        </div>
        <div className="w-[25%] bg-gray-100 p-4 rounded-md">
          <Sidebar />
          <p className="py-2">
            Glosses of course appear in individual manuscripts. If you want to
            see all of the glosses transcribed out of a particular manuscript,
            you can do so here.
          </p>
          <select
            className="mb-2 border-2 border-gray-200 rounded-sm w-full p-2 px-3"
            onChange={(e) => setSelectedManuscript(e.target.value)}
          >
            <option value="">Show All Glosses</option>
            {manuscripts.map((manuscript, index) => (
              <option key={index} value={manuscript.title}>
                {manuscript.title}
              </option>
            ))}
          </select>
          <button
            className="hover:bg-primaryHover shadow-sm bg-primary text-white px-4 rounded-md py-1 items-center gap-2"
            onClick={handleBrowseClick}
          >
            Browse by this manuscript
          </button>
          {isLoading && <LoadingBox label="Glosses" />}
        </div>
      </Box>
    </div>
  );
}
