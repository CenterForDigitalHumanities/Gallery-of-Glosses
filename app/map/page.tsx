"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useFetchedManuscripts } from "@/hooks/useFetchedManuscripts";
import useManuscriptMapModal from "@/hooks/useManuscriptMapModal";
import { getTargetIdByValue } from "@/services";
import { Manuscript } from "@/lib/Manuscript";
import Box from "@/components/Box";
import toast from "react-hot-toast";
import { ManuscriptList, MapControls } from "./components";
import LoadingBox from "@/components/LoadingBox";

// Dynamic import of ManuscriptMap component to prevent SSR
const DynamicManuscriptMap = dynamic(
  () => import("./components/ManuscriptMap"),
  {
    ssr: false,
  }
);

const Map: React.FC = () => {
  const router = useRouter();

  // State for the lower and upper years and selected map
  const [yearLow, setYearLow] = useState<number>(1000);
  const [yearHigh, setYearHigh] = useState<number>(2000);
  const [mapSelected, setMapSelected] = useState<string>("Glossing-Matthew");

  // Using custom hook to fetch manuscripts
  const { manuscripts, isLoading: isLoadingManuscripts } =
    useFetchedManuscripts(mapSelected);

  // Using custom hook for manuscript modal
  const manuscriptModal = useManuscriptMapModal();

  // Handler for marker click, opens a modal with selected manuscripts
  const handleMarkerClick = (selectedManuscripts: Manuscript[]) => {
    if (selectedManuscripts) {
      manuscriptModal.selectedManuscripts = selectedManuscripts;
      manuscriptModal.minYear = yearLow;
      manuscriptModal.maxYear = yearHigh;
      return manuscriptModal.onOpen();
    }
  };

  // Handler for more info click, loads specific manuscript and redirects to its page
  const handleMoreInfoClick = async (manuscript: Manuscript) => {
    toast.success("Loading Manuscript... Please wait");
    try {
      const targetId = await getTargetIdByValue(
        "identifier",
        manuscript.identifier
      );
      sessionStorage.setItem("manuscriptData", JSON.stringify(manuscript));

      router.push(`/manuscript/${targetId}`);
    } catch (error) {
      console.error("Error getting target id:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex gap-4 p-8">
        <Box className="w-[70%] h-[87vh] bg-bgColor rounded-md p-8 border-gold border overflow-auto">
          <p className="font-bold text-lg">
            Current Location of {mapSelected} Manuscripts
          </p>
          {isLoadingManuscripts ? (
            <LoadingBox label="map" />
          ) : (
            <DynamicManuscriptMap
              yearLow={yearLow}
              yearHigh={yearHigh}
              manuscripts={manuscripts}
              handleMarkerClick={handleMarkerClick}
            />
          )}
        </Box>
        <Box className="w-[30%] rounded-md p-8 overflow-auto">
          <MapControls
            yearLow={yearLow}
            yearHigh={yearHigh}
            mapSelected={mapSelected}
            setYearLow={setYearLow}
            setYearHigh={setYearHigh}
            setMapSelected={setMapSelected}
          />
          <ManuscriptList
            manuscripts={manuscripts}
            yearLow={yearLow}
            yearHigh={yearHigh}
            onMoreInfoClick={handleMoreInfoClick}
          />
        </Box>
      </div>
    </div>
  );
};

export default Map;
