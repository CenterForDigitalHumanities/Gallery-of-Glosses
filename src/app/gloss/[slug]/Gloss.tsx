"use client";

import { RERUM } from "@/configs/rerum-links";
import * as NAV from "@/configs/navigation";
import { usePathname } from "next/navigation";
import { make_columns } from "@/app/browse/Columns";
import { DataTable } from "@/app/browse/DataTable";
import { use } from "react"
import { useGlossContext } from "@/contexts/GlossContext"
import { useManuscriptsReferencingGloss } from "@/hooks/useManuscriptsReferencingGloss"
import { useWitnessFragmentsReferencingGloss } from "@/hooks/useWitnessFragmentsReferencingGloss"

const filterColumn = {
  header: "Shelfmark",
  accessorKey: "identifier",
  expandable: false,
}

const columns = make_columns([
  filterColumn,
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

const Gloss = (props : {  slug: string } ) => {
  const pathname = usePathname();
  let glossPromise = useGlossContext()
  let gloss = use(glossPromise)
  gloss["@id"] = RERUM+props.slug
  
  // Which Manuscripts contain this Gloss?
  //const manuscriptsResult = useManuscriptsReferencingGloss(gloss["@id"]);
  //let manuscripts = manuscriptsResult.manuscripts;

  // Which Witness Fragments reference this Gloss?
  const witnessFragmentsResult = useWitnessFragmentsReferencingGloss(gloss["@id"]);
  let fragments = witnessFragmentsResult.witnessFragments;

  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">
          {gloss?.title ?? "{ Unlabeled Gloss }"}
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <p>
            <span className="font-semibold">Canonical Reference Locator:</span>{" "}
            <span>
              {gloss?.canonicalReference ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Language:</span>{" "}
            <span>
              {gloss?.text?.language ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            <span>
              { gloss?.description ?? "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            <span>
              {gloss.tags
                ? gloss.tags.items.map((tag, tagIndex, tagArray) => (
                    <a
                      key={tagIndex}
                      href={`${NAV.BASEPATH}/browse/glosses/tag?q=${tag}`}
                      className="text-blue-500 hover:underline"
                    >
                      {tag}
                      {tagIndex < tagArray.length - 1 ? ", " : ""}
                    </a>
                  ))
                : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Target Text:</span>{" "}
            <span>
              {gloss?.targetedText ?? "Not found"}
            </span>
          </p>
        </div>
        <div className="rounded-xl shadow-inner">
          <p className="text-justify">
            {gloss?.text?.textValue ?? "Not found"}
          </p>
        </div>
        <h2 className="text-xl font-bold mb-4">
          Witness Fragments for this Gloss
        </h2>
        {
        fragments.length ?
        <DataTable
          columns={columns}
          data={fragments}
          loading={witnessFragmentsResult.loading}
          filterColumn={filterColumn}
        />
        : "No Fragments Found"
        }
      </div>
    </div>
  );
};

export default Gloss;
