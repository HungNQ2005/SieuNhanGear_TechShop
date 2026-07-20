const { commentRepository } = require("../repositories/comment.repository");
const { productRepository } = require("../repositories/product.repository");
const { HttpError } = require("../errors/httpError");

const commentService = {
  async getByProduct(productId) {
    const numericId = Number(productId);
    if (Number.isNaN(numericId)) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "Invalid product ID format" });
    }
    return commentRepository.getByProduct(numericId);
  },

  // UC-07: chỉ Customer đã đăng nhập mới được bình luận
  async createComment(user, { productId, content, rating }) {
    const numericProductId = Number(productId);
    if (!numericProductId || Number.isNaN(numericProductId)) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "productId is required" });
    }
    if (!content || !String(content).trim()) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "content is required" });
    }

    const product = await productRepository.getById(numericProductId);
    if (!product) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Product not found" });
    }

    return commentRepository.create({
      productId: numericProductId,
      accountId: user.id,
      customerName: user.name || user.email,
      content: String(content).trim(),
      rating: rating !== undefined ? Number(rating) : 5,
    });
  },

  // UC-07: chủ comment hoặc system_admin mới được xoá
  async deleteComment(user, id) {
    const comment = await commentRepository.getById(id);
    if (!comment) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "Comment not found" });
    }
    if (comment.accountId !== user.id && user.role !== "system_admin") {
      throw new HttpError({ code: "FORBIDDEN", statusCode: 403, message: "You can only delete your own comment" });
    }
    return commentRepository.delete(id);
  },
};

module.exports = { commentService };
