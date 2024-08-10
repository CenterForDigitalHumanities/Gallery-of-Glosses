import { useState, useEffect } from "react";
import {
  grabWitnessFromFragment,
  processWitness,
  grabProperties,
} from "@/lib/utils";

/**
 * Fetches the Witness from a fragment identifier and processes it.
 * @param fragmentIdentifier The identifier value of the Witness fragment.
 */
export const useTranscriptionWitness = (fragmentIdentifier: string) => {
  const [witness, setWitness] = useState<ProcessedWitness>();

  async function fetchWitnessAndProcessProperties() {
    const fetchedWitness = await grabWitnessFromFragment(fragmentIdentifier);
    if (fetchedWitness) {
      const res = await grabProperties(fetchedWitness["@id"]);
      const data = await res.json();

      const witnessProperties = data.map((item: { body: any }) => item.body);
      const processedWitness = processWitness(
        witnessProperties,
        fetchedWitness["@id"],
      );
      setWitness(processedWitness);
    }
  }

  useEffect(() => {
    fetchWitnessAndProcessProperties();
  }, [fragmentIdentifier]);

  return witness;
};
