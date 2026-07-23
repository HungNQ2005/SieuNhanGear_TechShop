const express = require("express");
const { stockHistoryController } = require("../controllers/stockHistory.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createStockHistoryRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/stock-history:
   *   get:
   *     tags:
   *       - Stock
   *     summary: Lấy lịch sử biến động nhập / xuất kho
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
   *         description: Danh sách lịch sử tồn kho
   */
  router.get("/", stockHistoryController.getAll);

  /**
   * @openapi
   * /api/stock-history/{id}:
   *   get:
   *     tags:
   *       - Stock
   *     summary: Lấy thông tin lịch sử tồn kho theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chi tiết lịch sử kho
   */
  router.get("/:id", stockHistoryController.getById);

  /**
   * @openapi
   * /api/stock-history:
   *   post:
   *     tags:
   *       - Stock
   *     summary: Ghi nhận lịch sử nhập / xuất kho mới (Quản trị viên)
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
   *               - changeType
   *               - quantityChange
   *             properties:
   *               productId:
   *                 type: string
   *                 example: PROD-101
   *               warehouseId:
   *                 type: string
   *                 example: WH-MB-01
   *               changeType:
   *                 type: string
   *                 enum: [IMPORT, EXPORT, ADJUSTMENT]
   *                 example: IMPORT
   *               quantityChange:
   *                 type: integer
   *                 example: 20
   *               note:
   *                 type: string
   *                 example: Nhập hàng bổ sung đợt 1
   *     responses:
   *       201:
   *         description: Ghi lịch sử thành công
   */
  router.post("/", authenticate, authorize("product_manager", "system_admin"), stockHistoryController.create);

  return router;
}

module.exports = { createStockHistoryRouter };
