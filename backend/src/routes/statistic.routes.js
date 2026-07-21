const express = require("express");
const { statisticController } = require("../controllers/statistic.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createStatisticRouter() {
  const router = express.Router();

  router.get(
    "/overview",
    authenticate,
    authorize("product_manager", "system_admin"),
    statisticController.getOverview
  );

  return router;
}

module.exports = { createStatisticRouter };
