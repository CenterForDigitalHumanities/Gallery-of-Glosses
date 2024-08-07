import { useState, useEffect } from "react";
import {
  grabProperties,
  processGloss,
  processTranscriptionAnnotations,
  grabWitnessFragments,
} from "@/lib/utils";

/**
 * Fetches the attached Glosses for the Witness at the given Witness
 * @param witness The Witness to fetch attached Glosses for
 */
export const useWitnessGlossesList = (witness: ProcessedWitness) => {
  const [fragments, setFragments] = useState<
    ProcessedTranscriptionAnnotations[]
  >([]);
  const [glosses, setGlosses] = useState<ProcessedGloss[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Fetches and processes fragments of the Witness
   */
  async function fetchFragmentsAndProcessProperties() {
    const witnessFragmentList = await grabWitnessFragments(witness);

    if (witnessFragmentList && witnessFragmentList.length > 1) {
      for (let item of witnessFragmentList) {
        const fragmentTargetId = item["@id"];
        const res = await grabProperties(fragmentTargetId);
        const data = await res.json();

        const fetchedFragment = data.map((item: { body: any }) => item.body);
        const processedFragment = processTranscriptionAnnotations(
          fetchedFragment,
          fragmentTargetId,
        );
        setFragments((prevFragments) => [...prevFragments, processedFragment]);
      }
    }
  }

  /**
   * Fetches and processes Glosses referenced by the fragments
   */
  async function fetchGlossesAndProcessProperties() {
    for (let fragment of fragments) {
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

    setLoading(false);
  }

  async function fetchWitnessFragmentsAndGlosses() {
    await fetchFragmentsAndProcessProperties();
    fetchGlossesAndProcessProperties();
  }

  useEffect(() => {
    fetchWitnessFragmentsAndGlosses();
  }, [witness]);

  return { glosses, loading };
};
