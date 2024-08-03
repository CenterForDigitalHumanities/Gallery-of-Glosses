import { useState, useEffect } from "react";
import {
  grabGlossWitnessFragments,
  grabProperties,
  processTranscriptionAnnotations,
} from "@/lib/utils";

export const useGlossTranscriptionAnnotations = (targetId: string) => {
  const [transcriptionAnnotations, setTranscriptionAnnotations] = useState<
    ProcessedTranscriptionAnnotations[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchTranscriptionsAndProcessProperties() {
    const witnessFragmentList = await grabGlossWitnessFragments(targetId);

    if (witnessFragmentList && witnessFragmentList.itemListElement) {
      for (let item of witnessFragmentList.itemListElement) {
        const fragmentTargetId = item["@id"];
        const res = await grabProperties(fragmentTargetId);
        const data = await res.json();
        const processedTranscriptionAnnotations =
          processTranscriptionAnnotations(data, fragmentTargetId);

        setTranscriptionAnnotations((prevTranscriptionAnnotations) => [
          ...prevTranscriptionAnnotations,
          processedTranscriptionAnnotations,
        ]);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchTranscriptionsAndProcessProperties();
  }, [targetId]);

  return { transcriptionAnnotations, loading };
};
