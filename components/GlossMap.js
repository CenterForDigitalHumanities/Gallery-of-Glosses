import { useEffect, useState } from 'react';

const GlossMap = () => {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="p-8">
        <h1 className="text-3xl mb-4">Current Location of Glossed Matthew Manuscripts (Work In Progress)</h1>
        <div className="border border-gray-300 rounded p-4 mb-4">
            <p>Map Placeholder</p>
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
