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
    async function fetchGlossWitnessesAndProcessProperties() {
      const manuscriptsList: string[] = await grabManuscriptsContainingGloss(glossId);
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
    fetchGlossWitnessesAndProcessProperties();
  }, [glossId]);

  return { manuscripts, loading };
};
