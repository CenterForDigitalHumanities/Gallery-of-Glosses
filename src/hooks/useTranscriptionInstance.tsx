import { useState, useEffect } from "react";
import { grabProperties, processTranscriptionAnnotations } from "@/lib/utils";

export const useTranscriptionInstance = (targetId: string) => {
  const [transcription, setTranscription] =
    useState<ProcessedTranscriptionAnnotations>();

  async function fetchTranscriptionAndProcessProperties() {
    const res = await grabProperties(targetId);
    const data = await res.json();
    const transcription = data.map((item: { body: any }) => item.body);
    setTranscription(processTranscriptionAnnotations(transcription, targetId));
  }

  useEffect(() => {
    fetchTranscriptionAndProcessProperties();
  }, [targetId]);

  return transcription;
};
