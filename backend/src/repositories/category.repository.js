const Category = require("../database/models/Category.model");

const categoryRepository = {
  async getAll() {
    return Category.find().sort({ id: 1 });
  },

  async getById(id) {
    return Category.findOne({ id: Number(id) });
  },

  async getByName(name, { excludeId } = {}) {
    const query = { name: { $regex: new RegExp(`^${name.trim()}$`, "i") } };
    if (excludeId !== undefined && excludeId !== null) {
      query.id = { $ne: Number(excludeId) };
    }
    return Category.findOne(query);
  },

  async create(data) {
    // Tự tăng id kiểu số (Number)
    const lastCategory = await Category.findOne().sort({ id: -1 });
    const nextId = lastCategory && lastCategory.id ? lastCategory.id + 1 : 1;

    const categoryData = {
      ...data,
      id: nextId,
    };

    const category = new Category(categoryData);
    return category.save();
  },

  async update(id, data) {
    return Category.findOneAndUpdate({ id: Number(id) }, data, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id) {
    return Category.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { categoryRepository };
