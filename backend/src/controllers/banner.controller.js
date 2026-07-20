const { bannerService } = require("../services/banner.service");

const bannerController = {
  async getAll(req, res, next) {
    try {
      res.json(await bannerService.getAll());
    } catch (e) {
      next(e);
    }
  },
  async getById(req, res, next) {
    try {
      res.json(await bannerService.getById(req.params.id));
    } catch (e) {
      next(e);
    }
  },
  async create(req, res, next) {
    try {
      res.status(201).json(await bannerService.create(req.body));
    } catch (e) {
      next(e);
    }
  },
  async update(req, res, next) {
    try {
      res.json(await bannerService.update(req.params.id, req.body));
    } catch (e) {
      next(e);
    }
  },
  async delete(req, res, next) {
    try {
      await bannerService.delete(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { bannerController };
