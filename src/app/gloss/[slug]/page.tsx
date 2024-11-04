import { RERUM } from "@/configs/rerum-links";
import { grabProperties, grabProductionGlosses } from "@/lib/utils";

import { GlossProvider } from "@/contexts/GlossContext"
import Gloss from "./Gloss.tsx"

export async function generateStaticParams() {
  const glosses = await grabProductionGlosses()
  let ids = glosses.itemListElement.map((gloss) => { 
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
