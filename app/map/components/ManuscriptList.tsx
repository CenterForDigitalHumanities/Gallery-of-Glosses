import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Manuscript } from "@/lib/Manuscript";

interface ManuscriptListProps {
  manuscripts: Manuscript[];
  yearLow: number;
  yearHigh: number;
  onMoreInfoClick: (manuscript: Manuscript) => void;
}

const ManuscriptList: React.FC<ManuscriptListProps> = ({
  manuscripts,
  yearLow,
  yearHigh,
  onMoreInfoClick,
}) => {
  return (
    <div className="overflow-auto border border-gray-800 h-[450px] shadow-lg p-4 my-2">
      <div className="mb-2 font-semibold">
        Manuscripts between {yearLow} and {yearHigh}:
      </div>
      <div className="px-2">
        {manuscripts.map(
          (manuscript) =>
            yearLow <= manuscript.date &&
            yearHigh >= manuscript.date &&
            manuscript.origin !== "" && (
              <div
                className="border-b flex flex-col py-2"
                key={`${manuscript.title}-${manuscript.identifier}`}
              >
                <p>Siglum: {manuscript.alternative}</p>
                <p>Origin: {manuscript.origin}</p>
                <p>Originated from the time: {manuscript.date}</p>
                <button
                  onClick={() => onMoreInfoClick(manuscript)}
                  className="bg-neutral-500 text-neutral-300 ml-auto border border-neutral-800 rounded-md py-1 px-2 w-auto text-sm font-semibold flex flex-rows items-center hover:bg-neutral-800 transition"
                >
                  <AiOutlineInfoCircle className="mr-1" />
                  More Info
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ManuscriptList;
