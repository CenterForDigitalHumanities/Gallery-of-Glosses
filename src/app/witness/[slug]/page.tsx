"use client";

import { RERUM } from "@/configs/rerum-links";
import { useWitnessInstance } from "@/hooks/useWitnessInstance";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { make_columns } from "../../browse/Columns";
import { DataTable } from "../../browse/DataTable";
import { useWitnessGlossesList } from "@/hooks/useWitnessGlossesList";

interface BrowseWitnessGlossesProps {}

let filterColumn = {
  header: "Incipit",
  accessorKey: "title",
  expandable: false,
};
let columns = make_columns([
  filterColumn,
  {
    header: "Canonical Reference Locator",
    accessorKey: "canonicalReference",
    expandable: false,
  },
  { header: "Target Text", accessorKey: "textValue", expandable: true },
]);

const WitnessInstance = () => {
  const pathname = usePathname();

  const targetId = RERUM + pathname.split("/witness/")[1];
  const witness = useWitnessInstance(targetId);

  const blurredStyles = "filter blur-md opacity-50";

  let { glosses, loading } = useWitnessGlossesList(witness?.identifier);

  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1 className={`text-2xl font-bold mb-4 ${!witness && blurredStyles}`}>
          {witness ? witness.identifier : "Not found"}
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <p>
            <span className="font-semibold">Repository:</span>{" "}
            <span className={`${!witness && blurredStyles}`}>
              {witness ? witness.repository : "2"}
            </span>
          </p>
        </div>
        <DataTable
          columns={columns}
          data={glosses}
          loading={loading}
          filterColumn={filterColumn}
        />
      </div>
    </div>
  );
};

export default WitnessInstance;
