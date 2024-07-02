"use client";

import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { FC } from "react";
import { useGlossList } from "@/hooks/useGlossList";

interface BookProps {}

let filterColumn = { header: "Book", accessorKey: "targetCollection", expandable: false }
let columns = make_columns([
  { header: "Incipit", accessorKey: "title", expandable: false },
  filterColumn,
  { header: "Target Text", accessorKey: "textValue", expandable: true },
])

const Book: FC<BookProps> = ({}) => {
  const { glosses, loading } = useGlossList();

  return (
    <div>
      {<DataTable columns={columns} data={glosses} loading={loading} filterColumn={filterColumn} />}
    </div>
  );
};

export default Book;
