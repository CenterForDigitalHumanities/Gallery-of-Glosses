import getTargets from './getTargets';

const getNestedValue = (obj, keyPath) => {
    const [firstKey, ...remainingKeys] = keyPath.split('.');
    const nextObj = obj[firstKey];
    if (nextObj && remainingKeys.length) {
        return getNestedValue(nextObj, remainingKeys.join('.'));
    } else {
        return nextObj;
    }
};

const getFromItemList = async (itemList, keys, onProgressUpdate) => {
    
    try {
        // Map itemListElement array to an array of fetch promises
        const fetchPromises = itemList.itemListElement.map(async (item, index) => {
            const result = await getTargets({value: item['@id']});
            
            // Progress update
            const progress = (index + 1) / itemList.itemListElement.length;
            onProgressUpdate(progress); // Call the callback function
            
            return result;
        });
        
        // Wait for all fetches to complete
        const annotationsArrays = await Promise.all(fetchPromises);
        
        // Now, map annotations array to values
        const values = annotationsArrays.map(annotations => {
            const value = {};
            for (let annotation of annotations) {
                for (let key of keys) {
                    const nestedValue = getNestedValue(annotation, key);
                    if (nestedValue !== undefined) {
                        value[key] = nestedValue;
                    }
                }
            }
            return value;
        });
        
        // console.log("values", values)
        return values.filter(value => keys.every(key => key in value));

    } catch (error) {
        console.error('Error:', error);
    }
};

export default getFromItemList;
