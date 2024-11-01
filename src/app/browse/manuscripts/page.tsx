"use client";

import { FC } from "react";
import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { useManuscriptList } from "@/hooks/useManuscriptList";

interface BrowseAllManuscriptsProps {}

let filterColumn = {
  header: "Shelfmark",
  accessorKey: "identifier",
  expandable: false,
};
let columns = make_columns([
  filterColumn,
  { header: "Full Bibliographic Citation", accessorKey: "_citation", expandable: true },
]);

const BrowseAllManuscripts: FC<BrowseAllManuscriptsProps> = ({}) => {
  const { manuscripts, loading } = useManuscriptList();
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Published Manuscripts</h1>
      <div className="pt-8"></div>
      {
        <DataTable
          columns={columns}
          data={manuscripts}
          loading={loading}
          filterColumn={filterColumn}
        />
      }
    </div>
  );
};

export default BrowseAllManuscripts;
