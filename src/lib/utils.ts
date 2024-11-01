import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import {
  PRODUCTION_GLOSS_COLLECTION,
  TINY,
  PRODUCTION_WITNESS_COLLECTION,
} from "@/configs/rerum-links";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ObjectData {
  "@id": string;
  [key: string]: any;
}

/**
 * Converts a RERUM ID to be used in a query for "target" and related fields.
 * @param targetId The RERUM ID to convert
 * @returns Object with queries for "target", "target.@id", and "target.id" for http and https versions of passed ID
 */
export function getQueryFromId(targetId: string) {
  let queryObj: { [key: string]: any } = {};
  let targetConditions: { [key: string]: string }[] = [];

  if (targetId.startsWith("http")) {
    const httpVersion = targetId.replace(/^https?/, "http");
    const httpsVersion = targetId.replace(/^https?/, "https");

    ["target", "target.@id", "target.id"].forEach((targetKey) => {
      targetConditions.push({ [targetKey]: httpVersion });
      targetConditions.push({ [targetKey]: httpsVersion });
    });

    queryObj = {
      $or: targetConditions,
      "__rerum.history.next": { $exists: true, $size: 0 },
    };
  } else {
    queryObj["target"] = targetId;
  }
  return queryObj;
}

/**
 * Makes a paged query and returns the response
 * @param url Base URL to send request to
 * @param data JSON object to send
 * @param limit Number of objects to get out of query
 * @param skip Number of objects to skip in query
 */
export async function makePagedQuery(
  url: string,
  data: Object,
  limit: number = 100,
  skip: number = 0,
): Promise<Response> {
  try {
    let objects: ObjectData[] = [];

    while (true) {
      const response = await axios.post(
        `${url}?limit=${limit}&skip=${skip}`,
        data,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      );

      objects = [...objects, ...response.data];

      if (!response.data.length || response.data.length < limit) {
        break;
      } else {
        skip += limit;
      }
    }

    return new Response(JSON.stringify(objects), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      "Could not retrieve objects at this time. Please try later",
      {
        status: 500,
      },
    );
  }
}

/**
 * Fetches properties for the target ID, such as Gloss properties or Witness fragment annotations.
 * @param targetId ID of the object to fetch properties for
 */
export async function grabProperties(targetId: string): Promise<Response> {
  try {
    let queryObj = getQueryFromId(targetId);
    return await makePagedQuery(`${TINY}/query`, queryObj);
  } catch (error) {
    console.error("Error querying objects:", error);
    return new Response(
      "Could not retrieve objects at this time. Please try later",
      {
        status: 500,
      },
    );
  }
}

// created a temporary any[] because don't think necessary to create an interface for temporary array of gloss properties
export function processGloss(gloss: any[], targetId: string): ProcessedGloss {
  let processedGloss: ProcessedGloss = {
    targetId: "",
    title: "",
    targetCollection: "",
    section: "",
    subsection: "",
    tags: undefined,
    textFormat: undefined,
    textLanguage: undefined,
    textValue: undefined,
    creator: undefined,
    document: undefined,
    themes: undefined,
    canonicalReference: undefined,
    description: undefined,
    targetedText: undefined,
  };

  processedGloss.targetId = targetId;

  gloss.forEach((item) => {
    if (!item) return;

    if (item.title && item.title.value) {
      processedGloss.title = item.title.value;
    } else if (item.targetCollection) {
      processedGloss.targetCollection = item.targetCollection;
    } else if (item._section && item._section.value) {
      processedGloss.section = item._section.value;
    } else if (item._subsection && item._subsection.value) {
      processedGloss.subsection = item._subsection.value;
    } else if (item.tags && item.tags.items) {
      processedGloss.tags = item.tags.items;
    } else if (item.text) {
      processedGloss.textFormat = item.text.format;
      processedGloss.textLanguage = item.text.language;
      processedGloss.textValue = item.text.textValue;
    } else if (item.creator && item.creator.value) {
      processedGloss.creator = item.creator.value;
    } else if (item._document && item._document.value) {
      processedGloss.document = item._document.value;
    } else if (item.themes && item.themes.value) {
      processedGloss.themes = item.themes.value;
    } else if (item.canonicalReference && item.canonicalReference.value) {
      processedGloss.canonicalReference = item.canonicalReference.value;
    } else if (item.description && item.description.value) {
      processedGloss.description = item.description.value;
    } else if (item.targetedText && item.targetedText.value) {
      processedGloss.targetedText = item.targetedText.value;
    }
  });

  return processedGloss;
}

export async function GrabProductionGlosses() {
  try {
    const response = await axios.get(PRODUCTION_GLOSS_COLLECTION);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function grabProductionWitnesses() {
  try {
    const response = await axios.get(PRODUCTION_WITNESS_COLLECTION);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Fetches Witness fragments for a Gloss.
 * @param targetId
 * @returns An array of Witness fragments
 */
export async function grabGlossWitnessFragments(targetId: string) {
  // Fetch annotations referencing the Gloss
  try {
    const annotationResponse = await makePagedQuery(`${TINY}/query`, {
      "body.references.value": targetId,
      "__rerum.history.next": {
        $exists: true,
        $type: "array",
        $eq: [],
      },
    });

    // Filter out those whose targets are not Witness fragments
    const responseData = await annotationResponse.json();
    return await filterDataAtTargets(
      responseData,
      (item: any) => item["@type"] === "Text",
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Processes annotations for a Witness fragment
 * @param annotations Array of annotations to process
 * @param targetId ID of the Witness fragment
 */
export function processTranscriptionAnnotations(
  annotations: any[],
  targetId: string,
): ProcessedTranscriptionAnnotations {
  let processedAnnotations: ProcessedTranscriptionAnnotations = {
    targetId: undefined,
    title: undefined,
    identifier: undefined,
    creator: undefined,
    source: undefined,
    selections: undefined,
    references: undefined,
    textFormat: undefined,
    textLanguage: undefined,
    textValue: undefined,
  };

  processedAnnotations.targetId = targetId;

  annotations.forEach((annotation: TranscriptionAnnotation) => {
    if (!annotation) return;

    if (annotation.title) {
      processedAnnotations.title = annotation.title.value;
    } else if (annotation.identifier) {
      processedAnnotations.identifier = annotation.identifier.value;
    } else if (annotation.creator) {
      processedAnnotations.creator = annotation.creator.value;
    } else if (annotation.source) {
      processedAnnotations.source = annotation.source.value;
    } else if (annotation.selections) {
      processedAnnotations.selections = annotation.selections.value;
    } else if (annotation.references) {
      processedAnnotations.references = annotation.references.value;
    } else if (annotation.text) {
      processedAnnotations.textFormat = annotation.text.format;
      processedAnnotations.textLanguage = annotation.text.language;
      processedAnnotations.textValue = annotation.text.textValue;
    }
  });
  return processedAnnotations;
}

/**
 * Processes properties for a Witness
 * @param witness Witness to process
 * @param targetId ID of the Witness
 */
export function processWitness(
  witness: any[],
  targetId: string,
): ProcessedWitness {
  let processedWitness: ProcessedWitness = {
    targetId: undefined,
    provenance: undefined,
    url: undefined,
    identifier: undefined,
    city: undefined,
    alternative: undefined,
    repository: undefined,
    title: undefined,
    institution: undefined,
    baseProject: undefined,
    region: undefined,
  };

  processedWitness.targetId = targetId;

  witness.forEach((witness: Witness) => {
    if (!witness) return;

    if (witness.provenance) {
      processedWitness.provenance = witness.provenance.value;
    } else if (witness.url) {
      processedWitness.url = witness.url.value;
    } else if (witness.identifier) {
      processedWitness.identifier = witness.identifier.value;
    } else if (witness.city) {
      processedWitness.city = witness.city.value;
    } else if (witness.alternative) {
      processedWitness.alternative = witness.alternative.value;
    } else if (witness.Repository) {
      processedWitness.repository = witness.Repository.value;
    } else if (witness.title) {
      processedWitness.title = witness.title.value;
    } else if (witness.institution) {
      processedWitness.institution = witness.institution.value;
    } else if (witness["tpen://base-project"]) {
      processedWitness.baseProject = witness["tpen://base-project"].value;
    } else if (witness.region) {
      processedWitness.region = witness.region.value;
    }
  });
  return processedWitness;
}

/**
 * Grabs the fragments of a Witness
 * @param witnessIdentifier The identifier Witness to get fragments for
 */
export async function grabWitnessFragments(witnessIdentifier: string) {
  // Fetch annotations referencing the identifier
  try {
    const annotationResponse = await makePagedQuery(`${TINY}/query`, {
      "body.identifier.value": witnessIdentifier,
      "__rerum.history.next": {
        $exists: true,
        $type: "array",
        $eq: [],
      },
    });

    // Filter out those whose targets are not Witness fragments
    const responseData = await annotationResponse.json();
    return await filterDataAtTargets(
      responseData,
      (item: any) => item["@type"] === "Text",
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Grabs the Witness from a Witness fragment
 * @param fragmentIdentifier The identifier of the Witness fragment
 */
export async function grabWitnessFromFragment(fragmentIdentifier: string) {
  // Fetch annotations referencing the identifier
  try {
    const annotationResponse = await makePagedQuery(`${TINY}/query`, {
      "body.identifier.value": fragmentIdentifier,
      "__rerum.history.next": {
        $exists: true,
        $type: "array",
        $eq: [],
      },
    });

    // Filter out those whose targets are not Witness fragments
    const responseData = await annotationResponse.json();
    const filteredData = await filterDataAtTargets(
      responseData,
      (item: any) => item["@type"] === "manuscript",
    );
    return filteredData[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Filters an array of RERUM objects such that the data referenced at their targets is filtered by the passed function.
 * @param data Data to be filtered
 * @param filterFunction Function to pass into filter method of the array of objects returned at the targets of the passed data
 */
export async function filterDataAtTargets(data: any[], filterFunction: any) {
  let targets = await Promise.all(
    data.map(async (annotation: TranscriptionAnnotation) => {
      const witnessFragmentResponse = await axios.get(annotation.target);
      return witnessFragmentResponse.data;
    }),
  );
  return targets.filter(filterFunction);
}
