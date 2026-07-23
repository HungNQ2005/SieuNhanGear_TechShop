const express = require("express");
const { stockController } = require("../controllers/stock.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createStockRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/stock:
   *   get:
   *     tags:
   *       - Stock
   *     summary: Lấy thông tin tồn kho
   *     parameters:
   *       - in: query
   *         name: productId
   *         schema:
   *           type: string
   *       - in: query
   *         name: warehouseId
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Danh sách tồn kho
   */
  router.get("/", stockController.getAll);

  /**
   * @openapi
   * /api/stock/{id}:
   *   get:
   *     tags:
   *       - Stock
   *     summary: Lấy chi tiết kho tồn theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Thông tin chi tiết kho tồn
   */
  router.get("/:id", stockController.getById);

  /**
   * @openapi
   * /api/stock:
   *   post:
   *     tags:
   *       - Stock
   *     summary: Tạo bản ghi tồn kho mới (Quản trị viên)
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - productId
   *               - warehouseId
   *               - quantity
   *             properties:
   *               productId:
   *                 type: string
   *                 example: PROD-101
   *               warehouseId:
   *                 type: string
   *                 example: WH-MB-01
   *               quantity:
   *                 type: integer
   *                 example: 50
   *               location:
   *                 type: string
   *                 example: Kệ A-12
   *     responses:
   *       201:
   *         description: Tạo thành công
   */
  router.post("/", authenticate, authorize("product_manager", "system_admin"), stockController.create);

  /**
   * @openapi
   * /api/stock/{id}:
   *   put:
   *     tags:
   *       - Stock
   *     summary: Cập nhật / nhập lại tồn kho (Restock)
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
   *               quantity:
   *                 type: integer
   *                 example: 100
   *               location:
   *                 type: string
   *                 example: Kệ B-05
   *     responses:
   *       200:
   *         description: Cập nhật số lượng tồn kho thành công
   */
  router.put("/:id", stockController.update);
  router.patch("/:id", stockController.update);

  /**
   * @openapi
   * /api/stock/{id}:
   *   delete:
   *     tags:
   *       - Stock
   *     summary: Xóa bản ghi tồn kho
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Xóa tồn kho thành công
   */
  router.delete("/:id", stockController.delete);

  return router;
}

module.exports = { createStockRouter };
