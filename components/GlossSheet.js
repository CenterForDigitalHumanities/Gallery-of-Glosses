import { useState, useEffect } from 'react';
import getFromAnnotation from "../actions/getFromAnnotation";

const GlossSheet = ({ headers, leftData, rightData, onItemClicked }) => {
    const [lastSortedIndex, setLastSortedIndex] = useState(null);
    const [sortStates, setSortStates] = useState(Array(headers.length).fill(0)); // 0 for original, 1 for ascending, -1 for descending
    const [leftSortedData, setLeftSortedData] = useState([]);
    const [rightSortedData, setRightSortedData] = useState([]);

    useEffect(() => {
        const fetchAnnotationData = async () => {
            const leftPromises = headers.map(header => getFromAnnotation({ data: leftData, key: header }));
            const rightPromises = headers.map(header => getFromAnnotation({ data: rightData, key: header }));

            const leftResults = await Promise.all(leftPromises);
            const rightResults = await Promise.all(rightPromises);

            setLeftSortedData(leftResults);
            setRightSortedData(rightResults);
        };

        fetchAnnotationData();
    }, [headers, leftData, rightData]);

    const toggleSort = (index) => {
        setLastSortedIndex(index);
        setSortStates(prevSortStates => {
            const newSortStates = [...prevSortStates];
            newSortStates[index] = newSortStates[index] === 0 ? 1 : newSortStates[index] === 1 ? -1 : 0;
            return newSortStates;
        });
    };

    const sortData = (data, index) => {
        const newSortedData = [...data];

        if (sortStates[index] !== 0) {
            newSortedData.sort((a, b) => {
                const key = headers[index];
                const valueA = a[key]?.value || '';
                const valueB = b[key]?.value || '';

                if (valueA > valueB) {
                    return sortStates[index];
                }
                if (valueA < valueB) {
                    return -sortStates[index];
                }
                return 0;
            });
        }

        return newSortedData;
    };

    const sortedLeftData = sortData(leftSortedData, lastSortedIndex);
    const sortedRightData = sortData(rightSortedData, lastSortedIndex);

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
            {sortedLeftData.map((item, index) => (
                <div onClick={() => onItemClicked(index)} key={index} className={`grid grid-cols-2 border-black cursor-pointer hover:border-4 transition `}>
                    {item}
                </div>
            ))}
            {sortedRightData.map((item, index) => (
                <div onClick={() => onItemClicked(index)} key={index} className={`grid grid-cols-2 border-black cursor-pointer hover:border-4 transition `}>
                    {item}
                </div>
            ))}
        </div>
    );
}

export default GlossSheet;
