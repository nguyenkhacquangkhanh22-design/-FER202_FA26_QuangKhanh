import { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: { userId: 1, _limit: 5 },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching post list:', error);
      });
  }, []);

  return (
    <div>
      <h2>GET – Danh sách bài viết của user 1</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            #{post.id} – {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;