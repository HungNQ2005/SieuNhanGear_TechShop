const Stock = require("../database/models/Stock.model");

const stockRepository = {
  async getAll({ productId, warehouseId } = {}) {
    const query = {};
    if (productId !== undefined && productId !== null) {
      query.productId = Number(productId);
    }
    if (warehouseId !== undefined && warehouseId !== null) {
      query.warehouseId = Number(warehouseId);
    }
    return Stock.find(query).sort({ id: 1 });
  },

  async getById(id) {
    return Stock.findOne({ id: Number(id) });
  },

  async getByProductAndWarehouse(productId, warehouseId, { excludeId } = {}) {
    const query = {
      productId: Number(productId),
      warehouseId: Number(warehouseId),
    };
    if (excludeId !== undefined && excludeId !== null) {
      query.id = { $ne: Number(excludeId) };
    }
    return Stock.findOne(query);
  },

  async create(data) {
    const last = await Stock.findOne().sort({ id: -1 });
    const nextId = last && last.id ? last.id + 1 : 1;

    const stock = new Stock({ ...data, id: nextId });
    return stock.save();
  },

  async update(id, data) {
    return Stock.findOneAndUpdate({ id: Number(id) }, data, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id) {
    return Stock.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { stockRepository };
