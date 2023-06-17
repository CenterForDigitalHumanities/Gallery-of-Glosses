import getCollections from "@/actions/getCollections";
import getFromItemList from "@/actions/getFromItemList";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Graticule, Marker, ZoomableGroup } from "react-simple-maps";

const GlossMap = ({ currentYear }) => {
    const [markers, setMarkers] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const cityCoordinates = {
        "Oxford": [-1.257726, 51.752022],
        "Cambridge": [0.121817, 52.205338],
        "Valenciennes": [3.5234, 50.3570],
        "St. Gallen": [9.3748, 47.4223],
        "Vatican City": [12.4534, 41.9029],
    };    
    
    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";

    // Callback function for handling progress updates
    const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);
    };

    const checkForDuplicates = (city, index, arr) => {
        return arr.filter((item, idx) => item['body.city.value'] === city && idx !== index).length > 0;
    };

    // fetches the data 
    useEffect(() => {
        const fetchData = async () => {
            // get all collections of manuscript or named gloss
            const collections = await getCollections({value: "Glossing-Matthew"})

            // take all the collections and get the values of keys from collectoins
            const data = await getFromItemList(collections, ["body.alternative.value", "body.city.value", "body.date.value"], handleProgressUpdate)

            let cityCounts = {};
            
            const dataWithCoordinates = data.map((marker, index) => {
                const city = marker['body.city.value'];
            
                // Increase the count for the current city, or initialize it with 0 and then increase it
                if (!cityCounts[city]) {
                    cityCounts[city] = 0;
                }
                cityCounts[city]++;
            
                // The offset for the current marker will be the current count - 1 (to make the offset 0 for the first occurrence) times 20
                const offset = (cityCounts[city] - 1) * 25;
            
                return {
                    ...marker,
                    coordinates: cityCoordinates[city],
                    offset: offset
                };
            });                   
            
            setMarkers(dataWithCoordinates);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div>
                Loading... {Math.round(progress * 100)}%
            </div>
        )
    }

    return (
        <div className="border-2 border-black w-[70%]">
            <ComposableMap
                width={1000}
                height={400}
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [-8.0, -47.0, 0],
                    scale: 1300
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
                {markers.map(({ '@id': id, 'body.alternative.value': siglum, 'body.date.value': date, coordinates, offset }) => (
                    date <= currentYear && coordinates &&
                    <Marker key={id} coordinates={coordinates}>
                        <g
                            fill="none"
                            stroke="#000000"
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
                            y={-30}
                            x={offset}
                            style={{ fontFamily: "system-ui", fill: "#000000" }}
                        >
                            {siglum}
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
};

export default GlossMap;
