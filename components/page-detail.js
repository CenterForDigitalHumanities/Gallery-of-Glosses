import Link from "next/link";

const PageDetail = ({ item, onBack }) => {
  const placeholderTranscription = "This is where the transcription of the manuscript text will be.";
  const placeholderImage = "https://via.placeholder.com/150";  // A placeholder image URL
  const placeholderRelatedManuscripts = [
    { title: "Manuscript 1", link: "#" },
    { title: "Manuscript 2", link: "#" },
    // Add more placeholder manuscripts if needed
  ];
  
  const { label, pageData } = item;

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