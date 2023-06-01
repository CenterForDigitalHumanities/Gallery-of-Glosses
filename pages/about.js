import Layout from '../components/layout';

const About = () => (
    <Layout>
        <div className="px-6 py-4">
            <h1 className="text-6xl mb-10 text-center">About Our Project</h1>
            <div className="flex justify-center mb-4">
                <div className="relative w-1/2" style={{paddingBottom: "28.125%" }}>
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/248EDx1u30Q"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <p className="text-custom mb-4">Here at Saint Louis University, we immerse ourselves in the rich tapestry of history contained within 12th-century manuscripts, spotlighting the often overlooked 'glosses' or annotations. These marginal notes and doodles provide an intimate glimpse into the minds of medieval scholars. As we digitize and make accessible these treasures, we're bridging the gap between past and present, ensuring that the wisdom and insights they hold continue to inspire and inform future generations.</p>
        </div>
    </Layout>
);

export default About;
