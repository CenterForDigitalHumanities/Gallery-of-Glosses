import { useState } from 'react';

function GlossSheet({ headers, data }) {
    const initialSortingState = headers.map(header => false);
    const [isAlphabetic, setIsAlphabetic] = useState(initialSortingState);
    const [lastSortedIndex, setLastSortedIndex] = useState(null);
    const [sortedData, setSortedData] = useState([...data]);

    const toggleSort = (index) => {
        const newSortingState = headers.map((header, i) => i === index ? !isAlphabetic[i] : false);
        setIsAlphabetic(newSortingState);
        setLastSortedIndex(index);
        sortData(headers[index], isAlphabetic[index]);
    }

    const sortData = (header, isAlphabetic) => {
        const newData = [...sortedData].sort((a, b) => {
            if (isAlphabetic) {
                return a[header] > b[header] ? 1 : -1;
            } else {
                return a[header] < b[header] ? 1 : -1;
            }
        });
        setSortedData(newData);
    }

    return (
        <div className="rounded-lg">
            <div className={`text-2xl bg-accent text-yellow-200 cursor-pointer grid grid-cols-2 border-black font-bold`}>
                {headers.map((value, index) => (
                    <div onClick={() => toggleSort(index)} key={index} className={`hover:bg-darkGrey transition flex border border-black p-2 ${index === lastSortedIndex ? 'opacity-70' : ''}`}>
                        {value} 
                        <div className="flex text-xl translate-y-1 ml-auto">
                            <p>
                                {isAlphabetic[index]
                                    ? "Sort from Z to A "
                                    : "Sort from A to Z "    
                                }
                            </p>
                            <p className="px-2">
                                ↑↓
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {sortedData.map((row, index) => (
                <div className={`grid grid-cols-2 border-black`}  key={index}>
                    {headers.map((header, i) => (
                        <div className={`bg-gold/80 text-red-900 border border-black p-2 ${i === lastSortedIndex ? 'opacity-70' : ''}`} key={i}>{row[header]}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GlossSheet;
