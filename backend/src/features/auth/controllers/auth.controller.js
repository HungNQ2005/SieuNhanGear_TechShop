const { authService } = require("../services/auth.service");

const authController = {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  },

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },

  async me(req, res, next) {
    try {
      const account = await authService.getMe(req.user.id);
      res.json(account);
    } catch (e) {
      next(e);
    }
  },

  async updateMe(req, res, next) {
    try {
      const account = await authService.updateProfile(req.user.id, req.body);
      res.json(account);
    } catch (e) {
      next(e);
    }
  },

  // XL quen mat khau
  async forgotPassword(req, res, next) {
    try {
      const result = await authService.forgotPassword(req.body);
      res.json({ success: true, message: "Dat lai mat khau thanh cong", account: result });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { authController };
