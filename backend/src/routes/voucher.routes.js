const express = require("express");
const { voucherController } = require("../controllers/voucher.controller");

function createVoucherRouter() {
  const router = express.Router();

  // GET /api/vouchers
  router.get("/", voucherController.getAll);

  // GET /api/vouchers/:id
  router.get("/:id", voucherController.getById);

  // POST /api/vouchers
  router.post("/", voucherController.create);

  // PUT /api/vouchers/:id
  router.put("/:id", voucherController.update);

  // DELETE /api/vouchers/:id
  router.delete("/:id", voucherController.delete);

  return router;
}

module.exports = { createVoucherRouter };
