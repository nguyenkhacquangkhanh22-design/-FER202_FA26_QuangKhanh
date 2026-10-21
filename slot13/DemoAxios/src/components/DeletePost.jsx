import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API, { params: { _limit: 5 } })
      .then((response) => setPosts(response.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;

    axios
      .delete(`${API}/${id}`)
      .then((response) => {
        setPosts(posts.filter((p) => p.id !== id));
        setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
      })
      .catch((err) => setError(err.message));
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>DELETE – Xóa bài viết</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '8px' }}>
            #{post.id} – {post.title}{' '}
            <button onClick={() => handleDelete(post.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePost;