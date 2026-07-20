const express = require("express");
const { productController } = require("../../../controllers/product.controller");
const { authenticate, authorize } = require("../../../middlewares/auth.middleware");

function createProductRouter() {
  const router = express.Router();

  // GET /api/products (hỗ trợ filter ?category_id=)
  router.get("/", productController.getAll);

  // GET /api/products/:id
  router.get("/:id", productController.getById);

  // POST /api/products (UC-19 Manage Products)
  router.post("/", authenticate, authorize("product_manager", "system_admin"), productController.create);

  // PUT /api/products/:id
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), productController.update);

  // DELETE /api/products/:id
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), productController.delete);

  return router;
}

module.exports = { createProductRouter };
