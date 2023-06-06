import Layout from '../../components/layout';

const PageDetail = ({ data }) => {
  // data was fetched at the time of page request and injected as a prop
  return (
    <Layout>
      <h1>{data['@type']}</h1>
      <p>{data.label}</p>
      {/* render other data as needed */}
    </Layout>
  );
};

export default PageDetail;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://store.rerum.io/v1/id/${id}`);
  const data = await res.json();

  // The data is returned as a prop to your component
  return {
    props: {
      data,
    },
  };
}
