"use client";

import React from "react";
import { Manuscript } from "@/lib/Manuscript";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface ManuscriptModalDetailsProps {
  manuscript: Manuscript;
  onMoreInfoClick: (manuscript: Manuscript) => void;
}

const ManuscriptModalDetails: React.FC<ManuscriptModalDetailsProps> = ({
  manuscript,
  onMoreInfoClick,
}) => (
  <div className="border p-4 rounded shadow-lg bg-white">
    <h3 className="text-xl font-bold">{manuscript.title}</h3>
    <p>Identifier: {manuscript.identifier}</p>
    <p>Alternative: {manuscript.alternative}</p>
    <p>City: {manuscript.city}</p>
    <p>Origin: {manuscript.origin}</p>
    <p>Region: {manuscript.region}</p>
    <p>Date: {manuscript.date}</p>
    <p>Institution: {manuscript.institution}</p>
    <p>Provenance: {manuscript.provenance}</p>
    <p>Notes: {manuscript.notes}</p>
    <p>URL: {manuscript.url}</p>
    <button
      onClick={() => onMoreInfoClick(manuscript)}
      className="bg-neutral-200 ml-auto border rounded-md py-1 px-2 w-auto text-sm font-semibold flex flex-rows items-center hover:bg-neutral-300 transition"
    >
      <AiOutlineInfoCircle className="mr-1" />
      More Info
    </button>
  </div>
);

export default ManuscriptModalDetails;
