
import Witness from "./Witness.tsx"

// FIXME we really need to do the 'type' annotations here so these aren't seen as 'any'
// FIXME this isn't working.  We get ' Page "/witness/[slug]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.'
// We get that error because this script couldn't actually generate the dynamic pages.  man is undefined, bad map()?
export async function generateStaticParams() {
  const manuscripts = await fetch('https://store.rerum.io/v1/id/610ad6f1ffce846a83e70613').then((res) => res.json()).then((j) => j.itemListElement)
  return manuscripts.map((man) => {
    id:man["@id"]
  })
}

const WitnessInstance = async ({ params }: { params: { id: string }}) => {
  const id = await params
  return <Witness slug={params.id}/>
};

export default WitnessInstance;
