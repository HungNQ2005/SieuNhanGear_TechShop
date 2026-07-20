const { promotionRepository } = require("../repositories/promotion.repository");
const { HttpError } = require("../errors/httpError");

function validate(data, { partial = false } = {}) {
  const errors = [];

  if (!partial || data.name !== undefined) {
    if (!data.name || !String(data.name).trim()) errors.push("name is required");
  }
  if (!partial || data.discountPercent !== undefined) {
    const v = Number(data.discountPercent);
    if (Number.isNaN(v) || v < 0 || v > 100) errors.push("discountPercent must be between 0 and 100");
  }
  if (!partial || data.startDate !== undefined) {
    if (!data.startDate || Number.isNaN(Date.parse(data.startDate))) errors.push("a valid startDate is required");
  }
  if (!partial || data.endDate !== undefined) {
    if (!data.endDate || Number.isNaN(Date.parse(data.endDate))) errors.push("a valid endDate is required");
  }
  if (data.startDate && data.endDate && Date.parse(data.startDate) > Date.parse(data.endDate)) {
    errors.push("startDate must be before endDate");
  }

  if (errors.length) {
    throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Invalid promotion data", details: errors });
  }
}

function sanitize(data) {
  const payload = {};
  if (data.name !== undefined) payload.name = String(data.name).trim();
  if (data.discountPercent !== undefined) payload.discountPercent = Number(data.discountPercent);
  if (data.productIds !== undefined) payload.productIds = (data.productIds || []).map(Number);
  if (data.startDate !== undefined) payload.startDate = new Date(data.startDate);
  if (data.endDate !== undefined) payload.endDate = new Date(data.endDate);
  if (data.status !== undefined) payload.status = data.status;
  return payload;
}

const promotionService = {
  async getAll() {
    return promotionRepository.getAll();
  },

  async getById(id) {
    const promotion = await promotionRepository.getById(id);
    if (!promotion) throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Promotion not found" });
    return promotion;
  },

  async create(data) {
    validate(data);
    const payload = sanitize(data);
    if (payload.status === undefined) payload.status = "upcoming";
    return promotionRepository.create(payload);
  },

  async update(id, data) {
    await this.getById(id);
    validate(data, { partial: true });
    const payload = sanitize(data);
    return promotionRepository.update(id, payload);
  },

  async delete(id) {
    await this.getById(id);
    return promotionRepository.delete(id);
  },
};

module.exports = { promotionService };
