interface TranscriptionAnnotation {
  target: string;
  title?: { value: string };
  identifier?: { value: string };
  creator?: { value: string };
  source?: { value: string[] };
  selections?: { value: string[] };
  references?: { value: string[] };
  text?: {
    format: string;
    language: string;
    textValue: string;
  };
}

interface ProcessedTranscriptionAnnotations {
  [key: string]: any;

  targetId?: string;
  title?: string;
  identifier?: string;
  creator?: string;
  source?: string[];
  selections?: string[];
  references?: string[];
  textFormat?: string;
  textLanguage?: string;
  textValue?: string;
}
