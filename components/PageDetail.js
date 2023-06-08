import Link from "next/link";

/*
    PageDetail Component:
    - This component is used to render detailed information about a specific gloss.
*/

const PageDetail = ({ item, onBack }) => {
    const placeholderTranscription = "This is where the transcription of the manuscript text will be.";
    const placeholderImage = "https://via.placeholder.com/150";  
    const placeholderRelatedManuscripts = [
        { title: "Manuscript 1", link: "#" },
        { title: "Manuscript 2", link: "#" },
    ];
    
    const { label, pageData } = item;

    /*
        Tailwind CSS is used for styling:
        - 'flex', 'flex-col', 'flex-row': Flexbox classes to create flexible layouts.
        - 'p-1', 'px-2', 'py-1': Padding classes. Numbers denote the size (e.g. 1 is 0.25rem, 2 is 0.5rem).
        - 'text-md': Medium text size.
        - 'ml-auto': Automatic left margin, used for alignment (pushing items to the right).
        - 'border-2', 'border-black': Border classes. Sets the border thickness and color.
        - 'bg-white', 'bg-black': Background color classes.
        - 'w-20', 'w-36', 'h-24': Width and height classes. Numbers denote the size (e.g. 20 is 5rem, 36 is 9rem).
        - 'gap-2': Sets the gap between child elements of a flex or grid container (0.5rem).
        - 'items-center': Aligns flex items along the center perpendicular to the main axis.
        - 'text-white': Text color class.
        - 'font-semibold': Sets the font weight to semi-bold.
        - 'rounded': Adds rounded corners.
        - 'shadow-lg': Large shadow for 3D effect.
    */
    return (
        
        <div className="py-4">
            <h1 className="text-4xl mb-4">{label}</h1>
            <div className="border-[1.5px] border-black bg-grey/10 mb-4">
            <p className="px-2">
                <Link className="text-blue-500 text-semibold" href="/"> Home </Link> 
                &gt; <span className="text-blue-500 text-semibold cursor-pointer" onClick={onBack} >{pageData.title} </span>
                &gt; {label}
            </p>
            </div>
            <div className="flex justify-between">
            <div className="w-1/2 pr-4">
                <h2 className="text-2xl mb-2">Transcription:</h2>
                <p>{placeholderTranscription}</p>
            </div>

            <div className="w-1/2 pl-4">
                <h2 className="text-2xl mb-2">Manuscript Image:</h2>
                <img src={placeholderImage} alt="Manuscript image"/>
            </div>
            
            </div>
            
            <div className="mt-6">
            <h2 className="text-2xl mb-2">Related Manuscripts:</h2>
            <ul>
                {placeholderRelatedManuscripts.map((manuscript, index) => 
                <li key={index} className="mb-1"><a href={manuscript.link} className="text-blue-600 hover:text-blue-800">{manuscript.title}</a></li>
                )}
            </ul>
            </div>
        </div>

    );
};

export default PageDetail;