"use client";

import { RERUM } from "@/configs/rerum-links"
import * as NAV from "@/configs/navigation"
import { usePathname } from "next/navigation"
import { make_columns } from "@/app/browse/Columns"
import { DataTable } from "@/app/browse/DataTable"
import { use } from "react"
import { useWitnessContext } from "@/contexts/WitnessContext"
// import { useWitnessGlossesList } from "@/hooks/useWitnessGlossesList";
// import { useWitnessInstance } from "@/hooks/useWitnessInstance";

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
  const targetId = props.slug
  let witnessPromise = useWitnessContext()
  let witness = use(witnessPromise)
  // if(!witness){
  //   return (<div> Data could not be found </div>)
  // }

  const blurredStyles = "filter blur-md opacity-50";
  // let { witnesses, loading } = useWitnessesList(witness?.identifier);

  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">
          {witness?.identifier ?? "Not found"}
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <p>
            <span className="font-semibold">Repository:</span>{" "}
            <span>
              {witness?.repository ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">City:</span>{" "}
            <span>
              {witness?.city ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Institution:</span>{" "}
            <span>
              {witness?.institution ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Provenance:</span>{" "}
            <span>
              {witness?.provenance ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Region:</span>{" "}
            <span>
              {witness?.region ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Data URL:</span>{" "}
            <span>
              {witness?.url ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Base Project:</span>{" "}
            <span>
              {witness?.baseProject ?? "Not found"}
            </span>
          </p>
        </div>
        {/*<h2 className={`text-xl font-bold mb-4 ${!witness && blurredStyles}`}>
          Attached Glosses
        </h2>
        <DataTable
          columns={columns}
          data={witnesses}
          loading={loading}
          filterColumn={filterColumn}
        />*/}
      </div>
    </div>
  );
};

export default Witness;