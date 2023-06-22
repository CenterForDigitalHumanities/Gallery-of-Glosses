import React, { useEffect, useState } from 'react';
import ManuscriptMap from '@/components/ManuscriptMap';
import Layout from '../components/Layout';
import MapMarkerModal from '@/components/MapMarkerModal';
import getCollections from '@/actions/getCollections';
import getFromItemList from '@/actions/getFromItemList';
import Loading from '@/components/Loading';

const Map = () => {
    const [currentYear, setCurrentYear] = useState(1000);
    const [mapMarkerModalVisible, setMapMarkerModalVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [markers, setMarkers] = useState([]);
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
            const data = await getFromItemList(collections, ["target", "body.alternative.value", "body.city.value", "body.date.value"], handleProgressUpdate)
            const sortedData = data.sort((a, b) => (a['body.date.value'] || -Infinity) - (b['body.date.value'] || -Infinity));
            
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
            <Layout>
                <div className="px-10 lg:px-52 pt-24">
                    <h1 className="text-4xl mb-6">Glossed Matthew Manuscripts Map</h1>
                    <p className="text-lg mb-6">Explore the current locations of Glossed Matthew manuscripts based on different years:</p>
                    <div className="border-2 border-black p-4 bg-lightGrey">
                        <Loading progress = {progress}/>
                    </div>                
                </div>
            </Layout>
        )
    }

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
                                Click on a marker to display some information on the manuscripts that appeared there below
                            </div>
                            <MapMarkerModal marker={selectedMarker} visible={mapMarkerModalVisible} onClose={() => setMapMarkerModalVisible(false)}/>
                        </div>
                        <ManuscriptMap currentYear={currentYear} setSelectedMarker={setSelectedMarker} setMapMarkerModalVisible={setMapMarkerModalVisible} markers={markers}/>
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
