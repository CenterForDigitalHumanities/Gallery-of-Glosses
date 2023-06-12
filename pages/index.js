import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <div className= "px-52 pt-24">
        <div className="pt-40 flex items-center justify-center">
            <img className="absolute -z-50 opacity-80 brightness-50" src="images/statues.jpeg" />
            <h1 className="text-6xl text-lightGrey">Gallery of Glosses</h1>
        </div>
        <div className="pt-52">
            <p className="text-sm mb-4">
                The Gallery of Glossess will include all transcribed glosses to date, information on the meta-glosses of which individual glosses are particular examples, information about 
                each manuscript used, information about the history and digital tools of the project, instructions on how to use the existing site, and a guide to how to apply the tools and 
                software to other projects. It will also credit all participants on the project, past and present, including student workers responsible for the transcription of various glosses.
            </p>
        </div>
    </div>
  </Layout>
);

export default Home;
