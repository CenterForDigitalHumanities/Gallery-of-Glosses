"use client";

import { RERUM } from "@/configs/rerum-links";
import * as NAV from "@/configs/navigation";
import { usePathname } from "next/navigation";
import { make_columns } from "@/app/browse/Columns";
import { DataTable } from "@/app/browse/DataTable";
import { use } from "react";
import { useGlossContext } from "@/contexts/GlossContext";
import { useManuscriptsReferencingGloss } from "@/hooks/useManuscriptsReferencingGloss";
import { useWitnessFragmentsReferencingGloss } from "@/hooks/useWitnessFragmentsReferencingGloss";
import { GlossAnalysis } from "./GlossAnalysis";
import { WitnessMap } from "@/components/WitnessMap";
import { manuscriptLocations, type ManuscriptLocation } from "@/data/manuscript-locations";
import { type ProcessedFragment } from "@/lib/Fragment";

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
  // },
  // {
  //   header: "Resource",
  //   accessorKey: "source",
  //   expandable: false,
  // },
]);

/**
 * Maps witness fragments to their holding locations based on manuscript identifier.
 */
function getWitnessLocations(fragments: ProcessedFragment[]): ManuscriptLocation[] {
  const seen = new Set<string>();
  return fragments
    .map((frag) => {
      const partOf = frag.partOf ?? "";
      const targetId = frag.targetId ?? "";
      const identifier = frag.identifier ?? "";
      const match = manuscriptLocations.find((loc) =>
        partOf.includes(loc.identifier) ||
        targetId.includes(loc.identifier) ||
        identifier.includes(loc.identifier) ||
        loc.identifier.toLowerCase().includes(partOf.toLowerCase()) ||
        loc.identifier.toLowerCase().includes(identifier.toLowerCase())
      );
      return match ?? null;
    })
    .filter((loc): loc is ManuscriptLocation => {
      if (!loc) return false;
      if (seen.has(loc.identifier)) return false;
      seen.add(loc.identifier);
      return true;
    });
}

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
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
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
        <div className="mb-4">
          <span className="font-semibold">Gloss Text:</span>
          <p className="text-value-reference">
            &lsquo; &nbsp;
            {gloss?.text?.textValue ?? "Not found"}
            &nbsp; &rsquo;
          </p>
        </div>
        <div className="font-semibold">Notes</div>
        <div className="mb-4">
          {
            gloss?.notes ?? "Not Found"
          }
        </div>
        <h2 className="text-xl font-bold mb-4">
          Witnesses of this Gloss
        </h2>
        <div className="mb-4">
          <WitnessMap
            locations={getWitnessLocations(fragments)}
          />
        </div>
        <GlossAnalysis
          fragments={fragments}
          loading={witnessFragmentsResult.loading}
        />
        {fragments.length && !witnessFragmentsResult.loading ? (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">All Witnesses</h3>
            <DataTable
              columns={columns}
              data={fragments}
              loading={false}
              filterColumn={filterColumn}
            />
          </div>
        ) : !fragments.length && !witnessFragmentsResult.loading ? (
          "No Fragments Found"
        ) : null}
      </div>
    </div>
  );
};

export default Gloss;
