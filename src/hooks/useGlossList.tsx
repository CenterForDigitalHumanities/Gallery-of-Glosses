import { useState, useEffect } from "react";
import {
  grabProperties,
  grabProductionGlosses,
  processGloss,
} from "@/lib/utils";
import { type ProcessedGloss } from "@/lib/Gloss";

export const useGlossList = () => {
  const [glosses, setGlosses] = useState<ProcessedGloss[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function fetchGlossAndProcessProperties() {
      const collectionList = await grabProductionGlosses();
      if (!collectionList || !collectionList.itemListElement) {
        setLoading(false);
        return;
      }

      const fetchGloss = async (item: { "@id": string }) => {
        try {
          const targetId = item["@id"];
          const res = await grabProperties(targetId);
          const data = await res.json();
          let gloss: Record<string, any> = {};
          for (const d of data) {
            if (!d?.body) continue;
            const key = Object.keys(d.body)[0];
            gloss[key] = d.body[key].value ?? d.body[key];
          }
          return processGloss(gloss, targetId);
        } catch (err) {
          console.error(`Failed to fetch gloss ${item["@id"]}:`, err);
          return null;
        }
      };

      const results = await Promise.allSettled(
        collectionList.itemListElement.map(fetchGloss)
      );

      const successfulGlosses = results
        .filter(
          (r): r is PromiseFulfilledResult<ProcessedGloss> =>
            r.status === "fulfilled"
        )
        .map((r) => r.value)
        .filter((gloss): gloss is ProcessedGloss => gloss !== null);

      setGlosses(successfulGlosses);
      setLoading(false);
    }
    fetchGlossAndProcessProperties();
  }, []);

  return { glosses, loading };
};
