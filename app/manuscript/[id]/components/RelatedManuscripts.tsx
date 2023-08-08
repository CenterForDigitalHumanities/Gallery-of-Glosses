import { Manuscript } from "@/lib/Manuscript";

interface RelatedManuscriptsProps {
  relatedManuscripts: Array<Manuscript>;
  loading: boolean;
  onManuscriptClicked: (Manuscript: Manuscript) => void;
}

export const RelatedManuscripts: React.FC<RelatedManuscriptsProps> = ({
  relatedManuscripts,
  loading,
  onManuscriptClicked,
}) => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Related Manuscripts</h2>
      <div className="grid grid-cols-2 gap-4 pb-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          relatedManuscripts.map((manuscript: Manuscript, index: number) => (
            <div
              key={index}
              className="related-gloss"
              onClick={() => onManuscriptClicked(manuscript)}
            >
              <h3 className="text-lg font-semibold">{manuscript.title}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
