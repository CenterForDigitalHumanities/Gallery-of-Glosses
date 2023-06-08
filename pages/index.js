import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <div className="px-52">
			<h1 className="text-6xl text-center">Welcome to the Gallery of Glosses</h1>
			<img className="mx-auto py-10" src="https://github.com/CenterForDigitalHumanities/Gallery-of-Glosses/assets/1119165/6d319634-fe8f-43a2-be02-809fc45af1df" />
			<p className="text-custom mb-4">
			This website will include all transcribed glosses to date, information on the meta-glosses of which individual glosses are particular examples, information about each manuscript used, 
			information about the history and digital tools of the project, instructions on how to use the existing site, and a guide to how to apply the tools and software to other projects. 
			It will also credit all participants on the project, past and present, including student workers responsible for the transcription of various glosses.
			</p>
    </div>
  </Layout>
);

export default Home;
