const express = require("express");
const { productController } = require("../../../controllers/product.controller");
const { authenticate, authorize } = require("../../../middlewares/auth.middleware");

function createProductRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/products:
   *   get:
   *     tags:
   *       - Products
   *     summary: Lấy danh sách sản phẩm
   *     parameters:
   *       - in: query
   *         name: category_id
   *         schema:
   *           type: string
   *         description: Lọc theo mã danh mục
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Từ khóa tìm kiếm tên sản phẩm
   *     responses:
   *       200:
   *         description: Danh sách sản phẩm
   */
  router.get("/", productController.getAll);

  /**
   * @openapi
   * /api/products/{id}:
   *   get:
   *     tags:
   *       - Products
   *     summary: Lấy thông tin chi tiết sản phẩm theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID của sản phẩm
   *     responses:
   *       200:
   *         description: Chi tiết sản phẩm
   *       404:
   *         description: Không tìm thấy sản phẩm
   */
  router.get("/:id", productController.getById);

  /**
   * @openapi
   * /api/products:
   *   post:
   *     tags:
   *       - Products
   *     summary: Tạo mới sản phẩm (Quản trị viên)
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
   *               - price
   *             properties:
   *               name:
   *                 type: string
   *                 example: Laptop Gaming Asus ROG Strix G16
   *               price:
   *                 type: number
   *                 example: 35990000
   *               originalPrice:
   *                 type: number
   *                 example: 39990000
   *               categoryId:
   *                 type: string
   *                 example: CAT-LAPTOP
   *               manufacturerId:
   *                 type: string
   *                 example: MFR-ASUS
   *               description:
   *                 type: string
   *                 example: Laptop gaming cao cấp màn hình 240Hz, CPU i9 Intel 14th
   *               stock:
   *                 type: integer
   *                 example: 15
   *               status:
   *                 type: string
   *                 example: active
   *               images:
   *                 type: array
   *                 items:
   *                   type: string
   *                 example: ["https://example.com/rog-strix-1.jpg"]
   *     responses:
   *       201:
   *         description: Tạo sản phẩm thành công
   *       401:
   *         description: Chưa xác thực
   *       403:
   *         description: Không có quyền truy cập
   */
  router.post("/", authenticate, authorize("product_manager", "system_admin"), productController.create);

  /**
   * @openapi
   * /api/products/{id}:
   *   put:
   *     tags:
   *       - Products
   *     summary: Cập nhật thông tin sản phẩm
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
   *                 example: Laptop Gaming Asus ROG Strix G16 (2026 Edition)
   *               price:
   *                 type: number
   *                 example: 34990000
   *               stock:
   *                 type: integer
   *                 example: 20
   *               description:
   *                 type: string
   *                 example: Cập nhật thông tin khuyến mãi đi kèm
   *               status:
   *                 type: string
   *                 example: active
   *     responses:
   *       200:
   *         description: Cập nhật sản phẩm thành công
   */
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), productController.update);

  /**
   * @openapi
   * /api/products/{id}:
   *   delete:
   *     tags:
   *       - Products
   *     summary: Xóa sản phẩm
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
   *         description: Xóa sản phẩm thành công
   */
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), productController.delete);

  return router;
}

module.exports = { createProductRouter };
