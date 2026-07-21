const express = require("express");
const cors = require("cors");
const path = require("path");

const { env } = require("./config/env");
const { ROUTES } = require("./constants/routes.constants");
const { createCatalogRouter } = require("./features/catalog/routes/catalog.routes");
const { createHealthRouter } = require("./routes/health.routes");

const { createAuthRouter } = require("./features/auth/routes/auth.routes");
const { createCartRouter } = require("./features/cart/routes/cart.routes");
const { createProductRouter } = require("./features/product/routes/product.routes");
const { createHomeRouter } = require("./features/home/routes/home.routes");
const { notFoundMiddleware } = require("./middlewares/notFound.middleware");
const { errorMiddleware } = require("./middlewares/error.middleware");
const { createVoucherRouter } = require("./routes/voucher.routes");
const { createShowroomRouter } = require("./routes/showroom.routes");
const { createCategoryRouter } = require("./routes/category.routes");
const { createWarehouseRouter } = require("./routes/warehouse.routes");
const { createStockRouter } = require("./routes/stock.routes");
const { createStockHistoryRouter } = require("./routes/stockHistory.routes");
const { createAccountRouter } = require("./routes/account.routes");
const { createCommentRouter } = require("./routes/comment.routes");
const { createOrderRouter } = require("./routes/order.routes");
const { createPromotionRouter } = require("./routes/promotion.routes");
const { createSpecificationRouter } = require("./routes/specification.routes");
const { createBannerRouter } = require("./routes/banner.routes");
const { createManufacturerRouter } = require("./features/product/routes/manufacturer.routes");
const { createNewsRouter } = require("./routes/news.routes");
const { createOrderItemRouter } = require("./routes/orderItem.routes");
const { createStatisticRouter } = require("./routes/statistic.routes");
const { createProvinceRouter } = require("./routes/province.routes");
const { createAIRouter } = require("./features/ai/ai.routes");

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGINS,
      credentials: true,
    })
  );
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({ code: "INVALID_JSON", message: "Request body must be valid JSON." });
    }
    return next(err);
  });

  // Serve static files from the "src/asset/images" directory
  app.use("/src/asset/images", express.static(path.join(__dirname, "asset/images")));

  app.get("/api/orderStatus", (req, res) => {
    const { orderStatusRepository } = require("./repositories/orderStatus.repository");
    orderStatusRepository.getAll().then((data) => res.json(data)).catch(() => res.json([]));
  });

  app.get("/api/paymentMethods", (req, res) => {
    try {
      const demoData = require("./data/demo_data.json");
      return res.json(demoData.paymentMethods || [
        { id: 1, code: "COD", name: "Thanh toán khi nhận hàng (COD)", description: "Thanh toán tiền mặt khi nhận hàng" },
        { id: 2, code: "VNPAY", name: "Thanh toán qua VNPAY", description: "Thanh toán qua Ví điện tử / QR Code VNPAY" },
        { id: 3, code: "BANK", name: "Chuyển khoản ngân hàng", description: "Chuyển khoản qua tài khoản ngân hàng cửa hàng" }
      ]);
    } catch (_) {
      return res.json([
        { id: 1, code: "COD", name: "Thanh toán khi nhận hàng (COD)", description: "Thanh toán tiền mặt khi nhận hàng" },
        { id: 2, code: "VNPAY", name: "Thanh toán qua VNPAY", description: "Thanh toán qua Ví điện tử / QR Code VNPAY" },
        { id: 3, code: "BANK", name: "Chuyển khoản ngân hàng", description: "Chuyển khoản qua tài khoản ngân hàng cửa hàng" }
      ]);
    }
  });

  app.get("/api/shippingAddresses", (req, res) => {
    res.json([]);
  });

  app.use(ROUTES.HEALTH.BASE, createHealthRouter());
  app.use(ROUTES.CATALOG.BASE, createCatalogRouter());

  app.use(ROUTES.AUTH.BASE, createAuthRouter());
  app.use(ROUTES.CART.BASE, createCartRouter());
  app.use(ROUTES.PRODUCT.BASE, createProductRouter());
  app.use(ROUTES.HOME.BASE, createHomeRouter());

  app.use(ROUTES.SHOWROOM.BASE, createShowroomRouter());
  app.use(ROUTES.VOUCHER.BASE, createVoucherRouter());

  app.use(ROUTES.CATEGORY.BASE, createCategoryRouter());
  app.use(ROUTES.MANUFACTURER.BASE, createManufacturerRouter());
  app.use(ROUTES.NEWS.BASE, createNewsRouter());

  app.use(ROUTES.WAREHOUSE.BASE, createWarehouseRouter());
  app.use(ROUTES.STOCK.BASE, createStockRouter());
  app.use(ROUTES.STOCK_HISTORY.BASE, createStockHistoryRouter());
  app.use(ROUTES.ACCOUNT.BASE, createAccountRouter());

  app.use(ROUTES.COMMENT.BASE, createCommentRouter());
  app.use(ROUTES.ORDER.BASE, createOrderRouter());
  app.use("/api/orderItems", createOrderItemRouter());
  app.use(ROUTES.PROMOTION.BASE, createPromotionRouter());
  app.use(ROUTES.SPECIFICATION.BASE, createSpecificationRouter());
  app.use(ROUTES.BANNER.BASE, createBannerRouter());
  app.use(ROUTES.STATISTIC.BASE, createStatisticRouter());

  app.use("/api", createProvinceRouter());
  app.use("/api/ai", createAIRouter());

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}

module.exports = { createApp };
