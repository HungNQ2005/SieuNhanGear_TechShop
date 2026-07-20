const express = require("express");
const { specificationController } = require("../controllers/specification.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

// UC-20 Manage Product Specifications (CRUD) - chỉ product_manager được ghi
function createSpecificationRouter() {
  const router = express.Router();

  router.get("/groups", specificationController.getAllGroups);
  router.post("/groups", authenticate, authorize("product_manager"), specificationController.createGroup);
  router.put("/groups/:id", authenticate, authorize("product_manager"), specificationController.updateGroup);
  router.delete("/groups/:id", authenticate, authorize("product_manager"), specificationController.deleteGroup);

  router.get("/attributes", specificationController.getAllAttributes);
  router.post("/attributes", authenticate, authorize("product_manager"), specificationController.createAttribute);
  router.put("/attributes/:id", authenticate, authorize("product_manager"), specificationController.updateAttribute);
  router.delete("/attributes/:id", authenticate, authorize("product_manager"), specificationController.deleteAttribute);

  return router;
}

module.exports = { createSpecificationRouter };
