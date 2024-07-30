interface Gloss {
  title?: {
    value: string;
  };
  targetCollection?: string;
  targetChapter?: {
    value: string;
  };
  targetVerse?: {
    value: string;
  };
  text?: {
    format: string;
    language: string;
    textValue: string;
  };
  tags?: {
    "@type": "Set";
    items: string[];
  };
  creator?: {
    value: string;
  };
  document?: {
    value: string;
  };
  themes?: {
    value: string[];
  };
  canonicalReference?: {
    value: string;
  };
  description?: {
    value: string;
  };
}

interface ProcessedGloss {
  targetId: string;
  title: string;
  targetCollection: string;
  targetChapter: string;
  targetVerse: string;
  tags?: string[];
  textFormat?: string;
  textLanguage?: string;
  textValue?: string;
  creator?: string;
  document?: string;
  themes?: string[];
  canonicalReference?: string;
  description?: string;
}
