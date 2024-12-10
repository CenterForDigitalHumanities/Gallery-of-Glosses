import { useState, useEffect } from "react";
import {
  grabWitnessFragmentsFromManuscript,
  grabProperties,
  processWitnessFragment,
} from "@/lib/utils";
import { GENERATOR } from "@/configs/rerum-links";

export const useWitnessFragmentsFromManuscript = (manuscriptId: string) => {
  const [witnessFragments, setWitnessFragments] = useState<ProcessedFragment[]>([]);
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

  async function fetchWitnessFragmentsAndProcessProperties() {
    const fragmentsList: string[] = await grabWitnessFragmentsFromManuscript(manuscriptId);
    if (fragmentsList && fragmentsList.length > 0) {
      for (let item of fragmentsList) {
        const fragmentId = item
        const fragmentProperties = await expand(fragmentId);
        const processedFragment = processWitnessFragment(
          fragmentProperties,
          fragmnetId,
        );
        setWitnessFragments((prevFragments) => [...prevFragments, processedFragment]);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchWitnessFragmentsAndProcessProperties();
  }, [manuscriptId]);

  return { witnessFragments, loading };
};
