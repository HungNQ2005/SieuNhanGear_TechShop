const express = require("express");
const { promotionController } = require("../controllers/promotion.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createPromotionRouter() {
  const router = express.Router();

  // GET công khai để hiển thị Flash Sale ngoài trang chủ
  router.get("/", promotionController.getAll);
  router.get("/:id", promotionController.getById);

  // Ghi dữ liệu chỉ product_manager (UC-12 Manage Promotion)
  router.post("/", authenticate, authorize("product_manager"), promotionController.create);
  router.put("/:id", authenticate, authorize("product_manager"), promotionController.update);
  router.delete("/:id", authenticate, authorize("product_manager"), promotionController.delete);

  return router;
}

module.exports = { createPromotionRouter };
