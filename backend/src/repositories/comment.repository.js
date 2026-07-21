const Comment = require("../database/models/Comment.model");
const { nextId } = require("../utils/nextId");

const commentRepository = {
  async getByProduct(productId) {
    return Comment.find({ productId: Number(productId) }).sort({ createdAt: -1 });
  },

  async getById(id) {
    return Comment.findOne({ id: Number(id) });
  },

  async create(data) {
    const id = await nextId(Comment);
    const comment = new Comment({ ...data, id });
    return comment.save();
  },

  async delete(id) {
    return Comment.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { commentRepository };
