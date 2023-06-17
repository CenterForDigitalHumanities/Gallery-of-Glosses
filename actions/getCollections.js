import axios from "axios";

const getCollections = async ({ value }) => {
    let queryObj = {
        "$or": [
            { "targetCollection" : value },                 
            { "body.targetCollection" : value },
            { "body.partOf" : value }
        ],
        "__rerum.history.next": { "$exists": true, "$size": 0 }
    };

    const listObj = {
        name: value,
        itemListElement: []
    }

    const getPagedQuery = async (lim, it = 0) => {
        const response = await axios.post(`https://tinydev.rerum.io/app/query?limit=${lim}&skip=${it}`, queryObj, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });

        const data = await response.data;

        listObj.itemListElement = listObj.itemListElement.concat(data.map(anno => ({ '@id': anno.target ?? anno["@id"] ?? anno.id })));
        try {
            listObj["@type"] = data[0]["@type"] ?? data[0].type ?? "ItemList";
        } catch (error) { 
            console.error('Error querying objects:', error);
        }

        if (data.length && data.length % lim === 0) {
            return getPagedQuery(lim, it + data.length);
        }
    }

    try {
        await getPagedQuery(100);
        return listObj;
    } catch (error) {
        console.error('Error querying objects:', error);
    }
}

export default getCollections;
