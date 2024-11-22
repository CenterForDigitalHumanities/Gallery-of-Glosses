import { useState, useEffect } from "react";
import {
  grabManuscriptsContainingGloss,
  grabProperties,
  processManuscript,
} from "@/lib/utils";
import { GENERATOR } from "@/configs/rerum-links";

export const useManuscriptsReferencingGloss = (glossId: string) => {
  const [manuscripts, setManuscripts] = useState<ProcessedManuscript[]>([]);
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

  async function fetchGlossWitnessesAndProcessProperties() {
    const manuscriptsList = await grabManuscriptsContainingGloss(glossId);
    if (manuscriptsList && manuscriptsList.length > 0) {
      for (let item of manuscriptsList) {
        const manuscriptId = item["@id"];
        const manuscriptProperties = await expand(manuscriptId);
        const processedManuscript = processManuscript(
          manuscriptProperties,
          manuscriptId,
        );
        setManuscripts((prevManuscript) => [...prevManuscript, processedManuscript]);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchGlossWitnessesAndProcessProperties();
  }, [glossId]);

  return { manuscripts, loading };
};
