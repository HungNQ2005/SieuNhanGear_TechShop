const { voucherRepository } = require("../repositories/voucher.repository");
const { HttpError } = require("../errors/httpError");

function validateVoucherPayload(data, { partial = false } = {}) {
  const errors = [];

  if (!partial || data.code !== undefined) {
    if (!data.code || !String(data.code).trim()) {
      errors.push("code is required");
    }
  }

  if (!partial || data.discountPercentage !== undefined) {
    const value = Number(data.discountPercentage);
    if (
      data.discountPercentage === undefined ||
      data.discountPercentage === null ||
      Number.isNaN(value)
    ) {
      errors.push("discountPercentage is required");
    } else if (value <= 0 || value > 100) {
      errors.push(
        "discountPercentage must be greater than 0 and less than or equal to 100",
      );
    }
  }

  if (data.minOrderValue !== undefined && data.minOrderValue !== null) {
    const value = Number(data.minOrderValue);
    if (Number.isNaN(value) || value < 0) {
      errors.push("minOrderValue must be a number greater than or equal to 0");
    }
  }

  if (errors.length) {
    throw new HttpError({
      code: "BAD_REQUEST",
      statusCode: 400,
      message: "Invalid voucher data",
      details: errors,
    });
  }
}

function sanitizePayload(data) {
  const payload = {};

  if (data.code !== undefined)
    payload.code = String(data.code).trim().toUpperCase();
  if (data.description !== undefined)
    payload.description = String(data.description).trim();
  if (data.discountPercentage !== undefined)
    payload.discountPercentage = Number(data.discountPercentage);
  if (data.minOrderValue !== undefined)
    payload.minOrderValue = Number(data.minOrderValue);
  if (data.isActive !== undefined) payload.isActive = Boolean(data.isActive);

  return payload;
}

const voucherService = {
  async getAllVouchers() {
    return voucherRepository.getAll();
  },

  async getVoucherById(id) {
    const voucher = await voucherRepository.getById(id);
    if (!voucher) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Voucher not found",
      });
    }
    return voucher;
  },

  async createVoucher(data) {
    validateVoucherPayload(data);

    const payload = sanitizePayload(data);
    if (payload.minOrderValue === undefined) payload.minOrderValue = 0;
    if (payload.isActive === undefined) payload.isActive = true;

    const existing = await voucherRepository.getByCode(payload.code);
    if (existing) {
      throw new HttpError({
        code: "CONFLICT",
        statusCode: 409,
        message: `Voucher code "${payload.code}" already exists`,
      });
    }

    return voucherRepository.create(payload);
  },

  async updateVoucher(id, data) {
    await this.getVoucherById(id);

    validateVoucherPayload(data, { partial: true });

    const payload = sanitizePayload(data);

    if (payload.code) {
      const existing = await voucherRepository.getByCode(payload.code, {
        excludeId: id,
      });
      if (existing) {
        throw new HttpError({
          code: "CONFLICT",
          statusCode: 409,
          message: `Voucher code "${payload.code}" already exists`,
        });
      }
    }

    const voucher = await voucherRepository.update(id, payload);
    if (!voucher) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Voucher not found",
      });
    }
    return voucher;
  },

  async deleteVoucher(id) {
    const voucher = await voucherRepository.delete(id);
    if (!voucher) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Voucher not found",
      });
    }
    return voucher;
  },
};

module.exports = { voucherService };
