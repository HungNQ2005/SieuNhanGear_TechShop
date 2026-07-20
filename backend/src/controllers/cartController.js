const Cart = require('../database/models/Cart.model');
const Product = require('../database/models/Product.model');

// Thêm comment ngắn gọn bằng tiếng Việt, không dùng icon
// Lấy giỏ hàng theo accountId query (userId)
const getCart = async (req, res) => {
  try {
    const { accountId } = req.query;
    if (!accountId) {
      // Nếu không có accountId, trả tất cả giỏ hàng (dành cho admin)
      const carts = await Cart.find().populate('items.productId');
      return res.json(carts);
    }

    const cart = await Cart.findOne({ userId: accountId }).populate('items.productId');
    if (!cart) {
      return res.json({ userId: accountId, items: [] });
    }

    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Tạo giỏ hàng mới hoặc upsert
const createCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items });
    } else {
      cart.items = items;
    }

    await cart.save();
    await cart.populate('items.productId');
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Cập nhật giỏ hàng theo cart id
const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { items } = req.body;

    const cart = await Cart.findById(id);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = items || cart.items;
    await cart.save();
    await cart.populate('items.productId');
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
