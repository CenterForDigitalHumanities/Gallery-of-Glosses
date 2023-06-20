import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import ManuscriptDetail from "@/components/ManuscriptDetail";

const ManuscriptDetailPage = ({  }) => {
	const router = useRouter();
    
    return (
        <Layout>
            <div>
                <ManuscriptDetail />
            </div>
        </Layout>

    );
};

export default ManuscriptDetailPage;
