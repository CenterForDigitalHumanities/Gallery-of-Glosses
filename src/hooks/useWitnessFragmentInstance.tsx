import { useState, useEffect } from "react";
import { grabProperties, processWitnessFragment } from "@/lib/utils";

export const useWitnessFragmentInstance = (targetId: string) => {
  const [fragment, setWitnessFragment] = useState<ProcessedFragment>();

  async function fetchWitnessFragmentAndProcessProperties() {
    const res = await grabProperties(targetId);
    const data = await res.json();
    let f = {}
    for(const item of data){
      if(!item?.body) continue
      const key = Object.keys(item.body)[0]
      f[key] = item.body[key].value ?? item.body[key]
    }
    //const gloss = data.map((item: { body: any }) => item.body);
    setWitnessFragment(processWitnessFragment(f, targetId));
  }

  useEffect(() => {
    fetchGlossAndProcessProperties();
  }, [targetId]);

  return fragment;
};
