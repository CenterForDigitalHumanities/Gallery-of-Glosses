
import Witness from "./Witness.tsx"

export async function generateStaticParams() {
  const manuscripts = await fetch('https://store.rerum.io/v1/id/610ad6f1ffce846a83e70613').then((res) => res.json()).then((j) => j.itemListElement)
  let ids = manuscripts.map((man) => { 
    return {slug:man["@id"].split.pop()}
  })
  return ids
}

const WitnessInstance = async ({ params }: { params: { slug: string }}) => {
  const { slug } = await params
  return <Witness slug={slug}/>
};

export default WitnessInstance;
