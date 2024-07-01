"use client";

import { useFieldList } from "@/hooks/useFieldList";
import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { FC } from "react";

interface TagProps {}

let columns = make_columns([
  { header: "Tag", accessorKey: "tag", expandable: false },
])

const Tag: FC<TagProps> = ({}) => {
  const { fields, loading } = useFieldList("tags");
  return (
    <div>
      {<DataTable columns={columns} data={fields} loading={loading} />}
    </div>
  );
};

export default Tag;
