const { stockService } = require("../services/stock.service");

const stockController = {
  async getAll(req, res, next) {
    try {
      const { productId, warehouseId } = req.query;
      const data = await stockService.getAllStock({ productId, warehouseId });
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await stockService.getStockById(id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const data = await stockService.createStock(req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = await stockService.updateStock(id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await stockService.deleteStock(id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { stockController };
