import { useState, useEffect } from "react";
import { grabProperties, processGloss } from "@/lib/utils";

export const useGlossInstance = (targetId: string) => {
  console.log("USE GLOSS INSTANCE for id "+targetId)
  const [gloss, setGloss] = useState<ProcessedGloss>({targetId});
  console.log(" ... ")

  useEffect(() => {
    console.log("use effect in useGlossInstance")

    async function fetchGlossAndProcessProperties() {
      console.log("fetch for id "+targetId);
      const res = await grabProperties(targetId);
      const data = await res.json();
      console.log("result")
      console.log(data)
      const gloss = data.map((item: { body: any }) => item.body);
      setGloss(processGloss(gloss, targetId));
    }

    fetchGlossAndProcessProperties();
  }, [targetId]);

  return gloss;
};
