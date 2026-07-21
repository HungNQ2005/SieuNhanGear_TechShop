const express = require('express');
const { cartController } = require('../controllers/cart.controller');
const legacyCartController = require('../../../controllers/cartController');
const { authenticate, optionalAuthenticate } = require('../../../middlewares/auth.middleware');

function createCartRouter() {
  const router = express.Router();

  // GET /api/cart
  router.get('/', optionalAuthenticate, (req, res, next) => {
    if (cartController && cartController.getCart) {
      return cartController.getCart(req, res, next);
    }
    return legacyCartController.getCart(req, res, next);
  });

  // Legacy endpoints
  router.post('/', (req, res, next) => {
    if (legacyCartController && legacyCartController.createCart) {
      return legacyCartController.createCart(req, res, next);
    }
    if (cartController && cartController.addItem) {
      return cartController.addItem(req, res, next);
    }
    res.status(404).json({ message: "Cart POST endpoint unavailable" });
  });

  router.put('/:id', (req, res, next) => {
    if (legacyCartController && legacyCartController.updateCart) {
      return legacyCartController.updateCart(req, res, next);
    }
    res.status(404).json({ message: "Cart PUT endpoint unavailable" });
  });

  router.delete('/:id', (req, res, next) => {
    if (legacyCartController && legacyCartController.deleteCart) {
      return legacyCartController.deleteCart(req, res, next);
    }
    res.status(404).json({ message: "Cart DELETE endpoint unavailable" });
  });

  // Item endpoints
  router.post('/items', authenticate, cartController.addItem);
  router.put('/items/:itemId', authenticate, cartController.updateItem);
  router.delete('/items/:itemId', authenticate, cartController.removeItem);
  router.delete('/', authenticate, cartController.clearCart);

  return router;
}

module.exports = { createCartRouter };
