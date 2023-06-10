import { useState, useEffect } from 'react';

const GlossSheet = ({ headers, textData, onItemClicked }) => {
    const [lastSortedIndex, setLastSortedIndex] = useState(null);
    const [sortState, setSortState] = useState(0);  // 0 for original, 1 for ascending, -1 for descending
    const [sortedData, setSortedData] = useState([...textData]);

    useEffect(() => {
        let newSortedData = [...textData];
        if (sortState !== 0 && lastSortedIndex !== null) {
            newSortedData.sort((a, b) => {
                const key = headers[lastSortedIndex];
                if (!a[key] || !b[key]) {
                    return 0;
                }
                const labelA = a[key].toUpperCase();
                const labelB = b[key].toUpperCase();
                if (labelA > labelB) {
                    return sortState;
                }
                if (labelA < labelB) {
                    return -sortState;
                }
                return 0;
            });
        }
        setSortedData(newSortedData);
    }, [textData, sortState, lastSortedIndex]);

    const toggleSort = (index) => {
        setLastSortedIndex(index);
        setSortState((prevSortState) => (prevSortState === 0 ? 1 : prevSortState === 1 ? -1 : 0));
    };

    return (
        <div className="rounded-lg">
            <div className={`text-2xl bg-grey text-white cursor-pointer grid grid-cols-2 border-black font-bold`}>
                {headers.map((value, index) => (
                    <div onClick={() => toggleSort(index)} key={index} className={`hover:bg-accent hover:text-yellow-200  transition flex border border-black p-2 ${lastSortedIndex === index && sortState !== 0 ? 'bg-darkGrey' : ''}`}>
                        {value} 
                        <div className="flex text-xl translate-y-1 ml-auto">
                            <p>
                                {sortState === 0
                                    ? "Sort from A to Z "
                                    : sortState === 1
                                    ? "Sort from Z to A "
                                    : "Original Order"    
                                }
                            </p>
                            <p className="px-2">
                                ↑↓
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {sortedData.map((item, index) => (
                <div onClick={item['@id'] ? () => onItemClicked(item['@id'].split('/').pop(), item.label) : () => {}} key={index} className={`grid grid-cols-2 border-black cursor-pointer hover:border-4 transition `}>
                    {headers.map((header, i) => (
                        <div className={` border border-black cursor px-2 py-2 ${i === lastSortedIndex && sortState !== 0 ? 'bg-lightGrey' : ''}`} key={i}>{item[header]}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GlossSheet;
