import { useEffect, useState } from "react";

const MapMarkerModal = ({ marker, visible, onClose }) => {
	const [isVisible, setIsVisible] = useState(!!visible);

	useEffect(() => {
		setIsVisible(!!visible)
	}, [visible]);

	if (!isVisible) {
		return null;
	}

    if (!marker) {
        return null;
    }

    const { 'body.alternative.value': siglum, 'body.city.value': city, 'body.date.value': date } = marker;

    console.log("marker", marker)

	return (
        <div className="w-full border-2 p-1 mt-2 border-black rounded shadow-lg flex flex-col">
            <p>Siglum: {siglum}</p>
            <p>City: {city}</p>
            <p>Date: {date}</p>
        </div>
	)
}

export default MapMarkerModal;
