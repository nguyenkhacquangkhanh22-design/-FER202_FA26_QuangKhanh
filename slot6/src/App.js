import React, { useState } from 'react';
import { Navbar, Nav, Container, Carousel, Card, Button, Row, Col, Form, Badge } from 'react-bootstrap';

function App() {
  // Quản lý trạng thái Carousel Controlled
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Danh sách các món Pizza chuẩn theo giao diện mẫu
  const pizzaMenu = [
    {
      id: 1,
      name: 'Margherita Pizza',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac fringilla.',
      badge: 'SALE',
      badgeBg: 'warning',
      img: '/menu1.jpg'
    },
    {
      id: 2,
      name: 'Mushroom Pizza',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac fringilla.',
      badge: '',
      badgeBg: '',
      img: '/menu2.jpg'
    },
    {
      id: 3,
      name: 'Hawaiian Pizza',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac fringilla.',
      badge: 'NEW',
      badgeBg: 'warning',
      img: '/menu3.jpg'
    },
    {
      id: 4,
      name: 'Pesto Pizza',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac fringilla.',
      badge: 'SALE',
      badgeBg: 'warning',
      img: '/menu4.jpg'
    }
  ];

  return (
    <div className="bg-dark text-white min-vh-100">
      {/* 1. NAVBAR */}
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

      {/* 2. CONTROLLED CAROUSEL */}
      <Carousel activeIndex={index} onSelect={handleSelect} id="home">
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

      {/* 3. OUR MENU SECTION */}
      <Container className="my-5" id="menu">
        <h2 className="text-center mb-4 fw-bold">Our Menu</h2>
        <Row>
          {pizzaMenu.map((item) => (
            <Col key={item.id} lg={3} md={6} sm={12} className="mb-4">
              <Card className="h-100 bg-white text-dark position-relative border-0 rounded-0">
                {/* Hiển thị Badge SALE / NEW nếu có */}
                {item.badge && (
                  <Badge 
                    bg={item.badgeBg} 
                    className="position-absolute top-0 start-0 m-2 text-dark font-weight-bold px-2 py-1 rounded-0"
                    style={{ zIndex: 1 }}
                  >
                    {item.badge}
                  </Badge>
                )}
                
                <Card.Img 
                  variant="top" 
                  src={item.img} 
                  style={{ height: '180px', objectFit: 'cover' }} 
                  className="rounded-0"
                />
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{item.name}</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    {item.desc}
                  </Card.Text>
                  <Button variant="dark" className="w-100 rounded-0 mt-3">
                    Buy
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 4. BOOK YOUR TABLE FORM SECTION */}
      <Container className="my-5" id="contact">
        <h2 className="text-center mb-4 fw-bold">Book Your Table</h2>
        <Row className="justify-content-center">
          <Col md={10}>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} md={4} className="mb-3 mb-md-0">
                  <Form.Control 
                    type="text" 
                    placeholder="Your Name *" 
                    className="bg-white rounded-0"
                  />
                </Form.Group>
                <Form.Group as={Col} md={4} className="mb-3 mb-md-0">
                  <Form.Control 
                    type="email" 
                    placeholder="Your Email *" 
                    className="bg-white rounded-0"
                  />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                  <Form.Select className="bg-white rounded-0">
                    <option>Select a Service *</option>
                    <option>Dine In</option>
                    <option>Take Away</option>
                    <option>Delivery</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Control 
                  as="textarea" 
                  rows={5} 
                  placeholder="Please write your comment" 
                  className="bg-white rounded-0"
                />
              </Form.Group>

              <Button variant="warning" type="submit" className="text-dark fw-bold px-4 py-2 rounded-0">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;