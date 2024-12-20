"use client";

import { RERUM } from "@/configs/rerum-links"
import * as NAV from "@/configs/navigation"
import { usePathname } from "next/navigation"
import { make_columns } from "@/app/browse/Columns"
import { DataTable } from "@/app/browse/DataTable"
import { use } from "react"
import { useManuscriptContext } from "@/contexts/ManuscriptContext"

import { useGlossesFromManuscript } from "@/hooks/useGlossesFromManuscript"
import { useWitnessFragmentsFromManuscript } from "@/hooks/useWitnessFragmentsFromManuscript"

let filterColumn_glosses = {
  header: "Incipit",
  accessorKey: "title",
  expandable: false,
};
let filterColumn_fragments = {
  header: "Witness Text",
  accessorKey: "textValue",
  expandable: false,
};
let columns_glosses = make_columns([
  filterColumn_glosses,
  { header: "Gloss Text", accessorKey: "textValue", expandable: true },
  {
    header: "Canonical Reference Locator",
    accessorKey: "canonicalReference",
    expandable: false,
  },
  
]);
let columns_fragments = make_columns([
  filterColumn_fragments,
  // {
  //   header: "Glossator",
  //   accessorKey: "glossatorHand",
  //   expandable: false,
  // },
  // {
  //   header: "Location",
  //   accessorKey: "glossLocation",
  //   expandable: false,
  // },
  // {
  //   header: "Format",
  //   accessorKey: "glossFormat",
  //   expandable: false,
  // },
  // {
  //   header: "Tags",
  //   accessorKey: "tags",
  //   expandable: true,
  // }
]);

const Manuscript = (props : {  slug: string } ) => {
  let manuscriptPromise = useManuscriptContext()
  let manuscript = use(manuscriptPromise)
  manuscript["@id"] = RERUM+props.slug

  // What Glosses can be found in this Manuscript
  let glossesResult = useGlossesFromManuscript(manuscript["@id"])
  let glosses = glossesResult.glosses

  // Which Witness Fragments belong to this Manuscript?
  let witnessFragmentsResult = useWitnessFragmentsFromManuscript(manuscript["@id"]);
  let fragments = witnessFragmentsResult.witnessFragments;
  
  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">
          {manuscript?.identifier ?? "Not found"}
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
          {/*<p>
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
          </p>*/}
          <p>
            <span className="font-semibold">Region:</span>{" "}
            <span>
              {manuscript?._originRegion ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Locale:</span>{" "}
            <span>
              {manuscript?._originLocal ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            <span>
              {manuscript?.date ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Bibliographic Citation:</span>{" "}
            <span>
              {manuscript?._citation ?? "Not found"}
            </span>
          </p>
        </div>
        <div className="mb-4">
          <p className="linky">
            <span className="font-semibold">Data URL:</span>{" "}
            <span>
              <a href={`manuscript?.url`}>{manuscript?.url ?? "Not found"}</a>
            </span>
          </p>
          <p className="linky">
            <span className="font-semibold">IIIF Manifest:</span>{" "}
            <span>
              <a href={`manuscript?._iiifManifest`}>{manuscript?._iiifManifest ?? "Not found"}</a>
            </span>
          </p>
          <p className="linky">
            <span className="font-semibold">See Also:</span>{" "}
            <span>
              <a href={`manuscript?.seeAlso`}>{manuscript?.seeAlso ?? "Not found"}</a>
            </span>
          </p>
        </div>
        <div className="font-semibold">Notes</div>
        <div className="mb-4">
          {
            manuscript?.notes ?? "Not Found"
          }
        </div>
        <h2 className="text-xl font-bold mb-4">
          Witness Fragments Within this Manuscript
        </h2>
        <small className="loadNote">Please allow a few minutes for this to load</small>
        {
        <DataTable
          columns={columns_fragments}
          data={fragments}
          loading={witnessFragmentsResult.loading}
          filterColumn={filterColumn_fragments}
        />
        }
        <h2 className="text-xl font-bold mb-4 mt-4">
          Glosses Within this Manuscript
        </h2>
        <small className="loadNote">Please allow a few minutes for this to load</small>
        {
        <DataTable
          columns={columns_glosses}
          data={glosses}
          loading={glossesResult.loading}
          filterColumn={filterColumn_glosses}
        />
        }
      </div>
    </div>
  );
};

export default Manuscript;