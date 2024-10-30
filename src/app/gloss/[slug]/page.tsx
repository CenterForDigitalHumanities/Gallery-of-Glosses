import { RERUM, PRODUCTION_GLOSS_COLLECTION } from "@/configs/rerum-links";
import { grabProperties } from "@/lib/utils";

import { GlossProvider } from "@/contexts/GlossContext"
import Gloss from "./Gloss.tsx"

export async function generateStaticParams() {
  const glosses = await fetch(PRODUCTION_GLOSS_COLLECTION).then((res) => res.json()).then((j) => j.itemListElement)
  let ids = glosses.map((gloss) => { 
    return {slug:gloss["@id"].split("/").pop()}
  })
  return ids
}

const GlossInstance = async ({ params }: { params: { slug: string }}) => {
  const { slug } = await params
  const promise = expand(slug)

  async function expand(targetId:string) {
    try{
      console.log("fetch for id "+targetId);
      const res = await grabProperties(targetId);
      const data = await res.json();
      console.log("result")
      console.log(data)
      const constructedGloss = data.map((item: { body: any }) => item.body); 
      return Promise.resolve(constructedGloss)
    }
    catch(err){
      return Promise.reject(err)
    }
  }

  console.log("GlossInstace component calling for Gloss component")
  return <GlossProvider glossPromise={promise}><Gloss slug={slug} /></GlossProvider>
}

export default GlossInstance;
