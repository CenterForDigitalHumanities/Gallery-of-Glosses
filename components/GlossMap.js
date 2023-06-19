import getCollections from "@/actions/getCollections";
import getFromItemList from "@/actions/getFromItemList";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Graticule, Marker } from "react-simple-maps";

const GlossMap = ({ currentYear, setMapMarkerModalVisible, setSelectedMarker }) => {
    const [markers, setMarkers] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const cityCoordinates = {
        // Coords are incorrect. 
        "Oxford": [-1.257726, 51.752022],
        "Cambridge": [0.121817, 52.205338],
        "Valenciennes": [3.5234, 50.3570],
        "St. Gallen": [9.3748, 47.4223],
        "Vatican City": [12.4534, 41.9029],
        "Evora": [7.9135, 38.5714],
        "Laon": [3.6199, 49.5641],
        "Engelberg": [8.4070, 46.8200],
        "London": [0.1276, 51.5072],
        "Tours": [0.6848, 47.3941],
        "Paris": [2.3522, 48.8566], 
        "Hereford": [-2.7156, 52.0567],
    };   
    
    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";

    // Callback function for handling progress updates
    const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);
    };

    // fetches the data 
    useEffect(() => {
        const fetchData = async () => {
            // get all collections of manuscript or named gloss
            const collections = await getCollections({value: "Glossing-Matthew"})

            // take all the collections and get the values of keys from collectoins
            const data = await getFromItemList(collections, ["body.alternative.value", "body.city.value", "body.date.value"], handleProgressUpdate)
            const sortedData = data.sort((a, b) => (a['body.date.value'] || -Infinity) - (b['body.date.value'] || -Infinity));

            console.log("sortedData", sortedData)
            const dataWithCoordinates = sortedData.map((marker) => {
                const city = marker['body.city.value'];

                return {
                    ...marker,
                    coordinates: cityCoordinates[city],
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
        <div className="border-2 border-black w-[80%]">
            <ComposableMap
                width={800}
                height={800}
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [-8.0, -47.0, 0],
                    scale: 1800
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
                {markers.map((marker) => {
                    const { '@id': id, 'body.alternative.value': siglum, 'body.date.value': date, coordinates } = marker;
                    if ((date === undefined || date <= currentYear) && coordinates) {
                        
                        return (
                            <Marker className="cursor-pointer" onClick={() => {setMapMarkerModalVisible(true); setSelectedMarker(marker);}} key={id} coordinates={coordinates}>
                                <circle r={10} fill="#FFFFFF" stroke="#000000" strokeWidth={2} />
                            </Marker>
                        );
                    } else {
                        return null;
                    }
                })}
            </ComposableMap>
        </div>
    );
};

export default GlossMap;
