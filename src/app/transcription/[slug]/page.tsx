"use client";

import { RERUM } from "@/configs/rerum-links";
import { useGlossInstance } from "@/hooks/useGlossInstance";
import { usePathname } from "next/navigation";
import { useTranscriptionInstance } from "@/hooks/useTranscriptionInstance";

function ReferencesListItems(props: {
  reference: string;
  referenceIndex: number;
  maxReferences: number;
}) {
  const gloss = useGlossInstance(props.reference);
  const glossId = props.reference.split("/").pop();
  return (
    <a href={`/gloss/${glossId}`} className="text-blue-500 hover:underline">
      {gloss
        ? gloss.title +
          (props.referenceIndex < props.maxReferences - 1 ? ", " : "")
        : "Loading..."}
    </a>
  );
}

const TranscriptionInstance = () => {
  const pathname = usePathname();

  const targetId = RERUM + pathname.split("/transcription/")[1];
  const transcription = useTranscriptionInstance(targetId);

  const blurredStyles = "filter blur-md opacity-50";

  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1
          className={`text-2xl font-bold mb-4 ${!transcription && blurredStyles}`}
        >
          {transcription ? transcription.title : "Not found"}
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <p>
            <span className="font-semibold">Shelfmark:</span>{" "}
            <span className={`${!transcription && blurredStyles}`}>
              {transcription ? transcription.identifier : "Not found"}
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
              {transcription
                ? transcription.references &&
                  transcription.references.map((reference, referenceIndex) => {
                    return (
                      <ReferencesListItems
                        key={reference}
                        reference={reference}
                        referenceIndex={referenceIndex}
                        maxReferences={transcription?.references?.length ?? 0}
                      />
                    );
                  })
                : "Not found"}
            </span>
          </p>
        </div>
        <div className="rounded-xl shadow-inner">
          <p>
            <span className="font-semibold">Text:</span>{" "}
            <span className={`${!transcription && blurredStyles}`}>
              {transcription ? transcription.textValue : "Not found"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionInstance;
