import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

const Dropdown = ({ label, textData, onItemClicked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAlphabetic, setIsAlphabetic] = useState(true);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="">
            <div className="cursor-pointer flex pl-4 text-left w-full h-10 border-2 text-2xl font-bold border-black bg-accent text-yellow-200 hover:bg-darkGrey transition" onClick={toggleOpen}>
                <p className="translate-y-1">{label}</p>
                <BsChevronDown size={30} className={`-translate-x-2 ml-auto transition ${isOpen ? 'rotate-180' : 'rotate-0'}`}/>
            </div>
            {isOpen && (
                <div className="cursor-pointer bg-accent/50 text-white">
                    <div>
                        <div onClick={() => setIsAlphabetic(!isAlphabetic)} className="flex bg-accent/60s border-black border-2 py-2 pl-16 hover:bg-grey transition">
                            <p className="font-semibold"> Named Glosses</p>
                            <div className="flex pr-2 ml-auto">
                                <p>
                                    {isAlphabetic
                                        ? "Sort from A to Z "
                                        : "Sort from Z to A "    
                                    }
                                </p>
                                <p className="px-2">
                                    ↑↓
                                </p>
                            </div>
                        </div>
                        {textData.map((item, index) => (
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
