const OrderItem = require("../database/models/OrderItem.model");
const { nextId } = require("../utils/nextId");

const orderItemRepository = {
  async getByOrder(orderId) {
    return OrderItem.find({ orderId: Number(orderId) }).sort({ id: 1 });
  },

  async createMany(items) {
    const created = [];
    // Tạo tuần tự để đảm bảo id tự tăng không bị trùng
    for (const item of items) {
      const id = await nextId(OrderItem);
      const orderItem = new OrderItem({ ...item, id });
      created.push(await orderItem.save());
    }
    return created;
  },
};

module.exports = { orderItemRepository };
