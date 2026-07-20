const Showroom = require("../database/models/Showroom.model");

const showroomRepository = {
  async getAll() {
    return Showroom.find();
  },

  async getById(id) {
    return Showroom.findById(id);
  },

  async create(data) {
    const showroom = new Showroom(data);
    return showroom.save();
  },

  async update(id, data) {
    return Showroom.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id) {
    return Showroom.findByIdAndDelete(id);
  },
};

module.exports = { showroomRepository };
