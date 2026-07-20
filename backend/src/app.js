const express = require('express');
const cors = require('cors');
const path = require('path');

const { env } = require('./config/env');
const { ROUTES } = require('./constants/routes.constants');
const { createCatalogRouter } = require('./features/catalog/routes/catalog.routes');

const { createHealthRouter } = require('./routes/health.routes');

const { createAuthRouter } = require('./features/auth/routes/auth.routes');
const { createCartRouter } = require('./features/cart/routes/cart.routes');
const { createProductRouter } = require('./features/product/routes/product.routes');
const { createCategoryRouter } = require('./features/product/routes/category.routes');
const { createManufacturerRouter } = require('./features/product/routes/manufacturer.routes');
const { createAccountRouter } = require('./features/auth/routes/account.routes');
const { createHomeRouter } = require('./features/home/routes/home.routes');
const { createBannerRouter } = require('./features/home/routes/banner.routes');
const { createOrdersRouter } = require('./features/order/routes/orders.routes');
const { notFoundMiddleware } = require('./middlewares/notFound.middleware');
const { errorMiddleware } = require('./middlewares/error.middleware');
const { createVoucherRouter } = require("./routes/voucher.routes");
const { createShowroomRouter } = require("./routes/showroom.routes");
const { createAIRouter } = require('./features/ai/ai.routes');


function createApp() {
  const app = express();

  app.use(cors({
    origin: env.CORS_ORIGINS,
    credentials: true,
  }));
  app.use(express.json({ limit: '5mb' }));
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ code: 'INVALID_JSON', message: 'Request body must be valid JSON.' });
    }
    return next(err);
  });

  // Serve static files from the "src/asset/images" directory
  app.use('/src/asset/images', express.static(path.join(__dirname, '../src/asset/images')));

  app.get('/', (req, res) => {
    res.json({ name: 'sieunhangearstore-backend', status: 'ok' });
  });

  app.use(ROUTES.HEALTH.BASE, createHealthRouter());
  app.use(ROUTES.CATALOG.BASE, createCatalogRouter());

  app.use(ROUTES.AUTH.BASE, createAuthRouter());
  app.use(ROUTES.CART.BASE, createCartRouter());
  app.use(ROUTES.PRODUCT.BASE, createProductRouter());
  app.use(ROUTES.CATEGORY.BASE, createCategoryRouter());
  app.use(ROUTES.MANUFACTURER.BASE, createManufacturerRouter());
  app.use(ROUTES.HOME.BASE, createHomeRouter());
  app.use(ROUTES.BANNER.BASE, createBannerRouter());
  app.use(ROUTES.ACCOUNT.BASE, createAccountRouter());
  app.use('/api/orders', createOrdersRouter());
  app.use('/api/ai', createAIRouter());
  app.use(ROUTES.SHOWROOM.BASE, createShowroomRouter());
  app.use(ROUTES.VOUCHER.BASE, createVoucherRouter());

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}

module.exports = { createApp };