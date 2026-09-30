import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

// Khai báo giới hạn khoảng [0, 100]
const MIN = 0;
const MAX = 100;

// Hàm hỗ trợ kẹp giá trị trong khoảng [MIN, MAX]
const clamp = (n) => Math.min(MAX, Math.max(MIN, n));

// 1. Khai báo hằng số Action Types (tránh lỗi gõ sai chuỗi)
const ACTIONS = {
  INCREMENT: 'counter/increment',
  DECREMENT: 'counter/decrement',
  SET_STEP: 'counter/setStep',
  RESET: 'counter/reset',
};

// 2. State ban đầu
const initialState = { count: 0, step: 1, history: [] };

// 3. Reducer thuần quản lý state
const counterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
    case ACTIONS.DECREMENT: {
      const delta = action.type === ACTIONS.INCREMENT ? state.step : -state.step;
      const next = clamp(state.count + delta);

      // Tự động bỏ qua việc ghi lịch sử và trả về state gốc khi giá trị không đổi (chạm biên 0 hoặc 100)
      if (next === state.count) return state;

      return {
        ...state,
        count: next,
        // Ghi lại biến động dạng 'cũ → mới', lấy tối đa 5 bản ghi mới nhất
        history: [`${state.count} →${next}`, ...state.history].slice(0, 5),
      };
    }

    case ACTIONS.SET_STEP:
      // Sử dụng payload khi truyền dữ liệu bước nhảy
      return { ...state, step: action.payload };

    case ACTIONS.RESET:
      // Khôi phục về state ban đầu (count: 0, step: 1, history: [])
      return initialState;

    default:
      // Ném lỗi minh bạch khi gặp Action Type không hợp lệ
      throw new Error(`Action không hợp lệ: ${action.type}`);
  }
};

// 4. Component chính (Hoàn toàn KHÔNG dùng useState)
const StepCounter = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const { count, step, history } = state;

  return (
    <Card style={{ maxWidth: 420 }} className="mx-auto mt-4 shadow-sm">
      <Card.Body>
        <Card.Title className="text-center fw-bold text-primary">
          Bộ Đếm Có Bước Nhảy
        </Card.Title>
        <div className="display-4 text-center my-3 fw-bold">{count}</div>

        {/* Cụm nút bấm điều khiển */}
        <div className="d-flex gap-2 justify-content-center mb-3">
          <Button
            variant="outline-secondary"
            disabled={count <= MIN} // Vô hiệu hóa khi chạm 0
            onClick={() => dispatch({ type: ACTIONS.DECREMENT })}
          >
            {`− ${step}`}
          </Button>
          <Button
            variant="primary"
            disabled={count >= MAX} // Vô hiệu hóa khi đạt 100
            onClick={() => dispatch({ type: ACTIONS.INCREMENT })}
          >
            {`+ ${step}`}
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => dispatch({ type: ACTIONS.RESET })}
          >
            Đặt lại
          </Button>
        </div>

        {/* Chọn bước nhảy */}
        <Form.Group className="mb-3" controlId="step-select">
          <Form.Label className="fw-semibold">Bước nhảy</Form.Label>
          <Form.Select
            value={step}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_STEP,
                payload: Number(e.target.value),
              })
            }
          >
            {[1, 5, 10, 25].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Hiển thị 5 biến động gần nhất */}
        <h6 className="fw-semibold">5 thay đổi gần nhất</h6>
        <ListGroup variant="flush" className="border rounded">
          {history.length === 0 ? (
            <ListGroup.Item className="text-muted text-center py-2">
              Chưa có thay đổi
            </ListGroup.Item>
          ) : (
            history.map((line, i) => (
              <ListGroup.Item key={`${line}-${i}`} className="py-2 fs-7">
                {line}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default StepCounter;