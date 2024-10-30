import { RERUM, PRODUCTION_GLOSS_COLLECTION } from "@/configs/rerum-links";
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
  console.log("GlossInstace component calling for Gloss component")
  return <Gloss slug={slug}/>
}

export default GlossInstance;
