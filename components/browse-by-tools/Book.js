import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from "../Dropdown";

const Book = ({ title, onItemClicked }) => {
    const [textData,setData] = useState([]);
    const sample = ["Item 1", "Item 2", "Item 3"];  

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('https://store.rerum.io/v1/id/610c54deffce846a83e70625');
            setData(response.data.itemListElement);
        };
        fetch();
    }, []);

    return (
        <div className="py-4">
            <div className="flex flex-row pb-2">
                <p className="text-2xl">
                    {title}
                </p>
            </div>
            <div className="flex flex-row pb-2">
                <p className="">
                    Medieval scholars and scribes glossed authoritative texts that were important to their culture. Here you can browse glosses on those authoritative books.
                </p>
            </div>
            <div className="mb-8 border-[1.5px] border-black bg-grey/10 ">
                <p className="px-2">
                    <Link className="text-blue-500 text-semibold" href="/"> Home </Link> 
                    &gt; {title}
                </p>
		    </div>
            {/* Put all target ids here:*/}

            
            {/* TODO: Some Dropdowns with individual books that has glosses in the dropdown */}
            <Dropdown label="Glosses on the Gospel of Matthews" textData={textData} onItemClicked={onItemClicked}/>
            <Dropdown label="Book 2" textData={sample} />
            <Dropdown label="Book 3" textData={sample} />
        </div>
    );
};

export default Book;