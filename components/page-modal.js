import { useEffect, useState, useRef } from "react";

const PageModal = ({ visible, onClose, onGoToPage }) => {
    const [isVisible, setIsVisible] = useState(!!visible);
    const [pageNumber, setPageNumber] = useState(1);
    const modalRef = useRef()

    useEffect(() => {
        const clickListener = (event) => {
            // If modal is visible and the click is outside the modal, close it
            if (visible && modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
    
        document.addEventListener("click", clickListener);
        return () => {
            document.removeEventListener("click", clickListener);
        };
    }, [visible, onClose]);

    useEffect(() => {
        setIsVisible(!!visible)
    }, [visible]);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };  

    const handleGoToPage = () => {
        onGoToPage(pageNumber);
        setPageNumber('');
        handleClose();
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div ref={modalRef} className="w-36 h-24 ml-auto border-2 p-1 bg-white rounded shadow-lg flex flex-col">
            <div className="bg-black text-white font-semibold p-1">
                <p>
                    Go to Page...
                </p>
            </div>
            <div className="flex flex-row gap-2 items-center text-md py-1">
                <input min="1" value={pageNumber} onChange={(e) => setPageNumber(e.target.value)} className="w-20 border-black border-2 p-1" />
                <button onClick={handleGoToPage} className="bg-black text-white font-semibold py-1 px-2 rounded">
                    Go
                </button>
            </div>
        </div>
    )
}

export default PageModal;
