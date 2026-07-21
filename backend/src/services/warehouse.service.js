const { warehouseRepository } = require("../repositories/warehouse.repository");
const { HttpError } = require("../errors/httpError");

function validateWarehousePayload(data, { partial = false } = {}) {
  const errors = [];

  if (!partial || data.name !== undefined) {
    if (!data.name || !String(data.name).trim()) {
      errors.push("name is required");
    }
  }

  if (!partial || data.code !== undefined) {
    if (!data.code || !String(data.code).trim()) {
      errors.push("code is required");
    }
  }

  if (errors.length) {
    throw new HttpError({
      code: "BAD_REQUEST",
      statusCode: 400,
      message: "Invalid warehouse data",
      details: errors,
    });
  }
}

function sanitizePayload(data) {
  const payload = {};
  if (data.name !== undefined) payload.name = String(data.name).trim();
  if (data.code !== undefined) payload.code = String(data.code).trim().toUpperCase();
  if (data.region !== undefined) payload.region = String(data.region).trim();
  return payload;
}

const warehouseService = {
  async getAllWarehouses() {
    return warehouseRepository.getAll();
  },

  async getWarehouseById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      throw new HttpError({
        code: "BAD_REQUEST",
        statusCode: 400,
        message: "Invalid warehouse ID format",
      });
    }

    const warehouse = await warehouseRepository.getById(numericId);
    if (!warehouse) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Warehouse not found",
      });
    }
    return warehouse;
  },

  async createWarehouse(data) {
    validateWarehousePayload(data);
    const payload = sanitizePayload(data);

    const existing = await warehouseRepository.getByCode(payload.code);
    if (existing) {
      throw new HttpError({
        code: "CONFLICT",
        statusCode: 409,
        message: `Warehouse code "${payload.code}" already exists`,
      });
    }

    return warehouseRepository.create(payload);
  },

  async updateWarehouse(id, data) {
    const numericId = Number(id);
    await this.getWarehouseById(numericId);

    validateWarehousePayload(data, { partial: true });
    const payload = sanitizePayload(data);

    if (payload.code) {
      const existing = await warehouseRepository.getByCode(payload.code, {
        excludeId: numericId,
      });
      if (existing) {
        throw new HttpError({
          code: "CONFLICT",
          statusCode: 409,
          message: `Warehouse code "${payload.code}" already exists`,
        });
      }
    }

    const warehouse = await warehouseRepository.update(numericId, payload);
    if (!warehouse) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Warehouse not found",
      });
    }
    return warehouse;
  },

  async deleteWarehouse(id) {
    const numericId = Number(id);
    await this.getWarehouseById(numericId);

    const warehouse = await warehouseRepository.delete(numericId);
    if (!warehouse) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Warehouse not found",
      });
    }
    return warehouse;
  },
};

module.exports = { warehouseService };
