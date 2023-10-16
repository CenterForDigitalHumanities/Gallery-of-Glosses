"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { PRODUCTION_GLOSS_COLLECTION } from "@/configs/rerum-links";
import { columns } from "../Columns";
import { DataTable } from "../DataTable";
import { z } from "zod";

interface BookProps {}

interface ProcessedGloss {
  title: string;
  targetCollection: string;
  targetChapter: string;
  targetVerse: string;
  tags?: string;
  textFormat?: string;
  textLanguage?: string;
  textValue?: string;
  creator?: string;
}

interface ObjectData {
  "@id": string;
  [key: string]: any;
}

const TargetIdValidator = z.object({
  targetId: z.string(),
});

// created a temporary any[] because don't think necessary to create an interface for temporary array of gloss properties
function processGloss(gloss: any[]): ProcessedGloss {
  let processedGloss: ProcessedGloss = {
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

async function GrabProductionGlosses() {
  try {
    const response = await axios.get(PRODUCTION_GLOSS_COLLECTION);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function GrabGlossProperties(req: Request): Promise<Response> {
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

const Book: FC<BookProps> = ({}) => {
  const [glosses, setGlosses] = useState<ProcessedGloss[]>([]);

  useEffect(() => {
    console.log("Book component rendered");
    async function fetchGlossAndProcessProperties() {
      const collectionList = await GrabProductionGlosses();

      if (collectionList && collectionList.itemListElement) {
        for (let item of collectionList.itemListElement) {
          const targetId = item["@id"];
          const targetIdReq = new Request("/api/ByTargetId", {
            method: "POST",
            body: JSON.stringify({ targetId }),
            headers: { "Content-Type": "application/json" },
          });

          const res = await GrabGlossProperties(targetIdReq);
          const data = await res.json();
          const gloss = data.map((item: { body: any }) => item.body);
          const processedGloss = processGloss(gloss);

          setGlosses((prevGlosses) => [...prevGlosses, processedGloss]);
        }
      }
    }

    fetchGlossAndProcessProperties();
  }, []);

  return <div>{<DataTable columns={columns} data={glosses} />}</div>;
};

export default Book;
