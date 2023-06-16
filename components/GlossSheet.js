    import { useState, useEffect } from 'react';
    import PageButtons from './PageButtons';
    import getFromItemList from '@/actions/getFromItemList';
import getCollections from '@/actions/getCollections';

    const GlossSheet = ({ headers, collectionType, keys, onItemClicked }) => {
        // The variables used to help display data
        const [lastSortedIndex, setLastSortedIndex] = useState(null);
        const [sortStates, setSortStates] = useState(Array(headers.length).fill(0)); // 0 for original, 1 for ascending, -1 for descending
        const [sortedData, setSortedData] = useState([]);
        const [objects, setObjects] = useState([]);

        // Tracks Loading Progress
        const [isLoading, setIsLoading] = useState(true);
        

        // Controls number of items per 'page'
        const PAGE_SIZE = 12; // Number of items per page
        const [currentPage, setCurrentPage] = useState(1);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const totalPages = Math.ceil(sortedData.length / PAGE_SIZE)

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
                const collections = await getCollections({value: collectionType})

                // take all the collections and get the values of keys from collectoins
                const data = await getFromItemList(collections, keys, handleProgressUpdate)

                setObjects(data);
                setIsLoading(false);
            };

            fetchData();
        }, []);

        // sorting
        useEffect(() => {
            let newSortedData = [...objects];
            if (lastSortedIndex !== null && sortStates[lastSortedIndex] !== 0) {
                newSortedData.sort((a, b) => {
                    const key = keys[lastSortedIndex];

                    // Check if a[key] or b[key] is undefined or empty array
                    const isAEmpty = !a[key] || (Array.isArray(a[key]) && a[key].length === 0);
                    const isBEmpty = !b[key] || (Array.isArray(b[key]) && b[key].length === 0);
                
                    if (isAEmpty && isBEmpty) {
                        return 0; // Both a and b are empty, they are equal
                    } else if (isAEmpty) {
                        return 1; // a is empty, it should be at the end
                    } else if (isBEmpty) {
                        return -1; // b is empty, it should be at the end
                    }
                
                    // If a[key] or b[key] is an array, convert it to a string for comparison
                    const labelA = (Array.isArray(a[key]) ? a[key].join(', ') : a[key]).toUpperCase();
                    const labelB = (Array.isArray(b[key]) ? b[key].join(', ') : b[key]).toUpperCase();
                
                    if (labelA > labelB) {
                        return sortStates[lastSortedIndex];
                    } else if (labelA < labelB) {
                        return -sortStates[lastSortedIndex];
                    }
                
                    return 0; // labels are equal
                });
            }
            setSortedData(newSortedData);
        }, [objects, sortStates, lastSortedIndex]);
    
        const toggleSort = (index) => {
            setLastSortedIndex(index);
            setSortStates(prevSortStates => {
                let newSortStates = [...prevSortStates];
                // If another header is clicked, reset the previous header's sort state
                if (lastSortedIndex !== null && lastSortedIndex !== index) {
                    newSortStates[lastSortedIndex] = 0;
                }
                newSortStates[index] = newSortStates[index] === 0 ? 1 : newSortStates[index] === 1 ? -1 : 0;
                return newSortStates;
            });
        };

        if (isLoading) {
            return (
                <div>
                    Loading... {Math.round(progress * 100)}%
                </div>
            )
        }

        return (
            <div className="rounded-lg">
                <div className={`text-2xl bg-grey text-white cursor-pointer grid grid-cols-2 border-black font-bold`}>
                    {headers.map((value, index) => (
                        <div onClick={() => toggleSort(index)} key={index} className={`hover:bg-accent hover:text-yellow-200  transition flex border border-black p-2 ${lastSortedIndex === index && sortStates[index] !== 0 ? 'bg-darkGrey' : ''}`}>
                            {value}
                            <div className="flex text-sm translate-y-3 ml-auto">
                                <p>
                                    {lastSortedIndex === index
                                        ? (sortStates[index] === 0
                                            ? ""
                                            : sortStates[index] === 1
                                            ? "Sorted from A to Zs "
                                            : "Sorted from Z to A")
                                        : ""
                                    }
                                </p>
                                <p className="px-2">
                                    ↑↓
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {sortedData.slice(startIndex, startIndex + PAGE_SIZE).map((item, index) => (
                    <div onClick={item['@id'] ? () => onItemClicked(item['@id'].split('/').pop(), item.label) : () => {}} key={index} className={`grid grid-cols-2 border-black cursor-pointer hover:border-4 transition `}>
                        <div className={`border border-black cursor px-2 py-2`}>
                            {item[keys[0]]}
                        </div>
                        <div className={`border border-black cursor px-2 py-2 flex gap-3`}>
                            {Array.isArray(item[keys[1]]) ? item[keys[1]].join(', ') : item[keys[1]]}
                        </div>
                    </div>
                ))}      
                <div className="flex flex-col"> 
                    <hr className="my-8 border-grey" /> 
                    <PageButtons
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>  
            </div>
        );
    }

    export default GlossSheet;
