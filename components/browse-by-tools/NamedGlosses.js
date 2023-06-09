import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PageButtons from "../PageButtons";

const PAGE_SIZE = 10;  // Number of items per page

const NamedGlosses = ({ title, onItemClicked }) => {
    const [textData, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    // Fetches the data from URL
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://store.rerum.io/v1/id/610c54deffce846a83e70625');
            const totalCount = response.data.numberOfItems;
            const totalPages = Math.ceil(totalCount / PAGE_SIZE);
            setData(response.data.itemListElement);
            setTotalPages(totalPages);
        };

        fetchData();
    }, []);

    // Filters based on search
    useEffect(() => {
        if (textData) setFilteredData(
            textData.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
        ) 
        else {
            setFilteredData([])
        }
    }, [searchTerm, textData]);

    // Sets the total number of glosses being shown at a time
    useEffect(() => {
        setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));
    }, [filteredData]);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row pb-2">
            <p className="text-2xl">
                {title}
            </p>

            {/* Current Search Function. TODO: MOVE SOMEWHERE ELSE IN FUTURE*/}
            <input
                    className="ml-auto border-2 border-black"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />

            <div className="ml-auto flex flex-row text-[18px]">
                <TbAdjustmentsHorizontal className="text-black translate-y-1"/>
                <p>[</p>
                <p className="cursor-pointer text-blue-500 mx-1">
                Filters
                </p>
                <p>]</p>
            </div>
            </div>
        <div className="border-[1.5px] border-black bg-grey/10 ">
            <p className="px-2">
                <Link className="text-blue-500 text-semibold" href="/"> Home </Link> 
                &gt; {title}
            </p>
        </div>

        {/* The list of texts pulled from a URL */}
        <div className="flex flex-col gap-8 pt-2">
            {filteredData.slice(startIndex, startIndex + PAGE_SIZE).map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div onClick={() => onItemClicked(data['@id'].split('/').pop(), data.label)} className="translate-y-2 bg-gray-200 p-1 h-24 w-20 cursor-pointer hover:opacity-75"> 
                        <p>Image? Place- holder</p>
                    </div>
                    <div>
                        <div>
                            <p onClick={() => onItemClicked(data['@id'].split('/').pop(), data.label)} className="text-[20px] cursor-pointer hover:opacity-75">
                                {data.label}
                            </p>
                        </div>
                        {/* TODO: This is the genres. This can't be hardcoded. Change later when more glosses from different canonical texts come*/}
                        <div className="flex flex-wrap gap-2 mt-1 mb-2"> 
                            <div className="bg-primary px-1 text-sm text-white">Mt</div>
                            <div className="bg-primary px-1 text-sm text-white">5:7</div>
                            {/* More genres can go here */}
                        </div>
                        <p className="text-[16px]">{data['@id']}</p>
                    </div>
                </div>
            ))}
            <hr className="my-4" />

            {/* These are the buttons to change page numbers*/}
                <PageButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default NamedGlosses;