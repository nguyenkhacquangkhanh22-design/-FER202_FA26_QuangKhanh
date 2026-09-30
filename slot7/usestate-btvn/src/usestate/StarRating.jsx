import React, { useState } from 'react';

// Nhãn hiển thị tương ứng với từng mức sao (1 - 5)
const LABELS = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

export default function StarRating({ value = 0, onChange, max = 5 }) {
  // State cục bộ THUẦN GIAO DIỆN: lưu vị trí ngôi sao đang rê chuột qua
  const [hovered, setHovered] = useState(0);

  // Tính số sao cần tô màu: ưu tiên số sao đang hover, nếu không hover thì lấy giá trị đã chọn (value)
  const display = hovered || value;

  return (
    <div className="mb-3" onMouseLeave={() => setHovered(0)}>
      <div className="d-flex align-items-center gap-1">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <span
            key={star}
            role="button"
            style={{
              fontSize: '1.8rem',
              color: star <= display ? '#ffc107' : '#e4e5e9', // Tô màu vàng nếu <= display
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'color 0.15s ease-in-out',
            }}
            onMouseEnter={() => setHovered(star)}
            onClick={() => onChange(star === value ? 0 : star)} // Bấm lại sao đang chọn thì reset về 0
          >
            ★
          </span>
        ))}
        {/* Nhãn trạng thái đánh giá */}
        <span className="ms-2 fw-bold text-secondary">
          {LABELS[display] || 'Chưa đánh giá'}
        </span>
      </div>
    </div>
  );
}