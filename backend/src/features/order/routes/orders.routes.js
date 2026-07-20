const express = require('express');
const {
  createOrder,
  getOrders,
  getOrderById,
} = require('../../../controllers/orderController');
const { authMiddleware } = require('../../../middlewares/auth.middleware');

function createOrdersRouter() {
  const router = express.Router();

  // GET /api/orders?accountId=...
  router.get('/', getOrders);

  // GET /api/orders/:id
  router.get('/:id', getOrderById);

  // POST /api/orders - cần đăng nhập
  router.post('/', authMiddleware, createOrder);

  return router;
}

module.exports = { createOrdersRouter };
