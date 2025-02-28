"use client";

import { FC } from "react";
import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { useGlossList } from "@/hooks/useGlossList";

interface BrowseAllGlossesProps {}

let filterColumn = {
  header: "Incipit",
  accessorKey: "title",
  expandable: false,
};
let columns = make_columns([
  filterColumn,
  {
    header: "Canonical Reference Locator",
    accessorKey: "canonicalReference",
    expandable: false,
  },
  { header: "Gloss Text", accessorKey: "textValue", expandable: true },
]);

const BrowseAllGlosses: FC<BrowseAllGlossesProps> = ({}) => {
  const { glosses, loading } = useGlossList();
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Published Glosses</h1>
      <div className="pt-8"></div>
      {
        <DataTable
          columns={columns}
          data={glosses}
          loading={loading}
          filterColumn={filterColumn}
        />
      }
    </div>
  );
};

export default BrowseAllGlosses;
