const getTargets = async ({ key, value }) => {
    let queryObj = {};
    let targetConditions = [];

    if (value?.startsWith('http')) {
        let httpVersion = value.startsWith('https') ? `http${value.slice(5)}` : `http${value.slice(4)}`;
        let httpsVersion = value.startsWith('https') ? `https${value.slice(5)}` : `https${value.slice(4)}`;

        // Add conditions for different target keys
        ['target', 'target.@id', 'target.id'].forEach(targetKey => {
            targetConditions.push({ [targetKey]: httpVersion });
            targetConditions.push({ [targetKey]: httpsVersion });
        });

        queryObj = {
            "$or": targetConditions,
            "__rerum.history.next": { "$exists": true, "$size": 0 }
        };
    } else {
        queryObj[key] = value; 
    }

    try {
        const response = await fetch("https://tinydev.rerum.io/app/query?", {
            method: "POST",
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(queryObj)
        })

        
        
        // Parse the response as JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error querying objects:', error);
    }
}

export default getTargets;
