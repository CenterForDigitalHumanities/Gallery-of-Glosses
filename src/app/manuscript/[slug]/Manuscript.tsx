"use client";

import { RERUM } from "@/configs/rerum-links"
import * as NAV from "@/configs/navigation"
import { usePathname } from "next/navigation"
import { make_columns } from "@/app/browse/Columns"
import { DataTable } from "@/app/browse/DataTable"
import { use } from "react"
import { useManuscriptContext } from "@/contexts/ManuscriptContext"

//TODO
//import { useGlossesFromManuscript } from "@/hooks/useGlossesFromManuscript"
import { useWitnessFragmentsFromManuscript } from "@/hooks/useWitnessFragmentsFromManuscript"

let filterColumn_glosses = {
  header: "Incipit",
  accessorKey: "title",
  expandable: false,
};
let filterColumn_fragments = {
  header: "Shelfmark",
  accessorKey: "identifier",
  expandable: false,
};
let columns_glosses = make_columns([
  filterColumn_glosses,
  {
    header: "Canonical Reference Locator",
    accessorKey: "canonicalReference",
    expandable: false,
  },
  { header: "Gloss Text", accessorKey: "textValue", expandable: true },
]);
let columns_fragments = make_columns([
  filterColumn_fragments,
  {
    header: "Text",
    accessorKey: "textValue",
    expandable: true,
  },
  {
    header: "Resource",
    accessorKey: "source",
    expandable: false,
  }
]);

const Manuscript = (props : {  slug: string } ) => {
  let manuscriptPromise = useManuscriptContext()
  let manuscript = use(manuscriptPromise)
  manuscript["@id"] = RERUM+props.slug

  // What Glosses can be found in this Manuscript

  // FIXME this is too expensive to do this way, but it works if you have 10 minutes to wait.
  // let glossesResult = useGlossesFromManuscript(manuscript["@id"])
  // let glosses = glossesResult.glosses

  // Which Witness Fragments belong to this Manuscript?
  // FIXME this is too expensive to do this way, but it works if you have 10 minutes to wait.
  const witnessFragmentsResult = useWitnessFragmentsFromManuscript(manuscript["@id"]);
  let fragments = witnessFragmentsResult.witnessFragments;
  
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
        <h2 className="text-xl font-bold mb-4">
          Witness Fragments Within this Manuscript
        </h2>
        {
        fragments.length ?
        <DataTable
          columns={columns_fragments}
          data={fragments}
          loading={witnessFragmentsResult.loading}
          filterColumn={filterColumn_fragments}
        />
        : "No Fragments Found"
        }
{/*        <h2 className="text-xl font-bold mb-4">
          Glosses Within this Manuscript
        </h2>
        {
        glosses.length ?
        <DataTable
          columns={columns_glosses}
          data={glosses}
          loading={glossesResult.loading}
          filterColumn={filterColumn_glosses}
        />
        : "No Glosses Found"
        }*/}
      </div>
    </div>
  );
};

export default Manuscript;