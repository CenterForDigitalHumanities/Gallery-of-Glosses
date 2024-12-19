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
    async function fetchWitnessFragmentsAndProcessProperties() {
      console.log("GRAB FRAGMENTS WITH SPECIAL HOOK")
      const fragmentsList: string[] = await grabWitnessFragmentsFromManuscript(manuscriptId);
      console.log("HAVE FRAGMENTS "+fragmentsList.length)
      if (fragmentsList && fragmentsList.length > 0) {
        for (let item of fragmentsList) {
          // console.log("ITEM -- NOT EXPANDED")
          // console.log(item)
          const fragmentId = item
          const fragmentProperties = await expand(fragmentId);
          const processedFragment = processWitnessFragment(
            fragmentProperties,
            fragmentId,
          );
          setWitnessFragments((prevFragments) => [...prevFragments, processedFragment]);
        }
      }
      setLoading(false);
    }
    fetchWitnessFragmentsAndProcessProperties();
  }, [manuscriptId]);

  return { witnessFragments, loading };
};
