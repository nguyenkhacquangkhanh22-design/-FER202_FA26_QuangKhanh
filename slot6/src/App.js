import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

function App() {
  return (
    <main className="bg-dark text-white min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Container fluid>
          <Navbar.Brand href="#home" className="fw-bold fs-4 text-white">Pizza House</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className="active">Home</Nav.Link>
              <Nav.Link href="#about">About Us</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="danger">
                <i className="bi bi-search"></i> 🔍
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </main>
  );
}

export default App;