const Order = require("../database/models/Order.model");
const { nextId } = require("../utils/nextId");

const orderRepository = {
  async getAll({ customerId, statusId } = {}) {
    const query = {};
    if (customerId !== undefined && customerId !== null) query.customerId = Number(customerId);
    if (statusId !== undefined && statusId !== null) query.statusId = Number(statusId);
    return Order.find(query).sort({ createdAt: -1 });
  },

  async getById(id) {
    return Order.findOne({ id: Number(id) });
  },

  async getByCode(code) {
    if (!code) return [];
    const trimmed = String(code).trim();
    const numericId = Number(trimmed);
    const conditions = [
      { code: trimmed },
      { code: { $regex: trimmed, $options: "i" } }
    ];
    if (!isNaN(numericId) && numericId > 0) {
      conditions.push({ id: numericId });
    }
    return Order.find({ $or: conditions }).sort({ createdAt: -1 });
  },

  async create(data) {
    const id = await nextId(Order);
    const code = data.code || `ORD-${Date.now()}`;
    const order = new Order({ ...data, id, code });
    return order.save();
  },

  async updateStatus(id, statusId) {
    return Order.findOneAndUpdate({ id: Number(id) }, { statusId }, { new: true, runValidators: true });
  },

  async updatePayment(id, paymentStatus) {
    return Order.findOneAndUpdate({ id: Number(id) }, { paymentStatus }, { new: true, runValidators: true });
  },

  async update(id, data) {
    return Order.findOneAndUpdate({ id: Number(id) }, data, { new: true, runValidators: true });
  },

  async delete(id) {
    return Order.findOneAndDelete({ id: Number(id) });
  },

  async getBetweenDates(from, to) {
    const query = {};
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to) query.createdAt.$lte = new Date(to);
    }
    return Order.find(query).sort({ createdAt: -1 });
  },
};

module.exports = { orderRepository };
