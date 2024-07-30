import { useState, useEffect } from "react";
import { grabGlossWitnessFragments } from "@/lib/utils";

export const useGlossWitnessFragments = (targetId: string) => {
  const [witnessFragments, setWitnessFragments] = useState<ProcessedGloss[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchWitnessFragments() {
    setWitnessFragments(await grabGlossWitnessFragments(targetId));
    setLoading(false);
  }

  useEffect(() => {
    fetchWitnessFragments();
  }, [targetId]);

  return { witnessFragments: witnessFragments, loading };
};
