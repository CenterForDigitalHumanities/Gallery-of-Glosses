import { useState, useEffect } from "react";
import {
  GrabGlossProperties,
  GrabProductionGlosses,
  processGloss,
} from "@/lib/utils";

export const useGlossList = () => {
  const [glosses, setGlosses] = useState<ProcessedGloss[]>([]);

  useEffect(() => {
    async function fetchGlossAndProcessProperties() {
      const collectionList = await GrabProductionGlosses();

      if (collectionList && collectionList.itemListElement) {
        for (let item of collectionList.itemListElement) {
          const targetId = item["@id"];
          const targetIdReq = new Request("/api/ByTargetId", {
            method: "POST",
            body: JSON.stringify({ targetId }),
            headers: { "Content-Type": "application/json" },
          });

          const res = await GrabGlossProperties(targetIdReq);
          const data = await res.json();
          const gloss = data.map((item: { body: any }) => item.body);
          const processedGloss = processGloss(gloss, targetId);

          setGlosses((prevGlosses) => [...prevGlosses, processedGloss]);
        }
      }
    }

    fetchGlossAndProcessProperties();
  }, []);

  return glosses;
};
