import { RERUM } from "@/configs/rerum-links";
import { grabProperties, grabProductionManuscriptFragments } from "@/lib/utils";

import { FragmentProvider } from "@/contexts/FragmentContext"
import ManuscriptFragment from "./Fragment.tsx"

export async function generateStaticParams() {
  const fragments = await grabProductionManuscriptFragments()
  let ids = fragments.map((fragment) => { 
    return {slug:fragment["@id"].split("/").pop()}
  })
  return ids
}

type Params = Promise<{ slug: string }>

const FragmentInstance = async ({ params }: { params: Params }) => {
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
  return <FragmentProvider fragmentPromise={promise}><ManuscriptFragment slug={slug} /></FragmentProvider>
}

export default FragmentInstance
