const { cartRepository } = require("../repositories/cart.repository");
const { productRepository } = require("../../../repositories/product.repository");
const { HttpError } = require("../../../errors/httpError");

const cartService = {
  // UC-06 Manage Carts (CRUD) - luôn scope theo accountId của user đang đăng nhập
  async getCart(accountId) {
    const items = await cartRepository.getAllByAccount(accountId);

    const enriched = await Promise.all(
      items.map(async (item) => {
        const product = await productRepository.getById(item.productId);
        const plain = item.toJSON();
        return {
          ...plain,
          product: product ? product.toJSON() : null,
          subtotal: product ? product.price * item.quantity : 0,
        };
      })
    );

    return {
      items: enriched,
      total: enriched.reduce((sum, i) => sum + i.subtotal, 0),
    };
  },

  async addItem(accountId, { productId, quantity }) {
    const numericProductId = Number(productId);
    const numericQuantity = Number(quantity) || 1;

    if (!numericProductId || numericQuantity < 1) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "productId and a positive quantity are required" });
    }

    const product = await productRepository.getById(numericProductId);
    if (!product) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Product not found" });
    }

    const existing = await cartRepository.getOne(accountId, numericProductId);
    if (existing) {
      const newQuantity = existing.quantity + numericQuantity;
      if (product.stock !== undefined && newQuantity > product.stock) {
        throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Quantity exceeds available stock" });
      }
      return cartRepository.updateQuantity(existing.id, newQuantity);
    }

    if (product.stock !== undefined && numericQuantity > product.stock) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Quantity exceeds available stock" });
    }

    return cartRepository.create({ accountId: Number(accountId), productId: numericProductId, quantity: numericQuantity });
  },

  async updateItem(accountId, itemId, quantity) {
    const numericQuantity = Number(quantity);
    if (!numericQuantity || numericQuantity < 1) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "quantity must be at least 1" });
    }

    const item = await cartRepository.getById(itemId);
    if (!item || item.accountId !== Number(accountId)) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Cart item not found" });
    }

    const product = await productRepository.getById(item.productId);
    if (product && product.stock !== undefined && numericQuantity > product.stock) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Quantity exceeds available stock" });
    }

    return cartRepository.updateQuantity(itemId, numericQuantity);
  },

  async removeItem(accountId, itemId) {
    const item = await cartRepository.getById(itemId);
    if (!item || item.accountId !== Number(accountId)) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Cart item not found" });
    }
    return cartRepository.delete(itemId);
  },

  async clearCart(accountId) {
    return cartRepository.clearByAccount(accountId);
  },
};

module.exports = { cartService };
