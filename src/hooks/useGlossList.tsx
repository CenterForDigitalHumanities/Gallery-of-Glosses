import { useState, useEffect } from "react";
import {
  GrabGlossProperties,
  GrabProductionGlosses,
  processGloss,
} from "@/lib/utils";

export const useGlossList = () => {
  const [glosses, setGlosses] = useState<ProcessedGloss[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchGlossAndProcessProperties() {
    const collectionList = await GrabProductionGlosses();

    if (collectionList && collectionList.itemListElement) {
      for (let item of collectionList.itemListElement) {
        const targetId = item["@id"];
        const res = await GrabGlossProperties(targetId);
        const data = await res.json();
        const gloss = data.map((item: { body: any }) => item.body);
        const processedGloss = processGloss(gloss, targetId);

        setGlosses((prevGlosses) => [...prevGlosses, processedGloss]);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchGlossAndProcessProperties();
  }, []);

  return { glosses, loading };
};
