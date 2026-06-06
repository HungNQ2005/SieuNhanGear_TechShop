const { catalogService } = require('../services/catalog.service');

const catalogController = {
  async getBanners(req, res, next) {
    try {
      const data = await catalogService.getBanners();
      res.json({ data });
    } catch (e) {
      next(e);
    }
  },

  async getProducts(req, res, next) {
    try {
      const data = await catalogService.getProducts();
      res.json({ data });
    } catch (e) {
      next(e);
    }
  },

  async getCategories(req, res, next) {
    try {
      const data = await catalogService.getCategories();
      res.json({ data });
    } catch (e) {
      next(e);
    }
  },

  async getManufacturers(req, res, next) {
    try {
      const data = await catalogService.getManufacturers();
      res.json({ data });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { catalogController };

