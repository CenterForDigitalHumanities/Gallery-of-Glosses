import DropInfo from "@/components/DropInfo";
import { terms, abbreviations } from "@/data/constants";

// This component is for displaying the Terminology and Abbreviations
export const TermsContent = () => {
  return (
    <>
      {/* Header text */}
      <p className="text-4xl mb-6 text-white ml-2">
        Terminology and Abbreviations
      </p>
      <div className="flex flex-col gap-2">
        {/* Use DropInfo component for displaying Terms */}
        <DropInfo title="Terms">
          {/* Iterate over each term and display its title and description */}
          {terms.map((term, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <h3 className="text-xl mb-2">{term.title}</h3>
              <p className="text-sm">{term.desc}</p>
            </div>
          ))}
        </DropInfo>
        {/* Use DropInfo component for displaying Abbreviations */}
        <DropInfo title="Abbreviations">
          {/* Iterate over each abbreviation and display its title and description */}
          {abbreviations.map((abbr, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <h3 className="text-xl mb-2">{abbr.title}</h3>
              <p className="text-sm">{abbr.desc}</p>
            </div>
          ))}
        </DropInfo>
      </div>
    </>
  );
};
