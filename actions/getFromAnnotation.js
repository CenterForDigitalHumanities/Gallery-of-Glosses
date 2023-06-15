import getAnnotations from "./getAnnotations";

const getFromAnnotation = async ({ data, key }) => {
  const values = [];

  // For every object in data...
  for (let obj of data) {
    // Get the annotation ID
    const annotationId = obj["@id"];
    
    // Fetch the annotations where the target has the same value as annotationId
    const annotations = await getAnnotations({ key: "target", value: annotationId });

    // for each annotation in annotations, return the value from the key
    if (annotations) {
        for (let annotation of annotations) {
            const nestedValue = getNestedValue(annotation, key);
            if (nestedValue) {
                values.push(nestedValue);
            }
        }
    }
  }

  return values;
};

// Helper function to retrieve nested values from an object
function getNestedValue(obj, key) {
    const keys = key.split(".");
    let value = obj;
    for (let k of keys) {
        value = value?.[k];
        if (value === undefined) {
            return undefined;
        }
    }
    return value;
}

export default getFromAnnotation;
