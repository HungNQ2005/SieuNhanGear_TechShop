const express = require("express");
const { showroomController } = require("../controllers/showroom.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createShowroomRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/showroom:
   *   get:
   *     tags:
   *       - Showrooms
   *     summary: Lấy danh sách showroom / cửa hàng
   *     responses:
   *       200:
   *         description: Danh sách showroom
   */
  router.get("/", showroomController.getAll);

  /**
   * @openapi
   * /api/showroom/{id}:
   *   get:
   *     tags:
   *       - Showrooms
   *     summary: Lấy thông tin showroom theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chi tiết showroom
   */
  router.get("/:id", showroomController.getById);

  /**
   * @openapi
   * /api/showroom:
   *   post:
   *     tags:
   *       - Showrooms
   *     summary: Tạo showroom mới (Quản trị viên)
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - address
   *               - phone
   *             properties:
   *               name:
   *                 type: string
   *                 example: Showroom Thái Hà
   *               address:
   *                 type: string
   *                 example: 84 Thái Hà, Đống Đa, Hà Nội
   *               phone:
   *                 type: string
   *                 example: 02431234567
   *               email:
   *                 type: string
   *                 example: thaiha@sieunhangear.com
   *               openingHours:
   *                 type: string
   *                 example: 08:00 - 21:30 hàng ngày
   *               latitude:
   *                 type: number
   *                 example: 21.0116
   *               longitude:
   *                 type: number
   *                 example: 105.8173
   *     responses:
   *       201:
   *         description: Tạo showroom thành công
   */
  router.post("/", authenticate, authorize("system_admin"), showroomController.create);

  /**
   * @openapi
   * /api/showroom/{id}:
   *   put:
   *     tags:
   *       - Showrooms
   *     summary: Cập nhật thông tin showroom
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
   *               name:
   *                 type: string
   *                 example: Showroom Thái Hà (Cập nhật)
   *               address:
   *                 type: string
   *                 example: 84 Thái Hà, Đống Đa, Hà Nội
   *               phone:
   *                 type: string
   *                 example: 02431234567
   *               email:
   *                 type: string
   *                 example: thaiha@sieunhangear.com
   *               openingHours:
   *                 type: string
   *                 example: 08:00 - 22:00 hàng ngày
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   */
  router.put("/:id", authenticate, authorize("system_admin"), showroomController.update);

  /**
   * @openapi
   * /api/showroom/{id}:
   *   delete:
   *     tags:
   *       - Showrooms
   *     summary: Xóa showroom
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
   *         description: Xóa showroom thành công
   */
  router.delete("/:id", authenticate, authorize("system_admin"), showroomController.delete);

  return router;
}

module.exports = { createShowroomRouter };
