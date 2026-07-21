const Warehouse = require("../database/models/Warehouse.model");

const warehouseRepository = {
  async getAll() {
    return Warehouse.find().sort({ id: 1 });
  },

  async getById(id) {
    return Warehouse.findOne({ id: Number(id) });
  },

  async getByCode(code, { excludeId } = {}) {
    const query = { code: String(code).toUpperCase().trim() };
    if (excludeId !== undefined && excludeId !== null) {
      query.id = { $ne: Number(excludeId) };
    }
    return Warehouse.findOne(query);
  },

  async create(data) {
    const last = await Warehouse.findOne().sort({ id: -1 });
    const nextId = last && last.id ? last.id + 1 : 1;

    const warehouse = new Warehouse({ ...data, id: nextId });
    return warehouse.save();
  },

  async update(id, data) {
    return Warehouse.findOneAndUpdate({ id: Number(id) }, data, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id) {
    return Warehouse.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { warehouseRepository };
