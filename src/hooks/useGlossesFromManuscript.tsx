import { useState, useEffect } from "react";
import {
  grabGlossesFromManuscript,
  grabProperties,
  processGloss,
} from "@/lib/utils";
import { GENERATOR } from "@/configs/rerum-links";

export const useGlossesFromManuscript = (manuscriptId: string) => {
  const [glosses, setGlosses] = useState<ProcessedGloss[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // We want the Set of Manuscripts that say they contain this Gloss.
  
  async function expand(targetId:string) {
    try{
      const res = await grabProperties(targetId)
      const data = await res.json()
      let constructed = {}
      for(const item of data){
        if(!item?.body) continue
        const key = Object.keys(item.body)[0]
        constructed[key] = item.body[key].value ?? item.body[key]
      }
      return Promise.resolve(constructed)
    }
    catch(err){
      return Promise.reject(err)
    }
  }

  useEffect(() => {
    async function fetchGlossesAndProcessProperties() {
      console.log("GRAB GLOSSES WITH SPECIAL HOOK")
      const glossesList: string[] = await grabGlossesFromManuscript(manuscriptId);
      console.log("HAVE GLOSSES "+glossesList.length)
      if (glossesList && glossesList.length > 0) {
        for (let item of glossesList) {
          console.log("ITEM")
          console.log(item)
          const glossId = item
          const glossProperties = await expand(glossId);
          const processedGloss = processGloss(
            glossProperties,
            glossId,
          );
          setGlosses((prevGlosses) => [...prevGlosses, processedGloss]);
        }
      }
      setLoading(false);
    }
    fetchGlossesAndProcessProperties();
  }, [manuscriptId]);

  return { glosses, loading };
};
