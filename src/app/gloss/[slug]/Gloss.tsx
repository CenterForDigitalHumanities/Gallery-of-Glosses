"use client";

import { RERUM } from "@/configs/rerum-links";
import * as NAV from "@/configs/navigation";
//import { useGlossInstance } from "@/hooks/useGlossInstance";
//import { useGlossWitnesses } from "@/hooks/useGlossWitnesses";
import { usePathname } from "next/navigation";
import { make_columns } from "@/app/browse/Columns";
import { DataTable } from "@/app/browse/DataTable";

import {
  grabGlossWitnessFragments,
  grabProperties,
  grabWitnessFromFragment,
  processTranscriptionAnnotations,
  processWitness,
} from "@/lib/utils";

const filterColumn = {
  header: "Witness",
  accessorKey: "identifier",
  expandable: false,
};
const columns = make_columns([
  filterColumn,
  {
    header: "Witness Details (under construction)",
    accessorKey: "city",
    expandable: false,
  },
]);




async function fetchGlossAndProcessProperties() {
  console.log("fetch for id "+targetId);
  const res = await grabProperties(targetId);
  const data = await res.json();
  console.log("result")
  console.log(data)
  const gloss = data.map((item: { body: any }) => item.body);
  setGloss(processGloss(gloss, targetId));
}

async function fetchTranscriptionWitnessAndProcessProperties(
    witnessFragment: ProcessedTranscriptionAnnotations,
  ) {
    console.log("fetchTranscriptionWitnessAndProcessProperties")
    if (!witnessFragment.identifier) return;
    const fetchedWitness = await grabWitnessFromFragment(
      witnessFragment.identifier,
    );
    if (fetchedWitness) {
      const res = await grabProperties(fetchedWitness["@id"]);
      const data = await res.json();

      const witnessProperties = data.map((item: { body: any }) => item.body);
      const processedWitness = processWitness(
        witnessProperties,
        fetchedWitness["@id"],
      );
      setWitnesses((prevWitnesses) => [...prevWitnesses, processedWitness]);
    }
  }

async function fetchGlossWitnessesAndProcessProperties() {
  console.log("fetchGlossWitnessesAndProcessProperties")
  const witnessFragmentList = await grabGlossWitnessFragments(targetId);

  if (witnessFragmentList && witnessFragmentList.length > 1) {
    for (let item of witnessFragmentList) {
      const fragmentTargetId = item["@id"];
      const res = await grabProperties(fragmentTargetId);
      const data = await res.json();

      const annotations = data.map((item: { body: any }) => item.body);
      const processedTranscriptionAnnotations =
        processTranscriptionAnnotations(annotations, fragmentTargetId);

      fetchTranscriptionWitnessAndProcessProperties(
        processedTranscriptionAnnotations,
      );
    }
  }

  setLoading(false);
}

const Gloss = (props : {  slug: string } ) => {
  console.log("Gloss Component - Props")
  console.log(props)

  const pathname = usePathname();
  const targetId = props.slug
  const gloss = fetchGlossAndProcessProperties(targetId);
  const witnessesResult = useGlossWitnesses(targetId);
  let witnesses = witnessesResult.witnesses;

  const blurredStyles = "filter blur-md opacity-50";

  console.log("Gloss")
  console.log(gloss)

  console.log("Witnesses Result")
  console.log(witnessesResult)

  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1 className={`text-2xl font-bold mb-4 ${!gloss && blurredStyles}`}>
          {gloss && gloss.title ? gloss.title : "Not found"}
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <p>
            <span className="font-semibold">Canonical Reference Locator:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss && gloss.canonicalReference
                ? gloss.canonicalReference
                : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Language:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss && gloss.textLanguage ? gloss.textLanguage : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss && gloss.description ? gloss.description : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss && gloss.tags
                ? gloss.tags.map((tag, tagIndex, tagArray) => (
                    <a
                      key={tagIndex}
                      href={`${NAV.BASEPATH}/browse/tag?q=${tag}`}
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
            <span className="font-semibold">Themes:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss && gloss.themes
                ? gloss.themes
                    .join("")
                    .split(", ")
                    .map(
                      (theme, themeIndex, themeArray) =>
                        theme +
                        (themeIndex < themeArray.length - 1 ? ", " : ""),
                    )
                : "Not found"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Target Text:</span>{" "}
            <span className={`${!gloss && blurredStyles}`}>
              {gloss ? gloss.targetedText : "Not found"}
            </span>
          </p>
        </div>
        <div className="rounded-xl shadow-inner">
          <p className={`text-justify ${!gloss && blurredStyles}`}>
            {gloss && gloss.textValue ? gloss.textValue : "Not found"}
          </p>
        </div>
        <h2 className={`text-xl font-bold mb-4 ${!witnesses && blurredStyles}`}>
          Witness References
        </h2>
        <DataTable
          columns={columns}
          data={witnesses}
          loading={witnessesResult.loading}
          filterColumn={filterColumn}
        />
      </div>
    </div>
  );
};

export default Gloss;
