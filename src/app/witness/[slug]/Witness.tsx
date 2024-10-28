"use client";

import { RERUM } from "@/configs/rerum-links";
import { usePathname } from "next/navigation";
import { make_columns } from "../.../browse/Columns";
import { DataTable } from "../.../browse/DataTable";
import { useWitnessGlossesList } from "@/hooks/useWitnessGlossesList";
import { useWitnessInstance } from "@/hooks/useWitnessInstance";

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
  { header: "Gloss Text", accessorKey: "textValue", expandable: true },
]);

const Witness = (props : {  slug: string } ) => {
  const pathname = usePathname();

  const targetId = props.slug
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
              {witness ? witness.repository : "Not found"}
            </span>
          </p>{" "}
          <p>
            <span className="font-semibold">City:</span>{" "}
            <span className={`${!witness && blurredStyles}`}>
              {witness ? witness.city : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Institution:</span>{" "}
            <span className={`${!witness && blurredStyles}`}>
              {witness ? witness.institution : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Provenance:</span>{" "}
            <span className={`${!witness && blurredStyles}`}>
              {witness ? witness.provenance : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Region:</span>{" "}
            <span className={`${!witness && blurredStyles}`}>
              {witness ? witness.region : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Data URL:</span>{" "}
            <span className={`${!witness && blurredStyles}`}>
              {witness ? witness.url : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Base Project:</span>{" "}
            <span className={`${!witness && blurredStyles}`}>
              {witness ? witness.baseProject : "Not found"}
            </span>
          </p>
        </div>
        <h2 className={`text-xl font-bold mb-4 ${!witness && blurredStyles}`}>
          Attached Glosses
        </h2>
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

export default Witness;