const getCollections = async ({ value }) => {
    
    let queryObj = {
        "$or": [
            { "targetCollection" : value },                 
            { "body.targetCollection" : value },
            { "body.partOf" : value }
        ],
        "__rerum.history.next": { "$exists": true, "$size": 0 }
    };
    
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

export default getCollections;
