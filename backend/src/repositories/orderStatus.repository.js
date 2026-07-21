const OrderStatus = require("../database/models/OrderStatus.model");

// Bộ trạng thái mặc định (đúng ghi chú trong bảng UC: Pending, Confirmed, Processing, Delivered, Cancelled)
const DEFAULT_STATUSES = [
  { id: 1, name: "Pending", color: "#F59E0B" },
  { id: 2, name: "Confirmed", color: "#2563EB" },
  { id: 3, name: "Processing", color: "#8B5CF6" },
  { id: 4, name: "Delivered", color: "#16A34A" },
  { id: 5, name: "Cancelled", color: "#DC2626" },
];

const orderStatusRepository = {
  async getAll() {
    const count = await OrderStatus.countDocuments();
    if (count === 0) {
      await OrderStatus.insertMany(DEFAULT_STATUSES);
    }
    return OrderStatus.find().sort({ id: 1 });
  },

  async getById(id) {
    await this.getAll(); // đảm bảo đã seed
    return OrderStatus.findOne({ id: Number(id) });
  },
};

module.exports = { orderStatusRepository, DEFAULT_STATUSES };
