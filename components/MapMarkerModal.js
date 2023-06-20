import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const MapMarkerModal = ({ marker, visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visible);
    console.log
    useEffect(() => {
        setIsVisible(!!visible)
    }, [visible]);

    if (!isVisible) {
        return null;
    }

    if (!marker || marker.length === 0) {
        return null;
    }
    
    return (
        <div className="w-full border-2 p-1 mt-2 border-black rounded shadow-lg flex flex-col">
            {marker.length > 0 && marker[0]['body.city.value'] && <p className="mb-2 text-2xl font-bold underline">{marker[0]['body.city.value']}:</p>}

            {marker.map(({ 'body.alternative.value': siglum, 'body.city.value': city, 'body.date.value': date }, index) => (
                <div key={index}>
                    <p>Siglum: {siglum}</p>
                    <p>City: {city}</p>
                    <p>Date: {date? date : "No Date Recorded"}</p>
                    <button onClick={()=>{}} className="bg-black/30 text-white rounded-md mb-2 py-1 px-2 w-auto text-xs lg:text-lg font-semibold flex flex-rows items-center hover:bg-black/20 transition">
                        <AiOutlineInfoCircle className="mr-1" />
                        More Info
                    </button>
                    <hr className="border-black"/> {/* Optional separator */}
                </div>
            ))}
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-grey text-white rounded hover:bg-black/20 transition">Close</button>
        </div>
    )
}

export default MapMarkerModal;
