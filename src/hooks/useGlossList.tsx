import { useState, useEffect } from "react";
import { GrabGlossProperties, processGloss } from "@/lib/utils";

export const useGlossInstance = (targetId: string) => {
  const [gloss, setGloss] = useState<ProcessedGloss>();

  async function fetchGlossAndProcessProperties() {
    const cachedGloss = localStorage.getItem(`gloss-${targetId}`);
    if (cachedGloss) {
      setGloss(JSON.parse(cachedGloss));
      return;
    }

    const targetIdReq = new Request("/api/ByTargetId", {
      method: "POST",
      body: JSON.stringify({ targetId }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await GrabGlossProperties(targetIdReq);
    const data = await res.json();
    const gloss = data.map((item: { body: any }) => item.body);
    const processedGloss = processGloss(gloss, targetId);

    setGloss(processedGloss);
    localStorage.setItem(`gloss-${targetId}`, JSON.stringify(processedGloss));
  }

  useEffect(() => {
    fetchGlossAndProcessProperties();
  }, [targetId]);

  return gloss;
};
