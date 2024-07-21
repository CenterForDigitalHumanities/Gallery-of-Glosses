import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TargetIdValidator } from "./validators/TargetId";
import { z } from "zod";
import axios from "axios";
import { PRODUCTION_GLOSS_COLLECTION } from "@/configs/rerum-links";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ObjectData {
  "@id": string;
  [key: string]: any;
}

export async function GrabGlossProperties(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { targetId } = TargetIdValidator.parse(body);

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

    const limit = 100;
    let skip = 0;
    let objects: ObjectData[] = [];

    while (true) {
      const response = await axios.post(
        `https://tinymatt.rerum.io/gloss/query?limit=${limit}&skip=${skip}`,
        queryObj,
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

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
      processedGloss.tags = item.tags.items.join(", ");
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
 * @param limit
 * @returns An array of Witness fragments
 */
export async function grabGlossWitnessFragments(
  targetId: string,
  limit: number,
) {
  // Fetch annotations referencing the Gloss
  try {
    const annotationResponse = await axios.post(
      `https://tiny.rerum.io/app/query?limit=${limit}`,
      {
        "body.references.value": targetId,
        "__rerum.history.next": {
          $exists: true,
          $type: "array",
          $eq: [],
        },
      },
    );

    return annotationResponse.data.map(
      async (annotation: TranscriptionAnnotation) => {
        // For each annotation, fetch the Witness fragment
        const witnessFragmentResponse = await axios.get(annotation.target);
        if (witnessFragmentResponse.data["@type"] !== "Text") return null;
        return witnessFragmentResponse.data;
      },
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Fetches annotations for a Witness fragment
 * @param targetId ID of the Witness fragment to fetch annotations for
 */
export async function processTranscriptionAnnotations(
  targetId: string,
): Promise<ProcessedTranscriptionAnnotations | null> {
  try {
    // Fetch a list of TranscriptionAnnotations
    const response = await axios.post("https://tiny.rerum.io/app/query", {
      target: targetId,
      "__rerum.history.next": {
        $exists: true,
        $type: "array",
        $eq: [],
      },
    });

    // Process
    let processedAnnotations: ProcessedTranscriptionAnnotations = {};
    response.data.forEach((annotation: TranscriptionAnnotation) => {
      processedAnnotations = {
        target: annotation.target,
        creator: annotation.creator,
        body: {
          title: annotation.body.title?.value,
          identifier: annotation.body.identifier?.value,
          creator: annotation.body.creator?.value,
          source: annotation.body.source?.value,
          selections: annotation.body.selections?.value,
          references: annotation.body.references?.value,
          text: annotation.body.text ?? undefined,
        },
      };
    });
    return processedAnnotations;
  }
  catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
