import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import ManuscriptDetail from "@/components/ManuscriptDetail";
import { useEffect, useState } from "react";
import getFromObject from "@/actions/getFromObject";
import getTargets from "@/actions/getTargets";

const ManuscriptDetailPage = ({  }) => {
	const { query: { id } } = useRouter();
    const [manuscriptDetails, setManuscriptDetails] = useState([]);

    // Tracks Loading Progress
    const [isLoading, setIsLoading] = useState(true);

    // New state variable for tracking progress
    const [progress, setProgress] = useState(0);

    // Callback function for handling progress updates
    const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);
    };
    
    // fetches the data 
    useEffect(() => {
		const fetchManuscriptDetails = async () => {
			let details = [];

            // finds all the arrays with the targets with the following value
            const collectionsArray  = await getTargets({ value: `http://devstore.rerum.io/v1/id/${id}` });

            // from all those objects in the array, pull the following information (ie. body.title.value...)
            const processedCollections = getFromObject(collectionsArray, [
                "body.title.value", 
                "body.identifier.value", 
                "body.alternative.value", 
                "body.city.value",
                "body.Repository.value",
                "body.origin.value",
                "body.region.value",
                "body.date.value",
                "body.institution.value",
                "body.provenance.value",
                "body.text.value",
                "body.url.value",
                "body.notes.value"
            ], handleProgressUpdate);
            details = details.concat(processedCollections);
            setIsLoading(false);
			setManuscriptDetails(details);
		};

		fetchManuscriptDetails();
	}, []);

    if (isLoading) {
        return (
            <Layout>
                <div>
                    Loading... {Math.round(progress * 100)}%
                </div>
            </Layout>
        )
    }
    
    return (
        <Layout>
            <div>
                <ManuscriptDetail manuscriptDetails={manuscriptDetails}/>
            </div>
        </Layout>

    );
};

export default ManuscriptDetailPage;
