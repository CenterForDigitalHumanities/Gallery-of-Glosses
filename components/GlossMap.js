import React, { useEffect, useState } from 'react';

const GlossMap = () => {
    const [sliderValue, setSliderValue] = useState(50);

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = {
        lat: 48.8566,
        lng: 2.3522,
    };

    useEffect(() => {
        // Fetch data or perform any other necessary operations when sliderValue changes
        // Update markers or map data based on the selected time
    }, [sliderValue]);

    return (
        <div className="p-8">
        <h1 className="text-3xl mb-4">Current Location of Glossed Matthew Manuscripts (Work In Progress)</h1>
        <div style={mapContainerStyle}>
        </div>
        <div className="flex items-center">
            <p className="mr-4">Change Time:</p>
            <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            className="slider w-full"
            />
        </div>
        </div>
    );
};

export default GlossMap;
