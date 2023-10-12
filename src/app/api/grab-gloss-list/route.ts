import axios from "axios";
import { z } from "zod";

interface ListItem {
  "@id": string;
}

interface ListObject {
  name: string;
  "@type"?: string;
  itemListElement: ListItem[];
}

const CollectionNameValidator = z.object({
  collectionName: z.string(),
});

export async function GrabGlossList(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { collectionName } = CollectionNameValidator.parse(body);

    const queryObj = {
      $or: [
        { targetCollection: collectionName },
        { "body.targetCollection": collectionName },
        { "body.partOf": collectionName },
      ],
      "__rerum.history.next": { $exists: true, $size: 0 },
    };

    const listObj: ListObject = {
      name: collectionName,
      itemListElement: [],
    };

    const limit = 100;
    let skip = 0;

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

      listObj.itemListElement = listObj.itemListElement.concat(
        response.data.map((item: any) => ({
          "@id": item.target ?? item["@id"] ?? item.id,
        }))
      );

      if (response.data[0]) {
        listObj["@type"] =
          response.data[0]["@type"] ?? response.data[0].type ?? "ItemList";
      }

      if (!response.data.length || response.data.length < limit) {
        break;
      } else {
        skip += limit;
      }
    }

    return new Response(JSON.stringify(listObj), {
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
