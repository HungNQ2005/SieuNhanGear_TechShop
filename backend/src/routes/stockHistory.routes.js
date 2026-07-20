const express = require("express");
const { stockHistoryController } = require("../controllers/stockHistory.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createStockHistoryRouter() {
  const router = express.Router();

  // GET /api/stock-history (hỗ trợ filter ?productId=&warehouseId=)
  router.get("/", stockHistoryController.getAll);

  // GET /api/stock-history/:id
  router.get("/:id", stockHistoryController.getById);

  // POST /api/stock-history
  router.post("/", authenticate, authorize("product_manager"), stockHistoryController.create);

  return router;
}

module.exports = { createStockHistoryRouter };
