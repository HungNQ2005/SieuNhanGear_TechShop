const { voucherService } = require("../services/voucher.service");

const voucherController = {
  async getAll(req, res, next) {
    try {
      const data = await voucherService.getAllVouchers();
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await voucherService.getVoucherById(id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const data = await voucherService.createVoucher(req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = await voucherService.updateVoucher(id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await voucherService.deleteVoucher(id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { voucherController };
