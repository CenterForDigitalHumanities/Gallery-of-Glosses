import Layout from '../components/Layout';

const Terminology = () => (
    <Layout>
        <div className="px-52 pt-24">
            <h1 className="text-6xl text-center mb-10">Terminology and Abbreviations</h1>
            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl mb-4 font-semibold">Terminology</h2>
                    {[
                        { title: "Gloss", desc: "A gloss is an individual version of an explanation or interpretation found in one or more manuscripts. It provides brief marginal or interlinear annotations explaining the meaning of a word or wording in a text." },
                        { title: "Meta-Gloss", desc: "A meta-gloss represents the abstract idea of a gloss, of which various individual glosses are instances or versions." },
                        { title: "Glossary", desc: "A curated collection of glosses." },
                        // ...more terms here...
                    ].map((term, index) => (
                        <div key={index} className="border-b border-gray-200 py-4">
                            <h3 className="text-xl mb-2">{term.title}</h3>
                            <p className="text-sm">{term.desc}</p>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="text-2xl mb-4 font-semibold">Abbreviations</h2>
                    {[
                        { title: "Mt", desc: "This stands for the Gospel of Matthew, a part of the Bible. It is used as an authoritative text for the context of some glosses." },
                        { title: "[##:##]", desc: "A canonical reference system common in theological studies, where the numbers before and after the colon respectively represent the chapter and verse of a book from the Bible, e.g., Matthew 5:16 refers to Chapter 5, Verse 16 of the Gospel of Matthew." },
                        // ...more abbreviations here...
                    ].map((abbr, index) => (
                        <div key={index} className="border-b border-gray-200 py-4">
                            <h3 className="text-xl mb-2">{abbr.title}</h3>
                            <p className="text-sm">{abbr.desc}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    </Layout>
);

export default Terminology;
