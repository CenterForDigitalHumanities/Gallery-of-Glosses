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
        }
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
      }
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
    } else if (item.targetVerse && item.targetVerse.value) {
      processedGloss.targetVerse = item.targetVerse.value;
    } else if (item.tags && item.tags.items) {
      processedGloss.tags = item.tags.items.join(", ");
    } else if (item.text) {
      processedGloss.textFormat = item.text.format;
      processedGloss.textLanguage = item.text.language;
      processedGloss.textValue = item.text.textValue;
    } else if (item.creator && item.creator.value) {
      processedGloss.creator = item.creator.value;
    }
  });

  return processedGloss;
}

export async function GrabProductionGlosses() {
  try {
    const cachedData = localStorage.getItem('productionGlosses');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await axios.get(PRODUCTION_GLOSS_COLLECTION);
    const data = response.data;

    localStorage.setItem('productionGlosses', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
