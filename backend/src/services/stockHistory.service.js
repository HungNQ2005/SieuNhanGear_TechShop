const { stockHistoryRepository } = require("../repositories/stockHistory.repository");
const { HttpError } = require("../errors/httpError");

const ALLOWED_TYPES = ["import", "export"];

function validateStockHistoryPayload(data) {
  const errors = [];

  if (data.productId === undefined || data.productId === null || Number.isNaN(Number(data.productId))) {
    errors.push("productId is required");
  }
  if (data.warehouseId === undefined || data.warehouseId === null || Number.isNaN(Number(data.warehouseId))) {
    errors.push("warehouseId is required");
  }
  if (!data.type || !ALLOWED_TYPES.includes(data.type)) {
    errors.push(`type must be one of: ${ALLOWED_TYPES.join(", ")}`);
  }
  if (data.change === undefined || data.change === null || Number.isNaN(Number(data.change))) {
    errors.push("change is required");
  }
  if (data.quantityAfter === undefined || data.quantityAfter === null || Number.isNaN(Number(data.quantityAfter))) {
    errors.push("quantityAfter is required");
  }

  if (errors.length) {
    throw new HttpError({
      code: "BAD_REQUEST",
      statusCode: 400,
      message: "Invalid stock history data",
      details: errors,
    });
  }
}

function sanitizePayload(data) {
  return {
    productId: Number(data.productId),
    warehouseId: Number(data.warehouseId),
    type: data.type,
    change: Number(data.change),
    quantityAfter: Number(data.quantityAfter),
    date: data.date ? new Date(data.date) : new Date(),
    updatedBy: data.updatedBy !== undefined ? String(data.updatedBy).trim() : "",
    note: data.note !== undefined ? String(data.note).trim() : "",
  };
}

const stockHistoryService = {
  async getAllStockHistory(filters) {
    return stockHistoryRepository.getAll(filters);
  },

  async getStockHistoryById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Invalid stock history ID format" });
    }
    const entry = await stockHistoryRepository.getById(numericId);
    if (!entry) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Stock history entry not found" });
    }
    return entry;
  },

  async createStockHistory(data) {
    validateStockHistoryPayload(data);
    const payload = sanitizePayload(data);
    return stockHistoryRepository.create(payload);
  },
};

module.exports = { stockHistoryService };
