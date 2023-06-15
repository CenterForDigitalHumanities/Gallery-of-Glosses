import Link from "next/link";
import Dropdown from "../Dropdown";
import getFetchData from "@/actions/getFetchData";

const Book = ({ title, onItemClicked }) => {
    const sample = ["Item 1", "Item 2", "Item 3"];  

    const { data: matthewData, totalPages } = getFetchData('https://store.rerum.io/v1/id/610c54deffce846a83e70625');

    return (
        <div className="py-4">
            <div className="flex flex-row pb-2">
                <p className="text-4xl">
                    {title}
                </p>
            </div>
            <div className="flex flex-row pb-2">
                <p className="">
                    Medieval scholars and scribes glossed authoritative texts that were important to their culture. Here you can browse glosses on those authoritative books.
                </p>
            </div>
            <div className="border-[1.5px] border-black bg-grey/10 mb-4 rounded-md p-2">
                <div className="px-2 flex gap-2">
                    <Link className="text-blue-500 font-semibold hover:underline" href="/"> Home </Link> 
                    &gt; <p className="font-semibold">{title}</p>
                </div>
            </div>
            {/* Put all target ids here:*/}

            
            {/* TODO: Some Dropdowns with individual books that has glosses in the dropdown */}
            <Dropdown label="Glosses on the Gospel of Matthews" textData={matthewData} onItemClicked={onItemClicked}/>
            <Dropdown label="Book 2" textData={sample} totalPages={totalPages}/>
            <Dropdown label="Book 3" textData={sample} />
        </div>
    );
};

export default Book;