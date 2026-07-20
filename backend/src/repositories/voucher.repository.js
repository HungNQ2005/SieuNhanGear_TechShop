const Voucher = require("../database/models/Voucher.model");

const voucherRepository = {
  async getAll() {
    return Voucher.find().sort({ createdAt: -1 });
  },

  async getById(id) {
    return Voucher.findById(id);
  },

  async getByCode(code, { excludeId } = {}) {
    const query = { code: String(code).toUpperCase().trim() };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    return Voucher.findOne(query);
  },

  async create(data) {
    const voucher = new Voucher(data);
    return voucher.save();
  },

  async update(id, data) {
    return Voucher.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id) {
    return Voucher.findByIdAndDelete(id);
  },
};

module.exports = { voucherRepository };
