import Layout from '../components/layout';

const Goals = () => (
  <Layout>
    <div className="px-6 py-4">
      <h1 className="text-6xl mb-10 text-center">Our Goals</h1>

      <h2 className="text-4xl mb-5">Comprehensive Gloss Transcriptions</h2>
      <p className="text-xl mb-8">Our primary goal is to provide comprehensive transcriptions of all known glosses to date, providing a valuable resource for researchers and enthusiasts alike.</p>

      <h2 className="text-4xl mb-5">Meta-Gloss Information</h2>
      <p className="text-xl mb-8">In addition to individual gloss transcriptions, we aim to provide insights into the meta-glosses - showing the larger context and interconnectedness of individual glosses.</p>

      <h2 className="text-4xl mb-5">Detailed Manuscript Data</h2>
      <p className="text-xl mb-8">Our resource will contain detailed information about each manuscript utilized in our research, offering a holistic understanding of the materials we've studied.</p>

      <h2 className="text-4xl mb-5">Digital Tool Insights</h2>
      <p className="text-xl mb-8">We aim to educate visitors about the history and application of digital tools used in our project, providing a look into the technological side of our research.</p>
    </div>
  </Layout>
);

export default Goals;
