const express = require('express');
const { cartController } = require('../controllers/cart.controller');
const { authenticate } = require('../../../middlewares/auth.middleware');

// UC-06 Manage Carts (CRUD) - toàn bộ route yêu cầu đăng nhập, luôn scope theo user hiện tại
function createCartRouter() {
  const router = express.Router();

  router.use(authenticate);

  // GET /api/cart
  router.get('/', cartController.getCart);

  // POST /api/cart/items
  router.post('/items', cartController.addItem);

  // PUT /api/cart/items/:itemId
  router.put('/items/:itemId', cartController.updateItem);

  // DELETE /api/cart/items/:itemId
  router.delete('/items/:itemId', cartController.removeItem);

  // DELETE /api/cart
  router.delete('/', cartController.clearCart);

  return router;
}

module.exports = { createCartRouter };
