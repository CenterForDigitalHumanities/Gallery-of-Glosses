import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useState, useEffect } from "react";
import Link from "next/link";
import PageButtons from "../components/PageButtons";
import CompareModal from "../components/CompareModal";
import CompareHolderModal from "../components/CompareHolderModal";
import SearchBar from "../components/SearchBar";
import getCollections from "@/actions/getCollections";
import getFromItemList from "@/actions/getFromItemList";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";

const Map = () => {

    // Controls Filtered data
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [objects, setObjects] = useState([]);
    
    // Controls number of items per 'page'
    const pageSize = 15;  // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const startIndex = (currentPage - 1) * pageSize;
    
    // Controls the visibility of the Modal that compares glosses 
    const [compareModalVisible, setCompareModalVisible] = useState(false);
    const [selectedGlosses, setSelectedGlosses] = useState([])
    const [CompareHolderModalVisible, setCompareHolderModalVisible] = useState(false);

    // Controls the visibility of the filter function
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    
    // Tracks Loading Progress
    const [isLoading, setIsLoading] = useState(true);

    // New state variable for tracking progress
    const [progress, setProgress] = useState(0);

    // Callback function for handling progress updates
    const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);
    };

    // fetches the data 
    useEffect(() => {
        const fetchData = async () => {

            // get all collections of manuscript or named gloss
            const collections = await getCollections({value: "Glossing-Matthew-Named-Glosses"})

            // take all the collections and get the values of keys from collectoins
            const data = await getFromItemList(collections, ["body.title.value",  "body.tags.items", "target"], handleProgressUpdate)
            
            setObjects(data);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    // Filters based on search. First checks if there's something to filter in case fetching doesn't return anything
    useEffect(() => {
        if (objects) setFilteredData(
            objects.filter(item => item["body.title.value"].toLowerCase().includes(searchTerm.toLowerCase()))
        ) 
        else {
            setFilteredData([])
        }
    }, [searchTerm, objects]);

    // Sets the total number of glosses being shown at a time
    useEffect(() => {
        setTotalPages(Math.ceil(filteredData.length / pageSize));
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
    const toggleGloss = (gloss) => {
        setSelectedGlosses((selectedGlosses) => {
            const isAlreadySelected = selectedGlosses.some((selectedGloss) => selectedGloss.title === gloss.title);
            if (isAlreadySelected) {
                // Remove the gloss from the selection
                
                return selectedGlosses.filter((selectedGloss) => selectedGloss.title !== gloss.title);
            } else {
                // Don't allow more than 4 glosses to be selected
                if (selectedGlosses.length >= 4) {
                    return selectedGlosses;
                }
                // Add the gloss to the selection
                return [...selectedGlosses, gloss];
            }
        });
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="px-10 lg:px-52 pt-24">
                    <h1 className="text-4xl mb-6 text-center">Glossed Matthew Manuscripts Map</h1>
                    <Loading progress = {progress}/>           
                </div>
            </Layout>
        )
    }
    
    return (
        <Layout>
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
                <CompareHolderModal 
                    glosses={selectedGlosses} 
                    visible={CompareHolderModalVisible} 
                    openCompareModal={() => setCompareModalVisible(true)}                 
                    removeGloss={(glossToRemove) => {
                        const newGlosses = selectedGlosses.filter(gloss => gloss !== glossToRemove);
                        setSelectedGlosses(newGlosses);
                    }}
                />
                
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
                                <SearchBar searchBy={"name"} setSearchTerm={setSearchTerm} />
                                <SearchBar searchBy={"city"} />
                                <SearchBar searchBy={"book"} />
                                <SearchBar searchBy={"tag"} />
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
                <div className="border-black border bg-lightGrey flex flex-col gap-2 p-2">
                    <div className="font-semibold">
                        <div className="flex pl-8">
                            <div className="pr-8">
                                Compare
                            </div>
                            <div className="pl-20">
                                Named Glosses
                            </div>
                            <div className="pl-72">
                                Tags
                            </div>
                        </div>
                        <hr className="border-darkGrey" />
                    </div>
                    
                    {filteredData.slice(startIndex, startIndex + pageSize).map((data, index) => (
                        <div key={index} className="flex">
                            <div 
                                onClick={() => toggleGloss({ title: data["body.title.value"], targetId: data["target"] })} 
                                className={`w-full transition rounded-md ${selectedGlosses.length >= 4 && !selectedGlosses.some(gloss => gloss.title === data["body.title.value"]) ? "" : "hover:bg-grey hover:text-white cursor-pointer"} p-1  flex items-center gap-2`}
                            >
                                <input 
                                    type="checkbox" 
                                    onChange={() => toggleGloss(data["body.title.value"])} 
                                    checked={selectedGlosses.some(gloss => gloss.title === data["body.title.value"])} 
                                    disabled={selectedGlosses.length >= 4 && !selectedGlosses.some(gloss => gloss.title === data["body.title.value"])}
                                />
                                <p className="whitespace-nowrap">
                                    Compare Gloss
                                </p>
                                <p className="text-[20px] pl-20 w-80 whitespace-nowrap">
                                        {data["body.title.value"]}
                                </p>
                                <p className="text-[20px] pl-40 mr-44">
                                    {(data["body.tags.items"]?.join(', ')) || "No tags"}
                                </p>
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
        </Layout>
    );
};

export default Map;