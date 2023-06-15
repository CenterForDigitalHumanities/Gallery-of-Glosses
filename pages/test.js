import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import getFromItemList from '@/actions/getFromItemList';

const Test = () => {
    const [objects, setObjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFromItemList("https://store.rerum.io/v1/id/610ad6f1ffce846a83e70613", ["body.identifier.value","body.city.value"])
            setObjects(data);
            setIsLoading(false);
            console.log(objects)
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Layout>
                <div className="px-52 py-24">
                    Loading...
                </div>
            </Layout>
        );
    };

    return (
        <Layout>
            <div className="px-52 py-24">
                Queried Objects:
                {objects?.map((obj, index) => (
                    <div key={index}>
                        <div className="flex gap-2">
                            <p>Object {index + 1}:</p>
                            <pre>{obj['body.identifier.value']}</pre>
                            <pre>{obj['body.city.value']}</pre>
                        </div>
                    </div>
                ))}               
            </div>
        </Layout>
  );
};

export default Test;
