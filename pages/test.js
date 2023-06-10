import React, { useEffect } from 'react';
import Layout from '../components/Layout';

const Test = () => {
    function httpsIdArray(id, justArray) {
        if (!id.startsWith("http")) return justArray ? [id] : id;
        if (id.startsWith("https://")) return justArray ? [id, id.replace('https', 'http')] : { $in: [id, id.replace('https', 'http')] };
        return justArray ? [id, id.replace('http', 'https')] : { $in: [id, id.replace('http', 'https')] };
      }


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
            const annotations = await response.json();
            const matches = await Promise.all(annotations.map(anno => fetch(anno.target.replace(/^https?:/, 'https:')).then(res => res.json())));
            console.log("response", response)
            console.log("annotations", annotations)
            // Process the matches as needed
            console.log("Matches:", matches);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <div className="px-52 py-4 pt-24">
                Queried stuff
            </div>
        </Layout>
  );
};

export default Test;
