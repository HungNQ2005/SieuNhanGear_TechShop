const { newsRepository } = require("../repositories/news.repository");
const { HttpError } = require("../errors/httpError");

const newsService = {
  async getAll(filters) {
    return newsRepository.getAll(filters);
  },

  async getById(id) {
    const item = await newsRepository.getById(id);
    if (!item) {
      throw new HttpError({ code: "NOT_FOUND", statusCode: 404, message: "News not found" });
    }
    return item;
  },

  async create(data) {
    if (!data.title || !String(data.title).trim()) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "title is required" });
    }
    if (!data.content || !String(data.content).trim()) {
      throw new HttpError({ code: "BAD_REQUEST", statusCode: 400, message: "content is required" });
    }
    return newsRepository.create(data);
  },

  async update(id, data) {
    await this.getById(id); // Ensure exists
    return newsRepository.update(id, data);
  },

  async delete(id) {
    await this.getById(id); // Ensure exists
    return newsRepository.delete(id);
  },
};

module.exports = { newsService };
