import { RERUM, PRODUCTION_WITNESS_COLLECTION } from "@/configs/rerum-links";
import { grabProperties } from "@/lib/utils";

import { WitnessProvider } from "@/contexts/WitnessContext"
import Witness from "./Witness.tsx"

export async function generateStaticParams() {
  const witnesses = await fetch(PRODUCTION_WITNESS_COLLECTION).then((res) => res.json()).then((j) => j.itemListElement)
  let ids = witnesses.map((witness) => { 
    return {slug:witness["@id"].split("/").pop()}
  })
  return ids
}

const WitnessInstance = async ({ params }: { params: { slug: string }}) => {
  const { slug } = await params
  const promise = expand(slug)

  async function expand(targetId:string) {
    try{
      console.log("expand for id "+targetId)
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
  return <WitnessProvider witnessPromise={promise}><Witness slug={slug} /></WitnessProvider>
}

export default WitnessInstance
