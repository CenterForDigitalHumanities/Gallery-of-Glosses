import { RERUM, PRODUCTION_WITNESS_COLLECTION } from "@/configs/rerum-links";
import Witness from "./Witness.tsx"

export async function generateStaticParams() {
  const manuscripts = await fetch(PRODUCTION_WITNESS_COLLECTION).then((res) => res.json()).then((j) => j.itemListElement)
  let ids = manuscripts.map((man) => { 
    return {slug:man["@id"].split("/").pop()}
  })
  return ids
}

const WitnessInstance = async ({ params }: { params: { slug: string }}) => {
  const { slug } = await params
  return <Witness slug={slug}/>
};

export default WitnessInstance;
