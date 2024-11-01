import { useState, useEffect } from "react";
import {
  grabProperties,
  grabProductionWitnesses,
  processWitness,
} from "@/lib/utils";

export const useWitnessList = () => {
  const [witnesses, setWitnesses] = useState<ProcessedWitness[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchWitnessAndProcessProperties() {
    const collectionList = await grabProductionWitnesses();

    if (collectionList && collectionList.itemListElement) {
      for (let item of collectionList.itemListElement) {
        const targetId = item["@id"];
        const res = await grabProperties(targetId);
        const data = await res.json();
        const witness = data.map((item: { body: any }) => item.body);
        const processedWitness = processWitness(witness, targetId);

        setWitnesses((prevWitnesses) => [...prevWitnesses, processedWitness]);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchWitnessAndProcessProperties();
  }, []);

  return { witnesses: witnesses, loading };
};
