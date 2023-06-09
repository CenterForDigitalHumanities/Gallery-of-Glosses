import Link from "next/link";
import GlossSheet from "../GlossSheet";


const Theme = ({ title, onItemClicked }) => {
    const data = [        
        { glosses: 'Gloss 1', property1: 'Tag1, Tag2', property2: 'Description 1' },
        { glosses: 'Gloss 2', property1: 'Tag3, Tag4', property2: 'Description 2' },
        { glosses: 'Gloss 1', property1: 'Tag1, Tag2', property2: 'Description 1' },
        { glosses: 'Gloss 2', property1: 'Tag3, Tag4', property2: 'Description 2' },
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
                    The same theme or topic could be addressed in various glosses on different authoritative texts. Here you can browse collections of glosses that have been curated around specific research themes.
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

export default Theme;