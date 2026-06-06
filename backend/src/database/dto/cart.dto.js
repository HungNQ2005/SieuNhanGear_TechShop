// DTO stubs cho cart

const CartAddItemDto = {
  productId: 'string',
  qty: 'number',
};

const CartResponseDto = {
  userId: 'string',
  items: [
    {
      productId: 'string',
      qty: 'number',
    },
  ],
};

module.exports = { CartAddItemDto, CartResponseDto };

