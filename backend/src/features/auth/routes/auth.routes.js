const express = require('express');
const { authController } = require('../controllers/auth.controller');
const { authenticate } = require('../../../middlewares/auth.middleware');

function createAuthRouter() {
  const router = express.Router();

  // POST /api/auth/register (UC-01) - luôn tạo tài khoản Customer (role "user")
  router.post('/register', authController.register);

  // POST /api/auth/login (UC-02) - dùng chung cho mọi role, trả về JWT kèm role
  router.post('/login', authController.login);

  // POST /api/auth/logout
  router.post('/logout', (req, res) => {
    res.json({ success: true, message: "Logged out successfully" });
  });

  // GET /api/auth/me - lấy thông tin tài khoản đang đăng nhập (cần Bearer token)
  router.get('/me', authenticate, authController.me);

  // PUT /api/auth/me (UC-03 Manage Profile) - cập nhật thông tin của chính mình
  router.put('/me', authenticate, authController.updateMe);

  return router;
}

module.exports = { createAuthRouter };
