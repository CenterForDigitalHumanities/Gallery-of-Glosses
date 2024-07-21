interface TranscriptionAnnotation {
  target: string;
  creator: string;
  body: {
    title?: { value: string; };
    identifier?: { value: string; };
    creator?: { value: string; };
    source?: { value: string[]; };
    selections?: { value: string[]; };
    references?: { value: string[]; };
    text?: {
      format: string;
      language: string;
      textValue: string;
    };
  }
}

interface ProcessedTranscriptionAnnotations {
  target?: string;
  creator?: string;
  body?: {
    title?: string;
    identifier?: string;
    creator?: string;
    source?: string[];
    selections?: string[];
    references?: string[];
    text?: {
      format: string;
      language: string;
      textValue: string;
    };
  };
}
