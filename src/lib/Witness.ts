interface Witness {
  target: string;
  provenance?: { value: string };
  url?: { value: string };
  identifier?: { value: string };
  city?: { value: string };
  alternative?: { value: string };
  Repository?: { value: string };
  title?: { value: string };
  institution?: { value: string };
  "tpen://base-project"?: { value: string };
  region?: { value: string };
}

interface ProcessedWitness {
  [key: string]: any;

  targetId?: string;
  provenance?: string;
  url?: string;
  identifier?: string;
  city?: string;
  alternative?: string;
  repository?: string;
  title?: string;
  institution?: string;
  baseProject?: string;
  region?: string;
}
