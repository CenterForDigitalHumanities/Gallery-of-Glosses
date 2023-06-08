import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import PageModal from './PageModal';
import Link from 'next/link';
import axios from 'axios';

const PAGE_SIZE = 10;  // Number of items per page
const PAGE_RANGE_DISPLAYED = 3;  // Number of page numbers to show in the pagination component

/*
    TextList Component:
    - This display a list of glosses with pagination. This component fetches data from a provided URL and displays it
*/
const TextList = ({dataUrl, title, onItemClicked}) => {
	const [textData, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [pageModalVisible, setPageModalVisible] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

	
  
	const startIndex = (currentPage - 1) * PAGE_SIZE;

    // Changes the page number on the list of named glosses or manuscripts, etc.
	const goToPage = (pageNumber) => {
		let page = Number(pageNumber); 

		// Check if the input is not a number.
		if (isNaN(page)) {
		  page = 1;
		}

		// Check if the input number is less than 1.
		if (page < 1) {
		  page = 1;
		}
	  
		// Check if the input number is more than the total pages.
		if (page > totalPages) {
		  page = totalPages;
		}
	  
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

    // Gets the page number to display on the buttons
	const getPageNumbers = () => {
		const rangeStart = Math.max(1, currentPage - Math.floor(PAGE_RANGE_DISPLAYED / 2));
		const rangeEnd = Math.min(totalPages, currentPage + Math.floor(PAGE_RANGE_DISPLAYED / 2));
		const pages = [];
		for (let i = rangeStart; i <= rangeEnd; i++) {
			pages.push(i);
		}
		return pages;
	};

    // Fetches the data from URL
	useEffect(() => {
		const fetchData = async () => {
            const response = await axios.get(dataUrl);
            const totalCount = response.data.numberOfItems;
            const totalPages = Math.ceil(totalCount / PAGE_SIZE);
            setData(response.data.itemListElement);
            setTotalPages(totalPages);
		};

		fetchData();
	}, [dataUrl]);

    // Filters based on search
	useEffect(() => {
        if (textData) setFilteredData(
            textData.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
        ) 
		else {
			setFilteredData([])
		}
    }, [searchTerm, textData]);

    // Sets the total number of glosses being shown at a time
	useEffect(() => {
		setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));
	}, [filteredData]);

	/*
        Tailwind CSS is used for styling:
        - 'flex', 'flex-col', 'flex-row': Flexbox related classes to create flexible layouts.
        - 'pb-2', 'px-2', 'py-1', 'p-1', 'px-3', 'px-4': Padding classes. Numbers denote the size (e.g. 2 is 0.5rem, 3 is 0.75rem, etc.).
        - 'text-2xl', 'text-[18px]', 'text-[20px]', 'text-sm': Text size classes. Numbers and size values set the font size.
        - 'ml-auto': Applies automatic left margin, used for alignment (pushing items to the right).
        - 'border-[1.5px]', 'border-2', 'border-black': Border classes. Sets the border thickness and color.
        - 'bg-grey/10', 'bg-gray-200', 'bg-black', 'bg-white', 'bg-primary': Background color classes.
        - 'gap-8', 'gap-4', 'gap-2': Sets the gap between child elements of a flex or grid container.
        - 'items-center': Aligns flex items along the center perpendicular to the main axis.
        - 'translate-y-2': Transforms an element up or down along the y-axis by 0.5rem.
        - 'cursor-pointer': Changes the cursor to a pointer when hovering over an element.
        - 'hover:opacity-75', 'hover:text-gray-300': Hover state classes. Defines styles that apply when an element is hovered.
        - 'w-20', 'h-24': Width and height classes.
        - 'text-white', 'text-black': Text color classes.
        - 'font-semibold': Sets the font weight to semi-bold.
        - 'rounded': Adds rounded corners.
    */
	return (
		<div className="flex flex-col">
			<div className="flex flex-row pb-2">
            <p className="text-2xl">
				{title}
            </p>

			{/* Current Search Function. TODO: MOVE SOMEWHERE ELSE IN FUTURE*/}
			<input
                    className="ml-auto border-2 border-black"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />

            <div className="ml-auto flex flex-row text-[18px]">
              <TbAdjustmentsHorizontal className="text-black translate-y-1"/>
              <p>[</p>
              <p className="cursor-pointer text-blue-500 mx-1">
                Filters
              </p>
              <p>]</p>
            </div>
      	</div>
		<div className="border-[1.5px] border-black bg-grey/10 ">
			<p className="px-2">
				<Link className="text-blue-500 text-semibold" href="/"> Home </Link> 
				&gt; {title}
			</p>
		</div>

		{/* The list of texts pulled from a URL */}
		<div className="flex flex-col gap-8 pt-2">
			{filteredData.slice(startIndex, startIndex + PAGE_SIZE).map((data, index) => (
				<div key={index} className="flex items-center gap-4">
					<div onClick={() => onItemClicked(data['@id'].split('/').pop(), data.label)} className="translate-y-2 bg-gray-200 p-1 h-24 w-20 cursor-pointer hover:opacity-75"> 
						<p>Image? Place- holder</p>
					</div>
					<div>
						<div>
							<p onClick={() => onItemClicked(data['@id'].split('/').pop(), data.label)} className="text-[20px] cursor-pointer hover:opacity-75">
								{data.label}
							</p>
						</div>
						{/* TODO: This is the genres. This can't be hardcoded. Change later when more glosses from different canonical texts come*/}
						<div className="flex flex-wrap gap-2 mt-1 mb-2"> 
							<div className="bg-primary px-1 text-sm text-white">Mt</div>
							<div className="bg-primary px-1 text-sm text-white">5:7</div>
							{/* More genres can go here */}
						</div>
						<p className="text-[16px]">{data['@id']}</p>
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
					<div style={{fontSize: "18px"}} className="border-2 border-black px-4 py-1 hover:text-gray-300 cursor-pointer" onClick={() => goToPage(1)}>
						1
					</div>  
				}
				{currentPage > 3 && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-3 py-1 hover:text-gray-300 cursor-pointer" onClick={() => setPageModalVisible(true)}>
						...
					</div>  
				}
				{getPageNumbers().map(pageNumber => (
					<div style={{fontSize: "18px"}} className={`border-2 px-4 py-1 border-black ${currentPage === pageNumber ? 'bg-black text-white font-semibold' : 'hover:text-gray-300 cursor-pointer'}`} key={pageNumber} onClick={() => goToPage(pageNumber)}>
						{pageNumber}
					</div>
				))}
				{currentPage < totalPages - 2 && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-3 py-1 hover:text-gray-300 cursor-pointer" onClick={() => setPageModalVisible(true)}>
						...
					</div>  
				}
				{currentPage < totalPages - 1 && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-4 py-1 hover:text-gray-300 cursor-pointer" onClick={() => goToPage(totalPages)}>
						{totalPages}
					</div>  
				}
				{currentPage !== totalPages && 
					<div style={{fontSize: "18px"}} className="border-2 border-black px-3 py-1 hover:text-gray-300 cursor-pointer" onClick={() => goToPage(totalPages)}>
						Last
					</div>  
				}
				</div>
				<PageModal visible={pageModalVisible} onClose={() => setPageModalVisible(false)} onGoToPage={goToPage} />
			</div>
		</div>
	);
};

export default TextList;
