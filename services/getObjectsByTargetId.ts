import axios from "axios";

interface ObjectData {
  "@id": string;
  [key: string]: any;
}

/**
 * Retrieve objects that have a specific value in their target or target.@id property.
 * @param targetId The target value to match.
 * @returns Promise that resolves to an array of ObjectData.
 */
export const getObjectsByTargetId = async (
  targetId: string
): Promise<ObjectData[]> => {
  let queryObj: { [key: string]: any } = {};
  let targetConditions: { [key: string]: string }[] = [];

  if (targetId.startsWith("http")) {
    let httpVersion = targetId.startsWith("https")
      ? `http${targetId.slice(5)}`
      : `https${targetId.slice(4)}`;
    let httpsVersion = targetId.startsWith("https")
      ? `https${targetId.slice(5)}`
      : `http${targetId.slice(4)}`;

    // Add conditions for different target keys
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

      // If no data or less than limit data is returned, break the loop
      if (!response.data.length || response.data.length < limit) {
        objects = [...objects, ...response.data];
        break;
      } else {
        objects = [...objects, ...response.data];
        skip += limit;
      }
    } catch (error) {
      console.error("Error querying objects:", error);
      throw error;
    }
  }

  return objects;
};
