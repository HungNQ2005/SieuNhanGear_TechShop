const express = require('express');

// STUB: cart routes (chưa có DB)
function createCartRouter() {
  const router = express.Router();

  // GET /api/cart
  router.get('/', (req, res) => {
    res.status(501).json({ code: 'NOT_IMPLEMENTED', message: 'Cart list not implemented yet' });
  });

  // POST /api/cart/items
  router.post('/items', (req, res) => {
    res.status(501).json({ code: 'NOT_IMPLEMENTED', message: 'Add cart item not implemented yet' });
  });

  // DELETE /api/cart/items/:itemId
  router.delete('/items/:itemId', (req, res) => {
    res.status(501).json({ code: 'NOT_IMPLEMENTED', message: 'Remove cart item not implemented yet' });
  });

  return router;
}

module.exports = { createCartRouter };

