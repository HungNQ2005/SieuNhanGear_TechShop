const express = require("express");
const { warehouseController } = require("../controllers/warehouse.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createWarehouseRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/warehouses:
   *   get:
   *     tags:
   *       - Warehouses
   *     summary: Lấy danh sách kho hàng
   *     responses:
   *       200:
   *         description: Danh sách kho hàng
   */
  router.get("/", warehouseController.getAll);

  /**
   * @openapi
   * /api/warehouses/{id}:
   *   get:
   *     tags:
   *       - Warehouses
   *     summary: Lấy thông tin kho hàng theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chi tiết kho hàng
   */
  router.get("/:id", warehouseController.getById);

  /**
   * @openapi
   * /api/warehouses:
   *   post:
   *     tags:
   *       - Warehouses
   *     summary: Tạo kho hàng mới (Quản trị viên)
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
   *               - code
   *             properties:
   *               name:
   *                 type: string
   *                 example: Kho Tổng Miền Bắc
   *               code:
   *                 type: string
   *                 example: WH-MB-01
   *               address:
   *                 type: string
   *                 example: 123 Đường Cầu Giấy, Hà Nội
   *               phone:
   *                 type: string
   *                 example: 0987654321
   *               managerName:
   *                 type: string
   *                 example: Nguyễn Văn A
   *               status:
   *                 type: string
   *                 example: active
   *     responses:
   *       201:
   *         description: Tạo kho hàng thành công
   */
  router.post("/", authenticate, authorize("product_manager", "system_admin"), warehouseController.create);

  /**
   * @openapi
   * /api/warehouses/{id}:
   *   put:
   *     tags:
   *       - Warehouses
   *     summary: Cập nhật thông tin kho hàng
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
   *                 example: Kho Tổng Miền Bắc (Cập nhật)
   *               code:
   *                 type: string
   *                 example: WH-MB-01
   *               address:
   *                 type: string
   *                 example: 456 Đường Cầu Giấy, Hà Nội
   *               phone:
   *                 type: string
   *                 example: 0987654321
   *               managerName:
   *                 type: string
   *                 example: Trần Văn B
   *               status:
   *                 type: string
   *                 example: active
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   */
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), warehouseController.update);

  /**
   * @openapi
   * /api/warehouses/{id}:
   *   delete:
   *     tags:
   *       - Warehouses
   *     summary: Xóa kho hàng
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
   *         description: Xóa kho hàng thành công
   */
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), warehouseController.delete);

  return router;
}

module.exports = { createWarehouseRouter };
