import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(API, { params: { _limit: 5 } })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts for delete demo:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;
    axios
      .delete(`${API}/${id}`)
      .then((response) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      <h2>DELETE – Xóa bài viết</h2>
      {message && <p>{message}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            #{post.id} – {post.title}{' '}
            <button onClick={() => handleDelete(post.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePost;