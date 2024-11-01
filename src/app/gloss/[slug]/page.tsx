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
      const res = await grabProperties(targetId)
      const data = await res.json()
      let constructed = {}
      for(const item of data){
        if(!item?.body) continue
        const key = Object.keys(item.body)[0]
        constructed[key] = item.body[key].value ?? item.body[key]
      }
      return Promise.resolve(constructed)
    }
    catch(err){
      return Promise.reject(err)
    }
  }
  return <GlossProvider glossPromise={promise}><Gloss slug={slug} /></GlossProvider>
}

export default GlossInstance
