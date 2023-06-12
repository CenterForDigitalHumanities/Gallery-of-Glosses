import React, { useState } from 'react';
import GlossMap from '@/components/GlossMap';
import Layout from '../components/Layout';

const Map = () => {
    const [currentYear, setCurrentYear] = useState(1800);
    
    return (
        <Layout>
            <div className="px-10 lg:px-52 pt-24">
                <h1 className="text-4xl mb-6">Glossed Matthew Manuscripts Map</h1>
                <p className="text-lg mb-6">Explore the current locations of Glossed Matthew manuscripts based on different years:</p>
                <GlossMap currentYear={currentYear} />

                <div className="flex items-center mt-6 space-x-2">
                    <span className="font-medium">1800</span>
                    <input
                        type="range"
                        min="1800"
                        max="1900"
                        value={currentYear}
                        onChange={(e) => setCurrentYear(e.target.value)}
                        className="slider w-full mx-2"
                    />
                    <span className="font-medium">1900</span>
                </div>

                <p className="mt-4 text-lg font-bold">Selected Year: {currentYear}</p>
            </div>
        </Layout>
    );
};

export default Map;
