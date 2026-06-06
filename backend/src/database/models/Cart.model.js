const mongoose = require('mongoose');

// STUB: Cart model
const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, index: true },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Cart', cartSchema);

