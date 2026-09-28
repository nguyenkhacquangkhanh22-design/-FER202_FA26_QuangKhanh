import { useState } from 'react'
import { Container, Button, Card } from 'react-bootstrap'

export default function Exercise3() {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <Container className="mt-5 p-4 rounded bg-dark text-white text-center" style={{ maxWidth: '450px' }}>
      <h3 className="mb-4">Exercise 3: Toggle Visibility</h3>

      <Button 
        variant={isVisible ? "danger" : "primary"} 
        onClick={handleToggle}
        className="mb-3"
      >
        {isVisible ? 'Hide' : 'Show'}
      </Button>

      {isVisible && (
        <Card className="bg-secondary text-white border-0 mt-2">
          <Card.Body>
            <Card.Text className="fs-5">
              Nội dung văn bản này hiện lên khi bấm Show và ẩn đi khi bấm Hide.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}