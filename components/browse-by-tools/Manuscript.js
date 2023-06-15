import Link from "next/link";
import GlossSheet from "../GlossSheet"

const Manuscript = ({ title, onItemClicked }) => {

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
            <div className="border-[1.5px] border-black bg-grey/10 mb-4 rounded-md p-2">
                <div className="px-2 flex gap-2">
                    <Link className="text-blue-500 font-semibold hover:underline" href="/"> Home </Link> 
                    &gt; <p className="font-semibold">{title}</p>
                </div>
            </div>

            <GlossSheet headers={['Manuscript Shelfmark', 'City of Origin']} collectionType={"Glossing-Matthew"} keys={["body.identifier.value","body.city.value","@id"]} onItemClicked={onItemClicked}/>
        </div>
    );
};

export default Manuscript;