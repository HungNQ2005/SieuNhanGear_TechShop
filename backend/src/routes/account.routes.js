const express = require("express");
const { accountController } = require("../controllers/account.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

// UC-24 Manage Staff Accounts: chỉ System Admin được xem/tạo/sửa/xoá tài khoản
function createAccountRouter() {
  const router = express.Router();

  router.use(authenticate, authorize("system_admin"));

  // GET /api/accounts
  router.get("/", accountController.getAll);

  // GET /api/accounts/:id
  router.get("/:id", accountController.getById);

  // POST /api/accounts
  router.post("/", accountController.create);

  // PUT /api/accounts/:id
  router.put("/:id", accountController.update);

  // DELETE /api/accounts/:id
  router.delete("/:id", accountController.delete);

  return router;
}

module.exports = { createAccountRouter };
