export const calculateSubtotal = (items) => {
  if (!items || !Array.isArray(items)) {
    console.warn("calculateSubtotal: items is not an array");
    return 0;
  }
  return items.reduce((total, item) => {
    const price = item?.price || 0;
    const quantity = item?.quantity || 0;
    return total + price * quantity;
  }, 0);
};

export const calculateDiscount = (subtotal, voucher) => {
  if (!voucher) {
    return 0;
  }
  if (!voucher.isActive) {
    return 0;
  }
  if (subtotal < (voucher.minOrderValue || 0)) {
    return 0;
  }
  const discountPercentage = voucher.discountPercentage || 0;
  return Math.round(subtotal * (discountPercentage / 100));
};

export const calculateTotal = (subtotal, shippingFee, discountAmount) => {
  const subtotalNum = subtotal || 0;
  const shippingFeeNum = shippingFee || 0;
  const discountAmountNum = discountAmount || 0;
  return subtotalNum + shippingFeeNum - discountAmountNum;
};
