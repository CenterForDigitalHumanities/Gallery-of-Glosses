export function processObjectData(obj: any): any {
  if (obj.body && typeof obj.body === "object") {
    const processedObj = Object.keys(obj.body).reduce(
      (accumulator: any, property: string) => {
        // Handle special cases
        if (property === "tags") {
          // Copy the tags object as-is if it exists
          accumulator[property] = obj.body[property];
        } else {
          // Default behavior
          accumulator[property] = obj.body[property].value;
        }
        return accumulator;
      },
      {}
    );

    return processedObj;
  } else {
    return {}; // Return an empty object if obj.body is undefined or not an object
  }
}
