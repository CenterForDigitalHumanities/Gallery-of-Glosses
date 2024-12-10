import { useState, useEffect } from "react";
import { grabProperties, processGloss } from "@/lib/utils";

export const useGlossInstance = (targetId: string) => {
  const [gloss, setGloss] = useState<ProcessedGloss>();

  async function fetchGlossAndProcessProperties() {
    const res = await grabProperties(targetId);
    const data = await res.json();
    let g = {}
    for(const item of data){
      if(!item?.body) continue
      const key = Object.keys(item.body)[0]
      g[key] = item.body[key].value ?? item.body[key]
    }
    //const gloss = data.map((item: { body: any }) => item.body);
    setGloss(processGloss(g, targetId));
  }

  useEffect(() => {
    fetchGlossAndProcessProperties();
  }, [targetId]);

  return gloss;
};
