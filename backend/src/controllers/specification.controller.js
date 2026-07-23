const { specificationService } = require("../services/specification.service");

const specificationController = {
  async getAllSpecifications(req, res, next) {
    try {
      res.json(await specificationService.getAllSpecifications());
    } catch (e) {
      next(e);
    }
  },
  async getAllGroups(req, res, next) {
    try {
      res.json(await specificationService.getAllGroups());
    } catch (e) {
      next(e);
    }
  },
  async createGroup(req, res, next) {
    try {
      res.status(201).json(await specificationService.createGroup(req.body));
    } catch (e) {
      next(e);
    }
  },
  async updateGroup(req, res, next) {
    try {
      res.json(await specificationService.updateGroup(req.params.id, req.body));
    } catch (e) {
      next(e);
    }
  },
  async deleteGroup(req, res, next) {
    try {
      await specificationService.deleteGroup(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  },

  async getAllAttributes(req, res, next) {
    try {
      const { groupId } = req.query;
      res.json(await specificationService.getAllAttributes({ groupId }));
    } catch (e) {
      next(e);
    }
  },
  async createAttribute(req, res, next) {
    try {
      res.status(201).json(await specificationService.createAttribute(req.body));
    } catch (e) {
      next(e);
    }
  },
  async updateAttribute(req, res, next) {
    try {
      res.json(await specificationService.updateAttribute(req.params.id, req.body));
    } catch (e) {
      next(e);
    }
  },
  async deleteAttribute(req, res, next) {
    try {
      await specificationService.deleteAttribute(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { specificationController };
