import Layout from '../components/layout';

const About = () => (
	<Layout>
		<div className="px-52 py-4">
			<h1 className="text-6xl mb-10 text-center">About Our Project</h1>
			<div className="flex justify-center mb-4">
				<div className="relative w-1/2" style={{paddingBottom: "28.125%" }}>
					<iframe
						className="absolute inset-0 w-full h-full"
						src=""
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>
			</div>
			<p className="text-custom mb-4">
				Welcome to our project website. Here, you will find a vast collection of transcribed glosses, along with their corresponding meta-glosses. For those unfamiliar, glosses 
				are notes made in the margins or between the lines of a text. They serve as explanations or translations of the text, providing valuable insights into the historical and 
				linguistic contexts of the time. This project owes its existence to a dedicated team of scholars, researchers, and student workers, who have put countless hours into the 
				transcription and documentation of these glosses. We invite you to explore the site, learn more about our work, and delve into the fascinating world of glosses.
			</p>
		</div>
	</Layout>
);

export default About;
