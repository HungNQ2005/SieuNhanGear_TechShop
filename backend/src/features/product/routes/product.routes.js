const express = require("express");
const { productController } = require("../../../controllers/product.controller");

function createProductRouter() {
  const router = express.Router();

  // GET /api/products (hỗ trợ filter ?category_id=)
  router.get("/", productController.getAll);

  // GET /api/products/:id
  router.get("/:id", productController.getById);

  // POST /api/products
  router.post("/", productController.create);

  // PUT /api/products/:id
  router.put("/:id", productController.update);

  // DELETE /api/products/:id
  router.delete("/:id", productController.delete);

  return router;
}

module.exports = { createProductRouter };
