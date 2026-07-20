const Order = require('../database/models/Order.model');
const Cart = require('../database/models/Cart.model');

// Tạo mã đơn hàng đơn giản theo timestamp
function generateOrderCode() {
  return `ORD-${Date.now()}`;
}

// Tạo đơn hàng từ body, xóa giỏ hàng tương ứng
const createOrder = async (req, res) => {
  try {
    const {
      items,
      subtotal,
      shippingFee = 0,
      totalPrice,
      paymentMethod,
      discountCode,
      discountAmount = 0,
      customerName,
      receiverName,
      email,
      phone,
      address,
      province,
      provinceCode,
      ward,
      wardCode,
      status,
    } = req.body;

    // accountId nên lấy từ req.user do middleware auth đã xác thực
    const accountId = req.user && req.user.id;
    if (!accountId) return res.status(401).json({ message: 'Unauthorized: please login' });
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'items are required' });
    }

    const normalizedItems = (items || []).map((item) => ({
      productId: item.productId ?? item.id,
      price: Number(item.price ?? 0),
      quantity: Number(item.quantity ?? item.qty ?? 1),
    }));

    const order = new Order({
      code: generateOrderCode(),
      accountId,
      customerName: customerName || receiverName || req.body.name || '',
      email,
      phone,
      address,
      province,
      provinceCode,
      ward,
      wardCode,
      items: normalizedItems,
      subtotal: Number(subtotal ?? 0),
      shippingFee: Number(shippingFee ?? 0),
      totalPrice: Number(totalPrice ?? subtotal ?? 0),
      paymentMethod,
      discountCode,
      discountAmount: Number(discountAmount ?? 0),
      paymentStatus: 'Pending',
      status: status || 'Pending',
    });

    await order.save();

    // Xóa giỏ hàng của người dùng nếu có
    try {
      await Cart.findOneAndDelete({ userId: accountId });
    } catch (e) {
      // Không quan trọng nếu xóa thất bại
    }

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách đơn hàng, hỗ trợ query ?accountId=...
const getOrders = async (req, res) => {
  try {
    const { accountId } = req.query;
    let query = {};
    if (accountId) query.accountId = accountId;

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById };
