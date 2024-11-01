import { RERUM, PRODUCTION_MANUSCRIPT_COLLECTION } from "@/configs/rerum-links";
import { grabProperties } from "@/lib/utils";

import { ManuscriptProvider } from "@/contexts/ManuscriptContext"
import Manuscript from "./Manuscript.tsx"

export async function generateStaticParams() {
  const manuscripts = await fetch(PRODUCTION_MANUSCRIPT_COLLECTION).then((res) => res.json()).then((j) => j.itemListElement)
  let ids = manuscripts.map((manuscript) => { 
    return {slug:manuscript["@id"].split("/").pop()}
  })
  return ids
}

const ManuscriptInstance = async ({ params }: { params: { slug: string }}) => {
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
  return <ManuscriptProvider manuscriptPromise={promise}><Manuscript slug={slug} /></ManuscriptProvider>
}

export default ManuscriptInstance
