const express = require("express");
const { accountController } = require("../controllers/account.controller");

function createAccountRouter() {
  const router = express.Router();

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
