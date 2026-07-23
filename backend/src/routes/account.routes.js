const express = require("express");
const { accountController } = require("../controllers/account.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

// UC-24 Manage Staff Accounts: chỉ System Admin được xem/tạo/sửa/xoá tài khoản
function createAccountRouter() {
  const router = express.Router();

  router.use(authenticate);

  /**
   * @openapi
   * /api/accounts/{id}:
   *   get:
   *     tags:
   *       - Accounts
   *     summary: Lấy thông tin tài khoản theo ID
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
   *         description: Thông tin tài khoản
   */
  router.get("/:id", (req, res, next) => {
    const numericId = Number(req.params.id);
    if (req.user && (req.user.role === "system_admin" || req.user.role === "admin" || req.user.id === numericId)) {
      return accountController.getById(req, res, next);
    }
    return authorize("system_admin")(req, res, next);
  });

  router.use(authorize("system_admin"));

  /**
   * @openapi
   * /api/accounts:
   *   get:
   *     tags:
   *       - Accounts
   *     summary: Lấy danh sách tất cả tài khoản (Quản trị hệ thống)
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Danh sách tài khoản
   */
  router.get("/", accountController.getAll);

  /**
   * @openapi
   * /api/accounts:
   *   post:
   *     tags:
   *       - Accounts
   *     summary: Tạo tài khoản nhân viên / quản trị viên mới
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - email
   *               - password
   *               - role
   *             properties:
   *               username:
   *                 type: string
   *                 example: staff_sales01
   *               email:
   *                 type: string
   *                 example: sales01@sieunhangear.com
   *               password:
   *                 type: string
   *                 example: Password123!
   *               role:
   *                 type: string
   *                 enum: [customer, sales_staff, product_manager, system_admin]
   *                 example: sales_staff
   *               fullName:
   *                 type: string
   *                 example: Nguyễn Văn C
   *               phone:
   *                 type: string
   *                 example: 0912345678
   *     responses:
   *       201:
   *         description: Tạo tài khoản thành công
   */
  router.post("/", accountController.create);

  /**
   * @openapi
   * /api/accounts/{id}:
   *   put:
   *     tags:
   *       - Accounts
   *     summary: Cập nhật thông tin tài khoản
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
   *               fullName:
   *                 type: string
   *                 example: Nguyễn Văn C (Cập nhật)
   *               phone:
   *                 type: string
   *                 example: 0988888888
   *               role:
   *                 type: string
   *                 example: sales_staff
   *               status:
   *                 type: string
   *                 example: active
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   */
  router.put("/:id", accountController.update);

  /**
   * @openapi
   * /api/accounts/{id}:
   *   delete:
   *     tags:
   *       - Accounts
   *     summary: Xóa tài khoản
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
   *         description: Xóa tài khoản thành công
   */
  router.delete("/:id", accountController.delete);

  return router;
}

module.exports = { createAccountRouter };
