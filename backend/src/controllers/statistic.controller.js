const { statisticService } = require("../services/statistic.service");

const statisticController = {
  async getOverview(req, res, next) {
    try {
      res.json(await statisticService.getOverview());
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { statisticController };
