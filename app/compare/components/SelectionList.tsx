import { Gloss } from "@/lib/Gloss";

interface SelectionListProps {
  selectedRows: { rows: Gloss[] };
}

export const SelectionList: React.FC<SelectionListProps> = ({
  selectedRows,
}) => (
  <div className="overflow-auto max-h-[400px] border border-gray-200 h-[400px] shadow-md p-4 my-4">
    <p className="font-semibold mb-4">Currently Selected</p>
    {(selectedRows as any)?.rows?.map((gloss: any) => (
      <div className="border border-gray-200 shadow-md p-2 mb-2" key={gloss.id}>
        {gloss.original.title}{" "}
      </div>
    ))}
    <div className="flex flex-col gap-2"></div>
  </div>
);
