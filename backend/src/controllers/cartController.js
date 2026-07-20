const Cart = require('../database/models/Cart.model');

const getCart = async (req, res) => {
  try {
    const { accountId } = req.query;
    if (!accountId) {
      const carts = await Cart.find();
      return res.json(carts);
    }

    const cart = await Cart.findOne({ userId: accountId });
    if (!cart) {
      return res.json({ userId: accountId, items: [] });
    }

    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCart = async (req, res) => {
  try {
    const { userId, accountId, items } = req.body;
    const resolvedUserId = userId || accountId;

    if (!resolvedUserId) return res.status(400).json({ message: 'userId or accountId is required' });

    let cart = await Cart.findOne({ userId: resolvedUserId });
    if (!cart) {
      cart = new Cart({ userId: resolvedUserId, items: [] });
    }

    cart.items = Array.isArray(items) ? items : [];
    await cart.save();
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, userId, accountId } = req.body;
    const resolvedUserId = userId || accountId;

    let cart = await Cart.findById(id);
    if (!cart && resolvedUserId) {
      cart = await Cart.findOne({ userId: resolvedUserId });
    }

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    if (resolvedUserId) cart.userId = resolvedUserId;
    cart.items = Array.isArray(items) ? items : cart.items || [];

    await cart.save();
    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Xóa giỏ hàng
const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, createCart, updateCart, deleteCart };
