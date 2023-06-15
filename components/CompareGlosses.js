import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useState, useEffect } from "react";
import Link from "next/link";
import PageButtons from "./PageButtons";
import CompareModal from "./CompareModal";
import CompareHolderModal from "./CompareHolderModal";
import getFetchData from "../actions/getFetchData";

const CompareGlosses = () => {

    // Controls Filtered data
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { data: textData, totalPages, setTotalPages } = getFetchData('https://store.rerum.io/v1/id/610c54deffce846a83e70625');
    
    // Controls number of items per 'page'
    const PAGE_SIZE = 10;  // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    
    // Controls the visibility of the Modal that compares glosses 
    const [compareModalVisible, setCompareModalVisible] = useState(false);
    const [selectedGlosses, setSelectedGlosses] = useState([])
    const [CompareHolderModalVisible, setCompareHolderModalVisible] = useState(false);

    // Controls the visibility of the filter function
    const [filterModalVisible, setFilterModalVisible] = useState(false);

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
                    Compare Glosses
                </p>
                
                <div className="ml-auto flex items-center text-[18px]">
                    <TbAdjustmentsHorizontal className="text-black"/>
                    <p>
                        [
                        <span onClick={() => {setFilterModalVisible(!filterModalVisible)}} className="cursor-pointer text-blue-500 mx-1">
                            Filters
                        </span>
                        ]
                    </p>
                </div>
            </div>
            <div>
                Compare content...
            </div>
            
            {/* Filter Modal */}
            {filterModalVisible ?
                <div className="border-[1.5px] border-black bg-grey/10 h-68 mb-4 rounded-md p-2">
                    <div className="px-2 flex gap-2">
                        <Link className="text-blue-500 font-semibold hover:underline" href="/"> Home </Link> 
                        &gt; <p className="font-semibold">Compare Glosses</p>
                    </div>
                    <div className="flex p-2">
                        <div className="w-1/2 border-r-2 border-lightGrey">
                            <p className="font-semibold">Theme</p>
                            <p className="text-sm my-1">Click once to include Theme.</p>
                            <div className="flex flex-col gap-1 mt-2">
                                <div className="flex gap-3">
                                    <input type="checkbox" id="theme1" name="theme1" value="theme1"/>
                                    <label for="theme1"> Theme 1</label>
                                    <input type="checkbox" id="theme2" name="theme2" value="theme2"/>
                                    <label for="theme2"> Theme 2</label>
                                    <input type="checkbox" id="theme3" name="theme3" value="theme3"/>
                                    <label for="theme3"> Theme 3</label>
                                    <input type="checkbox" id="theme4" name="theme4" value="theme4"/>
                                    <label for="theme4"> Theme 4</label>
                                    <input type="checkbox" id="theme5" name="theme5" value="theme5"/>
                                    <label for="theme5"> Theme 5</label>
                                </div>
                                <div className="flex gap-3">    
                                    <input type="checkbox" id="theme6" name="theme6" value="theme6"/>
                                    <label for="theme6"> Theme 6</label>
                                    <input type="checkbox" id="theme7" name="theme7" value="theme7"/>
                                    <label for="theme7"> Theme 7</label>
                                    <input type="checkbox" id="theme8" name="theme8" value="theme8"/>
                                    <label for="theme8"> Theme 8</label>
                                    <input type="checkbox" id="theme9" name="theme9" value="theme9"/>
                                    <label for="theme9"> Theme 9</label>
                                    <input type="checkbox" id="theme10" name="theme10" value="theme10"/>
                                    <label for="theme10"> Theme 10</label>
                                </div>
                            </div>
                            <p className="font-semibold mt-3">Tag</p>
                            <p className="text-sm my-1">Click once to include tag.</p>
                            <div className="flex flex-col gap-1 mt-2">
                                <div className="flex gap-3">
                                    <input type="checkbox" id="tag1" name="tag1" value="tag1"/>
                                    <label for="tag1"> tag 1</label>
                                    <input type="checkbox" id="tag2" name="tag2" value="tag2"/>
                                    <label for="tag2"> Tag 2</label>
                                    <input type="checkbox" id="tag3" name="tag3" value="tag3"/>
                                    <label for="tag3"> tag 3</label>
                                    <input type="checkbox" id="tag4" name="tag4" value="tag4"/>
                                    <label for="tag4"> tag 4</label>
                                    <input type="checkbox" id="tag5" name="tag5" value="tag5"/>
                                    <label for="tag5"> tag 5</label>
                                </div>
                                <div className="flex gap-3">    
                                    <input type="checkbox" id="tag6" name="tag6" value="tag6"/>
                                    <label for="tag6"> tag 6</label>
                                    <input type="checkbox" id="tag7" name="tag7" value="tag7"/>
                                    <label for="tag7"> tag 7</label>
                                    <input type="checkbox" id="tag8" name="tag8" value="tag8"/>
                                    <label for="tag8"> tag 8</label>
                                    <input type="checkbox" id="tag9" name="tag9" value="tag9"/>
                                    <label for="tag9"> tag 9</label>
                                    <input type="checkbox" id="tag10" name="tag10" value="tag10"/>
                                    <label for="tag10"> tag 10</label>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col gap-4 ml-4">
                            {/* Search by Name */}
                            <div className="flex gap-4 items-center">
                                <p className="text-xl">Search by name:</p>
                                <input
                                className="border-2 border-black px-2"
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Search by City */}
                            <div className="flex gap-8 items-center">
                                <p className="text-xl">Search by city:</p>
                                <input
                                className="border-2 border-black px-2"
                                type="text"
                                placeholder="Search... (not working)"
                                value={""}
                                onChange={e => (e.target.value)}
                                />
                            </div>

                            {/* Search by Canonical Book */}
                            <div className="flex gap-5 items-center">
                                <p className="text-xl">Search by book:</p>
                                <input
                                className="border-2 border-black px-2"
                                type="text"
                                placeholder="Search... (not working)"
                                value={""}
                                onChange={e => (e.target.value)}
                                />
                            </div>

                            {/* Search by Tags */}
                            <div className="flex gap-7 items-center">
                                <p className="text-xl">Search by tags:</p>
                                <input
                                className="border-2 border-black px-2"
                                type="text"
                                placeholder="Search... (not working)"
                                value={""}
                                onChange={e => (e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="m-2 bg-darkGrey text-white cursor-pointer transition hover:brightness-[120%] text-center w-28 rounded-full   ">
                        Apply Filter
                    </div>
                </div>
                : 
                <div className="border-[1.5px] border-black bg-grey/10 mb-4 rounded-md p-2">
                    <div className="px-2 flex gap-2">
                        <Link className="text-blue-500 font-semibold hover:underline" href="/"> Home </Link> 
                        &gt; <p className="font-semibold">Compare Glosses</p>
                    </div>
                </div>
            }


            {/* The list of texts pulled from a URL */}
            <div className="border-black border bg-lightGrey flex flex-col gap-8 p-2">
                <div className="text-xl font-semibold flex pl-5">
                    <div className="bottom-0 border-r-2 border-grey pr-8">
                        Compare
                    </div>
                    <div className="bottom-0 pl-8">
                        Named Glosses
                    </div>
                </div>
                <hr className="border-darkGrey" />
                {filteredData.slice(startIndex, startIndex + PAGE_SIZE).map((data, index) => (
                    <div key={index} className="flex gap-4">
                        <div onClick={() => toggleGloss(data.label)} className="translate-y-[7px] transition rounded-md hover:bg-grey hover:text-white p-1 cursor-pointer flex items-center gap-2">
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
                <hr className="my-4 border-grey" />

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