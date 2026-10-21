import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Spinner, Alert, Badge } from 'react-bootstrap';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: { userId: 1, _limit: 5 },
      })
      .then(response => setPosts(response.data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="mb-4 shadow-sm border-success">
      <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Bài 2.1: GET – Danh sách bài viết của User 1</h5>
        <Badge bg="light" text="dark">GET /posts?userId=1&_limit=5</Badge>
      </Card.Header>
      <Card.Body>
        {loading && (
          <div className="text-center py-3">
            <Spinner animation="border" variant="success" size="sm" className="me-2" />
            <span>Loading...</span>
          </div>
        )}
        
        {error && <Alert variant="danger" className="mb-0">Error: {error}</Alert>}

        {!loading && !error && (
          <ListGroup variant="flush">
            {posts.map(post => (
              <ListGroup.Item key={post.id} className="d-flex align-items-center py-2 px-0">
                <Badge bg="secondary" className="me-3">#{post.id}</Badge>
                <span className="fw-medium text-dark">{post.title}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostList;