const express = require("express");
const { warehouseController } = require("../controllers/warehouse.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createWarehouseRouter() {
  const router = express.Router();

  // GET /api/warehouses
  router.get("/", warehouseController.getAll);

  // GET /api/warehouses/:id
  router.get("/:id", warehouseController.getById);

  // POST /api/warehouses
  router.post("/", authenticate, authorize("product_manager"), warehouseController.create);

  // PUT /api/warehouses/:id
  router.put("/:id", authenticate, authorize("product_manager"), warehouseController.update);

  // DELETE /api/warehouses/:id
  router.delete("/:id", authenticate, authorize("product_manager"), warehouseController.delete);

  return router;
}

module.exports = { createWarehouseRouter };
