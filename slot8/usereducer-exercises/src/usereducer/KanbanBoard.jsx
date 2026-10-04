import { useReducer, useState } from 'react';
import {
  COLUMNS,
  initialTaskState,
  taskReducer,
  addTask,
  moveTask,
  renameTask,
  deleteTask,
  clearDone,
} from './taskReducer';

// Sub-component hiển thị từng thẻ nhiệm vụ
const TaskCard = ({ task, isFirst, isLast, dispatch }) => {
  const handleDoubleClick = () => {
    const newTitle = window.prompt('Nhập tên mới cho nhiệm vụ:', task.title);
    if (newTitle !== null) {
      dispatch(renameTask(task.id, newTitle));
    }
  };

  return (
    <div className="card mb-2 shadow-sm border-0 bg-white">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          {/* Tên nhiệm vụ (Nhấp đúp để đổi tên) */}
          <span
            className="fw-medium text-break flex-grow-1 me-2"
            style={{ cursor: 'pointer' }}
            onDoubleClick={handleDoubleClick}
            title="Nhấp đúp để đổi tên"
          >
            {task.title}
          </span>
          {/* Badge Ưu tiên */}
          <span
            className={`badge ${
              task.priority === 'high' ? 'bg-danger' : 'bg-secondary'
            }`}
          >
            {task.priority === 'high' ? 'Cao' : 'Thấp'}
          </span>
        </div>

        {/* Nút di chuyển và Xóa */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn-outline-secondary"
              disabled={isFirst}
              onClick={() => dispatch(moveTask(task.id, -1))}
            >
              ←
            </button>
            <button
              className="btn btn-outline-secondary"
              disabled={isLast}
              onClick={() => dispatch(moveTask(task.id, 1))}
            >
              →
            </button>
          </div>
          <button
            className="btn btn-sm btn-outline-danger border-0"
            onClick={() => dispatch(deleteTask(task.id))}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Component chính
const KanbanBoard = () => {
  // useReducer quản lý Dữ liệu danh sách thẻ
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  // useState quản lý Trạng thái Giao diện (Thanh công cụ)
  const [inputTitle, setInputTitle] = useState('');
  const [inputPriority, setInputPriority] = useState('low');
  const [filterPriority, setFilterPriority] = useState('all');

  // Thêm thẻ mới
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;
    dispatch(addTask(inputTitle, inputPriority));
    setInputTitle('');
  };

  // Dữ liệu dẫn xuất (Derived values)
  const visibleTasks = state.tasks.filter((task) =>
    filterPriority === 'all' ? true : task.priority === filterPriority
  );

  const doneCount = state.tasks.filter((task) => task.column === 'done').length;

  return (
    <div className="container-fluid py-3" style={{ maxWidth: '1000px' }}>
      <h3 className="fw-bold text-center mb-4 text-primary">Bảng Quản Lý Kanban</h3>

      {/* Thanh công cụ (Thêm thẻ & Bộ lọc) */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleAddTask} className="row g-2 align-items-center">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên nhiệm vụ mới..."
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={inputPriority}
                onChange={(e) => setInputPriority(e.target.value)}
              >
                <option value="low">Ưu tiên: Thấp</option>
                <option value="high">Ưu tiên: Cao</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100 fw-semibold">
                + Thêm
              </button>
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-outline-danger w-100 fw-semibold"
                disabled={doneCount === 0}
                onClick={() => dispatch(clearDone())}
              >
                Dọn cột xong
              </button>
            </div>
          </form>

          <hr className="my-3" />

          {/* Bộ lọc ưu tiên */}
          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold text-secondary">Lọc theo ưu tiên:</span>
            <select
              className="form-select style-select w-auto"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="high">Chỉ ưu tiên cao</option>
              <option value="low">Chỉ ưu tiên thấp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danh sách 3 cột Kanban */}
      <div className="row g-3">
        {COLUMNS.map((col, colIndex) => {
          const colTasks = visibleTasks.filter((t) => t.column === col.id);
          const totalColTasks = state.tasks.filter((t) => t.column === col.id).length;

          return (
            <div key={col.id} className="col-md-4">
              <div className="card bg-light border-0 shadow-sm h-100">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                  <h6 className="fw-bold mb-0">{col.label}</h6>
                  <span className={`badge ${col.bg} rounded-pill`}>
                    {totalColTasks}
                  </span>
                </div>
                <div className="card-body p-2">
                  {colTasks.length === 0 ? (
                    <div className="text-center text-muted py-4 fs-7">
                      Khống có thẻ nào
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isFirst={colIndex === 0}
                        isLast={colIndex === COLUMNS.length - 1}
                        dispatch={dispatch}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;