import { useState } from 'react'
import { Container, Form, Card } from 'react-bootstrap'

export default function Exercise2() {
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <Container className="mt-5 p-4 rounded bg-dark text-white" style={{ maxWidth: '450px' }}>
      <h3 className="mb-3 text-center">Exercise 2: Controlled Input</h3>
      
      <Form.Group className="mb-3" controlId="inputField">
        <Form.Label>Nhập văn bản:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Gõ nội dung vào đây..."
          value={text}
          onChange={handleChange}
        />
      </Form.Group>

      <Card className="bg-secondary text-white mt-3">
        <Card.Body>
          <Card.Title className="fs-6 text-warning">Real-time Output:</Card.Title>
          <Card.Text className="fs-5 fw-bold">
            {text || <span className="text-light opacity-50">(Chưa có nội dung)</span>}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}