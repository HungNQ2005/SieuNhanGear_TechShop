const express = require("express");
const { promotionController } = require("../controllers/promotion.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createPromotionRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/promotions:
   *   get:
   *     tags:
   *       - Promotions
   *     summary: Lấy danh sách chương trình khuyến mãi / Flash Sale
   *     responses:
   *       200:
   *         description: Danh sách khuyến mãi
   */
  router.get("/", promotionController.getAll);

  /**
   * @openapi
   * /api/promotions/{id}:
   *   get:
   *     tags:
   *       - Promotions
   *     summary: Lấy thông tin khuyến mãi theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chi tiết chương trình khuyến mãi
   */
  router.get("/:id", promotionController.getById);

  /**
   * @openapi
   * /api/promotions:
   *   post:
   *     tags:
   *       - Promotions
   *     summary: Tạo chương trình khuyến mãi mới
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - discountPercent
   *             properties:
   *               title:
   *                 type: string
   *                 example: Flash Sale Hè Rực Rỡ 2026
   *               description:
   *                 type: string
   *                 example: Giảm giá sâu đến 30% toàn bộ linh kiện PC
   *               discountPercent:
   *                 type: number
   *                 example: 20
   *               startDate:
   *                 type: string
   *                 format: date-time
   *                 example: "2026-06-01T00:00:00Z"
   *               endDate:
   *                 type: string
   *                 format: date-time
   *                 example: "2026-06-30T23:59:59Z"
   *               status:
   *                 type: string
   *                 example: active
   *               bannerUrl:
   *                 type: string
   *                 example: https://example.com/banners/summer-sale.jpg
   *     responses:
   *       201:
   *         description: Tạo khuyến mãi thành công
   */
  router.post("/", authenticate, authorize("product_manager", "system_admin"), promotionController.create);

  /**
   * @openapi
   * /api/promotions/{id}:
   *   put:
   *     tags:
   *       - Promotions
   *     summary: Cập nhật chương trình khuyến mãi
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
   *               title:
   *                 type: string
   *                 example: Flash Sale Hè Rực Rỡ 2026 (Đợt 2)
   *               description:
   *                 type: string
   *                 example: Gia hạn khuyến mãi siêu sốc
   *               discountPercent:
   *                 type: number
   *                 example: 25
   *               startDate:
   *                 type: string
   *                 format: date-time
   *                 example: "2026-06-01T00:00:00Z"
   *               endDate:
   *                 type: string
   *                 format: date-time
   *                 example: "2026-07-15T23:59:59Z"
   *               status:
   *                 type: string
   *                 example: active
   *     responses:
   *       200:
   *         description: Cập nhật khuyến mãi thành công
   */
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), promotionController.update);

  /**
   * @openapi
   * /api/promotions/{id}:
   *   delete:
   *     tags:
   *       - Promotions
   *     summary: Xóa chương trình khuyến mãi
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
   *         description: Xóa khuyến mãi thành công
   */
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), promotionController.delete);

  return router;
}

module.exports = { createPromotionRouter };
