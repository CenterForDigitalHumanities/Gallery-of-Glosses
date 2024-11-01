import { useState, useEffect } from "react";
import { grabProperties, processManuscript } from "@/lib/utils";

export const useManuscriptInstance = (targetId: string) => {
  const [Manuscript, setManuscript] = useState<ProcessedManuscript>();

  async function fetchManuscriptAndProcessProperties() {
    const res = await grabProperties(targetId);
    const data = await res.json();
    const Manuscript = data.map((item: { body: any }) => item.body);
    setManuscript(processManuscript(Manuscript, targetId));
  }

  useEffect(() => {
    fetchManuscriptAndProcessProperties();
  }, [targetId]);

  return Manuscript;
};