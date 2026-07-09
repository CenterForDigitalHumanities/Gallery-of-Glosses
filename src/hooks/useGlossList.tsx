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

      setGlosses([]);

      const fetchGloss = async (item: { "@id": string }) => {
        try {
          const targetId = item["@id"];
          const res = await grabProperties(targetId);
          const data = await res.json();
          let gloss: Record<string, any> = {};
          for (const item of data) {
            if (!item?.body) continue;
            const rawKey = Object.keys(item.body)[0];
            // Extract short property name from RERUM URL (e.g., "document" from "...#document")
            const key = rawKey.includes("#") ? rawKey.split("#").pop() ?? rawKey : rawKey;
            gloss[key] = item.body[rawKey].value ?? item.body[rawKey];
          }
          return processGloss(gloss, targetId);
        } catch (err) {
          console.error(`Failed to fetch gloss ${item["@id"]}:`, err);
          return null;
        }
      };

      const tasks = collectionList.itemListElement.map(async (item) => {
        const gloss = await fetchGloss(item);
        if (gloss) {
          setGlosses((prevGlosses) => [...prevGlosses, gloss]);
        }
      });

      await Promise.allSettled(tasks);
      setLoading(false);
    }
    fetchGlossAndProcessProperties();
  }, []);

  return { glosses, loading };
};
