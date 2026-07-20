const { productRepository } = require("../repositories/product.repository");
const { categoryRepository } = require("../repositories/category.repository");
const { HttpError } = require("../errors/httpError");

const ALLOWED_STATUSES = ["active", "drafting", "out_of_stock"];

function validateProductPayload(data, { partial = false } = {}) {
  const errors = [];

  if (!partial || data.name !== undefined) {
    if (!data.name || !String(data.name).trim()) {
      errors.push("name is required");
    }
  }

  if (!partial || data.price !== undefined) {
    const value = Number(data.price);
    if (data.price === undefined || data.price === null || Number.isNaN(value)) {
      errors.push("price is required");
    } else if (value < 0) {
      errors.push("price must be greater than or equal to 0");
    }
  }

  if (!partial || data.category_id !== undefined) {
    const value = Number(data.category_id);
    if (
      data.category_id === undefined ||
      data.category_id === null ||
      Number.isNaN(value)
    ) {
      errors.push("category_id is required");
    }
  }

  if (data.manufacturer_id !== undefined && data.manufacturer_id !== null) {
    if (Number.isNaN(Number(data.manufacturer_id))) {
      errors.push("manufacturer_id must be a number");
    }
  }

  if (data.rating !== undefined && data.rating !== null) {
    const value = Number(data.rating);
    if (Number.isNaN(value) || value < 0 || value > 5) {
      errors.push("rating must be a number between 0 and 5");
    }
  }

  if (data.stock !== undefined && data.stock !== null) {
    const value = Number(data.stock);
    if (Number.isNaN(value) || value < 0) {
      errors.push("stock must be a number greater than or equal to 0");
    }
  }

  if (data.status !== undefined && data.status !== null) {
    if (!ALLOWED_STATUSES.includes(data.status)) {
      errors.push(`status must be one of: ${ALLOWED_STATUSES.join(", ")}`);
    }
  }

  if (errors.length) {
    throw new HttpError({
      code: "BAD_REQUEST",
      statusCode: 400,
      message: "Invalid product data",
      details: errors,
    });
  }
}

function sanitizePayload(data) {
  const payload = {};

  if (data.name !== undefined) payload.name = String(data.name).trim();
  if (data.price !== undefined) payload.price = Number(data.price);
  if (data.category_id !== undefined) payload.category_id = Number(data.category_id);
  if (data.manufacturer_id !== undefined && data.manufacturer_id !== null) {
    payload.manufacturer_id = Number(data.manufacturer_id);
  }
  if (data.img_URL !== undefined) payload.img_URL = String(data.img_URL).trim();
  if (data.rating !== undefined) payload.rating = Number(data.rating);
  if (data.stock !== undefined) payload.stock = Number(data.stock);
  if (data.status !== undefined) payload.status = String(data.status).trim();

  return payload;
}

const productService = {
  async getAllProducts(filters) {
    return productRepository.getAll(filters);
  },

  async getProductById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      throw new HttpError({
        code: "BAD_REQUEST",
        statusCode: 400,
        message: "Invalid product ID format",
      });
    }

    const product = await productRepository.getById(numericId);
    if (!product) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Product not found",
      });
    }
    return product;
  },

  async createProduct(data) {
    validateProductPayload(data);

    const payload = sanitizePayload(data);
    if (payload.stock === undefined) payload.stock = 0;
    if (payload.rating === undefined) payload.rating = 0;
    if (payload.img_URL === undefined) payload.img_URL = "";
    if (payload.status === undefined) payload.status = "active";

    const category = await categoryRepository.getById(payload.category_id);
    if (!category) {
      throw new HttpError({
        code: "BAD_REQUEST",
        statusCode: 400,
        message: `Category with id "${payload.category_id}" does not exist`,
      });
    }

    return productRepository.create(payload);
  },

  async updateProduct(id, data) {
    const numericId = Number(id);
    await this.getProductById(numericId);

    validateProductPayload(data, { partial: true });

    const payload = sanitizePayload(data);

    if (payload.category_id !== undefined) {
      const category = await categoryRepository.getById(payload.category_id);
      if (!category) {
        throw new HttpError({
          code: "BAD_REQUEST",
          statusCode: 400,
          message: `Category with id "${payload.category_id}" does not exist`,
        });
      }
    }

    const product = await productRepository.update(numericId, payload);
    if (!product) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Product not found",
      });
    }
    return product;
  },

  async deleteProduct(id) {
    const numericId = Number(id);
    await this.getProductById(numericId);

    const product = await productRepository.delete(numericId);
    if (!product) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Product not found",
      });
    }
    return product;
  },
};

module.exports = { productService };
