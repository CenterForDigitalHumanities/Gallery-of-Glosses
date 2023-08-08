import axios from "axios";

/**
 * Retrieve the target id that matches a specific key and value in its body property.
 * @param key The key to match in the body property.
 * @param value The value to match in the body property.
 * @returns Promise that resolves to the target id string.
 */
export const getTargetIdByValue = async (
  key: string,
  value: string
): Promise<string> => {
  // Define the query object with the specific key and value in the body property
  const queryObj = {
    [`body.${key}.value`]: value,
    "__rerum.history.next": { $exists: true, $size: 0 },
  };

  try {
    const response = await axios.post(
      "https://tinymatt.rerum.io/gloss/query",
      queryObj,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    // If there is data returned and the data is an array
    if (Array.isArray(response.data) && response.data.length > 0) {
      // Get the first object from the array
      const obj = response.data[0];

      // Get the id from the target link
      const id = obj.target.split("/").pop();

      return id || "";
    }

    // If no data is returned or the data is not an array, throw an error
    throw new Error("No matching object found");
  } catch (error) {
    console.error("Error querying object:", error);
    throw error;
  }
};
