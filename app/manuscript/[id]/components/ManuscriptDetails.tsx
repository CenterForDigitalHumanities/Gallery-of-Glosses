import { Manuscript } from "@/lib/Manuscript";
import React from "react";

interface ManuscriptDetailsProps {
  manuscript: Manuscript;
}

export const ManuscriptDetails: React.FC<ManuscriptDetailsProps> = ({
  manuscript,
}) => {
  return (
    <table className="basic-table w-full">
      <tbody>
        <tr>
          <td className="px-4 py-2">Title:</td>
          <td className="px-4 py-2">{manuscript?.title}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Identifier:</td>
          <td className="px-4 py-2">{manuscript?.identifier}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Alternative:</td>
          <td className="px-4 py-2">{manuscript?.alternative}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">City:</td>
          <td className="px-4 py-2">{manuscript?.city}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Origin:</td>
          <td className="px-4 py-2">{manuscript?.origin}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Region:</td>
          <td className="px-4 py-2">{manuscript?.region}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Date:</td>
          <td className="px-4 py-2">{manuscript?.date}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Institution:</td>
          <td className="px-4 py-2">{manuscript?.institution}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Provenance:</td>
          <td className="px-4 py-2">{manuscript?.provenance}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Notes:</td>
          <td className="px-4 py-2">{manuscript?.notes}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">URL:</td>
          <td className="px-4 py-2">{manuscript?.url}</td>
        </tr>
      </tbody>
    </table>
  );
};
