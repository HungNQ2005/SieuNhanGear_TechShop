const { News } = require("../database/models/News.model");
const { nextId } = require("../utils/nextId");

const newsRepository = {
  async getAll(filters = {}) {
    return News.find(filters).sort({ createdAt: -1 });
  },

  async getById(id) {
    return News.findOne({ id: Number(id) });
  },

  async create(data) {
    const id = await nextId(News);
    const news = new News({ ...data, id });
    return news.save();
  },

  async update(id, data) {
    return News.findOneAndUpdate({ id: Number(id) }, data, { new: true, runValidators: true });
  },

  async delete(id) {
    return News.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { newsRepository };
