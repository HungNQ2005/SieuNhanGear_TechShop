const express = require("express");
const { stockController } = require("../controllers/stock.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createStockRouter() {
  const router = express.Router();

  // GET /api/stock (hỗ trợ filter ?productId=&warehouseId=)
  router.get("/", stockController.getAll);

  // GET /api/stock/:id
  router.get("/:id", stockController.getById);

  // POST /api/stock
  router.post("/", authenticate, authorize("product_manager"), stockController.create);

  // PUT /api/stock/:id  (dùng khi Restock)
  router.put("/:id", authenticate, authorize("product_manager"), stockController.update);

  // DELETE /api/stock/:id
  router.delete("/:id", authenticate, authorize("product_manager"), stockController.delete);

  return router;
}

module.exports = { createStockRouter };
