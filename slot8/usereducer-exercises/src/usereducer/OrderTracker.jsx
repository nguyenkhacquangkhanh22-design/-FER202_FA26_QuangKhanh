import { useReducer } from 'react';

// 1. Khai báo bảng chuyển trạng thái (StateMachine matrix)
const TRANSITIONS = {
  pending: { CONFIRM: 'confirmed', CANCEL: 'cancelled' },
  confirmed: { SHIP: 'shipping', CANCEL: 'cancelled' },
  shipping: { DELIVER: 'delivered' },
  delivered: {},
  cancelled: {},
};

// Khai báo thông tin hiển thị trạng thái (nhãn + màu sắc Bootstrap)
const STATUS_INFO = {
  pending: { label: 'Chờ xác nhận', bg: 'bg-secondary' },
  confirmed: { label: 'Đã xác nhận', bg: 'bg-primary' },
  shipping: { label: 'Đang giao', bg: 'bg-warning text-dark' },
  delivered: { label: 'Đã giao', bg: 'bg-success' },
  cancelled: { label: 'Đã hủy', bg: 'bg-danger' },
};

// Khai báo nhãn các nút bấm sự kiện
const EVENT_LABELS = {
  CONFIRM: 'Xác nhận',
  SHIP: 'Giao hàng',
  DELIVER: 'Đã nhận hàng',
  CANCEL: 'Hủy đơn',
};

// 2. State ban đầu
const initialState = {
  status: 'pending',
  cancelReason: '',
  error: '',
  timeline: [{ status: 'pending', at: '08:00' }],
};

// 3. Reducer thuần (Tuyệt đối KHÔNG gọi new Date() hay Date.now() ở đây)
const orderReducer = (state, action) => {
  if (action.type === 'SET_REASON') {
    return { ...state, cancelReason: action.payload, error: '' };
  }

  if (action.type === 'RESET') {
    return initialState;
  }

  // Tra cứu trạng thái tiếp theo từ bảng TRANSITIONS duy nhất (không xài if/else rải rác)
  const nextStatus = TRANSITIONS[state.status]?.[action.type];

  // Nếu sự kiện không hợp lệ ở trạng thái hiện tại
  if (!nextStatus) {
    return {
      ...state,
      error: `Không thể "${action.type}" khi đơn đang "${STATUS_INFO[state.status].label}"`,
    };
  }

  // Kiểm tra điều kiện riêng khi bấm Hủy đơn
  if (action.type === 'CANCEL' && state.cancelReason.trim().length < 5) {
    return {
      ...state,
      error: 'Nhập lý do hủy (ít nhất 5 ký tự)',
    };
  }

  // Chuyển trạng thái hợp lệ
  return {
    ...state,
    status: nextStatus,
    error: '',
    timeline: [...state.timeline, { status: nextStatus, at: action.at }],
  };
};

// Hàm hỗ trợ lấy giờ hiện tại (Gửi vào action payload từ bên ngoài)
const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

// 4. Component chính
const OrderTracker = () => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { status, cancelReason, error, timeline } = state;

  // Dữ liệu dẫn xuất (Derived state)
  const allowedEvents = Object.keys(TRANSITIONS[status] || {});
  const isFinal = allowedEvents.length === 0;

  return (
    <div className="card shadow-sm mx-auto mt-4" style={{ maxWidth: '500px', borderRadius: '12px' }}>
      <div className="card-body p-4">
        {/* Header: Tiêu đề & Badge trạng thái */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0 fw-bold">Đơn hàng #DH1024</h5>
          <span className={`badge ${STATUS_INFO[status].bg} fs-6 px-3 py-2`}>
            {STATUS_INFO[status].label}
          </span>
        </div>

        {/* Thông báo lỗi */}
        {error && <div className="alert alert-danger py-2">{error}</div>}

        {/* Nhóm các nút điều khiển chính */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {Object.keys(EVENT_LABELS).map((evt) => (
            <button
              key={evt}
              className={`btn ${evt === 'CANCEL' ? 'btn-outline-danger' : 'btn-outline-primary'}`}
              disabled={!allowedEvents.includes(evt)}
              onClick={() => dispatch({ type: evt, at: now() })}
            >
              {EVENT_LABELS[evt]}
            </button>
          ))}

          {/* Nút giả lập để test tính năng chặn của máy trạng thái */}
          <button
            className="btn btn-outline-warning"
            onClick={() => dispatch({ type: 'SHIP', at: now() })}
          >
            Thử gửi SHIP
          </button>
        </div>

        {/* Ô nhập lý do hủy (Chỉ hiện khi trạng thái cho phép CANCEL) */}
        {allowedEvents.includes('CANCEL') && (
          <div className="mb-3">
            <label className="form-label fw-semibold">Lý do hủy</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập lý do hủy (ít nhất 5 ký tự)..."
              value={cancelReason}
              onChange={(e) =>
                dispatch({ type: 'SET_REASON', payload: e.target.value })
              }
            />
          </div>
        )}

        {/* Nút Tạo đơn mới khi đã ở trạng thái kết thúc (Đã giao hoặc Đã hủy) */}
        {isFinal && (
          <div className="mb-3">
            <button
              className="btn btn-success w-100 fw-bold"
              onClick={() => dispatch({ type: 'RESET' })}
            >
              Tạo đơn mới
            </button>
          </div>
        )}

        {/* Dòng thời gian (Timeline) */}
        <h6 className="fw-semibold mb-2">Dòng thời gian</h6>
        <ul className="list-group list-group-flush border rounded">
          {timeline.map((item, index) => (
            <li key={index} className="list-group-item py-2 fs-6">
              <span className="text-muted me-2">[{item.at}]</span>
              <span className="fw-medium">{STATUS_INFO[item.status].label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderTracker;