interface Manuscript {
  targetId: string;
  targetCollection?: string;
  url?: { value: string };
  identifier?: { value: string };
  _originLocal?: { value: string };
  _originRegion?: { value: string };
  _originAuthority?: { value: string };
  _iiifManifest?: { value: string };
  _citation?: { value: string };
  date?: { value: string };
  title?: { value: string };
  notes?: { value: string };
  tags?: {
    "@type": "Set";
    items: string[];
  };
}

interface ProcessedManuscript {
  [key: string]: any;
  targetId: string;
  targetCollection?: string;
  url?: string;
  identifier?: string;
  _originLocal?: string;
  _originRegion?: string;
  _originAuthority?: string;
  _iiifManifest?: string;
  _citation?: string;
  date: string;
  title?: string;
  notes?: string;
  tags?: string[];
}
