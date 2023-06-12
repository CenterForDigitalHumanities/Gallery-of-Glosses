import { useEffect, useState } from "react";

const CompareHolderModal = ({ glosses, visible, openCompareModal }) => {
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
                    <div className="border border-black p-2" key={index}>{gloss}</div>
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
