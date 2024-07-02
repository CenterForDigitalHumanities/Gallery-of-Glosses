"use client";

import { FC } from "react";
import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { useGlossList } from "@/hooks/useGlossList";

interface BrowseAllGlossesProps {}

let filterColumn = { header: "Incipit", accessorKey: "title", expandable: false }
let columns = make_columns([
  filterColumn,
  { header: "Target Chapter", accessorKey: "targetChapter", expandable: false },
  { header: "Target Verse", accessorKey: "targetVerse", expandable: false },
  { header: "Target Text", accessorKey: "textValue", expandable: true },
])

const BrowseAllGlosses: FC<BrowseAllGlossesProps> = ({}) => {
  const { glosses, loading } = useGlossList();
  return (
    <div>
      {<DataTable columns={columns} data={glosses} loading={loading} filterColumn={filterColumn} />}
    </div>
  );
};

export default BrowseAllGlosses;
