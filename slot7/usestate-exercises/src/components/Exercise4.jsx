import { useState } from 'react'
import { Container, Form, Button, ListGroup, InputGroup } from 'react-bootstrap'

export default function Exercise4() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  // Hàm thêm todo mới
  const handleAddTodo = (e) => {
    e.preventDefault()
    if (!text.trim()) return

    const newTodo = {
      id: Date.now(),
      task: text.trim(),
    }

    setTodos((prev) => [...prev, newTodo])
    setText('')
  }

  // Hàm xóa todo
  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <Container className="mt-5 p-4 rounded bg-dark text-white" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4 text-center">Exercise 4: Todo List</h3>

      <Form onSubmit={handleAddTodo} className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Nhập công việc..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" variant="success">
            Add
          </Button>
        </InputGroup>
      </Form>

      <ListGroup>
        {todos.length === 0 ? (
          <p className="text-center text-muted m-0">Chưa có công việc nào trong danh sách.</p>
        ) : (
          todos.map((todo) => (
            <ListGroup.Item
              key={todo.id}
              className="d-flex justify-content-between align-items-center bg-secondary text-white border-dark"
            >
              <span>{todo.task}</span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  )
}