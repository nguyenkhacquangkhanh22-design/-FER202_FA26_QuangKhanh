import React, { useState } from 'react';
import { Button, Carousel, Container, Form, Nav, Navbar } from 'react-bootstrap';

function App() {
  const [index, setIndex] = useState(0);

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
      <Carousel activeIndex={index} onSelect={setIndex} id="home">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/pizza1.jpg"
            alt="First slide"
            style={{ height: '450px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="text-start">
            <h3>Neapolitan Pizza</h3>
            <p>If you're looking for a traditional Italian pizza, Neapolitan is the way to go!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/pizza2.jpg"
            alt="Second slide"
            style={{ height: '450px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="text-start">
            <h3>Delicious Pizza</h3>
            <p>Fresh ingredients, baked to perfection for maximum taste.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/pizza3.jpg"
            alt="Third slide"
            style={{ height: '450px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="text-start">
            <h3>Cheese Lovers</h3>
            <p>Loaded with rich, melted mozzarella cheese and special sauce.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </main>
  );
}

export default App;