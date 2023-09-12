import { Gloss } from "@/lib/Gloss";
import React from "react";

interface GlossDetailsProps {
  gloss: Gloss;
}

// The GlossDetails component displays detailed information about a gloss
export const GlossDetails: React.FC<GlossDetailsProps> = ({ gloss }) => {
  return (
    <table className="basic-table w-full">
      <tbody>
        <tr>
          <td className="px-4 py-2">Title:</td>
          <td className="px-4 py-2">{gloss?.title}</td>
        </tr>

        <tr>
          <td className="px-4 py-2">Target Chapter:</td>
          <td className="px-4 py-2">{gloss?.targetChapter}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Target Verse:</td>
          <td className="px-4 py-2">{gloss?.targetVerse}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Transcribed Gloss:</td>
          <td className="px-4 py-2">{gloss?.transcribedGloss}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Targeted Text:</td>
          <td className="px-4 py-2">{gloss?.targetedText}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Notes:</td>
          <td className="px-4 py-2">{gloss?.notes}</td>
        </tr>
        <tr>
          <td className="px-4 py-2">Tags:</td>
          <td className="px-4 py-2">{gloss?.tags?.items?.join(", ")}</td>
        </tr>
      </tbody>
    </table>
  );
};
