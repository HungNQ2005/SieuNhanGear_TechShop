const Promotion = require("../database/models/Promotion.model");
const { nextId } = require("../utils/nextId");

const promotionRepository = {
  async getAll() {
    return Promotion.find().sort({ id: 1 });
  },

  async getById(id) {
    return Promotion.findOne({ id: Number(id) });
  },

  async create(data) {
    const id = await nextId(Promotion);
    const promotion = new Promotion({ ...data, id });
    return promotion.save();
  },

  async update(id, data) {
    return Promotion.findOneAndUpdate({ id: Number(id) }, data, { new: true, runValidators: true });
  },

  async delete(id) {
    return Promotion.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { promotionRepository };
