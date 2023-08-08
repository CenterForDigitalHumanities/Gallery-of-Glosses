"use client";

import { getTargetIdByValue } from "@/services";
import Modal from "@/components/Modal";
import useManuscriptMap from "@/hooks/useManuscriptMapModal";
import { Manuscript } from "@/lib/Manuscript";
import { useRouter } from "next/navigation";
import ManuscriptModalDetails from "./ManuscriptModalDetails";
import toast from "react-hot-toast";

const ManuscriptMapModal = () => {
  const ManuscriptMap = useManuscriptMap(); // Getting the map data using the useManuscriptMap hook.
  const router = useRouter(); // Initialize the Next.js router.

  const onChange = (open: boolean) => {
    if (!open) {
      ManuscriptMap.onClose(); // When the modal is closed, call the onClose function from the ManuscriptMap.
    }
  };

  const title =
    ManuscriptMap?.selectedManuscripts[0]?.origin.split("?")[0] || ""; // Get the origin of the first selected manuscript.

  const filteredManuscripts = ManuscriptMap.selectedManuscripts.filter(
    (manuscript: Manuscript) =>
      manuscript.date >= ManuscriptMap.minYear &&
      manuscript.date <= ManuscriptMap.maxYear
  ); // Filter the selected manuscripts based on the date.

  const handleMoreInfoClick = async (manuscript: Manuscript) => {
    toast.success("Loading Manuscript... Please wait"); // Show a toast notification.
    try {
      const targetId = await getTargetIdByValue(
        "identifier",
        manuscript.identifier
      ); // Get the target ID based on the manuscript's identifier.

      sessionStorage.setItem("manuscriptData", JSON.stringify(manuscript)); // Save the manuscript data to the session storage.

      router.push(`/manuscript/${targetId}`); // Navigate to the manuscript page.
      ManuscriptMap.onClose(); // Close the map.
    } catch (error) {
      console.error("Error getting target id:", error); // Log the error.
    }
  };

  return (
    <Modal
      title=""
      description=""
      isOpen={ManuscriptMap.isOpen}
      onChange={onChange}
    >
      <div>
        <h1 className="text-center text-2xl mb-2">
          Manuscripts from {title} between the years of {ManuscriptMap.minYear}{" "}
          and {ManuscriptMap.maxYear}
        </h1>
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[600px] border">
          {filteredManuscripts.map((manuscript: Manuscript) => (
            <ManuscriptModalDetails
              key={manuscript.identifier}
              manuscript={manuscript}
              onMoreInfoClick={handleMoreInfoClick}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ManuscriptMapModal;
