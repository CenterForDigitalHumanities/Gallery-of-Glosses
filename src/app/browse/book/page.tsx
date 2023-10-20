"use client";

import { FC } from "react";
import { columns } from "../Columns";
import { DataTable } from "../DataTable";
import { useGlossList } from "@/hooks/useGlossList";
import { BeatLoader } from "react-spinners";

interface BookProps {}

const Book: FC<BookProps> = ({}) => {
  const { glosses, loading } = useGlossList();
  return (
    <div>
      {<DataTable columns={columns} data={glosses} loading={loading} />}
    </div>
  );
};

export default Book;
