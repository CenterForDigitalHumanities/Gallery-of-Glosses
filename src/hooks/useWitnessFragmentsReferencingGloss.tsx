import { useState, useEffect } from "react";
import {
  grabWitnessFragmentsReferencingGloss,
  grabProperties,
  processWitnessFragment,
} from "@/lib/utils";
import { GENERATOR } from "@/configs/rerum-links";

export const useWitnessFragmentsReferencingGloss = (glossId: string) => {
  const [witnessFragments, setWitnessFragments] = useState<ProcessedFragment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // We want the Set of Witness Fragments that say they reference this Gloss.

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
    const witnessFragmentsList = await grabWitnessFragmentsReferencingGloss(glossId);
    if (witnessFragmentsList && witnessFragmentsList.length > 0) {
      for (let item of witnessFragmentsList) {
        const witnessFragmentId = item;
        const witnessFragmentProperties = await expand(witnessFragmentId);
        const processedFragment = processWitnessFragment(
          witnessFragmentProperties,
          witnessFragmentId,
        );
        setWitnessFragments((prevFragment) => [...prevFragment, processedFragment]);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchGlossWitnessesAndProcessProperties();
  }, [glossId]);

  return { witnessFragments, loading };
};
