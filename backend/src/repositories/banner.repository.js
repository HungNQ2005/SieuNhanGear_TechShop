const Banner = require("../database/models/Banner.model");
const { nextId } = require("../utils/nextId");

const bannerRepository = {
  async getAll() {
    return Banner.find().sort({ displayOrder: 1, id: 1 });
  },
  async getById(id) {
    return Banner.findOne({ id: Number(id) });
  },
  async create(data) {
    const id = await nextId(Banner);
    const banner = new Banner({ ...data, id });
    return banner.save();
  },
  async update(id, data) {
    return Banner.findOneAndUpdate({ id: Number(id) }, data, { new: true, runValidators: true });
  },
  async delete(id) {
    return Banner.findOneAndDelete({ id: Number(id) });
  },
};

module.exports = { bannerRepository };
