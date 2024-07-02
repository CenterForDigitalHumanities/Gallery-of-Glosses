"use client";

import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { FC } from "react";
import { useGlossList } from "@/hooks/useGlossList";

interface TagProps {}

let columns = make_columns([
  { header: "Tag", accessorKey: "tags", expandable: false },
])

const Tag: FC<TagProps> = ({}) => {
  const { glosses, loading } = useGlossList();
  return (
    <div>
      {<DataTable columns={columns} data={glosses} loading={loading} />}
    </div>
  );
};

export default Tag;
