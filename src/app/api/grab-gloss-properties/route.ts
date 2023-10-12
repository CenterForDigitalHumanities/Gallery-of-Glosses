import axios from "axios";
import { z } from "zod";

interface ObjectData {
  "@id": string;
  [key: string]: any;
}

const TargetIdValidator = z.object({
  targetId: z.string(),
});

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
