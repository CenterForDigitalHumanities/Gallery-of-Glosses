import Layout from '../components/Layout';
import Infographic from '../components/Infographic'

const Terminology = () => (
	<Layout>
		<div className="px-52 pt-24">
            <h1 className="text-6xl text-center">Terminology and Abbreviations</h1>
            <div className="mt-20 bg-lightGrey">
                <h1 className="text-center text-5xl p-4">
                    Terminology
                    <div className="grid grid-cols-4 text-white">
                        <Infographic 
                            Title={"Gloss"} 
                            Desc={`
                                A gloss is an individual version of an explanation or interpretation found in one or more manuscripts. 
                                It provides brief marginal or interlinear annotations explaining the meaning of a word or wording in a text.
                            `}
                            bgColor={"darkGrey"}
                        />
                        <Infographic 
                            Title={"Meta-Gloss"} 
                            Desc={`
                                A meta-gloss represents the abstract idea of a gloss, of which various individual glosses are instances or versions.
                            `}
                            bgColor={"darkGrey"}
                        />
                        <Infographic 
                            Title={"Glossary"} 
                            Desc={`
                                A curated collection of glosses
                            `}
                            bgColor={"darkGrey"}
                        />
                        <Infographic 
                            Title={"title"} 
                            Desc={`
                                Description
                            `}
                            bgColor={"darkGrey"}
                        />
                        <Infographic 
                            Title={"title"} 
                            Desc={`
                                Description
                            `}
                            bgColor={"darkGrey"}
                        />
                    </div>
                </h1>
            </div>
            <div className="pt-2 bg-black text-lightGrey">
                <h1 className="text-center text-5xl p-4">
                    Abbreviations
                    <div className="grid grid-cols-4 text-black">
                        <Infographic 
                                    Title={"Mt"} 
                                    Desc={`
                                        This stands for the Gospel of Matthew, a part of the Bible. It is used as an authoritative text for the context of some glosses.
                                    `}
                                    bgColor={"lightGrey"}
                                />
                        <Infographic 
                                    Title={"[##:##]"} 
                                    Desc={`
                                        A canonical reference system common in theological studies, where the numbers before and after the colon respectively 
                                        represent the chapter and verse of a book from the Bible, e.g., Matthew 5:16 refers to Chapter 5, Verse 16 of the Gospel of Matthew.
                                    `}
                                    bgColor={"lightGrey"}
                        />
                                                <Infographic 
                                    Title={"title"} 
                                    Desc={`
                                        Description
                                    `}
                                    bgColor={"lightGrey"}
                                />
                        <Infographic 
                                    Title={"title"} 
                                    Desc={`
                                        Description
                                    `}
                                    bgColor={"lightGrey"}
                        />
                                                <Infographic 
                                    Title={"title"} 
                                    Desc={`
                                        Description
                                    `}
                                    bgColor={"lightGrey"}
                                />
                        <Infographic 
                                    Title={"title"} 
                                    Desc={`
                                        Description
                                    `}
                                    bgColor={"lightGrey"}
                        />
                    </div>
                </h1>
            </div>
        </div>
	</Layout>
);

export default Terminology;
