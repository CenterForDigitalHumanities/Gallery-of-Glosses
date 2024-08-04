"use client";

import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { FC } from "react";
import { useGlossList } from "@/hooks/useGlossList";

interface DocumentProps {}

let filterColumn = {
  header: "Document",
  accessorKey: "document",
  expandable: false,
};
let columns = make_columns([
  { header: "Incipit", accessorKey: "title", expandable: false },
  {
    header: "Canonical Reference Locator",
    accessorKey: "canonicalReference",
    expandable: false,
  },
  filterColumn,
  { header: "Target Text", accessorKey: "textValue", expandable: true },
]);

const Document: FC<DocumentProps> = ({}) => {
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

export default Document;
