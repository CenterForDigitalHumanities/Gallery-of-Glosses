import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PageButtons from "./PageButtons";
import CompareModal from "./CompareModal";
import CompareHolderModal from "./CompareHolderModal";



const CompareGlosses = () => {

    // Controls Filtered data
    const [textData, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    
    // Controls number of items per 'page'
    const PAGE_SIZE = 10;  // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    
    // Controls the visibility of the Modal that compares glosses 
    const [compareModalVisible, setCompareModalVisible] = useState(false);
    const [selectedGlosses, setSelectedGlosses] = useState([])
    const [CompareHolderModalVisible, setCompareHolderModalVisible] = useState(false);

    // Fetches the data from URL
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://store.rerum.io/v1/id/610c54deffce846a83e70625');
            const totalCount = response.data.numberOfItems;
            const totalPages = Math.ceil(totalCount / PAGE_SIZE);
            setData(response.data.itemListElement);
            setTotalPages(totalPages);
        };

        fetchData();
    }, []);

    // Filters based on search. First checks if there's something to filter in case fetching doesn't return anything
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

    // Toggles whether or not compare holder modal is showing or not
    useEffect(() =>{
        if (selectedGlosses.length === 0) {
            setCompareHolderModalVisible(false)
        } else {
            setCompareHolderModalVisible(true)
        }
    }, [selectedGlosses])

    // A helper function to toggle whether a gloss is selected or not
    const toggleGloss = (label) => {
        setSelectedGlosses((selectedGlosses) => {
            if (selectedGlosses.includes(label)) {
                // Remove the gloss from the selection
                return selectedGlosses.filter((gloss) => gloss !== label);
            } else {
                // Don't allow more than 4 glosses to be selected
                if (selectedGlosses.length >= 4) {
                    return selectedGlosses;
                }
                // Add the gloss to the selection
                return [...selectedGlosses, label];
            }
        });
    };

    return (
        <div className="flex flex-col">
            <CompareModal 
                glosses={selectedGlosses} 
                visible={compareModalVisible} 
                onClose={() => setCompareModalVisible(false)} 
                removeGloss={(glossToRemove) => {
                    const newGlosses = selectedGlosses.filter(gloss => gloss !== glossToRemove);
                    setSelectedGlosses(newGlosses);
                }}
            />
            <CompareHolderModal glosses={selectedGlosses} visible={CompareHolderModalVisible} openCompareModal={() => setCompareModalVisible(true)}/>
            <div className="flex flex-row gap-20 pb-2">
                <p className="text-2xl">
                    Named Glosses
                </p>

                {/* Current Search Functionality. TODO: MOVE SOMEWHERE ELSE IN FUTURE*/}
                <div className="ml-auto">
                    <input
                        className="border-2 border-black px-2"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                
                <div className="ml-auto flex items-center text-[18px]">
                    <TbAdjustmentsHorizontal className="text-black"/>
                    <p>
                        [
                        <span className="cursor-pointer text-blue-500 mx-1">
                            Filters
                        </span>
                        ]
                    </p>
                </div>
            </div>
        <div className="border-[1.5px] border-black bg-grey/10 ">
            <p className="px-2">
                <Link className="text-blue-500 text-semibold" href="/"> Home </Link> 
                &gt; Named Gloss
            </p>
        </div>

        {/* The list of texts pulled from a URL */}
        <div className="flex flex-col gap-8 pt-2">
            {filteredData.slice(startIndex, startIndex + PAGE_SIZE).map((data, index) => (
                <div key={index} className="flex gap-4">
                    <div onClick={() => toggleGloss(data.label)} className="translate-y-[7px] transition bg-lightGrey hover:bg-grey hover:text-white p-1 cursor-pointer flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            onChange={() => toggleGloss(data.label)} 
                            checked={selectedGlosses.includes(data.label)} 
                            disabled={selectedGlosses.length >= 4 && !selectedGlosses.includes(data.label)}
                        />
                        <p>
                            Compare Gloss
                        </p>
                    </div>
                    <div>
                        <div>
                            <p className="text-[20px]">
                                {data.label}
                            </p>
                        </div>
                        {/* TODO: This is the genres. This can't be hardcoded. Change later when more glosses from different canonical texts come*/}
                        <div className="flex flex-wrap gap-2"> 
                            <div className="bg-primary px-1 text-sm text-white">Mt</div>
                            <div className="bg-primary px-1 text-sm text-white">5:7</div>
                            {/* More genres can go here */}
                        </div>
                    </div>
                </div>
            ))}
            <hr className="my-4" />

            {/* These are the buttons to change page numbers */}
                <PageButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default CompareGlosses;