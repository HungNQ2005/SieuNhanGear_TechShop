const express = require("express");
const { specificationController } = require("../controllers/specification.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

// UC-20 Manage Product Specifications (CRUD) - chỉ product_manager được ghi
function createSpecificationRouter() {
  const router = express.Router();

  router.get("/groups", specificationController.getAllGroups);
  router.post("/groups", authenticate, authorize("product_manager", "system_admin"), specificationController.createGroup);
  router.put("/groups/:id", authenticate, authorize("product_manager", "system_admin"), specificationController.updateGroup);
  router.delete("/groups/:id", authenticate, authorize("product_manager", "system_admin"), specificationController.deleteGroup);

  router.get("/attributes", specificationController.getAllAttributes);
  router.post("/attributes", authenticate, authorize("product_manager", "system_admin"), specificationController.createAttribute);
  router.put("/attributes/:id", authenticate, authorize("product_manager", "system_admin"), specificationController.updateAttribute);
  router.delete("/attributes/:id", authenticate, authorize("product_manager", "system_admin"), specificationController.deleteAttribute);

  return router;
}

module.exports = { createSpecificationRouter };
