import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import getAnnotations from '../actions/getAnnotations';
import getFromAnnotation from '../actions/getFromAnnotation';

const Test = () => {
    const [objects, setObjects] = useState([]);
    const [leftObjects, setLeftObjects] = useState([]);
    const [rightObjects, setRightObjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAnnotations({ key: "@type", value: "manuscript" });
            setObjects(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchAnnotationData = async () => {
            const leftData = await getFromAnnotation({ data: objects, key: "body.identifier.value" });
            const rightData = await getFromAnnotation({ data: objects, key: "body.city.value" });
            setLeftObjects(leftData);
            setRightObjects(rightData);
        };
    
        fetchAnnotationData();
    }, [objects]);

    return (
        <Layout>
            <div className="px-52 py-24">
                Queried Objects:
                {objects.map((obj, index) => (
                    <div key={index}>
                        <div className="flex gap-2">
                            <p>Object {index + 1}:</p>
                            <div className="flex flex-col">
                                {Object.entries(obj).map(([key, value], i) => (
                                    <div key={i}>
                                        <p>{key}: {JSON.stringify(value)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <p>Shelfmark:</p>
                            {leftObjects[index] && <p>{leftObjects[index]}</p>}
                        </div>
                        <div className="flex gap-2">
                            <p>City:</p>
                            {rightObjects[index] && <p>{rightObjects[index]}</p>}
                        </div>
                    </div>
                ))}               
            </div>
        </Layout>
    );
};

export default Test;
