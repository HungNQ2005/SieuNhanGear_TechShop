const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  // productId có thể là ObjectId (Mongoose), hoặc số/string theo dữ liệu seed
  productId: { type: mongoose.Schema.Types.Mixed, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  code: { type: String, index: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  customerName: String,
  email: String,
  phone: String,
  address: String,
  province: String,
  provinceCode: String,
  ward: String,
  wardCode: String,
  items: [orderItemSchema],
  subtotal: Number,
  shippingFee: Number,
  totalPrice: Number,
  paymentMethod: String,
  discountCode: String,
  discountAmount: Number,
  paymentStatus: String,
  status: { type: String, default: 'Created' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
