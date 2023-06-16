import Link from "next/link";

const GlossDetail = ({ item, onBack }) => {
    const placeholderTranscription = "This is where the transcription of the Gloss text will be.";
    const placeholderImage = "https://via.placeholder.com/200";  
    const placeholderRelatedGlosses = [
        { title: "Gloss 1", link: "#" },
        { title: "Gloss 2", link: "#" },
    ];
    const placeholderExternalLinks = [
        { title: "External Text 1", link: "#" },
        { title: "External Text 2", link: "#" },
    ];
    const placeholderCanonicalText = "This is where the canonical text related to the gloss will be.";
    
    const { label, pageData } = item;

    return (
        <div className="py-4 bg-gray-50">
            <h1 className="text-4xl mb-4">{label}</h1>
            <div className="border-[1.5px] border-black bg-grey/10 mb-4 rounded-md p-2">
                <div className="px-2 flex gap-2">
                    <Link href="/"><p className="text-blue-500 font-semibold hover:underline">Home</p></Link> 
                    &gt; <p className="text-blue-500 font-semibold cursor-pointer hover:underline" onClick={onBack} >{pageData.name} </p>
                    &gt; <p className="font-semibold">{label}</p>
                </div>
            </div>

            <div className="flex justify-between">
                <div className="w-1/2 pr-4">
                    <h2 className="text-2xl mb-2 text-blue-700">Transcription:</h2>
                    <p className="bg-white border rounded-md p-3 shadow-md">{placeholderTranscription}</p>
                </div>

                <div className="w-1/2 pl-4">
                    <h2 className="text-2xl mb-2 text-blue-700">Gloss Image:</h2>
                    <img className="shadow-lg rounded-md" src={placeholderImage} alt="Gloss image"/>
                </div>           
            </div>
            
            <div className="mt-6">
                <h2 className="text-2xl mb-2">Related Glosses:</h2>
                <div className="flex flex-col">
                    {placeholderRelatedGlosses.map((Gloss, index) => 
                    <div key={index} className="mb-1"><Link href={Gloss.link}><p className="text-blue-600 hover:text-blue-800">{Gloss.title}</p></Link></div>
                    )}
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl mb-2">External Texts and Entities:</h2>
                <div className="flex flex-col">
                    {placeholderExternalLinks.map((link, index) => 
                    <div key={index} className="mb-1"><Link href={link.link}><p className="text-blue-600 hover:text-blue-800">{link.title}</p></Link></div>
                    )}
                </div>
            </div>

            <div className="mt-6">
            <h2 className="text-2xl mb-2">Description:</h2>
            <p className="bg-white border rounded-md p-3 shadow-md">{placeholderCanonicalText}</p>
            </div>
        </div>
    );
};

export default GlossDetail;
