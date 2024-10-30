import { useState, useEffect } from "react";
import { grabProperties, processGloss } from "@/lib/utils";

export const useGlossInstance = (targetId: string) => {
  console.log("USE GLOSS INSTANCE for id "+targetId)
  const [gloss, setGloss] = useState<ProcessedGloss>();
  let constructedGloss

  useEffect(() => {
    console.log("use effect in useGlossInstance")

    async function fetchGlossAndProcessProperties() {
      console.log("fetch for id "+targetId);
      const res = await grabProperties(targetId);
      const data = await res.json();
      console.log("result")
      console.log(data)
      constructedGloss = data.map((item: { body: any }) => item.body);
      setGloss(constructedGloss)
      //setGloss(processGloss(gloss, targetId));
    }

    fetchGlossAndProcessProperties();
  }, [targetId]);

  return gloss;
};
