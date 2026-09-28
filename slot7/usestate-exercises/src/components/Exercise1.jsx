import { useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'

export default function Exercise1() {
  const [count, setCount] = useState(0)

  // Hàm tăng
  const handleIncrease = () => {
    setCount((prev) => prev + 1)
  }

  // Hàm giảm
  const handleDecrease = () => {
    setCount((prev) => prev - 1)
  }

  // Hàm reset
  const handleReset = () => {
    setCount(0)
  }

  return (
    <Container className="mt-5 text-center p-4 bg-dark text-white rounded" style={{ maxWidth: '350px' }}>
      <h2 className="mb-4">Count: {count}</h2>
      <Stack direction="horizontal" gap={2} className="justify-content-center">
        <Button variant="success" onClick={handleIncrease}>
          Increase (+1)
        </Button>
        <Button variant="warning" onClick={handleDecrease}>
          Decrease (-1)
        </Button>
        <Button variant="danger" onClick={handleReset}>
          Reset
        </Button>
      </Stack>
    </Container>
  )
}