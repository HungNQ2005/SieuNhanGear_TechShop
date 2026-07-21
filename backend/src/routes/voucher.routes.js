const express = require("express");
const { voucherController } = require("../controllers/voucher.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createVoucherRouter() {
  const router = express.Router();

  // GET /api/vouchers
  router.get("/", voucherController.getAll);

  // GET /api/vouchers/:id
  router.get("/:id", voucherController.getById);

  // POST /api/vouchers
  router.post("/", authenticate, authorize("product_manager", "system_admin"), voucherController.create);

  // PUT /api/vouchers/:id
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), voucherController.update);

  // DELETE /api/vouchers/:id
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), voucherController.delete);

  return router;
}

module.exports = { createVoucherRouter };
