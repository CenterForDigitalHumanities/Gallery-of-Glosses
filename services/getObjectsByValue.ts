import axios from "axios";

interface ObjectData {
  "@id": string;
  [key: string]: any;
}

/**
 * Retrieve objects that match a specific key and value in their body property.
 * @param key The key to match in the body property.
 * @param value The value to match in the body property.
 * @returns Promise that resolves to an array of ObjectData.
 */
export const getObjectsByValue = async (
  key: string,
  value: string
): Promise<ObjectData[]> => {
  // Define the query object with the specific key and value in the body property
  const queryObj = {
    [`body.${key}.value`]: value,
    "__rerum.history.next": { $exists: true, $size: 0 },
  };

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
