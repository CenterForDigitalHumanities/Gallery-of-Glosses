import { useState, useEffect } from "react";
import { grabProperties, processWitness } from "@/lib/utils";

export const useWitnessInstance = (targetId: string) => {
  const [witness, setWitness] = useState<ProcessedManuscript>();

  async function fetchWitnessAndProcessProperties() {
    const res = await grabProperties(targetId);
    const data = await res.json();
    const witness = data.map((item: { body: any }) => item.body);
    setWitness(processWitness(witness, targetId));
  }

  useEffect(() => {
    fetchWitnessAndProcessProperties();
  }, [targetId]);

  return witness;
};
