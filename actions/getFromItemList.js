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

const getFromItemList = async (itemList, keys) => {
    try {
        // Map itemListElement array to an array of fetch promises
        const fetchPromises = itemList.map(item => {
            return getTargets({value: item['target']});
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
        
        console.log("values", values)
        return values.filter(value => keys.some(key => key in value));

    } catch (error) {
        console.error('Error:', error);
    }
};

export default getFromItemList;
