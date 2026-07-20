const express = require("express");
const { orderController } = require("../controllers/order.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createOrderRouter() {
  const router = express.Router();

  router.use(authenticate);

  // GET /api/orders/statuses (danh sách trạng thái đơn)
  router.get("/statuses", orderController.getStatuses);

  // GET /api/orders/report (UC-15 View Sales Report - Sale Staff/Admin, hỗ trợ ?format=csv)
  router.get("/report", authorize("sales_staff", "system_admin"), orderController.getSalesReport);

  // GET /api/orders/my (UC-08 View Order History - Customer)
  router.get("/my", orderController.getMyOrders);

  // GET /api/orders (UC-13 View Order List - Sale Staff/Admin)
  router.get("/", authorize("sales_staff", "system_admin"), orderController.getAll);

  // POST /api/orders (UC-09 Create Order - Customer)
  router.post("/", orderController.create);

  // GET /api/orders/:id (UC-14 View Order Status - chủ đơn hoặc staff)
  router.get("/:id", orderController.getById);

  // POST /api/orders/:id/payment (UC-10 Make Payment)
  router.post("/:id/payment", orderController.pay);

  // PUT /api/orders/:id/status (UC-16 Update Order Status - Sale Staff/Admin)
  router.put("/:id/status", authorize("sales_staff", "system_admin"), orderController.updateStatus);

  return router;
}

module.exports = { createOrderRouter };
