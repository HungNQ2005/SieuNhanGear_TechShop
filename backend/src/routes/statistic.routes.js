const express = require("express");
const { statisticController } = require("../controllers/statistic.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createStatisticRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/statistics/overview:
   *   get:
   *     tags:
   *       - Statistics
   *     summary: Lấy dữ liệu tổng quan thống kê báo cáo (Quản trị viên)
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Báo cáo thống kê hệ thống
   */
  router.get(
    "/overview",
    authenticate,
    authorize("product_manager", "system_admin"),
    statisticController.getOverview
  );

  return router;
}

module.exports = { createStatisticRouter };
