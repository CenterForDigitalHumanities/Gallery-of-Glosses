import { useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

const Dropdown = ({ label, textData, onItemClicked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortState, setSortState] = useState(0);  // 0 for original, 1 for ascending, -1 for descending
    const [sortedData, setSortedData] = useState([...textData]);
    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        let newSortedData = [...textData];
        if (sortState !== 0) {
            newSortedData.sort((a, b) => {
                if (!a.label || !b.label) {
                    return;
                }
                const labelA = a.label.toUpperCase();
                const labelB = b.label.toUpperCase();
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
    }, [textData, sortState]);

    const toggleSort = () => {
        setSortState((prevSortState) => (prevSortState === 0 ? 1 : prevSortState === 1 ? -1 : 0));
    };

    return (
        <div className="">
            <div className="cursor-pointer flex pl-4 text-left w-full h-10 border-2 text-2xl font-bold border-black bg-accent text-yellow-200 hover:bg-darkGrey transition" onClick={toggleOpen}>
                <p className="translate-y-1">{label}</p>
                <BsChevronDown size={30} className={`-translate-x-2 ml-auto transition ${isOpen ? 'rotate-180' : 'rotate-0'}`}/>
            </div>
            {isOpen && (
                <div className="bg-gold/80 text-red-900 cursor-pointer">
                    <div>
                        <div onClick={toggleSort} className="flex border-black border-2 py-2 pl-16 hover:bg-grey transition">
                            <p className="font-semibold text-xl"> Named Glosses</p>
                            <div className="flex pr-8 ml-auto">
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
                        {sortedData.map((item, index) => (
                            <div onClick={item['@id'] ? () => onItemClicked(item['@id'].split('/').pop(), item.label) : () => {}} key={index} className="border-black border-2 py-2 pl-16 hover:bg-grey transition">
                                <div className="flex">
                                    <p>{item.label}</p>
                                    <p className='ml-auto pr-10'>{item['@id']}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
