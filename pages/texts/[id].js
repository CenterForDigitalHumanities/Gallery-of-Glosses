import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/layout';
import { useState, useEffect } from 'react';

const ManuscriptDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`https://store.rerum.io/v1/id/${id}`)
        .then(res => {
          setData(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      {/* render other data as needed */}
    </Layout>
  );
};

export default ManuscriptDetail;
