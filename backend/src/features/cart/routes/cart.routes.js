const express = require('express');
const { cartController } = require('../controllers/cart.controller');
const { authenticate, optionalAuthenticate } = require('../../../middlewares/auth.middleware');

// UC-06 Manage Carts (CRUD)
function createCartRouter() {
  const router = express.Router();

  // GET /api/cart (Cho phép dùng token hoặc ?accountId=...)
  router.get('/', optionalAuthenticate, cartController.getCart);

  // POST /api/cart/items
  router.post('/items', authenticate, cartController.addItem);

  // PUT /api/cart/items/:itemId
  router.put('/items/:itemId', authenticate, cartController.updateItem);

  // DELETE /api/cart/items/:itemId
  router.delete('/items/:itemId', authenticate, cartController.removeItem);

  // DELETE /api/cart
  router.delete('/', authenticate, cartController.clearCart);

  return router;
}

module.exports = { createCartRouter };
