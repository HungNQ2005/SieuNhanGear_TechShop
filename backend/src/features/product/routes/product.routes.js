const express = require('express');

// STUB: product search/browse routes (chưa có DB)
function createProductRouter() {
  const router = express.Router();

  // GET /api/products (search/browse)
  router.get('/', (req, res) => {
    res.status(501).json({ code: 'NOT_IMPLEMENTED', message: 'Product listing/search not implemented yet' });
  });

  // GET /api/products/:productId
  router.get('/:productId', (req, res) => {
    res.status(501).json({ code: 'NOT_IMPLEMENTED', message: 'Get product detail not implemented yet' });
  });

  return router;
}

module.exports = { createProductRouter };

