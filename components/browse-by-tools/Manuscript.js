import Link from "next/link";
import GlossSheet from "../GlossSheet"

const Manuscript = ({ title, onItemClicked }) => {
    const data = [        
        { Shelfmark: 'shelfmark 1', City: 'City 1' },
        { Shelfmark: 'shelfmark 2', City: 'City 2' },
        { Shelfmark: 'shelfmark 3', City: 'City 3' },
        { Shelfmark: 'shelfmark 4', City: 'City 4' },
    ] 

    return (
        <div className="py-4">
            <div className="flex flex-row pb-2">
                <p className="text-2xl">
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

            <GlossSheet headers={['Shelfmark', 'City']} data={data}/>
        </div>
    );
};

export default Manuscript;