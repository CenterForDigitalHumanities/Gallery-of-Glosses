"use client";

import { RERUM } from "@/configs/rerum-links"
import * as NAV from "@/configs/navigation"
import { usePathname } from "next/navigation"
import { make_columns } from "@/app/browse/Columns"
import { DataTable } from "@/app/browse/DataTable"
import { use } from "react"
import { useManuscriptContext } from "@/contexts/ManuscriptContext"

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

const Manuscript = (props : {  slug: string } ) => {
  let manuscriptPromise = useManuscriptContext()
  let manuscript = use(manuscriptPromise)
  manuscript["@id"] = RERUM+props.slug
  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">
          {manuscript?.identifier ?? "Not found"}
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <p>
            <span className="font-semibold">Repository:</span>{" "}
            <span>
              {manuscript?.repository ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">City:</span>{" "}
            <span>
              {manuscript?.city ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Institution:</span>{" "}
            <span>
              {manuscript?.institution ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Provenance:</span>{" "}
            <span>
              {manuscript?.provenance ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Region:</span>{" "}
            <span>
              {manuscript?.region ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Data URL:</span>{" "}
            <span>
              {manuscript?.url ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Base Project:</span>{" "}
            <span>
              {manuscript?.baseProject ?? "Not found"}
            </span>
          </p>
        </div>
        {/*<h2 className="text-xl font-bold mb-4">
          Attached Glosses
        </h2>
        <DataTable
          columns={columns}
          data={glosses}
          loading={loading}
          filterColumn={filterColumn}
        />*/}
      </div>
    </div>
  );
};

export default Manuscript;