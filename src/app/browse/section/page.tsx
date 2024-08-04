"use client";

import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { FC } from "react";
import { useGlossList } from "@/hooks/useGlossList";

interface SectionProps {}

let filterColumn = {
  header: "Section",
  accessorKey: "targetChapter",
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

const Section: FC<SectionProps> = ({}) => {
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

export default Section;
