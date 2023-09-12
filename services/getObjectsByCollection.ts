import axios from "axios";

interface ListItem {
  "@id": string;
}

interface ListObject {
  name: string;
  "@type"?: string;
  itemListElement: ListItem[];
}

/**
 * Retrieve objects belonging to a specific collection.
 * @param collectionName Name of the target collection.
 * @returns Promise that resolves to a ListObject containing the retrieved objects.
 */
export const getObjectsByCollection = async (
  collectionName: string
): Promise<ListObject> => {
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
    try {
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

      // If no data or less than limit data is returned, break the loop
      if (!response.data.length || response.data.length < limit) {
        break;
      } else {
        skip += limit;
      }
    } catch (error) {
      console.error("Error querying objects:", error);
      throw error;
    }
  }

  return listObj;
};
