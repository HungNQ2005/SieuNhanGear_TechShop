const { stockHistoryService } = require("../services/stockHistory.service");

const stockHistoryController = {
  async getAll(req, res, next) {
    try {
      const { productId, warehouseId } = req.query;
      const data = await stockHistoryService.getAllStockHistory({ productId, warehouseId });
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await stockHistoryService.getStockHistoryById(id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const data = await stockHistoryService.createStockHistory(req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { stockHistoryController };
