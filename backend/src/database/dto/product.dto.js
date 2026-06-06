// DTO stubs cho product/search

const ProductSearchDto = {
  // ví dụ query params
  keyword: 'string',
  categoryId: 'string',
  manufacturerId: 'string',
  minPrice: 'number',
  maxPrice: 'number',
  page: 'number',
  pageSize: 'number',
};

const ProductResponseDto = {
  id: 'string',
  name: 'string',
  price: 'number',
  images: ['string'],
};

module.exports = { ProductSearchDto, ProductResponseDto };

