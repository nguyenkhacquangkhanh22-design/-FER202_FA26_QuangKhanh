// src/pages/ProjectsPage.jsx
import { Container, Row, Col, Card } from 'react-bootstrap';

export const ProjectsPage = () => (
  <Container className="mt-4">
    <h1>Dự án</h1>
    <p>Một số dự án tiêu biểu:</p>
    <Row>
      <Col md={4} className="mb-3">
        <Card>
          <Card.Body>
            <Card.Title>SmartEquip</Card.Title>
            <Card.Text>Hệ thống quản lý cho thuê thiết bị ngang hàng (P2P).</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-3">
        <Card>
          <Card.Body>
            <Card.Title>FPT Lost & Found</Card.Title>
            <Card.Text>Nền tảng trực tuyến hỗ trợ tìm kiếm đồ thất lạc trong khuôn viên trường.</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mb-3">
        <Card>
          <Card.Body>
            <Card.Title>Line-following Robot</Card.Title>
            <Card.Text>Robot tự hành dò line sử dụng thuật toán PID và Arduino.</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);