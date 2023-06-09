import Link from "next/link";
import Dropdown from "../Dropdown";

const Theme = ({ title, onItemClicked }) => {
    const sample = ["Item 1", "Item 2", "Item 3"];  
    
    return (
        <div className="py-4">
            <div className="flex flex-row pb-2">
                <p className="text-2xl">
                    {title}
                </p>
            </div>
            <div className="flex flex-row pb-2">
                <p className="">
                    The same theme or topic could be addressed in various glosses on different authoritative texts. Here you can browse collections of glosses that have been curated around specific research themes.
                </p>
            </div>
            <div className="mb-8 border-[1.5px] border-black bg-grey/10 ">
                <p className="px-2">
                    <Link className="text-blue-500 text-semibold" href="/"> Home </Link> 
                    &gt; {title}
                </p>
		    </div>
            <Dropdown label="Theme 1" textData={sample} />
            <Dropdown label="Theme 2" textData={sample} />
            <Dropdown label="Theme 3" textData={sample} />
        </div>
    );
};

export default Theme;