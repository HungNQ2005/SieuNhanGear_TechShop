const { showroomRepository } = require("../repositories/showroom.repository");
const { HttpError } = require("../errors/httpError");

const showroomService = {
  async getAllShowrooms() {
    return showroomRepository.getAll();
  },

  async getShowroomById(id) {
    const showroom = await showroomRepository.getById(id);
    if (!showroom) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Showroom not found",
      });
    }
    return showroom;
  },

  async createShowroom(data) {
    if (!data.name || !data.address) {
      throw new HttpError({
        code: "BAD_REQUEST",
        statusCode: 400,
        message: "Name and Address are required fields",
      });
    }
    return showroomRepository.create(data);
  },

  async updateShowroom(id, data) {
    const showroom = await showroomRepository.update(id, data);
    if (!showroom) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Showroom not found",
      });
    }
    return showroom;
  },

  async deleteShowroom(id) {
    const showroom = await showroomRepository.delete(id);
    if (!showroom) {
      throw new HttpError({
        code: "NOT_FOUND",
        statusCode: 404,
        message: "Showroom not found",
      });
    }
    return showroom;
  },
};

module.exports = { showroomService };
