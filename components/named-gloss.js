import axios from 'axios';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 10;  // Number of glosses per page
const PAGE_RANGE_DISPLAYED = 3;  // Number of page numbers to show in the pagination component

const NamedGlosses = () => {
	const [glosses, setGlosses] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchGlosses = async () => {
		const response = await axios.get('https://store.rerum.io/v1/id/610c54deffce846a83e70625');
		const totalCount = response.data.numberOfItems;
		const totalPages = Math.ceil(totalCount / PAGE_SIZE);
		setGlosses(response.data.itemListElement);
		setTotalPages(totalPages);
		};

		fetchGlosses();
	}, []);

	const startIndex = (currentPage - 1) * PAGE_SIZE;
	const displayedGlosses = glosses.slice(startIndex, startIndex + PAGE_SIZE);

	const goToPage = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo(0, 0);
	};

	const getPageNumbers = () => {
		const rangeStart = Math.max(1, currentPage - Math.floor(PAGE_RANGE_DISPLAYED / 2));
		const rangeEnd = Math.min(totalPages, currentPage + Math.floor(PAGE_RANGE_DISPLAYED / 2));
		const pages = [];
		for (let i = rangeStart; i <= rangeEnd; i++) {
			pages.push(i);
		}
		return pages;
	};

	return (
		<div className="flex flex-col gap-4">
			{displayedGlosses.map((gloss, index) => (
				<div key={index} className="flex items-center gap-2">
					<div className="bg-gray-200 p-1"> 
						<p>Icon</p>
					</div>
					<div>
						<p className="text-[20px] cursor-pointer">{gloss.label}</p>
						<p className="text-[16px]">{gloss['@id']}</p>
					</div>
				</div>
			))}
			<hr className="my-4" />
			{/* These are the buttons to change page numbers*/}
			<div className="flex flex-row ml-auto items-center mt-4"> 
				{currentPage !== 1 && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-3 py-1 hover:text-gray-300 cursor-pointer" onClick={() => goToPage(1)}>
						First
					</div>
				}
				{currentPage > 2 && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-3 py-1 hover:text-gray-300 cursor-pointer" onClick={() => goToPage(1)}>
						1
					</div>  
				}
				{currentPage > 3 && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-3 py-1 hover:text-gray-300 cursor-pointer" onClick={() => {}}>
						...
					</div>  
				}
				{getPageNumbers().map(pageNumber => (
					<div style={{fontSize: "18px"}} className={`border-2 px-3 py-1 border-black ${currentPage === pageNumber ? 'bg-black text-white font-semibold' : 'hover:text-gray-300 cursor-pointer'}`} key={pageNumber} onClick={() => goToPage(pageNumber)}>
						{pageNumber}
					</div>
				))}
				{currentPage < totalPages - 2 && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-3 py-1 hover:text-gray-300 cursor-pointer" onClick={() => {}}>
						...
					</div>  
				}
				{currentPage < totalPages - 1 && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-3 py-1 hover:text-gray-300 cursor-pointer" onClick={() => goToPage(totalPages)}>
						{totalPages}
					</div>  
				}
				{currentPage !== totalPages && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-3 py-1 hover:text-gray-300 cursor-pointer" onClick={() => goToPage(totalPages)}>
						Last
					</div>  
				}
			</div>
	  	</div>
	);
};

export default NamedGlosses;
