const getFromObject = (collectionsArray, fields) => {
    try {
        const reduced = collectionsArray.reduce((acc, collection) => {
            for(let field of fields) {
                let path = field.split('.');
                let value = collection;
                for(let key of path) {
                    value = value?.[key];
                }
                if(value !== undefined) {
                    acc[field] = value;
                }
            }
            return acc;
        }, {});

        return reduced;
    } catch (err) {
        console.log(err);
    }

    
}

export default getFromObject;
