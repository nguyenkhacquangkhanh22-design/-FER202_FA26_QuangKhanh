// src/layouts/HelpLayout.jsx
import { Container, Nav } from 'react-bootstrap';
import { Outlet, NavLink } from 'react-router-dom';

export const HelpLayout = () => {
  return (
    <Container>
      <h2>Trang hướng dẫn sử dụng thư viện</h2>
      <p className="text-muted">Vui lòng chọn thông tin bạn cần tìm hiểu bên dưới:</p>
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link as={NavLink} to="faq">Câu hỏi thường gặp</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="rules">Nội quy</Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </Container>
  );
};