
import Gloss from "./Gloss.tsx"

// FIXME we really need to do the 'type' annotations here so these aren't seen as 'any'
// FIXME this isn't working.  We get ' Page "/witness/[slug]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.'
// We get that error because this script couldn't actually generate the dynamic pages.  gloss is undefined, bad map()?
export async function generateStaticParams() {
  const glosses = await fetch('https://store.rerum.io/v1/id/610c54deffce846a83e70625').then((res) => res.json()).then((j) => j.itemListElement)
  let ids = glosses.map((gloss) => { 
    return {id:gloss["@id"]}
  })
  return ids
}

const GlossInstance = async ({ params }: { params: { id: string }}) => {
  const id = await params
  return <Gloss slug={params.id}/>
}

export default GlossInstance;
