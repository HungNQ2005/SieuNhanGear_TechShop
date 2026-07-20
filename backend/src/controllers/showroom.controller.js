const { showroomService } = require("../services/showroom.service");

const showroomController = {
  async getAll(req, res, next) {
    try {
      const data = await showroomService.getAllShowrooms();
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await showroomService.getShowroomById(id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const data = await showroomService.createShowroom(req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = await showroomService.updateShowroom(id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await showroomService.deleteShowroom(id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { showroomController };
