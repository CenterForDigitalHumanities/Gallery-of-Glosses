import { useState, useEffect } from "react";
import { GrabGlossProperties, processGloss } from "@/lib/utils";

export const useGlossInstance = (targetId: string) => {
  const [gloss, setGloss] = useState<ProcessedGloss>();

  async function fetchGlossAndProcessProperties() {
    const targetIdReq = new Request("/api/ByTargetId", {
      method: "POST",
      body: JSON.stringify({ targetId }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await GrabGlossProperties(targetIdReq);
    const data = await res.json();
    const gloss = data.map((item: { body: any }) => item.body);
    setGloss(processGloss(gloss, targetId));
  }

  useEffect(() => {
    fetchGlossAndProcessProperties();
  }, [targetId]);

  return gloss;
};
