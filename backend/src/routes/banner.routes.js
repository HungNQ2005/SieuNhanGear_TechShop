const express = require("express");
const { bannerController } = require("../controllers/banner.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createBannerRouter() {
  const router = express.Router();

  router.get("/", bannerController.getAll);
  router.get("/:id", bannerController.getById);

  router.post("/", authenticate, authorize("product_manager"), bannerController.create);
  router.put("/:id", authenticate, authorize("product_manager"), bannerController.update);
  router.delete("/:id", authenticate, authorize("product_manager"), bannerController.delete);

  return router;
}

module.exports = { createBannerRouter };
