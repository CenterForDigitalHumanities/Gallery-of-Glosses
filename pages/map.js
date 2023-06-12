import React, {  useState } from 'react';
import GlossMap from '@/components/GlossMap';
import Layout from '../components/Layout';

const Map = () => {
    const [currentYear, setCurrentYear] = useState(1800);
    
    return (
        <Layout>
            <div className="px-52 pt-24">
                <h1 className="text-3xl mb-4">Current Location of Glossed Matthew Manuscripts</h1>
                <GlossMap currentYear={currentYear} />
                <div className="flex items-center mt-4">
                    <p>1800</p>
                    <input
                        type="range"
                        min="1800"
                        max="1900"
                        value={currentYear}
                        onChange={(e) => setCurrentYear(e.target.value)}
                        className="slider w-full mx-2"
                    />
                    <p>1900</p>
                </div>
                <div className="mt-2">Year: {currentYear}</div>
            </div>
        </Layout>
    )
};

export default Map;
