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

  async create(data) {
    const id = await nextId(Order);
    const code = `ORD-${Date.now()}`;
    const order = new Order({ ...data, id, code });
    return order.save();
  },

  async updateStatus(id, statusId) {
    return Order.findOneAndUpdate({ id: Number(id) }, { statusId }, { new: true, runValidators: true });
  },

  async updatePayment(id, paymentStatus) {
    return Order.findOneAndUpdate({ id: Number(id) }, { paymentStatus }, { new: true, runValidators: true });
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
