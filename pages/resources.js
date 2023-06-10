import Layout from '../components/Layout';

const Resources = () => (
  <Layout>
    <div className="px-52 pt-24">
      <h1 className="text-6xl mb-10 text-center">Resources Used</h1>

      <h2 className="text-custom mb-5">Frontend Technology</h2>
      <ul className="mb-8">
        <li><strong>React.js:</strong> A powerful JavaScript library for building user interfaces.</li>
        <li><strong>Next.js:</strong> A popular React framework with features like static site generation and server-side rendering.</li>
        <li><strong>Tailwind CSS:</strong> A utility-first CSS framework used for styling our website.</li>
        <li><strong>TypeScript:</strong> A statically typed superset of JavaScript that provides optional static typing, classes, and interfaces.</li>
      </ul>

      <h2 className="text-custom mb-5">Backend Technology</h2>
      <ul className="mb-8">
        <li><strong>Node.js:</strong> An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.</li>
      </ul>

      <h2 className="text-custom mb-5">Other Tools and Libraries</h2>
    </div>
  </Layout>
);

export default Resources;
