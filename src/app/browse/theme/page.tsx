"use client";

import { FC } from "react";
import { useGlossList } from "@/hooks/useGlossList";
import { DataTable } from "@/app/browse/DataTable";
import { make_columns } from "@/app/browse/Columns";

interface ThemeProps {}

let filterColumn = {
  header: "Themes",
  accessorKey: "themes",
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
  { header: "Gloss Text", accessorKey: "textValue", expandable: true },
]);

const Theme: FC<ThemeProps> = ({}) => {
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

export default Theme;
