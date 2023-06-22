import Link from "next/link";

const ManuscriptDetail = ({manuscriptDetails}) => {
    return (
        <div className="py-4 bg-gray-50">
            <h1 className="text-4xl mb-4">Manuscript Details</h1>
            <div className="border-[1.5px] border-black bg-grey/10 mb-4 rounded-md p-2">
                <div className="px-2 flex gap-2">
                    <Link href="/"><p className="text-blue-500 font-semibold hover:underline">Home</p></Link> 
                    &gt; <p className="font-semibold">Manuscript Details</p>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl mb-2">Manuscript Details:</h2>
                <div className="bg-white border rounded-md p-3 shadow-md">
                    {manuscriptDetails.length > 0 && Object.entries(manuscriptDetails[0]).map(([key, value]) => (
                        <div key={key}>
                            <strong>{key}:</strong> {value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManuscriptDetail;