import { useEffect, useState } from "react";
import { FiDownload } from 'react-icons/fi';

const CompareModal = ({ glosses, visible, onClose, removeGloss }) => {
	const [isVisible, setIsVisible] = useState(!!visible);

	useEffect(() => {
		setIsVisible(!!visible)
	}, [visible]);

	const handleClose = () => {
		setIsVisible(false);
		onClose();
	};  

	if (!isVisible) {
		return null;
	}

	return (
		<div className="border-2 border-black p-4 bg-white rounded shadow-lg flex flex-col">
                <div className="flex mb-4">
                    <h1 className="text-3xl">Compare Glosses (Work In Progress)</h1>
                    <div onClick={handleClose} className="w-16 h-10 flex items-center justify-center cursor-pointer mr-5 ml-auto bg-lightGrey transition hover:bg-grey rounded-full">
                        <p className="flex items-center">Close</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {glosses.map((gloss, index) => (
                    <div key={index} className="border border-gray-300 rounded p-4">
                        <div className="flex">
                            <h2 className="text-xl mb-2">Gloss {index + 1}</h2>
                        </div>
                        <div className="flex flex-col">
                            <h>{gloss}</h>
                            <h onClick={() => removeGloss(gloss)} className="rounded-full mt-10 cursor-pointer text-red-600">Remove from List</h>
                        </div>
                    </div>
                    ))}
                    
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="border border-gray-300 rounded p-4">
                    <h2 className="text-xl mb-2">City</h2>
                    <div className="flex flex-col">
                        {glosses.map((gloss, index) => (
                        <h key={index}>
                            <strong>Gloss Name:</strong> {gloss.city}
                        </h>
                        ))}
                    </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                    <h2 className="text-xl mb-2">Date</h2>
                    <div className="flex flex-col">
                        {glosses.map((gloss, index) => (
                            <h key={index}>
                                <strong>Gloss Name:</strong> {gloss.date}
                            </h>
                        ))}
                    </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                    <h2 className="text-xl mb-2">Origin</h2>
                    <div className="flex flex-col">
                        {glosses.map((gloss, index) => (
                            <h key={index}>
                                <strong>Gloss Name:</strong> {gloss.origin}
                            </h>
                        ))}
                    </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                    <h2 className="text-xl mb-2">Description</h2>
                    <div className="flex flex-col">
                        {glosses.map((gloss, index) => (
                            <h key={index}>
                                <strong>Gloss Name:</strong> {gloss.description}
                            </h>
                        ))}
                    </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                    <h2 className="text-xl mb-2">Property1</h2>
                    <div className="flex flex-col">
                        {glosses.map((gloss, index) => (
                            <h key={index}>
                                <strong>Gloss Name:</strong> {gloss.property1}
                            </h>
                        ))}
                    </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                    <h2 className="text-xl mb-2">Property2</h2>
                    <div className="flex flex-col">
                        {glosses.map((gloss, index) => (
                            <h key={index}>
                                <strong>Gloss Name:</strong> {gloss.property2}
                            </h>
                        ))}
                    </div>
                    </div>
                </div>
                
                <div className="mt-4">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
                    <FiDownload className="mr-2"/>
                        Save .csv
                    </button>
                </div>
		</div>
	)
}

export default CompareModal;
