import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Graticule, Marker } from "react-simple-maps";

const ManuscriptMap = ({ currentYear, setMapMarkerModalVisible, setSelectedMarker, markers }) => {
    const [cityCount, setCityCount] = useState({});

    const cityCoordinates = {
        // Coords are incorrect. 
        "Oxford": [-1.257726, 51.752022],
        "Cambridge": [0.121817, 52.205338],
        "Valenciennes": [3.5234, 50.3570],
        "St. Gallen": [9.3748, 47.4223],
        "Vatican City": [12.4534, 41.9029],
        "Evora": [-7.915873, 38.67426],
        "Laon": [3.6199, 49.5641],
        "Engelberg": [8.4070, 46.8200],
        "London": [0.1276, 51.5072],
        "Tours": [0.6848, 47.3941],
        "Paris": [2.3522, 48.8566], 
        "Hereford": [-2.7156, 52.0567],
    };   
    
    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json";
    
    useEffect(() => {
        const cityCounts = {};
        markers.forEach(marker => {
            const { 'body.date.value': date, 'body.city.value': city } = marker;
            if (date !== undefined && date <= currentYear) {
                cityCounts[city] = (cityCounts[city] || 0) + 1;
            }
        });
        setCityCount(cityCounts); 
    }, [currentYear, markers]);

    const handleMarkerClick = (marker) => {
        const markersInCity = markers.filter(m => m['body.city.value'] === marker['body.city.value'] && (m['body.date.value'] === undefined || m['body.date.value'] <= currentYear));
        setMapMarkerModalVisible(true);
        setSelectedMarker(markersInCity);
    };

    return (
        <div className="border-2 border-black w-[80%]">
            <ComposableMap
                width={800}
                height={600}
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
                {markers.map((marker, index) => {
                    const { '@id': id, 'body.alternative.value': siglum, 'body.date.value': date, coordinates, 'body.city.value': city } = marker;
                    if ((date === undefined || date <= currentYear) && coordinates) {
                        // color marker based on city count
                        const count = cityCount[city] || 1;

                        // adjust the opacity based on the count
                        const fill = `rgba(255, 0, 0, ${Math.min(1, count * 0.3)})`; 

                        return (
                            <Marker className="cursor-pointer" onClick={() => handleMarkerClick(marker)} key={index} coordinates={coordinates}>
                                <circle r={10} fill={fill} stroke={fill} strokeWidth={2} />
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

export default ManuscriptMap;
