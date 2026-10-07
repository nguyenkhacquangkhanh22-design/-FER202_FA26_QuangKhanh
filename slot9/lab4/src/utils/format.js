export const formatVND = (amount) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export const getFinalPrice = (product) => {
  if (!product) return 0;
  const discount = product.discountPercentage ?? 0;
  return product.price * (1 - discount / 100);
};