const { promotionService } = require("../services/promotion.service");

const promotionController = {
  async getAll(req, res, next) {
    try {
      res.json(await promotionService.getAll());
    } catch (e) {
      next(e);
    }
  },
  async getById(req, res, next) {
    try {
      res.json(await promotionService.getById(req.params.id));
    } catch (e) {
      next(e);
    }
  },
  async create(req, res, next) {
    try {
      res.status(201).json(await promotionService.create(req.body));
    } catch (e) {
      next(e);
    }
  },
  async update(req, res, next) {
    try {
      res.json(await promotionService.update(req.params.id, req.body));
    } catch (e) {
      next(e);
    }
  },
  async delete(req, res, next) {
    try {
      await promotionService.delete(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { promotionController };
