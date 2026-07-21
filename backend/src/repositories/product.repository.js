const Product = require("../database/models/Product.model");

const productRepository = {
  async getAll({ categoryId, q } = {}) {
    const query = {};
    if (categoryId !== undefined && categoryId !== null) {
      query.category_id = Number(categoryId);
    }
    if (q !== undefined && q !== null && String(q).trim()) {
      query.name = { $regex: String(q).trim(), $options: "i" };
    }
    return Product.find(query).sort({ id: 1 });
  },

  async getById(id) {
    return Product.findOne({ id: Number(id) });
  },

  async getByName(name, { excludeId } = {}) {
    const query = { name: { $regex: new RegExp(`^${name.trim()}$`, "i") } };
    if (excludeId !== undefined && excludeId !== null) {
      query.id = { $ne: Number(excludeId) };
    }
    return Product.findOne(query);
  },

  async create(data) {
    // Tự tăng id kiểu số (Number), giống pattern của Category
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const nextId = lastProduct && lastProduct.id ? lastProduct.id + 1 : 1;

    const productData = {
      ...data,
      id: nextId,
    };

    const product = new Product(productData);
    return product.save();
  },

  async update(id, data) {
    return Product.findOneAndUpdate({ id: Number(id) }, data, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id) {
    return Product.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { productRepository };
