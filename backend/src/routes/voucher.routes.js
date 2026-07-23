const express = require("express");
const { voucherController } = require("../controllers/voucher.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createVoucherRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/vouchers:
   *   get:
   *     tags:
   *       - Vouchers
   *     summary: Lấy danh sách voucher / mã giảm giá
   *     responses:
   *       200:
   *         description: Danh sách voucher
   */
  router.get("/", voucherController.getAll);

  /**
   * @openapi
   * /api/vouchers/{id}:
   *   get:
   *     tags:
   *       - Vouchers
   *     summary: Lấy thông tin voucher theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chi tiết voucher
   */
  router.get("/:id", voucherController.getById);

  /**
   * @openapi
   * /api/vouchers:
   *   post:
   *     tags:
   *       - Vouchers
   *     summary: Tạo voucher mới (Quản trị viên)
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - code
   *               - discountAmount
   *             properties:
   *               code:
   *                 type: string
   *                 example: GIAM50K
   *               discountPercent:
   *                 type: number
   *                 example: 10
   *               discountAmount:
   *                 type: number
   *                 example: 50000
   *               maxDiscountAmount:
   *                 type: number
   *                 example: 100000
   *               minOrderValue:
   *                 type: number
   *                 example: 500000
   *               startDate:
   *                 type: string
   *                 format: date-time
   *                 example: "2026-01-01T00:00:00Z"
   *               endDate:
   *                 type: string
   *                 format: date-time
   *                 example: "2026-12-31T23:59:59Z"
   *               usageLimit:
   *                 type: integer
   *                 example: 100
   *     responses:
   *       201:
   *         description: Tạo voucher thành công
   */
  router.post("/", authenticate, authorize("product_manager", "system_admin"), voucherController.create);

  /**
   * @openapi
   * /api/vouchers/{id}:
   *   put:
   *     tags:
   *       - Vouchers
   *     summary: Cập nhật voucher
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
   *               code:
   *                 type: string
   *                 example: GIAM50K
   *               discountPercent:
   *                 type: number
   *                 example: 15
   *               discountAmount:
   *                 type: number
   *                 example: 50000
   *               maxDiscountAmount:
   *                 type: number
   *                 example: 150000
   *               minOrderValue:
   *                 type: number
   *                 example: 500000
   *               startDate:
   *                 type: string
   *                 format: date-time
   *                 example: "2026-01-01T00:00:00Z"
   *               endDate:
   *                 type: string
   *                 format: date-time
   *                 example: "2026-12-31T23:59:59Z"
   *               usageLimit:
   *                 type: integer
   *                 example: 200
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   */
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), voucherController.update);

  /**
   * @openapi
   * /api/vouchers/{id}:
   *   delete:
   *     tags:
   *       - Vouchers
   *     summary: Xóa voucher
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
   *         description: Xóa voucher thành công
   */
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), voucherController.delete);

  return router;
}

module.exports = { createVoucherRouter };
