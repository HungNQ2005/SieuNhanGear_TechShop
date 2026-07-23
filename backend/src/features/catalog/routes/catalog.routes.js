const express = require('express');

const { ROUTES } = require('../../../constants/routes.constants');
const { catalogController } = require('../controllers/catalog.controller');

function createCatalogRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/catalog/banners:
   *   get:
   *     tags:
   *       - Catalog
   *     summary: Lấy danh sách banner quảng cáo cho catalog
   *     responses:
   *       200:
   *         description: Danh sách banner
   */
  router.get(ROUTES.CATALOG.BANNERS, catalogController.getBanners);

  /**
   * @openapi
   * /api/catalog/products:
   *   get:
   *     tags:
   *       - Catalog
   *     summary: Lấy danh sách sản phẩm trong catalog
   *     responses:
   *       200:
   *         description: Danh sách sản phẩm catalog
   */
  router.get(ROUTES.CATALOG.PRODUCTS, catalogController.getProducts);

  /**
   * @openapi
   * /api/catalog/categories:
   *   get:
   *     tags:
   *       - Catalog
   *     summary: Lấy danh sách danh mục trong catalog
   *     responses:
   *       200:
   *         description: Danh sách danh mục
   */
  router.get(ROUTES.CATALOG.CATEGORIES, catalogController.getCategories);

  /**
   * @openapi
   * /api/catalog/manufacturers:
   *   get:
   *     tags:
   *       - Catalog
   *     summary: Lấy danh sách nhà sản xuất trong catalog
   *     responses:
   *       200:
   *         description: Danh sách nhà sản xuất
   */
  router.get(ROUTES.CATALOG.MANUFACTURERS, catalogController.getManufacturers);

  return router;
}

module.exports = { createCatalogRouter };

