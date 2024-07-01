"use client";

import { FC } from "react";
import { columns } from "../Columns";
import { DataTable } from "../DataTable";
import { useGlossList } from "@/hooks/useGlossList";

import { make_columns } from "../Columns copy";
let columnsNew = make_columns([{ header: "Incipit", accessorKey: "title" }, { header: "Target Chapter", accessorKey: "targetChapter" }, { header: "Target Verse", accessorKey: "targetVerse" }, { header: "Target Text", accessorKey: "textValue" }])

interface BrowseAllGlossesProps {}

const BrowseAllGlosses: FC<BrowseAllGlossesProps> = ({}) => {
  const { glosses, loading } = useGlossList();
  return (
    <div>
      {<DataTable columns={columnsNew} data={glosses} loading={loading} />}
    </div>
  );
};

export default BrowseAllGlosses;
