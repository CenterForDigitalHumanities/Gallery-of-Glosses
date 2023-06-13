import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const Test = () => {
    const [matches, setMatches] = useState([]);

    const DEER = {
        URLS: {
            QUERY: '//tinymatt.rerum.io/gloss/query', // update with your endpoint
        },
    };

    function getVal(property, alsoPeek = [], asType) {
        let prop;
        if (property === undefined || property === "") {
            console.error("Value of property to lookup is missing!")
            return undefined
        }
        if (Array.isArray(property)) {
            return property
        } else {
            if (typeof property === "object") {
                if (!Array.isArray(alsoPeek)) {
                    alsoPeek = [alsoPeek]
                }
                alsoPeek = alsoPeek.concat(["@value", "value", "$value", "val"])
                for (let k of alsoPeek) {
                    if (property.hasOwnProperty(k)) {
                        prop = property[k]
                        break
                    } else {
                        prop = property
                    }
                }
            } else {
                prop = property
            }
        }
        try {
            switch (asType.toUpperCase()) {
                case "STRING":
                    prop = prop.toString();
                    break
                case "NUMBER":
                    prop = parseFloat(prop);
                    break
                case "INTEGER":
                    prop = parseInt(prop);
                    break
                case "BOOLEAN":
                    prop = !Boolean(["false", "no", "0", "", "undefined", "null"].indexOf(String(prop).toLowerCase().trim()));
                    break
                default:
            }
        } catch (err) {
            if (asType) {
                throw new Error("asType: '" + asType + "' is not possible.\n" + err.message)
            } else {
                // no casting requested
            }
        } finally {
            return (prop.length === 1) ? prop[0] : prop
        }
    }


    function httpsIdArray(id, justArray) {
        if (!id.startsWith("http")) return justArray ? [id] : id;
        if (id.startsWith("https://")) return justArray ? [id, id.replace('https', 'http')] : { $in: [id, id.replace('https', 'http')] };
        return justArray ? [id, id.replace('http', 'https')] : { $in: [id, id.replace('http', 'https')] };
    }

    function checkMatch(expanding, asserting, matchOn) {
        let match = false
        CheckMatch: for (const m of matchOn) {
            let obj_match = m.split('.').reduce((o, i) => o[i], expanding)
            let anno_match = m.split('.').reduce((o, i) => o[i], asserting)
            if (obj_match === undefined || anno_match === undefined) {
                continue
            }
            if (!Array.isArray(obj_match)) { obj_match = [obj_match] }
            if (!Array.isArray(anno_match)) { anno_match = [anno_match] }
            if (!anno_match.every(item => obj_match.includes(item))) {
                if (anno_match.some(item => obj_match.includes(item))) {
                    console.warn("Incomplete match may require additional handling. ", obj_match, anno_match)
                }
                break
            } else {
                match = true
            }
        }
        return match
    }

    function buildValueObject(val, fromAnno) {
        let valueObject = {}
        valueObject.source = val.source ?? {
            citationSource: fromAnno["@id"] ?? fromAnno.id,
            citationNote: fromAnno.label ?? fromAnno.name ?? "Composed object from DEER",
            comment: "Learn about the assembler for this object at https://github.com/CenterForDigitalHumanities/deer"
        }
        valueObject.value = val.value ?? getVal(val)
        valueObject.evidence = val.evidence ?? fromAnno.evidence ?? ""
        return valueObject
    }

    async function findByTargetId(id, targetStyle = []) {
        let everything = Object.keys(localStorage).map(k => {
            try {
                return JSON.parse(localStorage.getItem(k))
            } catch (err) {
                return false
            }
        }).filter(o=>o)
        if (!Array.isArray(targetStyle)) {
            targetStyle = [targetStyle]
        }
        targetStyle = targetStyle.concat(["target", "target.@id", "target.id"]) //target.source?F
        let historyWildcard = { "$exists": true, "$size": 0 }
        let obj = { "$or": [], "__rerum.history.next": historyWildcard }
        const uris = httpsIdArray(id,true)
        for (let target of targetStyle) {
            if (typeof target === "string") {
                uris.forEach(uri=>{
                    const altQuery = {}
                    altQuery[target] = uri
                    obj.$or.push(altQuery)
                })
            }
        }
        let matches = await fetch(DEER.URLS.QUERY, {
            method: "POST",
            body: JSON.stringify(obj),
            mode: 'cors',
            headers:{
                "Content-Type" : "application/json;charset=utf-8"
            }
        })
        console.log("matches: ", matches)
        .then(response => response.json())
        .catch((err) => console.error(err))
        let local_matches = everything.filter(o => o.target === id)
        matches = local_matches.concat(matches)
        return matches
    }

    const expand = async (entity, matchOn = ["__rerum.generatedBy", "creator"]) => {
        let findId = entity["@id"] ?? entity.id ?? entity
        if (typeof findId !== "string") {
            console.warn("Unable to find URI in object:", entity)
            return entity
        }

        let response = await fetch(findId.replace(/^https?:/,'https:'))
        let obj = await response.json()
    
        try {
            let annos = await findByTargetId(findId)
            for (let i = 0; i < annos.length; i++) {
                let body
                try {
                    body = annos[i].body
                } catch (err) { continue }
                if (!body) { continue }
                if (body.evidence) {
                    obj.evidence = (typeof body.evidence === "object") ? body.evidence["@id"] : body.evidence;
                }
                if (!Array.isArray(body)) {
                    body = [body]
                }
                Leaf: for (let j = 0; j < body.length; j++) {
                    try {
                        if (!checkMatch(obj, annos[i], matchOn)) {
                            continue Leaf
                        }
                        if (annos[i].hasOwnProperty("__rerum") && annos[i].__rerum.history.next.length) {
                            continue Leaf;
                        }
                        let assertion = body[j]
                        let keys = Object.keys(assertion)
                        let k = keys[0]
                        if (keys.length > 1 || k === 0) {
                            console.warn("This assertion is not as expected and may not have been interpreted correctly.", assertion)
                        }
                        let val = assertion[k]
                        val = buildValueObject(val, annos[i])
                        // Logic to assign val to obj[k]...
                    } catch (err_1) { }
                }
            }
            return obj
        } catch (err) {
            console.error("Error expanding object:" + err)
            return err
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            let msid = window.location.hash.substr(1);

            const queryData = {
                "body.partOf.value": httpsIdArray(msid)
            };

            const requestOptions = {
                method: "POST",
                body: JSON.stringify(queryData),
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                }
            };

            try {
                const response = await fetch("//tinymatt.rerum.io/gloss/query", requestOptions);
                console.log("response:", response)
                const annotations = await response.json();
                const matchesResponse = await Promise.all(annotations.map(anno => fetch(anno.target.replace(/^https?:/, 'https:')).then(res => res.json())));
                console.log("matchesResponse:", matchesResponse)
                const expandedMatches = await Promise.all(matchesResponse.map(match => expand(match)));
                
                setMatches(expandedMatches.filter(match => match.__deleted === undefined));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <div className="px-52 py-4 pt-24">
                Queried stuff:
                {matches.map((match, index) => 
                    <div key={index}>   
                        <pre>{JSON.stringify(match, null, 2)}</pre>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Test;
