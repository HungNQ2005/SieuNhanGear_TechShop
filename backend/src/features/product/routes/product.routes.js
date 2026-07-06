const express = require('express');
const { ROUTES } = require('../../../constants/routes.constants');

// STUB: product search/browse routes (chưa có DB)
function createProductRouter() {
  const router = express.Router();
  const {
    getAllProducts,
    getProductById,
  } = require('../../../controllers/productController');

  // GET /api/products
  router.get(ROUTES.PRODUCT.NULL, getAllProducts);
  // GET /api/products/:id
  router.get(ROUTES.PRODUCT.GET_PRODUCT_BY_ID, getProductById);

  return router;
}

module.exports = { createProductRouter };

