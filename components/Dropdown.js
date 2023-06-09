import { useState } from 'react';

const Dropdown = ({ label, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="">
            <button className="w-full h-10 text-base border-2 border-black focus:outline-none" onClick={toggleOpen}>
                {label}
            </button>
            {isOpen && (
                <div className="bg-gray-300">
                    {items.map((item, index) => (
                        <div key={index} className="py-2">{item}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
