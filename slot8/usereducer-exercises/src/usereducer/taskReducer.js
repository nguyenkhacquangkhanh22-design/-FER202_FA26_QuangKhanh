// 1. Khai báo danh sách các cột theo thứ tự
export const COLUMNS = [
  { id: 'todo', label: 'Cần làm', bg: 'bg-secondary' },
  { id: 'doing', label: 'Đang làm', bg: 'bg-primary' },
  { id: 'done', label: 'Hoàn thành', bg: 'bg-success' },
];

// Thứ tự cột để tính chuyển hướng <- ->
const COLUMN_ORDER = ['todo', 'doing', 'done'];

// 2. Khai báo Hằng số Action Types
export const TASK_ACTIONS = {
  ADD: 'task/add',
  MOVE: 'task/move',
  RENAME: 'task/rename',
  DELETE: 'task/delete',
  CLEAR_DONE: 'task/clearDone',
};

// 3. State ban đầu
export const initialTaskState = {
  nextId: 4,
  tasks: [
    { id: 1, title: 'Đọc lý thuyết useReducer', priority: 'high', column: 'done' },
    { id: 2, title: 'Làm bài Kanban', priority: 'high', column: 'doing' },
    { id: 3, title: 'Ôn lại spread operator', priority: 'low', column: 'todo' },
  ],
};

// 4. Action Creators (Hàm tạo action)
export const addTask = (title, priority) => ({
  type: TASK_ACTIONS.ADD,
  payload: { title, priority },
});

export const moveTask = (id, direction) => ({
  type: TASK_ACTIONS.MOVE,
  payload: { id, direction }, // direction: -1 (trái) hoặc 1 (phải)
});

export const renameTask = (id, title) => ({
  type: TASK_ACTIONS.RENAME,
  payload: { id, title },
});

export const deleteTask = (id) => ({
  type: TASK_ACTIONS.DELETE,
  payload: id,
});

export const clearDone = () => ({
  type: TASK_ACTIONS.CLEAR_DONE,
});

// 5. Reducer thuần (Không dùng Math.random(), Date.now() hay import từ react)
export const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.ADD: {
      const trimmedTitle = action.payload.title?.trim();
      // Bỏ qua tên rỗng
      if (!trimmedTitle) return state;

      const newTask = {
        id: state.nextId, // ID mới lấy trực tiếp từ state
        title: trimmedTitle,
        priority: action.payload.priority || 'low',
        column: 'todo', // Thẻ mới luôn vào cột "Cần làm"
      };

      return {
        ...state,
        nextId: state.nextId + 1, // Tăng nextId lên 1
        tasks: [...state.tasks, newTask],
      };
    }

    case TASK_ACTIONS.MOVE: {
      const { id, direction } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== id) return task;

          const currentIndex = COLUMN_ORDER.indexOf(task.column);
          const nextIndex = currentIndex + direction;

          // Vượt biên thì giữ nguyên
          if (nextIndex < 0 || nextIndex >= COLUMN_ORDER.length) return task;

          return { ...task, column: COLUMN_ORDER[nextIndex] };
        }),
      };
    }

    case TASK_ACTIONS.RENAME: {
      const trimmedTitle = action.payload.title?.trim();
      // Bỏ qua tên rỗng (khi nhấn OK với ô trống)
      if (!trimmedTitle) return state;

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, title: trimmedTitle } : task
        ),
      };
    }

    case TASK_ACTIONS.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case TASK_ACTIONS.CLEAR_DONE:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.column !== 'done'),
      };

    default:
      return state;
  }
};