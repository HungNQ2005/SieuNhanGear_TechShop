const { cartService } = require("../services/cart.service");

const cartController = {
  async getCart(req, res, next) {
    try {
      const accountId = req.user ? req.user.id : (req.query.accountId || req.params.accountId);
      if (!accountId) {
        return res.json({ items: [], total: 0 });
      }
      const data = await cartService.getCart(accountId);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async addItem(req, res, next) {
    try {
      const data = await cartService.addItem(req.user.id, req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  },

  async updateItem(req, res, next) {
    try {
      const { itemId } = req.params;
      const data = await cartService.updateItem(req.user.id, itemId, req.body.quantity);
      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async removeItem(req, res, next) {
    try {
      const { itemId } = req.params;
      await cartService.removeItem(req.user.id, itemId);
      res.json({ message: "Removed successfully" });
    } catch (e) {
      next(e);
    }
  },

  async clearCart(req, res, next) {
    try {
      await cartService.clearCart(req.user.id);
      res.json({ message: "Cart cleared" });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { cartController };
