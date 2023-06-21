import getFromObject from "@/actions/getFromObject";
import getTargets from "@/actions/getTargets";
import { useEffect, useState } from "react";
import { FiDownload } from 'react-icons/fi';

const CompareModal = ({ glosses, visible, onClose, removeGloss }) => {
	const [isVisible, setIsVisible] = useState(!!visible);
    const [glossDetails, setGlossDetails] = useState([]);
    
    // Tracks Loading Progress
    const [isLoading, setIsLoading] = useState(true);

    // New state variable for tracking progress
    const [progress, setProgress] = useState(0);

    // Callback function for handling progress updates
    const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);
    };

	useEffect(() => {
		setIsVisible(!!visible)
	}, [visible]);

	const handleClose = () => {
		setIsVisible(false);
		onClose();
	};  

    useEffect(() => {
		const fetchGlossDetails = async () => {
			let glossDetails = [];
            
			for (const gloss of glosses) {
                const collectionsArray  = await getTargets({ value: gloss["targetId"] });
                const processedCollections = getFromObject(collectionsArray, ["body.title.value", "body.description.value", "body.targetChapter.value", "body.targetVerse.value", "body.targetedText.value", "body.transcribedGloss.value", "body.tags.items"]);
                glossDetails = glossDetails.concat(processedCollections);
                setIsLoading(false);
			}
            
			setGlossDetails(glossDetails);
		};

		fetchGlossDetails();
	}, [glosses]);

	if (!isVisible) {
		return null;
	}
    
    if (isLoading) {
        return (
            <div className="border-2 border-black p-4 bg-white rounded shadow-lg">
                Loading... {Math.round(progress * 100)}%
            </div>
        )
    }

	return (
		<div className="border-2 border-black p-4 bg-white rounded shadow-lg flex flex-col">
                <div className="flex mb-4">
                    <div className="text-3xl">Compare Glosses (Work In Progress)</div>
                    <div onClick={handleClose} className="w-16 h-10 flex items-center justify-center cursor-pointer mr-5 ml-auto bg-lightGrey transition hover:bg-grey rounded-full">
                        <p className="flex items-center">Close</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {glossDetails.map((gloss, index) => (
                    
                    <div key={index} className="border border-gray-300 rounded p-4">
                        <div className="flex">
                            <h2 className="text-xl mb-2">Gloss {index + 1}</h2>
                        </div>
                        <div className="flex flex-col">
                            <div>{gloss["body.title.value"]}</div>
                            <div onClick={() => removeGloss(gloss)} className="rounded-full mt-10 cursor-pointer text-red-600">Remove from List</div>
                        </div>
                    </div>
                    ))}
                    
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="border border-gray-300 rounded p-4">
                    <h2 className="text-xl mb-2">Description</h2>
                    <div className="flex flex-col">
                        {glossDetails.map((gloss, index) => (
                            <div>
                                <div key={index} className="flex gap-2">
                                    <p className="font-bold w-[20%] whitespace-nowrap">{gloss["body.title.value"]}:</p>
                                    <p className="ml-[3%] w-[75%]">{gloss["body.description.value"] ? gloss["body.description.value"] : " N/A"}</p>
                                </div>
                                <hr className="border border-gray-300" /> 
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4 ">
                        <h2 className="text-xl mb-2">Chapter & Verse</h2>
                        <div className="flex flex-col">
                            {glossDetails.map((gloss, index) => (
                                <div>
                                    <div key={index} className="flex gap-2" >
                                        <p className="font-bold w-[20%] whitespace-nowrap">{gloss["body.title.value"]}:</p>
                                        <div className="ml-[3%] w-[75%]">
                                            {!gloss["body.targetChapter.value"] || !gloss["body.targetVerse.value"] ?
                                                <p>
                                                    N/A
                                                </p>
                                                :
                                                <div className="flex gap-2">
                                                    <p>
                                                        Found in Chapter {gloss["body.targetChapter.value"]},
                                                    </p>
                                                    <p>
                                                        Verse {gloss["body.targetVerse.value"]} of Matthew {/* this is hardcoded for now */}
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <hr className="border border-gray-300" /> 
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <h2 className="text-xl mb-2">Targeted Text</h2>
                        <div className="flex flex-col">
                            {glossDetails.map((gloss, index) => (
                                <div>
                                    <div key={index} className="flex gap-2">
                                        <p className="font-bold w-[20%] whitespace-nowrap">{gloss["body.title.value"]}:</p>
                                        <p className="ml-[3%] w-[75%]">{gloss["body.targetedText.value"] ? gloss["body.targetedText.value"] : " N/A"}</p>
                                    </div>
                                    <hr className="border border-gray-300" /> 
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <h2 className="text-xl mb-2">Transcription</h2>
                        <div className="flex flex-col">
                            {glossDetails.map((gloss, index) => (
                                <div>
                                    <div key={index} className="flex gap-2">
                                        <p className="font-bold w-[20%] whitespace-nowrap">{gloss["body.title.value"]}:</p>
                                        <p className="ml-[3%] w-[75%]">{gloss["body.transcribedGloss.value"] ? gloss["body.transcribedGloss.value"] : " N/A"}</p>
                                    </div>
                                    <hr className="border border-gray-300" /> 
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4">
                        <h2 className="text-xl mb-2">Tags</h2>
                        <div className="flex flex-col">
                            {glossDetails.map((gloss, index) => (
                                <div>
                                    <div key={index} className="flex gap-2">
                                        <p className="font-bold w-[20%] whitespace-nowrap">{gloss["body.title.value"]}:</p>
                                        <p className="ml-[3%] w-[75%]">{gloss["body.tags.items"] ? gloss["body.tags.items"].join(', ') : " N/A"}</p>
                                    </div>
                                    <hr className="border border-gray-300" /> 
                                </div>
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
