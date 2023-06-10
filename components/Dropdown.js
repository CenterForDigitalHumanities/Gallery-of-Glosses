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

            <div className="cursor-pointer flex items-center py-6 px-4 pl-4 text-left w-full h-10 border-2 text-2xl font-bold border-black transition hover:bg-black bg-darkGrey text-white" onClick={toggleOpen}>
                <p>{label}</p>
                <BsChevronDown size={30} className={`-translate-x-2 ml-auto transition ${isOpen ? 'rotate-180' : 'rotate-0'}`}/>
            </div>
            {isOpen && (
                <div className="bg-lightGrey">
                    <div className="px-20 pt-10 flex flex-col gap-4">
                        <p>
                        The Gospel of Matthew, a canonical gospel in the New Testament, has been extensively analyzed and commented upon for centuries, 
                        resulting in numerous glosses that provide valuable insights into its interpretation. These glosses represent diverse perspectives 
                        and reflect the evolving thought influenced by different cultural, theological, and philosophical contexts.
                        </p>
                        <p>
                            More filler text More filler text More filler text More filler text More filler text More filler text More filler text More filler text
                            More filler text More filler text More filler text More filler text More filler text More filler text More filler text More filler text
                            More filler text More filler text More filler text More filler text More filler text More filler text More filler text More filler text
                        </p>
                    </div>
                    <div className="px-60 py-10">
                        <div onClick={toggleSort} className="cursor-pointer flex bg-grey border-black border-2 hover:bg-primary hover:text-yellow-200 py-2 px-4 transition">
                            <p className="font-semibold text-xl"> Meta Glosses</p>
                            <div className="flex pr-2 ml-auto">
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
                            <div onClick={item['@id'] ? () => onItemClicked(item['@id'].split('/').pop(), item.label) : () => {}} key={index} className="border-black hover:text-white border-2 py-2 px-4 hover:bg-grey transition">
                                <div className="flex">
                                    <p>{item.label}</p>
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
