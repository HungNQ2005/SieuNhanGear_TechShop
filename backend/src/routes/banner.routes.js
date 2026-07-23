const express = require("express");
const { bannerController } = require("../controllers/banner.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createBannerRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/banners:
   *   get:
   *     tags:
   *       - Banners
   *     summary: Lấy danh sách banner quảng cáo
   *     responses:
   *       200:
   *         description: Danh sách banner
   */
  router.get("/", bannerController.getAll);

  /**
   * @openapi
   * /api/banners/{id}:
   *   get:
   *     tags:
   *       - Banners
   *     summary: Lấy chi tiết banner theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chi tiết banner
   */
  router.get("/:id", bannerController.getById);

  /**
   * @openapi
   * /api/banners:
   *   post:
   *     tags:
   *       - Banners
   *     summary: Tạo mới banner (Quản trị viên)
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
   *               - imageUrl
   *             properties:
   *               title:
   *                 type: string
   *                 example: Banner Trang Chủ Siêu Khuyến Mãi
   *               imageUrl:
   *                 type: string
   *                 example: https://example.com/images/banner-home.png
   *               linkUrl:
   *                 type: string
   *                 example: /promotions/summer-sale
   *               position:
   *                 type: string
   *                 example: home_hero
   *               displayOrder:
   *                 type: integer
   *                 example: 1
   *               status:
   *                 type: string
   *                 example: active
   *     responses:
   *       201:
   *         description: Tạo banner thành công
   */
  router.post("/", authenticate, authorize("product_manager", "system_admin"), bannerController.create);

  /**
   * @openapi
   * /api/banners/{id}:
   *   put:
   *     tags:
   *       - Banners
   *     summary: Cập nhật banner
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
   *                 example: Banner Trang Chủ (Cập nhật link)
   *               imageUrl:
   *                 type: string
   *                 example: https://example.com/images/banner-home-v2.png
   *               linkUrl:
   *                 type: string
   *                 example: /promotions/flash-sale
   *               displayOrder:
   *                 type: integer
   *                 example: 2
   *               status:
   *                 type: string
   *                 example: active
   *     responses:
   *       200:
   *         description: Cập nhật banner thành công
   */
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), bannerController.update);

  /**
   * @openapi
   * /api/banners/{id}:
   *   delete:
   *     tags:
   *       - Banners
   *     summary: Xóa banner
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
   *         description: Xóa banner thành công
   */
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), bannerController.delete);

  return router;
}

module.exports = { createBannerRouter };
