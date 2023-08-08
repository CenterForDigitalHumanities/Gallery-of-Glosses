"use client";
import React from "react";

interface MapControlsProps {
  yearLow: number;
  yearHigh: number;
  mapSelected: string;
  setYearLow: React.Dispatch<React.SetStateAction<number>>;
  setYearHigh: React.Dispatch<React.SetStateAction<number>>;
  setMapSelected: React.Dispatch<React.SetStateAction<string>>;
}

const MapControls: React.FC<MapControlsProps> = ({
  yearLow,
  yearHigh,
  mapSelected,
  setYearLow,
  setYearHigh,
  setMapSelected,
}) => {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <label
          htmlFor="mapSelect"
          className="block text-sm font-medium text-gray-700"
        >
          Select a Map:
        </label>
        <select
          id="mapSelect"
          className="mt-1 block w-full py-2 px-3 border border-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={mapSelected}
          onChange={(ev) => setMapSelected(ev.target.value)}
        >
          <option value="Glossing-Matthew">Glossing-Matthew</option>
          <option value="Provenance">Provenance</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="yearLow"
          className="block text-sm font-medium text-gray-700"
        >
          Low:
        </label>
        <input
          id="yearLow"
          type="number"
          min="1000"
          max="1999"
          className="mt-1 block w-full py-2 px-3 border border-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={yearLow}
          onChange={(ev) => setYearLow(Number(ev.target.value))}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="yearHigh"
          className="block text-sm font-medium text-gray-700"
        >
          High:
        </label>
        <input
          id="yearHigh"
          type="number"
          min="1001"
          max="2000"
          className="mt-1 block w-full py-2 px-3 border border-gray-800 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={yearHigh}
          onChange={(ev) => setYearHigh(Number(ev.target.value))}
        />
      </div>
    </div>
  );
};

export default MapControls;
