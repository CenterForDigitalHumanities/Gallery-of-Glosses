"use client";

import { FC } from "react";
import { make_columns } from "../Columns";
import { DataTable } from "../DataTable";
import { useWitnessList } from "@/hooks/useWitnessList";

interface BrowseAllWitnessesProps {}

let filterColumn = {
  header: "Witness",
  accessorKey: "identifier",
  expandable: false,
  linked: true,
};
let columns = make_columns(
  [
    filterColumn,
    {
      header: "Witness Details (under construction)",
      accessorKey: "city",
      expandable: false,
      linked: false,
    },
  ],
  "/witness",
);

const BrowseAllGlosses: FC<BrowseAllWitnessesProps> = ({}) => {
  const { witnesses, loading } = useWitnessList();
  return (
    <div>
      {
        <DataTable
          columns={columns}
          data={witnesses}
          loading={loading}
          filterColumn={filterColumn}
        />
      }
    </div>
  );
};

export default BrowseAllGlosses;
