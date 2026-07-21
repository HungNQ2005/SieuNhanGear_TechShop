const StockHistory = require("../database/models/StockHistory.model");

const stockHistoryRepository = {
  async getAll({ productId, warehouseId } = {}) {
    const query = {};
    if (productId !== undefined && productId !== null) {
      query.productId = Number(productId);
    }
    if (warehouseId !== undefined && warehouseId !== null) {
      query.warehouseId = Number(warehouseId);
    }
    return StockHistory.find(query).sort({ date: -1 });
  },

  async getById(id) {
    return StockHistory.findOne({ id: Number(id) });
  },

  async create(data) {
    const last = await StockHistory.findOne().sort({ id: -1 });
    const nextId = last && last.id ? last.id + 1 : 1;

    const entry = new StockHistory({ ...data, id: nextId });
    return entry.save();
  },
};

module.exports = { stockHistoryRepository };
