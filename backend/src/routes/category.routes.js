const express = require("express");
const { categoryController } = require("../controllers/category.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createCategoryRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/categories:
   *   get:
   *     tags:
   *       - Categories
   *     summary: Lấy danh sách danh mục sản phẩm
   *     responses:
   *       200:
   *         description: Danh sách danh mục
   */
  router.get("/", categoryController.getAll);

  /**
   * @openapi
   * /api/categories/{id}:
   *   get:
   *     tags:
   *       - Categories
   *     summary: Lấy chi tiết danh mục theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chi tiết danh mục
   */
  router.get("/:id", categoryController.getById);

  /**
   * @openapi
   * /api/categories:
   *   post:
   *     tags:
   *       - Categories
   *     summary: Tạo danh mục mới (Quản trị viên)
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
   *             properties:
   *               name:
   *                 type: string
   *                 example: Laptop Gaming
   *               description:
   *                 type: string
   *                 example: Danh mục các dòng laptop chơi game cấu hình cao
   *               slug:
   *                 type: string
   *                 example: laptop-gaming
   *     responses:
   *       201:
   *         description: Tạo danh mục thành công
   */
  router.post("/", authenticate, authorize("product_manager", "system_admin"), categoryController.create);

  /**
   * @openapi
   * /api/categories/{id}:
   *   put:
   *     tags:
   *       - Categories
   *     summary: Cập nhật danh mục
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
   *                 example: Laptop Gaming Đồ Họa
   *               description:
   *                 type: string
   *                 example: Cập nhật mô tả cho danh mục laptop
   *     responses:
   *       200:
   *         description: Cập nhật danh mục thành công
   */
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), categoryController.update);

  /**
   * @openapi
   * /api/categories/{id}:
   *   delete:
   *     tags:
   *       - Categories
   *     summary: Xóa danh mục
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
   *         description: Xóa danh mục thành công
   */
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), categoryController.delete);

  return router;
}

module.exports = { createCategoryRouter };
