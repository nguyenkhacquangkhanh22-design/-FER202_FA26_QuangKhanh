Set-Content -Path src/utils/format.js -Value @"
export const formatVND = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
"@