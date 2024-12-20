interface Gloss {
  targetId:string;
  targetCollection?: string;
  title?: {
    value: string;
  };
  _section?: {
    value: string;
  };
  _subsection?: {
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
  targetedText?: {
    value: string;
  };
  notes?: {
    value: string;
  };
}

interface ProcessedGloss {
  [key: string]: any;
  targetId: string;
  title: string;
  targetCollection: string;
  section: string;
  subsection: string;
  tags?: string[];
  textFormat?: string;
  textLanguage?: string;
  textValue?: string;
  creator?: string;
  document?: string;
  themes?: string[];
  canonicalReference?: string;
  description?: string;
  targetedText?: string;
  notes?: string;
}
