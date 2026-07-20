const express = require("express");
const { orderController } = require("../controllers/order.controller");
const { authenticate, optionalAuthenticate, authorize } = require("../middlewares/auth.middleware");

function createOrderRouter() {
  const router = express.Router();

  // GET /api/orders: Công khai tra cứu nếu có ?code=..., hoặc yêu cầu Staff/Admin nếu xem toàn bộ danh sách
  router.get("/", optionalAuthenticate, (req, res, next) => {
    if (req.query.code) {
      return orderController.getAll(req, res, next);
    }
    return authorize("sales_staff", "system_admin")(req, res, () => {
      return orderController.getAll(req, res, next);
    });
  });

  router.use(authenticate);

  // GET /api/orders/statuses & /api/orders/orderStatus (danh sách trạng thái đơn)
  router.get("/statuses", orderController.getStatuses);
  router.get("/orderStatus", orderController.getStatuses);

  // GET /api/orders/report (UC-15 View Sales Report - Sale Staff/Admin)
  router.get("/report", authorize("sales_staff", "system_admin"), orderController.getSalesReport);

  // GET /api/orders/my (UC-08 View Order History - Customer)
  router.get("/my", orderController.getMyOrders);

  // POST /api/orders (UC-09 Create Order - Customer / Staff Mock)
  router.post("/", orderController.create);

  // GET /api/orders/:id (UC-14 View Order Status)
  router.get("/:id", orderController.getById);

  // POST /api/orders/:id/payment (UC-10 Make Payment)
  router.post("/:id/payment", orderController.pay);

  // PUT /api/orders/:id/status (UC-16 Update Order Status - Sale Staff/Admin)
  router.put("/:id/status", authorize("sales_staff", "system_admin"), orderController.updateStatus);

  // PUT /api/orders/:id (Chỉnh sửa đơn hàng - Sale Staff/Admin)
  router.put("/:id", authorize("sales_staff", "system_admin"), orderController.update);

  // DELETE /api/orders/:id (Xóa đơn hàng - Sale Staff/Admin)
  router.delete("/:id", authorize("sales_staff", "system_admin"), orderController.delete);

  return router;
}

module.exports = { createOrderRouter };
