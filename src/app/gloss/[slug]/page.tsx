
import Gloss from "./Gloss.tsx"

export async function generateStaticParams() {
  const glosses = await fetch('https://store.rerum.io/v1/id/610c54deffce846a83e70625').then((res) => res.json()).then((j) => j.itemListElement)
  let ids = glosses.map((gloss) => { 
    return {slug:gloss["@id"].split("/").pop()}
  })
  return ids
}

const GlossInstance = async ({ params }: { params: { slug: string }}) => {
  const { slug } = await params
  return <Gloss slug={slug}/>
}

export default GlossInstance;
