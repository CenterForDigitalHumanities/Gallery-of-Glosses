/**
 * Utilities for converting Gallery of Glosses data to JSON-LD format
 */

/**
 * Converts a processed Gloss to JSON-LD format
 * @param gloss The processed gloss data
 * @returns JSON-LD representation of the gloss
 */
export function glossToJsonLD(gloss: any) {
  const jsonLD: any = {
    "@context": {
      "@vocab": "http://schema.org/",
      "gog": "https://galleryofglosses.org/terms/",
      "rerum": "http://store.rerum.io/v1/id/"
    },
    "@type": "Comment",
    "@id": gloss.targetId,
    "identifier": gloss.targetId,
    "name": gloss.title || "",
    "text": gloss.textValue || "",
  };

  // Add optional fields
  if (gloss.textLanguage) {
    jsonLD.inLanguage = gloss.textLanguage;
  }

  if (gloss.textFormat) {
    jsonLD.encodingFormat = gloss.textFormat;
  }

  if (gloss.creator) {
    jsonLD.creator = {
      "@type": "Person",
      "@id": gloss.creator
    };
  }

  if (gloss.description) {
    jsonLD.description = gloss.description;
  }

  if (gloss.canonicalReference) {
    jsonLD["gog:canonicalReference"] = gloss.canonicalReference;
  }

  if (gloss.section) {
    jsonLD["gog:section"] = gloss.section;
  }

  if (gloss.subsection) {
    jsonLD["gog:subsection"] = gloss.subsection;
  }

  if (gloss.document) {
    jsonLD["gog:document"] = gloss.document;
  }

  if (gloss.targetedText) {
    jsonLD["gog:targetedText"] = gloss.targetedText;
  }

  if (gloss.tags && gloss.tags.length > 0) {
    jsonLD.keywords = gloss.tags;
  }

  if (gloss.notes) {
    jsonLD["gog:notes"] = gloss.notes;
  }

  if (gloss.targetCollection) {
    jsonLD["gog:targetCollection"] = gloss.targetCollection;
  }

  return jsonLD;
}

/**
 * Converts a processed Manuscript to JSON-LD format
 * @param manuscript The processed manuscript data
 * @returns JSON-LD representation of the manuscript
 */
export function manuscriptToJsonLD(manuscript: any) {
  const jsonLD: any = {
    "@context": {
      "@vocab": "http://schema.org/",
      "gog": "https://galleryofglosses.org/terms/",
      "rerum": "http://store.rerum.io/v1/id/"
    },
    "@type": "Manuscript",
    "@id": manuscript.targetId,
    "identifier": manuscript.identifier || manuscript.targetId,
    "name": manuscript.title || "",
  };

  // Add optional fields
  if (manuscript.url) {
    jsonLD.url = manuscript.url;
  }

  if (manuscript.date) {
    jsonLD.dateCreated = manuscript.date;
  }

  if (manuscript.provenance) {
    jsonLD.provenance = manuscript.provenance;
  }

  if (manuscript._originLocal) {
    jsonLD["gog:originLocal"] = manuscript._originLocal;
  }

  if (manuscript._originRegion) {
    jsonLD["gog:originRegion"] = manuscript._originRegion;
  }

  if (manuscript._originAuthority) {
    jsonLD["gog:originAuthority"] = manuscript._originAuthority;
  }

  if (manuscript._iiifManifest) {
    jsonLD["gog:iiifManifest"] = manuscript._iiifManifest;
  }

  if (manuscript.notes) {
    jsonLD["gog:notes"] = manuscript.notes;
  }

  if (manuscript.tags && manuscript.tags.length > 0) {
    jsonLD.keywords = manuscript.tags;
  }

  if (manuscript.targetCollection) {
    jsonLD["gog:targetCollection"] = manuscript.targetCollection;
  }

  if (manuscript.baseProject) {
    jsonLD["gog:baseProject"] = manuscript.baseProject;
  }

  return jsonLD;
}

/**
 * Creates a JSON-LD collection for a list of items
 * @param items Array of JSON-LD items
 * @param collectionType Type of collection ("Gloss" or "Manuscript")
 * @returns JSON-LD collection
 */
export function createJsonLDCollection(items: any[], collectionType: string) {
  return {
    "@context": {
      "@vocab": "http://schema.org/",
      "gog": "https://galleryofglosses.org/terms/"
    },
    "@type": "ItemList",
    "name": `Gallery of Glosses ${collectionType} Collection`,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": item
    }))
  };
}
