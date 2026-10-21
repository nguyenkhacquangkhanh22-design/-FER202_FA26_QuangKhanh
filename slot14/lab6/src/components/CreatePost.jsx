import { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: 1,
      })
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setTitle('');
        setBody('');
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <div>
      <h2>POST – Tạo bài viết</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <br />
        <button type="submit">Tạo bài viết</button>
      </form>

      {result && (
        <div>
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreatePost;