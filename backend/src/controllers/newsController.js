const { newsService } = require("../services/news.service");

const newsController = {
  async getAllNews(req, res, next) {
    try {
      res.json(await newsService.getAll(req.query));
    } catch (e) {
      next(e);
    }
  },
  async getNewsById(req, res, next) {
    try {
      res.json(await newsService.getById(req.params.id));
    } catch (e) {
      next(e);
    }
  },
  async createNews(req, res, next) {
    try {
      res.status(201).json(await newsService.create(req.body));
    } catch (e) {
      next(e);
    }
  },
  async updateNews(req, res, next) {
    try {
      res.json(await newsService.update(req.params.id, req.body));
    } catch (e) {
      next(e);
    }
  },
  async deleteNews(req, res, next) {
    try {
      await newsService.delete(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
};

module.exports = newsController;
