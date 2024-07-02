"use client";

import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { FC } from "react";
import { useGlossList } from "@/hooks/useGlossList";

interface TagProps {}

let filterColumn = { header: "Tags", accessorKey: "tags", expandable: false }
let columns = make_columns([
  { header: "Incipit", accessorKey: "title", expandable: false },
  filterColumn,
  { header: "Target Text", accessorKey: "textValue", expandable: true },
])

const Tag: FC<TagProps> = ({}) => {
  const { glosses, loading } = useGlossList();

  return (
    <div>
      {<DataTable columns={columns} data={glosses} loading={loading} filterColumn={filterColumn} />}
    </div>
  );
};

export default Tag;
