const { accountRepository } = require("../repositories/account.repository");
const { HttpError } = require("../errors/httpError");
const { hashPassword, generateTempPassword } = require("../utils/password");

const ALLOWED_ROLES = ["user", "product_manager", "sales_staff", "system_admin"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateAccountPayload(data, { partial = false } = {}) {
  const errors = [];

  if (!partial || data.name !== undefined) {
    if (!data.name || !String(data.name).trim()) {
      errors.push("name is required");
    }
  }

  if (!partial || data.email !== undefined) {
    if (!data.email || !EMAIL_REGEX.test(String(data.email).trim())) {
      errors.push("a valid email is required");
    }
  }

  if (data.phone !== undefined && data.phone !== null && data.phone !== "") {
    if (!/^[0-9+().\-\s]{6,20}$/.test(String(data.phone).trim())) {
      errors.push("phone format is invalid");
    }
  }

  if (data.role !== undefined && data.role !== null) {
    if (!ALLOWED_ROLES.includes(data.role)) {
      errors.push(`role must be one of: ${ALLOWED_ROLES.join(", ")}`);
    }
  }

  if (errors.length) {
    throw new HttpError({
      code: "BAD_REQUEST",
      statusCode: 400,
      message: "Invalid account data",
      details: errors,
    });
  }
}

function sanitizePayload(data) {
  const payload = {};
  if (data.name !== undefined) payload.name = String(data.name).trim();
  if (data.email !== undefined) payload.email = String(data.email).trim().toLowerCase();
  if (data.phone !== undefined) payload.phone = String(data.phone).trim();
  if (data.role !== undefined) payload.role = data.role;
  return payload;
}

const accountService = {
  async getAllAccounts() {
    return accountRepository.getAll();
  },

  async getAccountById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Invalid account ID format" });
    }
    const account = await accountRepository.getById(numericId);
    if (!account) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Account not found" });
    }
    return account;
  },

  async createAccount(data) {
    validateAccountPayload(data);
    const payload = sanitizePayload(data);
    if (payload.role === undefined) payload.role = "user";

    const existing = await accountRepository.getByEmail(payload.email);
    if (existing) {
      throw new HttpError({
        code: "CONFLICT",
        statusCode: 409,
        message: `Account email "${payload.email}" already exists`,
      });
    }

    // Admin form không nhập mật khẩu -> tự sinh mật khẩu tạm, băm để lưu,
    // và trả về đúng một lần trong response để admin gửi cho tài khoản mới.
    const rawPassword = data.password ? String(data.password) : generateTempPassword();
    payload.passwordHash = hashPassword(rawPassword);

    const account = await accountRepository.create(payload);
    const result = account.toJSON();
    if (!data.password) {
      result.temporaryPassword = rawPassword;
    }
    return result;
  },

  async updateAccount(id, data) {
    const numericId = Number(id);
    await this.getAccountById(numericId);

    validateAccountPayload(data, { partial: true });
    const payload = sanitizePayload(data);

    if (payload.email) {
      const existing = await accountRepository.getByEmail(payload.email, { excludeId: numericId });
      if (existing) {
        throw new HttpError({
          code: "CONFLICT",
          statusCode: 409,
          message: `Account email "${payload.email}" already exists`,
        });
      }
    }

    if (data.password) {
      payload.passwordHash = hashPassword(String(data.password));
    }

    const account = await accountRepository.update(numericId, payload);
    if (!account) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Account not found" });
    }
    return account;
  },

  async deleteAccount(id) {
    const numericId = Number(id);
    await this.getAccountById(numericId);

    const account = await accountRepository.delete(numericId);
    if (!account) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Account not found" });
    }
    return account;
  },
};

module.exports = { accountService };
