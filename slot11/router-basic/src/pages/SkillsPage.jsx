// src/pages/SkillsPage.jsx
import { Container, ListGroup } from 'react-bootstrap';

export const SkillsPage = () => (
  <Container className="mt-4">
    <h1>Kỹ năng</h1>
    <p>Các công nghệ và kỹ năng phát triển phần mềm:</p>
    <ListGroup className="w-50">
      <ListGroup.Item>ReactJS & Vite</ListGroup.Item>
      <ListGroup.Item>JavaScript (ES6+)</ListGroup.Item>
      <ListGroup.Item>Java & Spring Boot</ListGroup.Item>
      <ListGroup.Item>SQL Server & Database Design</ListGroup.Item>
    </ListGroup>
  </Container>
);