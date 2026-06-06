const express = require('express');
const cors = require('cors');

const { env } = require('./config/env');
const { ROUTES } = require('./constants/routes.constants');
const { createCatalogRouter } = require('./features/catalog/routes/catalog.routes');

const { createHealthRouter } = require('./routes/health.routes');

const { createAuthRouter } = require('./features/auth/routes/auth.routes');
const { createCartRouter } = require('./features/cart/routes/cart.routes');
const { createProductRouter } = require('./features/product/routes/product.routes');
const { createHomeRouter } = require('./features/home/routes/home.routes');
const { notFoundMiddleware } = require('./middlewares/notFound.middleware');
const { errorMiddleware } = require('./middlewares/error.middleware');


function createApp() {
  const app = express();

  app.use(cors({
    origin: env.CORS_ORIGINS,
    credentials: true,
  }));
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ name: 'sieunhangearstore-backend', status: 'ok' });
  });

  app.use(ROUTES.HEALTH.BASE, createHealthRouter());
  app.use(ROUTES.CATALOG.BASE, createCatalogRouter());

  app.use(ROUTES.AUTH.BASE, createAuthRouter());
  app.use(ROUTES.CART.BASE, createCartRouter());
  app.use(ROUTES.PRODUCT.BASE, createProductRouter());
  app.use(ROUTES.HOME.BASE, createHomeRouter());

  app.use(notFoundMiddleware);

  app.use(errorMiddleware);

  return app;
}

module.exports = { createApp };


