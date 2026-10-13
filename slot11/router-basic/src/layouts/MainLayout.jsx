// src/layouts/MainLayout.jsx
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { Outlet, NavLink, Link } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <NavbarBrand as={Link} to="/">Thư viện FPT</NavbarBrand>
          <Navbar.Toggle aria-controls="lib-navbar" />
          <Navbar.Collapse id="lib-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>Trang chủ</Nav.Link>
              <Nav.Link as={NavLink} to="/books">Sách</Nav.Link>
              <Nav.Link as={NavLink} to="/help">Hướng dẫn</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container as="main" className="my-4 flex-grow-1">
        <Outlet />
      </Container>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">© 2026 Thư viện FPT University. All rights reserved.</p>
      </footer>
    </div>
  );
};