const { categoryRepository } = require("../repositories/category.repository");
const { HttpError } = require("../errors/httpError");

function validateCategoryPayload(data, { partial = false } = {}) {
  const errors = [];

  if (!partial || data.name !== undefined) {
    if (!data.name || !String(data.name).trim()) {
      errors.push("name is required");
    }
  }

  if (data.status !== undefined && data.status !== null) {
    const allowedStatuses = ["active", "inactive"];
    if (!allowedStatuses.includes(data.status)) {
      errors.push(`status must be one of: ${allowedStatuses.join(", ")}`);
    }
  }

  if (errors.length) {
    throw new HttpError({
      code: "BAD_REQUEST",
      statusCode: 400,
      message: "Invalid category data",
      details: errors,
    });
  }
}

function sanitizePayload(data) {
  const payload = {};

  if (data.name !== undefined) payload.name = String(data.name).trim();
  if (data.icon !== undefined) payload.icon = String(data.icon).trim();
  if (data.status !== undefined) payload.status = String(data.status).trim();
  if (data.subCategoriesCount !== undefined) {
    payload.subCategoriesCount = Number(data.subCategoriesCount) || 0;
  }

  return payload;
}

const categoryService = {
  async getAllCategories() {
    return categoryRepository.getAll();
  },

  async getCategoryById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      throw new HttpError({
        code: "BAD_REQUEST",
        statusCode: 400,
        message: "Invalid category ID format",
      });
    }

    const category = await categoryRepository.getById(numericId);
    if (!category) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Category not found",
      });
    }
    return category;
  },

  async createCategory(data) {
    validateCategoryPayload(data);

    const payload = sanitizePayload(data);
    if (payload.status === undefined) payload.status = "active";
    if (payload.icon === undefined) payload.icon = "keyboard";

    const existing = await categoryRepository.getByName(payload.name);
    if (existing) {
      throw new HttpError({
        code: "CONFLICT",
        statusCode: 409,
        message: `Category name "${payload.name}" already exists`,
      });
    }

    return categoryRepository.create(payload);
  },

  async updateCategory(id, data) {
    const numericId = Number(id);
    await this.getCategoryById(numericId);

    validateCategoryPayload(data, { partial: true });

    const payload = sanitizePayload(data);

    if (payload.name) {
      const existing = await categoryRepository.getByName(payload.name, {
        excludeId: numericId,
      });
      if (existing) {
        throw new HttpError({
          code: "CONFLICT",
          statusCode: 409,
          message: `Category name "${payload.name}" already exists`,
        });
      }
    }

    const category = await categoryRepository.update(numericId, payload);
    if (!category) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Category not found",
      });
    }
    return category;
  },

  async deleteCategory(id) {
    const numericId = Number(id);
    await this.getCategoryById(numericId);
    
    const category = await categoryRepository.delete(numericId);
    if (!category) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Category not found",
      });
    }
    return category;
  },
};

module.exports = { categoryService };
