import { useState, useEffect } from "react";
import { grabProperties, processManuscript } from "@/lib/utils";

export const useManuscriptInstance = (targetId: string) => {
  const [manuscript, setManuscript] = useState<ProcessedManuscript>();
  
  useEffect(() => {
    async function fetchManuscriptAndProcessProperties() {
      const res = await grabProperties(targetId);
      const data = await res.json();
      let man = {}
      for(const item of data){
        if(!item?.body) continue
        const key = Object.keys(item.body)[0]
        man[key] = item.body[key].value ?? item.body[key]
      }
      setManuscript(processManuscript(man, targetId));
    }
    fetchManuscriptAndProcessProperties();
  }, [targetId]);

  return manuscript;
};