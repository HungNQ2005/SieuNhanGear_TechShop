const { commentService } = require("../services/comment.service");

const commentController = {
  async getByProduct(req, res, next) {
    try {
      const { productId } = req.query;
      const data = await commentService.getByProduct(productId);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const data = await commentService.createComment(req.user, req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await commentService.deleteComment(req.user, id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { commentController };
