import { useEffect, useState, useRef } from "react";

/*
    PageModal Component:
    - This component presents a modal that lets user navigate to 
    specific page numbers used with TextList commponent
*/
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

    /*
    Tailwind CSS is used for styling:
        - 'flex', 'flex-col', 'flex-row': Flexbox classes to create flexible layouts.
        - 'p-1', 'px-2', 'py-1': Padding classes. Numbers denote the size (e.g. 1 is 0.25rem, 2 is 0.5rem).
        - 'text-md': Medium text size.
        - 'ml-auto': Automatic left margin, used for alignment (pushing items to the right).
        - 'border-2', 'border-black': Border classes. Sets the border thickness and color.
        - 'bg-white', 'bg-black': Background color classes.
        - 'w-20', 'w-36', 'h-24': Width and height classes. Numbers denote the size (e.g. 20 is 5rem, 36 is 9rem).
        - 'gap-2': Sets the gap between child elements of a flex or grid container (0.5rem).
        - 'items-center': Aligns flex items along the center perpendicular to the main axis.
        - 'text-white': Text color class.
        - 'font-semibold': Sets the font weight to semi-bold.
        - 'rounded': Adds rounded corners.
        - 'shadow-lg': Large shadow for 3D effect.
    */
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
