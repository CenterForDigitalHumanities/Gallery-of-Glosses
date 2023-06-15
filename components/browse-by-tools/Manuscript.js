import Link from "next/link";
import GlossSheet from "../GlossSheet"
import getAnnotations from "@/actions/getAnnotations";
import { useEffect, useState } from "react";
import getFromAnnotation from "@/actions/getFromAnnotation";

const Manuscript = ({ title, onItemClicked }) => {
    const [objects, setObjects] = useState([]);
    const [leftObjects, setLeftObjects] = useState([]);
    const [rightObjects, setRightObjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAnnotations({ key: "@type", value: "manuscript" });
            setObjects(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchAnnotationData = async () => {
            const leftData = await getFromAnnotation({ data: objects, key: "body.identifier.value" });
            const rightData = await getFromAnnotation({ data: objects, key: "body.city.value" });
            setLeftObjects(leftData);
            setRightObjects(rightData);
        };
    
        fetchAnnotationData();
    }, [objects]);
    
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

            <GlossSheet headers={['Shelfmark', 'City']} leftData={leftObjects} rightData={rightObjects} onItemClicked={onItemClicked}/>
        </div>
    );
};

export default Manuscript;