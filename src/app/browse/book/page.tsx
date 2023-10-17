"use client";

import { FC } from "react";
import { columns } from "../Columns";
import { DataTable } from "../DataTable";
import { useGlossList } from "@/hooks/useGlossList";

interface BookProps {}

const Book: FC<BookProps> = ({}) => {
  const glosses = useGlossList();

  return <div>{<DataTable columns={columns} data={glosses} />}</div>;
};

export default Book;
