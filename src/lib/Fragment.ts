interface Fragment {
  identifier?: {
    value: string;
  };
  _glossatorHand?: {
    value: string;
  };
  _glossLocation?: {
    value: string;
  };
  _glossFormat?: {
    value: string;
  };
  _folio?: {
    value: string;
  };
  depiction?: {
    value: string;
  };
  notes?: {
    value: string;
  };
  source?: {
    value: string;
  };
  partOf?: {
    value: string;
  };
  references?:{
    value: string[];
  };
  selections?:{
    value: string[];
  }
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
  
}

interface ProcessedFragment {
  [key: string]: any;
  identifier: string;
  glossLocation: string;
  glossFormat: string;
  folio: string;
  tags?: string[];
  textFormat?: string;
  textLanguage?: string;
  textValue?: string;
  creator?: string;
  notes?: string;
  partOf?: string;
  references?: string[];
  selections?: string[];
  source?: string;
}
