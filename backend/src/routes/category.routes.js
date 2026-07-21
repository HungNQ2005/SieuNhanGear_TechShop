const express = require("express");
const { categoryController } = require("../controllers/category.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createCategoryRouter() {
  const router = express.Router();

  // GET /api/categories
  router.get("/", categoryController.getAll);

  // GET /api/categories/:id
  router.get("/:id", categoryController.getById);

  // POST /api/categories
  router.post("/", authenticate, authorize("product_manager", "system_admin"), categoryController.create);

  // PUT /api/categories/:id
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), categoryController.update);

  // DELETE /api/categories/:id
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), categoryController.delete);

  return router;
}

module.exports = { createCategoryRouter };
