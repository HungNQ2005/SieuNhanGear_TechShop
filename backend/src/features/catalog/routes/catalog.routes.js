const express = require('express');

const { ROUTES } = require('../../../constants/routes.constants');
const { catalogController } = require('../controllers/catalog.controller');

function createCatalogRouter() {
  const router = express.Router();

  // GET /api/catalog/banners
  router.get(ROUTES.CATALOG.BANNERS, catalogController.getBanners);

  // GET /api/catalog/products
  router.get(ROUTES.CATALOG.PRODUCTS, catalogController.getProducts);

  // GET /api/catalog/categories
  router.get(ROUTES.CATALOG.CATEGORIES, catalogController.getCategories);

  // GET /api/catalog/manufacturers
  router.get(ROUTES.CATALOG.MANUFACTURERS, catalogController.getManufacturers);

  return router;
}

module.exports = { createCatalogRouter };

