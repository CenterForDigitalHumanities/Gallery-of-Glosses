"use client";

import { RERUM } from "@/configs/rerum-links";
import { useGlossInstance } from "@/hooks/useGlossInstance";
import { usePathname } from "next/navigation";

const GlossInstance = () => {
  const pathname = usePathname();
  const targetId = RERUM + pathname.split("/gloss/")[1];
  const gloss = useGlossInstance(targetId);

  return (
    <div>
      {gloss && (
        <div className="text-foreground p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4 ">{gloss.title}</h1>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <p>
              <span className="font-semibold">Collection:</span>{" "}
              {gloss.targetCollection}
            </p>
            <p>
              <span className="font-semibold">Chapter:</span>{" "}
              {gloss.targetChapter}
            </p>
            <p>
              <span className="font-semibold">Verse:</span> {gloss.targetVerse}
            </p>
            <p>
              <span className="font-semibold">Language:</span>{" "}
              {gloss.textLanguage}
            </p>
            <p>
              <span className="font-semibold">Format:</span> {gloss.textFormat}
            </p>
            <p>
              <span className="font-semibold">Tags:</span> {gloss.tags}
            </p>
          </div>
          <div className="rounded-xl shadow-inner">
            <p className="text-justify">{gloss.textValue}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlossInstance;
