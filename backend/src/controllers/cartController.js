const { cartController } = require('../features/cart/controllers/cart.controller');

const getCart = (req, res, next) => cartController.getCart(req, res, next);
const createCart = (req, res, next) => cartController.syncOrAddItem(req, res, next);
const updateCart = (req, res, next) => cartController.updateCart(req, res, next);
const deleteCart = (req, res, next) => cartController.deleteCart(req, res, next);

module.exports = { getCart, createCart, updateCart, deleteCart };
