import React from "react";
import { ComposableMap, Geographies, Geography, Graticule, Marker, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";

const markers = [
    { markerOffset: -30, name: "La", coordinates: [2.349014, 48.864716], date: 1810 },
    { markerOffset: 15, name: "Ts", coordinates: [5.36978, 43.296482], date: 1810 },
    { markerOffset: 15, name: "E", coordinates: [4.83, 45.75], date: 1820 },
    { markerOffset: 15, name: "Ga", coordinates: [1.444209, 43.604652], date: 1820 },
    { markerOffset: 15, name: "Nice", coordinates: [7.25044, 43.70313], date: 1830 },
    { markerOffset: 15, name: "Nantes", coordinates: [-1.55336, 47.21725], date: 1830 },
    { markerOffset: -30, name: "Strasbourg", coordinates: [7.74856, 48.58392], date: 1840 },
    { markerOffset: -30, name: "Montpellier", coordinates: [3.876716, 43.610769], date: 1840 },
    { markerOffset: 15, name: "Bordeaux", coordinates: [-0.56667, 44.83333], date: 1850 },
    { markerOffset: 15, name: "Lille", coordinates: [3.057256, 50.62925], date: 1850 },
    { markerOffset: 15, name: "Rennes", coordinates: [-1.67429, 48.11198], date: 1860 },
    { markerOffset: 15, name: "Reims", coordinates: [4.03309, 49.25], date: 1860 }
];

const GlossMap = ({ currentYear }) => {
    return (
        <div className="border-2 border-black">
            <ComposableMap
                width={1000}
                height={400}
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [-8.0, -47.0, 0],
                    scale: 2000
                }}
            >
                    <Graticule stroke="#EAEAEC" />
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#9998A3"
                                    stroke="#EAEAEC"
                                />
                            ))
                        }
                    </Geographies>
                    {/* 
                        Marker design came off a template from react-simple-maps.io
                        This is just drawing the label, and marking it down on the map
                    */}
                    {markers.map(({ name, coordinates, markerOffset, date }) => (
                    date <= currentYear &&
                    <Marker key={name} coordinates={coordinates}>
                        <g
                            fill="none"
                            stroke="#FF5533"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(-12, -24)"
                        >
                            <circle cx="12" cy="10" r="3" />
                            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                        </g>
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
};

export default GlossMap;
