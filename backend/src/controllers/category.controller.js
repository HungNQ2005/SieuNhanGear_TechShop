const { categoryService } = require("../services/category.service");

const categoryController = {
  async getAll(req, res, next) {
    try {
      const data = await categoryService.getAllCategories();
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await categoryService.getCategoryById(id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const data = await categoryService.createCategory(req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = await categoryService.updateCategory(id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { categoryController };
