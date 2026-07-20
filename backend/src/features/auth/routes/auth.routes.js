const express = require('express');
const { ROUTES } = require('../../../constants/routes.constants');
const { register, login, logout } = require('../../../controllers/authController');

// STUB: auth routes (chưa có DB/JWT)
function createAuthRouter() {
  const router = express.Router();

  // POST /api/auth/login
  router.post(ROUTES.AUTH.LOGIN, login);

  // POST /api/auth/logout
  router.post(ROUTES.AUTH.LOGOUT, logout);

  // POST /api/auth/register
  router.post(ROUTES.AUTH.REGISTER, register);

  return router;
}

module.exports = { createAuthRouter };