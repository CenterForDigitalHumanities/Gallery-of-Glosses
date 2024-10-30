import { useState, useEffect } from "react";
import { grabProperties, processGloss } from "@/lib/utils";

export const useGlossInstance = (targetId: string) => {
  console.log("USE GLOSS INSTANCE")
  const [gloss, setGloss] = useState<ProcessedGloss>();

  async function fetchGlossAndProcessProperties() {
    console.log("fetch for id "+targetId);
    const res = await grabProperties(targetId);
    const data = await res.json();
    console.log("result")
    console.log(data)
    const gloss = data.map((item: { body: any }) => item.body);
    setGloss(processGloss(gloss, targetId));
  }

  useEffect(() => {
    console.log("use effect in useGlossInstance")
    fetchGlossAndProcessProperties();
  }, [targetId]);

  return gloss;
};
