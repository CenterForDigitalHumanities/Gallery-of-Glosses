import Link from "next/link";
import GlossSheet from "../GlossSheet"
import { useEffect, useState } from "react";
import axios from "axios";

const PAGE_SIZE = 10;

const Manuscript = ({ title, onItemClicked }) => {
    const [textData, setData] = useState([]);

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
                <p className="text-4xl">
                    {title}
                </p>
            </div>
            <div className="flex flex-row pb-2">
                <p className="">
                    Glosses of course appear in individual manuscripts. If you want to see all of the glosses transcribed out of a particular manuscript, you can do so here.
                </p>
            </div>
            <div className="mb-8 border-[1.5px] border-black bg-grey/10 ">
                <p className="px-2">
                    <Link className="text-blue-500 text-semibold" href="/"> Home </Link> 
                    &gt; {title}
                </p>
		    </div>

            <GlossSheet headers={['label', '@id']} textData={textData} onItemClicked={onItemClicked}/>
        </div>
    );
};

export default Manuscript;