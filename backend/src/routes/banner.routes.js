const express = require("express");
const { bannerController } = require("../controllers/banner.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createBannerRouter() {
  const router = express.Router();

  router.get("/", bannerController.getAll);
  router.get("/:id", bannerController.getById);

  router.post("/", authenticate, authorize("product_manager", "system_admin"), bannerController.create);
  router.put("/:id", authenticate, authorize("product_manager", "system_admin"), bannerController.update);
  router.delete("/:id", authenticate, authorize("product_manager", "system_admin"), bannerController.delete);

  return router;
}

module.exports = { createBannerRouter };
