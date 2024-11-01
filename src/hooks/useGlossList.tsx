import { useState, useEffect } from "react";
import {
  grabProperties,
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
        const res = await grabProperties(targetId);
        const data = await res.json();
        let gloss = {}
        for(const item of data){
          if(!item?.body) continue
          const key = Object.keys(item.body)[0]
          gloss[key] = item.body[key].value ?? item.body[key]
        }
        //const gloss = data.map((item: { body: any }) => item.body);
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
