const { stockRepository } = require("../repositories/stock.repository");
const { productRepository } = require("../repositories/product.repository");
const { warehouseRepository } = require("../repositories/warehouse.repository");
const { HttpError } = require("../errors/httpError");

function validateStockPayload(data, { partial = false } = {}) {
  const errors = [];

  if (!partial || data.productId !== undefined) {
    if (data.productId === undefined || data.productId === null || Number.isNaN(Number(data.productId))) {
      errors.push("productId is required");
    }
  }

  if (!partial || data.warehouseId !== undefined) {
    if (data.warehouseId === undefined || data.warehouseId === null || Number.isNaN(Number(data.warehouseId))) {
      errors.push("warehouseId is required");
    }
  }

  if (!partial || data.quantity !== undefined) {
    const value = Number(data.quantity);
    if (data.quantity === undefined || data.quantity === null || Number.isNaN(value)) {
      errors.push("quantity is required");
    } else if (value < 0) {
      errors.push("quantity must be greater than or equal to 0");
    }
  }

  if (errors.length) {
    throw new HttpError({
      code: "BAD_REQUEST",
      statusCode: 400,
      message: "Invalid stock data",
      details: errors,
    });
  }
}

function sanitizePayload(data) {
  const payload = {};
  if (data.productId !== undefined) payload.productId = Number(data.productId);
  if (data.warehouseId !== undefined) payload.warehouseId = Number(data.warehouseId);
  if (data.quantity !== undefined) payload.quantity = Number(data.quantity);
  if (data.criticalThreshold !== undefined) payload.criticalThreshold = Number(data.criticalThreshold);
  if (data.lowStockThreshold !== undefined) payload.lowStockThreshold = Number(data.lowStockThreshold);
  if (data.updatedBy !== undefined) payload.updatedBy = String(data.updatedBy).trim();
  return payload;
}

const stockService = {
  async getAllStock(filters) {
    return stockRepository.getAll(filters);
  },

  async getStockById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Invalid stock ID format" });
    }
    const stock = await stockRepository.getById(numericId);
    if (!stock) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Stock record not found" });
    }
    return stock;
  },

  async createStock(data) {
    validateStockPayload(data);
    const payload = sanitizePayload(data);

    if (payload.criticalThreshold === undefined) payload.criticalThreshold = 5;
    if (payload.lowStockThreshold === undefined) payload.lowStockThreshold = 15;
    payload.lastUpdated = new Date();

    const product = await productRepository.getById(payload.productId);
    if (!product) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: `Product with id "${payload.productId}" does not exist` });
    }

    const warehouse = await warehouseRepository.getById(payload.warehouseId);
    if (!warehouse) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: `Warehouse with id "${payload.warehouseId}" does not exist` });
    }

    const existing = await stockRepository.getByProductAndWarehouse(payload.productId, payload.warehouseId);
    if (existing) {
      throw new HttpError({
        code: "CONFLICT",
        statusCode: 409,
        message: "A stock record for this product and warehouse already exists",
      });
    }

    return stockRepository.create(payload);
  },

  async updateStock(id, data) {
    const numericId = Number(id);
    await this.getStockById(numericId);

    validateStockPayload(data, { partial: true });
    const payload = sanitizePayload(data);
    payload.lastUpdated = data.lastUpdated ? new Date(data.lastUpdated) : new Date();

    const stock = await stockRepository.update(numericId, payload);
    if (!stock) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Stock record not found" });
    }
    return stock;
  },

  async deleteStock(id) {
    const numericId = Number(id);
    await this.getStockById(numericId);

    const stock = await stockRepository.delete(numericId);
    if (!stock) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Stock record not found" });
    }
    return stock;
  },
};

module.exports = { stockService };
