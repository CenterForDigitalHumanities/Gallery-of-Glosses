import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const Test = () => {
    const [objects, setObjects] = useState([]); // State to store the queried objects

    useEffect(() => {
        const performQuery = async () => {
            try {
                const targetId = 'http://devstore.rerum.io/v1/id/5f480e0fe4b098291e2e5370';
                const query = {
                    'body.target': targetId,
                };

                // Step 1: Perform the query to retrieve annotations matching the target ID
                const response = await fetch('https://tinymatt.rerum.io/gloss/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(query),
                });

                // Step 2: Parse the response and extract the annotations
                const annotations = await response.json();

                // Step 3: Create an array of promises to fetch the associated objects
                const objectPromises = annotations.map((anno) =>
                    fetch(anno.target.replace(/^https?:/, 'https:')).then((res) => res.json())
                );

                // Step 4: Fetch all the associated objects concurrently using Promise.all
                const retrievedObjects = await Promise.all(objectPromises);

                // Step 5: Set the retrieved objects to the state
                setObjects(retrievedObjects);
            } catch (error) {
                console.error('Error querying objects:', error);
            }
        };
        performQuery();
    }, []);

    return (
        <Layout>
            <div className="px-52 py-4">
                {/* Step 6: Render the retrieved objects */}
                {objects.map((obj, index) => (
                    <div key={index}>
                        <p>{obj['@id']}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Test;
