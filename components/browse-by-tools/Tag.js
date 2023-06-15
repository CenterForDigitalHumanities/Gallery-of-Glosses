import Link from "next/link";
import GlossSheet from "../GlossSheet";

const Tag = ({ title, onItemClicked }) => {

    return (
        <div className="py-4">
            <div className="flex flex-row pb-2">
                <p className="text-4xl">
                    {title}
                </p>
            </div>
            <div className="flex flex-row pb-2">
                <p className="">
                    Various glosses share certain features or terms. We have selectively ascribed tags to capture this information. Here you may browse according to term or feature tag and see all the glosses that have shared content in this way.
                </p>
            </div>
            <div className="border-[1.5px] border-black bg-grey/10 mb-4 rounded-md p-2">
                <div className="px-2 flex gap-2">
                    <Link className="text-blue-500 font-semibold hover:underline" href="/"> Home </Link> 
                    &gt; <p className="font-semibold">{title}</p>
                </div>
            </div>
            
            <GlossSheet headers={['Gloss', 'Tags']} collectionType={"Glossing-Matthew-Named-Glosses"} keys={["body.title.value","body.tags.items","@id"]} onItemClicked={onItemClicked}/>
        </div>
    );
};

export default Tag;