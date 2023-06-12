import Layout from '../components/Layout';

const About = () => (
	<Layout>
		<div className="px-52 pt-24">
            <h1 className="text-6xl text-center">About Gallery of Glosses</h1>
			<div className="flex flex-col gap-4">
                <p className="text-custom mt-20 font-semibold">
                    Welcome to our project website. 
                </p>
                <p>
                    Here, you will find a vast collection of transcribed glosses, along with their corresponding meta-glosses. For those unfamiliar, glosses 
                    are notes made in the margins or between the lines of a text. They serve as explanations or translations of the text, providing valuable insights into the historical and 
                    linguistic contexts of the time. 
                </p>
                <p>
                We invite you to explore the site, learn more about our work, and delve into the fascinating world of glosses.
                </p>
            </div>
            <div className="flex justify-center">
                <iframe 
                    className="w-[60%] h-[30vw] object-cover border-2 border-black mt-10" 
                    src="https://www.youtube.com/embed/248EDx1u30Q" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                />
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-custom mt-20 font-semibold">
                    More Filler Text. 
                </p>
                <p>
                    Possibly More Text? 
                </p>
                <p>
                We invite you to explore the site, learn more about our work, and delve into the fascinating world of glosses.
                </p>
            </div>
		</div>
	</Layout>
);

export default About;
