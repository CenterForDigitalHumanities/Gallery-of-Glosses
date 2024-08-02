import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { PRODUCTION_GLOSS_COLLECTION, TINY } from "@/configs/rerum-links";

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
    targetChapter: "",
    targetVerse: "",
    tags: undefined,
    textFormat: undefined,
    textLanguage: undefined,
    textValue: undefined,
    creator: undefined,
    document: undefined,
    themes: undefined,
    canonicalReference: undefined,
    description: undefined,
  };

  processedGloss.targetId = targetId;

  gloss.forEach((item) => {
    if (!item) return;

    if (item.title && item.title.value) {
      processedGloss.title = item.title.value;
    } else if (item.targetCollection) {
      processedGloss.targetCollection = item.targetCollection;
    } else if (item.targetChapter && item.targetChapter.value) {
      processedGloss.targetChapter = item.targetChapter.value;
    } else if (item._section && item._section.value) {
      processedGloss.targetChapter = item._section.value;
    } else if (item.targetVerse && item.targetVerse.value) {
      processedGloss.targetVerse = item.targetVerse.value;
    } else if (item._subsection && item._subsection.value) {
      processedGloss.targetVerse = item._subsection.value;
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

    // For each annotation, get the data at the target ID
    const responseData = await annotationResponse.json();
    let targets = responseData.map(
      async (annotation: TranscriptionAnnotation) => {
        const witnessFragmentResponse = await axios.get(annotation.target);
        return witnessFragmentResponse.data;
      },
    );

    // Filter out those that are not Witness fragments
    return targets.filter((item: any) => item["@type"] === "Text");
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
