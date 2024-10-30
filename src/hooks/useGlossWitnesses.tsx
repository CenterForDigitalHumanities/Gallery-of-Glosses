import { useState, useEffect } from "react";
import {
  grabGlossWitnessFragments,
  grabProperties,
  grabWitnessFromFragment,
  processTranscriptionAnnotations,
  processWitness,
} from "@/lib/utils";

export const useGlossWitnesses = (targetId: string) => {
  console.log("USE GLOSS WITNESSES for id "+targetId)
  const [witnesses, setWitnesses] = useState<ProcessedWitness[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(" ... ")
  
  async function fetchTranscriptionWitnessAndProcessProperties(
    witnessFragment: ProcessedTranscriptionAnnotations,
  ) {
    console.log("fetchTranscriptionWitnessAndProcessProperties")
    if (!witnessFragment.identifier) return;
    const fetchedWitness = await grabWitnessFromFragment(
      witnessFragment.identifier,
    );
    if (fetchedWitness) {
      const res = await grabProperties(fetchedWitness["@id"]);
      const data = await res.json();

      const witnessProperties = data.map((item: { body: any }) => item.body);
      const processedWitness = processWitness(
        witnessProperties,
        fetchedWitness["@id"],
      );
      setWitnesses((prevWitnesses) => [...prevWitnesses, processedWitness]);
    }
  }



  useEffect(() => {
    console.log("use effect in useGlossWitnesses")

    async function fetchGlossWitnessesAndProcessProperties() {
      console.log("fetchGlossWitnessesAndProcessProperties")
      const witnessFragmentList = await grabGlossWitnessFragments(targetId);

      if (witnessFragmentList && witnessFragmentList.length > 1) {
        for (let item of witnessFragmentList) {
          const fragmentTargetId = item["@id"];
          const res = await grabProperties(fragmentTargetId);
          const data = await res.json();

          const annotations = data.map((item: { body: any }) => item.body);
          const processedTranscriptionAnnotations =
            processTranscriptionAnnotations(annotations, fragmentTargetId);

          fetchTranscriptionWitnessAndProcessProperties(
            processedTranscriptionAnnotations,
          );
        }
      }

      setLoading(false);
    }

    fetchGlossWitnessesAndProcessProperties();
  }, [targetId]);

  return { witnesses, loading };
};
