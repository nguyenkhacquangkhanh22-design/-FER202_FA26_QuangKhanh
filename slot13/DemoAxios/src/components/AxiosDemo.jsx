import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spinner, Alert, Badge } from 'react-bootstrap';

const AxiosDemo = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <Card className="mb-4 shadow-sm border-primary">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Phần 1: Axios Demo – GET 1 bài viết</h5>
        <Badge bg="light" text="dark">GET /posts/1</Badge>
      </Card.Header>
      <Card.Body>
        {error ? (
          <Alert variant="danger" className="mb-0">Error: {error}</Alert>
        ) : data ? (
          <div>
            <Card.Title className="text-primary fw-bold text-capitalize mb-2">
              #{data.id} - {data.title}
            </Card.Title>
            <Card.Text className="text-secondary mb-0">
              {data.body}
            </Card.Text>
          </div>
        ) : (
          <div className="text-center py-3">
            <Spinner animation="border" variant="primary" size="sm" className="me-2" />
            <span>Loading...</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AxiosDemo;