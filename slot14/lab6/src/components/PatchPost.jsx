import { useState } from 'react';
import axios from 'axios';

const PatchPost = () => {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);

  const handlePatch = () => {
    axios
      .patch('https://jsonplaceholder.typicode.com/posts/1', { title })
      .then((response) => {
        setResult({ status: response.status, data: response.data });
      })
      .catch((error) => {
        console.error('Error patching post:', error);
      });
  };

  return (
    <div>
      <h2>PATCH – Sửa tiêu đề bài viết #1</h2>
      <input
        placeholder="Tiêu đề mới"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handlePatch} disabled={!title.trim()}>
        Cập nhật (PATCH)
      </button>

      {result && (
        <div>
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PatchPost;