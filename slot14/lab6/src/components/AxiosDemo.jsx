import { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosDemo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Axios Demo</h1>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
};

export default AxiosDemo;