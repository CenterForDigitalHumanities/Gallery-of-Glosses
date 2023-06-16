import { useEffect, useState } from "react";

const CompareHolderModal = ({ glosses, visible, openCompareModal, removeGloss }) => {
    const [isVisible, setIsVisible] = useState(!!visible);

    useEffect(() => {
        setIsVisible(!!visible)
    }, [visible]);

    const emptySlots = Array(4 - glosses.length).fill("Compare another gloss");

    if (!isVisible) {
        return null;
    }

    return (
        <footer className="-translate-x-52 fixed bottom-0 w-full z-40 bg-bg-secondary-color h-16 flex items-center">
            <h2 className="text-2xl px-5">Selected Glosses:</h2>
            <div className="flex gap-4">
                {glosses.map((gloss, index) => (
                    <div className="border border-black p-2 flex gap-2" key={index}>
                        {gloss}
                        <svg onClick={() => removeGloss(gloss)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="cursor-pointer w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                ))}
                {emptySlots.map((slot, index) => (
                    <div className="border border-black p-2 bg-lightGrey text-black" key={index + glosses.length}>{slot}</div>
                ))}
            </div>
            <div onClick={openCompareModal} className="ml-auto cursor-pointer transition bg-lightGrey hover:bg-grey hover:text-white border-2 border-black px-3">
                Compare Glosses
            </div>
        </footer>
    )
}

export default CompareHolderModal;
