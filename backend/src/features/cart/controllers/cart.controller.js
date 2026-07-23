const { cartService } = require("../services/cart.service");

function getAccountId(req) {
  return (
    (req.user && (req.user.id || req.user._id)) ||
    req.body.accountId ||
    req.query.accountId ||
    req.params.accountId
  );
}

const cartController = {
  async getCart(req, res, next) {
    try {
      const accountId = getAccountId(req);
      if (!accountId) {
        return res.json({ items: [], total: 0 });
      }
      const data = await cartService.getCart(accountId);
      return res.json(data);
    } catch (e) {
      return next(e);
    }
  },

  async syncOrAddItem(req, res, next) {
    try {
      const accountId = getAccountId(req);
      if (!accountId) {
        return res.status(400).json({ message: "accountId is required" });
      }

      if (Array.isArray(req.body.items)) {
        const data = await cartService.syncCart(accountId, req.body.items);
        return res.status(200).json(data);
      }

      if (req.body.productId) {
        const data = await cartService.addItem(accountId, req.body);
        return res.status(201).json(data);
      }

      const data = await cartService.getCart(accountId);
      return res.json(data);
    } catch (e) {
      return next(e);
    }
  },

  async addItem(req, res, next) {
    try {
      const accountId = getAccountId(req);
      if (!accountId) {
        return res.status(400).json({ message: "accountId is required" });
      }
      const data = await cartService.addItem(accountId, req.body);
      return res.status(201).json(data);
    } catch (e) {
      return next(e);
    }
  },

  async updateItem(req, res, next) {
    try {
      const accountId = getAccountId(req);
      const itemId = req.params.itemId || req.params.id;
      if (!accountId) {
        return res.status(400).json({ message: "accountId is required" });
      }
      const data = await cartService.updateItem(accountId, itemId, req.body.quantity);
      return res.json(data);
    } catch (e) {
      return next(e);
    }
  },

  async removeItem(req, res, next) {
    try {
      const accountId = getAccountId(req);
      const itemId = req.params.itemId || req.params.id;
      if (!accountId) {
        return res.status(400).json({ message: "accountId is required" });
      }
      await cartService.removeItem(accountId, itemId);
      return res.json({ message: "Removed successfully" });
    } catch (e) {
      return next(e);
    }
  },

  async clearCart(req, res, next) {
    try {
      const accountId = getAccountId(req);
      if (!accountId) {
        return res.status(400).json({ message: "accountId is required" });
      }
      await cartService.clearCart(accountId);
      return res.json({ message: "Cart cleared" });
    } catch (e) {
      return next(e);
    }
  },

  async updateCart(req, res, next) {
    try {
      const accountId = getAccountId(req);
      if (!accountId) {
        return res.status(400).json({ message: "accountId is required" });
      }
      if (Array.isArray(req.body.items)) {
        const data = await cartService.syncCart(accountId, req.body.items);
        return res.json(data);
      }
      if (req.params.id && req.body.quantity !== undefined) {
        const data = await cartService.updateItem(accountId, req.params.id, req.body.quantity);
        return res.json(data);
      }
      const data = await cartService.getCart(accountId);
      return res.json(data);
    } catch (e) {
      return next(e);
    }
  },

  async deleteCart(req, res, next) {
    try {
      const accountId = getAccountId(req);
      const idParam = req.params.id;
      if (!accountId) {
        return res.status(400).json({ message: "accountId is required" });
      }
      if (idParam && String(idParam) !== String(accountId)) {
        try {
          await cartService.removeItem(accountId, idParam);
          return res.status(200).json({ message: "Removed successfully" });
        } catch (_) {
          await cartService.clearCart(accountId);
          return res.status(200).json({ message: "Cart cleared" });
        }
      }
      await cartService.clearCart(accountId);
      return res.status(200).json({ message: "Cart cleared" });
    } catch (e) {
      return next(e);
    }
  },
};

module.exports = { cartController };
