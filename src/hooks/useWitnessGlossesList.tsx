import { useState, useEffect } from "react";
import {
  grabProperties,
  processGloss,
  processTranscriptionAnnotations,
  grabWitnessFragments,
} from "@/lib/utils";

/**
 * Fetches the attached Glosses for the Witness at the given Witness
 * @param witnessIdentifier The identifier of the Witness to fetch attached Glosses for
 */
export const useWitnessGlossesList = (
  witnessIdentifier: string | undefined,
) => {
  const [glosses, setGlosses] = useState<ProcessedGloss[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Fetches and processes a fragment of the Witness
   */
  async function fetchFragmentAndProcessProperties(fragmentTargetId: string) {
    const res = await grabProperties(fragmentTargetId);
    const data = await res.json();

    const fetchedFragment = data.map((item: { body: any }) => item.body);
    return processTranscriptionAnnotations(fetchedFragment, fragmentTargetId);
  }

  /**
   * Fetches and processes Glosses referenced by a Witness fragment
   */
  async function fetchGlossesAndProcessProperties(
    fragment: ProcessedTranscriptionAnnotations,
  ) {
    if (fragment.references) {
      for (let glossId of fragment.references) {
        const res = await grabProperties(glossId);
        const data = await res.json();
        const gloss = data.map((item: { body: any }) => item.body);
        const processedGloss = processGloss(gloss, glossId);

        setGlosses((prevGlosses) => [...prevGlosses, processedGloss]);
      }
    }
  }

  async function fetchWitnessFragmentsAndGlosses() {
    if (!witnessIdentifier) return;
    const witnessFragmentList = await grabWitnessFragments(witnessIdentifier);

    if (witnessFragmentList && witnessFragmentList.length > 1) {
      for (let item of witnessFragmentList) {
        // Fetch and process Witness fragment
        const fragmentTargetId = item["@id"];
        const processedFragment =
          await fetchFragmentAndProcessProperties(fragmentTargetId);

        // Fetch and process Glosses referenced by the fragment
        fetchGlossesAndProcessProperties(processedFragment);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchWitnessFragmentsAndGlosses();
  }, [witnessIdentifier]);

  return { glosses, loading };
};
