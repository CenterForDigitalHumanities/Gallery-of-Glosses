import { useState, useEffect } from "react";
import { GrabGlossProperties, processGloss } from "@/lib/utils";

export const useGlossInstance = (targetId: string) => {
  const [gloss, setGloss] = useState<ProcessedGloss>();

  async function fetchGlossAndProcessProperties() {
    const res = await GrabGlossProperties(targetId);
    const data = await res.json();
    const gloss = data.map((item: { body: any }) => item.body);
    setGloss(processGloss(gloss, targetId));
  }

  useEffect(() => {
    fetchGlossAndProcessProperties();
  }, [targetId]);

  return gloss;
};
