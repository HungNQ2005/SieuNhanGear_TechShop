const express = require("express");
const { accountController } = require("../controllers/account.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

// UC-24 Manage Staff Accounts: chỉ System Admin được xem/tạo/sửa/xoá tài khoản
function createAccountRouter() {
  const router = express.Router();

  router.use(authenticate);

  // GET /api/accounts/:id (cho phép tự xem profile của chính mình hoặc System Admin xem mọi tài khoản)
  router.get("/:id", (req, res, next) => {
    const numericId = Number(req.params.id);
    if (req.user && (req.user.role === "system_admin" || req.user.role === "admin" || req.user.id === numericId)) {
      return accountController.getById(req, res, next);
    }
    return authorize("system_admin")(req, res, next);
  });

  // Chỉ System Admin mới được quản lý danh sách và thao tác CRUD tài khoản
  router.use(authorize("system_admin"));

  // GET /api/accounts
  router.get("/", accountController.getAll);

  // POST /api/accounts
  router.post("/", accountController.create);

  // PUT /api/accounts/:id
  router.put("/:id", accountController.update);

  // DELETE /api/accounts/:id
  router.delete("/:id", accountController.delete);

  return router;
}

module.exports = { createAccountRouter };
