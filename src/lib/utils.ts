import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import {
  PRODUCTION_GLOSS_COLLECTION,
  TINY,
  RERUM,
  PRODUCTION_MANUSCRIPT_COLLECTION,
  GENERATOR
} from "@/configs/rerum-links";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ObjectData {
  "@id": string;
  [key: string]: any;
}

/**
 * Converts a RERUM ID to be used in a query for "target" and related fields.
 * @param targetId The RERUM ID to convert
 * @returns Object with queries for "target", "target.@id", and "target.id" for http and https versions of passed ID
 */
export function getQueryFromId(targetId: string) {
  let queryObj: { [key: string]: any } = {};
  let targetConditions: { [key: string]: string }[] = [];

  if (targetId.startsWith("http")) {
    const httpVersion = targetId.replace(/^https?/, "http");
    const httpsVersion = targetId.replace(/^https?/, "https");

    ["target", "target.@id", "target.id"].forEach((targetKey) => {
      targetConditions.push({ [targetKey]: httpVersion });
      targetConditions.push({ [targetKey]: httpsVersion });
    });

    queryObj = {
      $or: targetConditions,
      "__rerum.history.next": { $exists: true, $size: 0 },
      "__rerum.generatedBy": GENERATOR
    };
  } else {
    queryObj["target"] = targetId;
  }
  return queryObj;
}

/**
 * Makes a paged query and returns the response
 * @param url Base URL to send request to
 * @param data JSON object to send
 * @param limit Number of objects to get out of query
 * @param skip Number of objects to skip in query
 */
export async function makePagedQuery(
  url: string,
  data: Object,
  limit: number = 100,
  skip: number = 0,
): Promise<Response> {
  try {
    let objects: ObjectData[] = [];

    while (true) {
      const response = await axios.post(
        `${url}?limit=${limit}&skip=${skip}`,
        data,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      );

      objects = [...objects, ...response.data];

      if (!response.data.length || response.data.length < limit) {
        break;
      } else {
        skip += limit;
      }
    }

    return new Response(JSON.stringify(objects), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      "Could not retrieve objects at this time. Please try later",
      {
        status: 500,
      },
    );
  }
}

/**
 * Fetches properties for the target ID, such as Gloss properties or Witness fragment annotations.
 * @param targetId ID of the object to fetch properties for
 */
export async function grabProperties(targetId: string): Promise<Response> {
  try {
    const id = targetId.includes("store.rerum.io") ? targetId : RERUM + targetId
    let queryObj = getQueryFromId(id);
    return await makePagedQuery(`${TINY}/query`, queryObj);
  } catch (error) {
    console.error("Error querying objects:", error);
    return new Response(
      "Could not retrieve objects at this time. Please try later",
      {
        status: 500,
      },
    );
  }
}

// created a temporary any because don't think necessary to create an interface for temporary array of gloss properties
export function processGloss(gloss: any, targetId: string): ProcessedGloss {
  let processedGloss: ProcessedGloss = {
    targetId: "",
    title: "",
    targetCollection: "GoG-Named-Glosses",
    section: "",
    subsection: "",
    tags: [],
    textFormat: undefined,
    textLanguage: undefined,
    textValue: undefined,
    creator: undefined,
    document: undefined,
    themes: undefined,
    canonicalReference: undefined,
    description: undefined,
    targetedText: undefined,
  };
  if(!gloss || !targetId) return processedGloss;
  processedGloss.targetId = targetId;
  for (const prop in gloss){
    if(prop === "text") {
      processedGloss.textValue = gloss.text?.textValue;
      processedGloss.textLanguage = gloss.text?.language;
      processedGloss.textFormat = gloss.text?.format;
    } 
    else if (prop === "tags"){
      processedGloss.tags = gloss.tags.items ?? []
    }
    else{
      processedGloss[prop] = gloss[prop]
    }
  }
  return processedGloss;
}

/**
 * Processes properties for a Manuscript
 * @param witness Manuscript to process
 * @param targetId ID of the Manuscript
 */
export function processManuscript(manuscript: any, targetId: string): ProcessedManuscript {
  let processedManuscript: ProcessedManuscript = {
    targetId: undefined,
    targetCollection: "GoG-Manuscripts",
    provenance: undefined,
    url: undefined,
    identifier: undefined,
    city: undefined,
    alternative: undefined,
    repository: undefined,
    title: undefined,
    institution: undefined,
    baseProject: undefined,
    region: undefined,
  };
  if(!manuscript || !targetId) return processedManuscript;
  processedManuscript.targetId = targetId;
  for (const prop in manuscript){
    // May have to account for values that are not flat strings.  I think all the ones above are flat strings.
    processedManuscript[prop] = manuscript[prop]
  }
  return processedManuscript;
}

/**
 * Processes properties for a Manuscript
 * @param witness Manuscript to process
 * @param targetId ID of the Manuscript
 */
export function processWitnessFragment(fragment: any, targetId: string): ProcessedFragment {
  let processedFragment: ProcessedFragment = {
    targetId: "",
    targetCollection: "GoG-Witness-Fragments",
    identifier: "",
    glossLocation: "",
    glossFormat: "",
    folio: "",
    tags: [],
    textFormat: "",
    textLanguage: "",
    textValue: "",
    creator: "",
    notes: "",
    partOf: "",
    source: "",
    references: [],
    selections: []
  }
  
  if(!fragment || !targetId) return processedFragment;
  processedFragment.targetId = targetId;

  for (const prop in fragment){

    if(prop === "text") {
      processedFragment.textValue = fragment.text?.textValue;
      processedFragment.textLanguage = fragment.text?.language;
      processedFragment.textFormat = fragment.text?.format;
    } 
    else if (prop === "tags"){
      processedFragment.tags = fragment.tags.items ?? []
    }
    else{
      processedFragment[prop] = fragment[prop]
    }
  }
  return processedFragment;
}

export async function grabProductionManuscriptFragments() {
  try {
    let fragmentsQueryObj = 
    {
      "@type": "WitnessFragment",
      "__rerum.history.next": {$exists:true, $size: 0},
      "__rerum.generatedBy": GENERATOR
    }
    return await makePagedQuery(`${TINY}/query`, fragmentsQueryObj).then(resp => resp.json())
  } catch (error) {
    console.error("Error fetching data:", error)
    return null
  }
}

export async function grabProductionGlosses() {
  try {
    const response = await axios.get(PRODUCTION_GLOSS_COLLECTION);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function grabProductionManuscripts() {
  try {
    const response = await axios.get(PRODUCTION_MANUSCRIPT_COLLECTION);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

/**
 * Determines which Manuscripts contain (reference) a particular Gloss
 * @param glossId
 * @returns An Array that represents a Set of Manuscript URIs
 */
export async function grabManuscriptsContainingGloss(glossId: string) {
  // Fetch annotations referencing the Gloss
  try {
    let fragmentUriSet = await makePagedQuery(`${TINY}/query`, {
      "body.references.value": glossId,
      "__rerum.history.next": {
        $exists: true,
        $size: 0,
      },
      "__rerum.generatedBy": GENERATOR
    })
    .then(resp => resp.json())
    .then(async (annos) => {
        const fragments = annos.map(async (anno) => {
            const entity = await axios.get(anno.target).then(resp => resp.data)
            if (entity["@type"] && entity["@type"] === "WitnessFragment") {
                return anno.target
            }
            // This will end up in the Set
            return "!"
        })
        const fragmentsOnly = await Promise.all(fragments).catch(err => { throw err })
        return new Set(fragmentsOnly)
    })
    .catch(err => {
        console.error(err)
        throw err
    })
    // Remove the undefined entry if present
    fragmentUriSet.delete("!")
    if (fragmentUriSet.size === 0) {
        console.log(`There are no Manuscript Witnesses that reference the Gloss '${glossId}'`)
        return new Array<string>()
    }

    // There are many fragments that reference this Gloss.  Those fragments are all a part of different Manuscript Witnesses.
    // Put all of thise different Manuscript Witnesses into a Set to return.
    let allManuscriptWitnesses = new Set<string>()
    for await (const fragmentURI of [...fragmentUriSet.values()]) {
      //each fragment has partOf Annotations letting you know the Manuscripts it is a part of.
      const partOfAnnosQuery = {
          "body.partOf.value": { "$exists": true },
          "target": fragmentURI,
          "__rerum.history.next": {
            $exists: true,
            $size: 0,
          },
          "__rerum.generatedBy": GENERATOR
      }

      let manuscriptUriSet = await makePagedQuery(`${TINY}/query`, partOfAnnosQuery)
      .then(response => response.json())
      .then(async (annos) => {
          const manuscripts = annos.map(async (anno) => {
              const entity = await fetch(anno.body.partOf.value).then(resp => resp.json()).catch(err => { throw err })
              if (entity["@type"] && entity["@type"] === "ManuscriptWitness") {
                  return anno.body.partOf.value
              }
              // This will end up in the Set
              return "!"
          })
          const manuscriptWitnessesOnly = await Promise.all(manuscripts).catch(err => { throw err })
          return new Set<string>(manuscriptWitnessesOnly)
      })
      .catch(err => {
          console.error(err)
          throw err
      })
      manuscriptUriSet.delete("!")
      if (manuscriptUriSet.size === 0) {
          console.error(`There is no Manuscript Witness for fragment '${fragmentURI}'`)
          continue
      }
      else if (manuscriptUriSet.size > 1) {
          console.error("There are many Manuscript Witnesses when we only expect one.")
          continue
      }
      allManuscriptWitnesses = new Set<string>([...allManuscriptWitnesses, ...manuscriptUriSet])
    }
    let witnesses: string[] = Array.from(allManuscriptWitnesses.values())
    return witnesses
  } 
  catch (error) {
    console.error("Error fetching data:", error);
    throw error
  }
}

/**
 * Determines which Witness Fragments reference a particular Gloss
 * @param glossId
 * @returns An array that represents a Set of Witness Fragment URIs
 */
export async function grabWitnessFragmentsReferencingGloss(glossId: string) {
  // Fetch annotations referencing the Gloss
  try {
    const obj = {
      "body.references.value": glossId,
      "__rerum.history.next": {
        $exists: true,
        $size: 0
      },
      "__rerum.generatedBy": GENERATOR
    }
    let fragmentUriSet = await makePagedQuery(`${TINY}/query`, obj)
    .then(resp => resp.json())
    .then(async (annos) => {
        const fragments = annos.map(async (anno) => {
            const entity = await axios.get(anno.target).then(resp => resp.data)
            if (entity["@type"] && entity["@type"] === "WitnessFragment") {
                return anno.target
            }
            // This will end up in the Set
            return "!"
        })
        const fragmentsOnly = await Promise.all(fragments).catch(err => { throw err })
        return new Set(fragmentsOnly)
    })
    .catch(err => {
        console.error(err)
        throw err
    })
    // Remove the undefined entry if present
    fragmentUriSet.delete("!")
    if (fragmentUriSet.size === 0) {
        console.log(`There are no Manuscript Witnesses that reference the Gloss '${glossId}'`)
        return new Array<string>()
    }
    const fragments: string[] = Array.from(fragmentUriSet.values())
    return fragments
  } 
  catch (error) {
    console.error("Error fetching data:", error);
    throw error
  }
}

/**
 * Determines which Glosses appear in a particular Manuscript
 * @param manuscriptId
 */
export async function grabGlossesFromManuscript(manuscriptId: string){
  try {
    console.log("SPECIAL GLOSSES PIPE")
    let resp = await axios.post(`${TINY}/glosses`,
        {"ManuscriptWitness": manuscriptId},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      )
    let allGlosses = new Set(resp.data.map(f => f["@id"]))
    let glosses: string[] = Array.from(allGlosses.values())
    console.log("SPECIAL GLOSSES LENGTH "+glosses.length)
    return glosses
  } 
  catch (error) {
    console.error("Error fetching data:", error);
    throw error
  }
}

/**
 * Determines which Glosses appear in a particular Manuscript
 * @param manuscriptId
 */
export async function grabWitnessFragmentsFromManuscript(manuscriptId: string){
  try {
    console.log("SPECIAL FRAGMENTS")
    let resp = await axios.post(`${TINY}/fragments`,
        {"ManuscriptWitness": manuscriptId},
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      )
    let allFragments = new Set(resp.data.map(f => f["@id"]))
    let fragments: string[] = Array.from(allFragments.values())
    console.log("SPECIAL FRAGMENTS LENGTH "+fragments.length)
    return fragments
  } 
  catch (error) {
    console.error("Error fetching data:", error);
    throw error
  }
}


/**
 * Filters an array of RERUM objects such that the data referenced at their targets is filtered by the passed function.
 * @param data Data to be filtered
 * @param filterFunction Function to pass into filter method of the array of objects returned at the targets of the passed data
 */
export async function filterDataAtTargets(data: any[], filterFunction: any) {
  let targets = await Promise.all(
    data.map(async (annotation: TranscriptionAnnotation) => {
      const witnessFragmentResponse = await axios.get(annotation.target);
      return witnessFragmentResponse.data;
    }),
  );
  return targets.filter(filterFunction);
}
