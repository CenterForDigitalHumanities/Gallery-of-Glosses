"use client";

import { FC } from "react";
import { columns } from "../Columns";
import { DataTable } from "../DataTable";
import { useGlossInstance } from "@/hooks/useGlossInstance";

interface BrowseAllGlossesProps {}

const BrowseAllGlosses: FC<BrowseAllGlossesProps> = ({}) => {
  const { glosses, loading } = useGlossInstance();
  return (
    <div>
      {<DataTable columns={columns} data={glosses} loading={loading} />}
    </div>
  );
};

export default BrowseAllGlosses;
