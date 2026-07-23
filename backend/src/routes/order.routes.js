const express = require("express");
const { orderController } = require("../controllers/order.controller");
const { authenticate, optionalAuthenticate, authorize } = require("../middlewares/auth.middleware");

function createOrderRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/orders:
   *   get:
   *     tags:
   *       - Orders
   *     summary: Trích xuất / tra cứu danh sách đơn hàng
   *     parameters:
   *       - in: query
   *         name: code
   *         schema:
   *           type: string
   *         description: Mã tra cứu đơn hàng công khai
   *     responses:
   *       200:
   *         description: Danh sách đơn hàng
   */
  router.get("/", optionalAuthenticate, (req, res, next) => {
    if (req.query.code) {
      return orderController.getAll(req, res, next);
    }
    return authorize("sales_staff", "system_admin")(req, res, () => {
      return orderController.getAll(req, res, next);
    });
  });

  router.use(authenticate);

  /**
   * @openapi
   * /api/orders/statuses:
   *   get:
   *     tags:
   *       - Orders
   *     summary: Lấy danh sách trạng thái đơn hàng
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Danh sách các trạng thái hợp lệ
   */
  router.get("/statuses", orderController.getStatuses);
  router.get("/orderStatus", orderController.getStatuses);

  /**
   * @openapi
   * /api/orders/report:
   *   get:
   *     tags:
   *       - Orders
   *     summary: Lấy báo cáo doanh thu bán hàng
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Báo cáo doanh số bán hàng
   */
  router.get("/report", authorize("sales_staff", "system_admin"), orderController.getSalesReport);

  /**
   * @openapi
   * /api/orders/my:
   *   get:
   *     tags:
   *       - Orders
   *     summary: Lấy danh sách lịch sử đơn hàng của tôi
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lịch sử đơn hàng cá nhân
   */
  router.get("/my", orderController.getMyOrders);

  /**
   * @openapi
   * /api/orders:
   *   post:
   *     tags:
   *       - Orders
   *     summary: Tạo mới đơn hàng
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - items
   *             properties:
   *               items:
   *                 type: array
   *                 items:
   *                   type: object
   *                   required:
   *                     - productId
   *                     - quantity
   *                   properties:
   *                     productId:
   *                       type: string
   *                       example: PROD-101
   *                     quantity:
   *                       type: integer
   *                       example: 2
   *                     price:
   *                       type: number
   *                       example: 15000000
   *               shippingAddress:
   *                 type: object
   *                 properties:
   *                   receiverName:
   *                     type: string
   *                     example: Nguyễn Văn A
   *                   phone:
   *                     type: string
   *                     example: 0987654321
   *                   address:
   *                     type: string
   *                     example: 123 Nguyễn Trãi, Thanh Xuân, Hà Nội
   *               paymentMethod:
   *                 type: string
   *                 example: COD
   *               voucherCode:
   *                 type: string
   *                 example: GIAM50K
   *               note:
   *                 type: string
   *                 example: Giao hàng vào giờ hành chính
   *     responses:
   *       201:
   *         description: Tạo đơn hàng thành công
   */
  router.post("/", orderController.create);

  /**
   * @openapi
   * /api/orders/{id}:
   *   get:
   *     tags:
   *       - Orders
   *     summary: Lấy chi tiết đơn hàng theo ID
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chi tiết đơn hàng
   */
  router.get("/:id", orderController.getById);

  /**
   * @openapi
   * /api/orders/{id}/payment:
   *   post:
   *     tags:
   *       - Orders
   *     summary: Thanh toán cho đơn hàng
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               paymentMethod:
   *                 type: string
   *                 example: BANK_TRANSFER
   *               transactionId:
   *                 type: string
   *                 example: VNP123456789
   *               amount:
   *                 type: number
   *                 example: 30000000
   *     responses:
   *       200:
   *         description: Kết quả thanh toán
   */
  router.post("/:id/payment", orderController.pay);

  /**
   * @openapi
   * /api/orders/{id}/status:
   *   put:
   *     tags:
   *       - Orders
   *     summary: Cập nhật trạng thái đơn hàng (Quản trị viên / Nhân viên kinh doanh)
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - status
   *             properties:
   *               status:
   *                 type: string
   *                 enum: [PENDING, CONFIRMED, PROCESSING, SHIPPING, COMPLETED, CANCELLED]
   *                 example: CONFIRMED
   *     responses:
   *       200:
   *         description: Cập nhật trạng thái thành công
   */
  router.put("/:id/status", authorize("sales_staff", "system_admin"), orderController.updateStatus);

  /**
   * @openapi
   * /api/orders/{id}:
   *   put:
   *     tags:
   *       - Orders
   *     summary: Chỉnh sửa đơn hàng
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               shippingAddress:
   *                 type: object
   *                 properties:
   *                   receiverName:
   *                     type: string
   *                     example: Nguyễn Văn A (Cập nhật)
   *                   phone:
   *                     type: string
   *                     example: 0987654321
   *                   address:
   *                     type: string
   *                     example: 456 Hoàng Quốc Việt, Cầu Giấy, Hà Nội
   *               note:
   *                 type: string
   *                 example: Đã gọi xác nhận lại địa chỉ
   *     responses:
   *       200:
   *         description: Cập nhật đơn hàng thành công
   */
  router.put("/:id", authorize("sales_staff", "system_admin"), orderController.update);

  /**
   * @openapi
   * /api/orders/{id}:
   *   delete:
   *     tags:
   *       - Orders
   *     summary: Xóa đơn hàng
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Xóa đơn hàng thành công
   */
  router.delete("/:id", authorize("sales_staff", "system_admin"), orderController.delete);

  return router;
}

module.exports = { createOrderRouter };
