const express = require('express');

const { ROUTES } = require('../constants/routes.constants');
const { catalogController } = require('../controllers/catalog.controller');

function createCatalogRouter() {
  const router = express.Router();

  router.get(ROUTES.CATALOG.BANNERS, catalogController.getBanners);
  router.get(ROUTES.CATALOG.PRODUCTS, catalogController.getProducts);
  router.get(ROUTES.CATALOG.CATEGORIES, catalogController.getCategories);
  router.get(ROUTES.CATALOG.MANUFACTURERS, catalogController.getManufacturers);

  return router;
}

module.exports = { createCatalogRouter };


