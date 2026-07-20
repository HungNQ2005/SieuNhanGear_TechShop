const express = require("express");
const { warehouseController } = require("../controllers/warehouse.controller");

function createWarehouseRouter() {
  const router = express.Router();

  // GET /api/warehouses
  router.get("/", warehouseController.getAll);

  // GET /api/warehouses/:id
  router.get("/:id", warehouseController.getById);

  // POST /api/warehouses
  router.post("/", warehouseController.create);

  // PUT /api/warehouses/:id
  router.put("/:id", warehouseController.update);

  // DELETE /api/warehouses/:id
  router.delete("/:id", warehouseController.delete);

  return router;
}

module.exports = { createWarehouseRouter };
