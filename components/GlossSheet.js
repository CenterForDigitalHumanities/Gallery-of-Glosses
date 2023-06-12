import { useState, useEffect } from 'react';

const GlossSheet = ({ headers, textData, onItemClicked }) => {
    const [lastSortedIndex, setLastSortedIndex] = useState(null);
    const [sortStates, setSortStates] = useState([0,0]);  // 0 for original, 1 for ascending, -1 for descending
    const [sortedData, setSortedData] = useState([...textData]);

    useEffect(() => {
        let newSortedData = [...textData];
        if (lastSortedIndex !== null && sortStates[lastSortedIndex] !== 0) {
            newSortedData.sort((a, b) => {
                const key = headers[lastSortedIndex];
                if (!a[key] || !b[key]) {
                    return 0;
                }
                const labelA = a[key].toUpperCase();
                const labelB = b[key].toUpperCase();
                if (labelA > labelB) {
                    return sortStates[lastSortedIndex];
                }
                if (labelA < labelB) {
                    return -sortStates[lastSortedIndex];
                }
                return 0;
            });
        }
        setSortedData(newSortedData);
    }, [textData, sortStates, lastSortedIndex]);

    const toggleSort = (index) => {
        setLastSortedIndex(index);
        setSortStates(prevSortStates => {
            const newSortStates = [...prevSortStates];
            newSortStates[index] = newSortStates[index] === 0 ? 1 : newSortStates[index] === 1 ? -1 : 0;
            return newSortStates;
        });
    };

    return (
        <div className="rounded-lg">
            <div className={`text-2xl bg-grey text-white cursor-pointer grid grid-cols-2 border-black font-bold`}>
                {headers.map((value, index) => (
                    <div onClick={() => toggleSort(index)} key={index} className={`hover:bg-accent hover:text-yellow-200  transition flex border border-black p-2 ${lastSortedIndex === index && sortStates[index] !== 0 ? 'bg-darkGrey' : ''}`}>
                        {value} 
                        <div className="flex text-xl translate-y-1 ml-auto">
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
            {sortedData.map((item, index) => (
                <div onClick={item['@id'] ? () => onItemClicked(item['@id'].split('/').pop(), item.label) : () => {}} key={index} className={`grid grid-cols-2 border-black cursor-pointer hover:border-4 transition `}>
                    {headers.map((header, i) => (
                        <div className={` border border-black cursor px-2 py-2 ${i === lastSortedIndex && sortStates[i] !== 0 ? 'bg-lightGrey' : ''}`} key={i}>{item[header]}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GlossSheet;
