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
  linked: true,
};
let columns = make_columns(
  [
    filterColumn,
    {
      header: "Canonical Reference Locator",
      accessorKey: "canonicalReference",
      expandable: false,
      linked: false,
    },
    {
      header: "Target Text",
      accessorKey: "textValue",
      expandable: true,
      linked: false,
    },
  ],
  "/gloss",
);

const BrowseAllGlosses: FC<BrowseAllGlossesProps> = ({}) => {
  const { glosses, loading } = useGlossList();
  return (
    <div>
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
