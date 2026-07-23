const express = require('express');
const { authController } = require('../controllers/auth.controller');
const { authenticate } = require('../../../middlewares/auth.middleware');

function createAuthRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/auth/register:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Đăng ký tài khoản người dùng
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
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               fullName:
   *                 type: string
   *               phone:
   *                 type: string
   *     responses:
   *       201:
   *         description: Đăng ký thành công
   *       400:
   *         description: Yêu cầu không hợp lệ
   */
  router.post('/register', authController.register);

  /**
   * @openapi
   * /api/auth/login:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Đăng nhập tài khoản
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Đăng nhập thành công, trả về JWT token
   *       401:
   *         description: Sai thông tin đăng nhập
   */
  router.post('/login', authController.login);

  /**
   * @openapi
   * /api/auth/logout:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Đăng xuất người dùng
   *     responses:
   *       200:
   *         description: Đăng xuất thành công
   */
  router.post('/logout', (req, res) => {
    res.json({ success: true, message: "Logged out successfully" });
  });

  /**
   * @openapi
   * /api/auth/me:
   *   get:
   *     tags:
   *       - Auth
   *     summary: Lấy thông tin cá nhân hiện tại
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Trả về thông tin profile người dùng
   *       401:
   *         description: Chưa xác thực
   */
  router.get('/me', authenticate, authController.me);

  /**
   * @openapi
   * /api/auth/me:
   *   put:
   *     tags:
   *       - Auth
   *     summary: Cập nhật thông tin cá nhân
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fullName:
   *                 type: string
   *               phone:
   *                 type: string
   *               address:
   *                 type: string
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   *       401:
   *         description: Chưa xác thực
   */
  router.put('/me', authenticate, authController.updateMe);

  /**
   * @openapi
   * /api/auth/forgot-password:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Quên mật khẩu
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Đã gửi email / phản hồi hướng dẫn đặt lại mật khẩu
   */
  router.post('/forgot-password', authController.forgotPassword);

  return router;
}

module.exports = { createAuthRouter };
