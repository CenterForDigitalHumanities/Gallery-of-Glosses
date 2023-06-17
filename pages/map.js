import React, { useState } from 'react';
import GlossMap from '@/components/GlossMap';
import Layout from '../components/Layout';

const Map = () => {
    const [currentYear, setCurrentYear] = useState(1000);
    
    return (
        <Layout>
            <div className="px-10 lg:px-52 pt-24">
                <h1 className="text-4xl mb-6">Glossed Matthew Manuscripts Map</h1>
                <p className="text-lg mb-6">Explore the current locations of Glossed Matthew manuscripts based on different years:</p>
                <div className="border-2 border-black p-4 bg-lightGrey">
                    <div className="flex justify-between">
                        <div className="mr-4">
                            <p className="text-2xl font-bold">Selected Year: {currentYear}</p>
                            <div className="bg-grey text-white p-2 mt-4 rounded-md">
                                Some words. Maybe as the scroll goes by, it will display content about a specific year..
                            </div>
                        </div>
                        <GlossMap currentYear={currentYear} />
                    </div>

                    <div className="flex items-center mt-6 space-x-2">
                        <span className="font-medium">1000</span>
                        <input
                            type="range"
                            min="1000"
                            max="1200"
                            value={currentYear}
                            onChange={(e) => setCurrentYear(e.target.value)}
                            className="slider w-full mx-2"
                        />
                        <span className="font-medium">1200</span>
                    </div>
                </div>                
            </div>
        </Layout>
    );
};

export default Map;
