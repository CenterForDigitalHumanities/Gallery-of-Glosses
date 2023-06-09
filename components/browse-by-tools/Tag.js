import Link from "next/link";
import GlossSheet from "../GlossSheet";

const Tag = ({ title, onItemClicked }) => {
    const data = [        
        { Glosses: 'Gloss 1', Tags: 'Tag1, Tag2', Description: 'Description 1' },
        { Glosses: 'Gloss 2', Tags: 'Tag3, Tag4', Description: 'Description 2' },
        { Glosses: 'Gloss 1', Tags: 'Tag1, Tag2', Description: 'Description 1' },
        { Glosses: 'Gloss 2', Tags: 'Tag3, Tag4', Description: 'Description 2' },
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
                Various glosses share certain features or terms. We have selectively ascribed tags to capture this information. Here you may browse according to term or feature tag and see all the glosses that have shared content in this way.
                </p>
            </div>
            <div className="mb-8 border-[1.5px] border-black bg-grey/10 ">
                <p className="px-2">
                    <Link className="text-blue-500 text-semibold" href="/"> Home </Link> 
                    &gt; {title}
                </p>
		    </div>
            <GlossSheet headers={['Glosses', 'Tags', 'Description']} data={data}/>
        </div>
    );
};

export default Tag;