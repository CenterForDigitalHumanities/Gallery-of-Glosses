import Layout from '../components/layout';

const Home = () => (
  <Layout>
    <div className="">
      <h1 className="text-6xl mb-10 text-center">Welcome to the Gallery of Glosses</h1>
      <p className="text-custom mb-4">
        Welcome to our project website. Here, you will find a vast collection of transcribed glosses, along with their corresponding meta-glosses. 
        Our database includes glosses from a variety of manuscripts, each meticulously transcribed and documented. For those unfamiliar, glosses are notes made in the 
        margins or between the lines of a text. They serve as explanations or translations of the text, providing valuable insights into the historical and linguistic 
        contexts of the time. This project owes its existence to a dedicated team of scholars, researchers, and student workers, who have put countless hours into the 
        transcription and documentation of these glosses. We invite you to explore the site, learn more about our work, and delve into the fascinating world of glosses.
      </p>
    </div>
  </Layout>
);

export default Home;
