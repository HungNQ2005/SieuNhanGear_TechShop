const express = require('express');
const {
  getCart,
  createCart,
  updateCart,
  deleteCart,
} = require('../../../controllers/cartController');

function createCartRouter() {
  const router = express.Router();

  // GET /api/cart?accountId=...
  router.get('/', getCart);

  // POST /api/cart
  router.post('/', createCart);

  // PUT /api/cart/:id
  router.put('/:id', updateCart);

  // DELETE /api/cart/:id
  router.delete('/:id', deleteCart);

  return router;
}

module.exports = { createCartRouter };

