import { useState } from "react";
import PageModal from "./PageModal";

const PageButtons = ({ totalPages, currentPage: initialCurrentPage, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(initialCurrentPage);
    const [pageModalVisible, setPageModalVisible] = useState(false);
    
    const PAGE_RANGE_DISPLAYED = 3;

    const goToPage = (pageNumber) => {
        let page = Number(pageNumber); 

        if (isNaN(page) || page < 1) {
            page = 1;
        } else if (page > totalPages) {
            page = totalPages;
        }

        setCurrentPage(page);
        onPageChange(page);
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
        <div className="ml-auto">
            <div className="flex flex-row  items-center mt-4"> 
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
    );
};

export default PageButtons;
