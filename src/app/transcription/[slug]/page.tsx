"use client";

import { RERUM } from "@/configs/rerum-links";
import { useGlossInstance } from "@/hooks/useGlossInstance";
import { usePathname } from "next/navigation";

const TranscriptionInstance = () => {
  const pathname = usePathname();

  const targetId = RERUM + pathname.split("/transcription/")[1];
  // const transcription = useGlossInstance(targetId);

  const blurredStyles = "filter blur-md opacity-50";

  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1 className={`text-2xl font-bold mb-4 ${blurredStyles}`}>
          {transcription ? transcription.title : "Not found"}
        </h1>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <p>
          <span className="font-semibold">Shelfmark:</span>{" "}
          <span className={`${!transcription && blurredStyles}`}>
            {transcription ? transcription.identifier : "Not found"}
          </span>
        </p>
        <p>
          <span className="font-semibold">Text:</span>{" "}
          <span className={`${!transcription && blurredStyles}`}>
            {transcription ? transcription.textValue : "Not found"}
          </span>
        </p>
        <p>
          <span className="font-semibold">Language:</span>{" "}
          <span className={`${!transcription && blurredStyles}`}>
            {transcription ? transcription.textLanguage : "Not found"}
          </span>
        </p>
        <p>
          <span className="font-semibold">Language:</span>{" "}
          <span className={`${!transcription && blurredStyles}`}>
            {transcription ? transcription.textLanguage : "Not found"}
          </span>
        </p>
        <p>
          <span className="font-semibold">Attached Glosses:</span>{" "}
          <span className={`${!transcription && blurredStyles}`}>
            {transcription ? (
              <ul>
                {transcription.references.map((reference) => {
                  let gloss = useGlossInstance(reference);
                  let glossId = reference.split("/").pop();
                  return (
                    <li>
                      <a href={`/gloss/${glossId}`}>
                        gloss ? gloss.title : "Loading..."
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              "Not found"
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TranscriptionInstance;
