const mongoose = require("mongoose");

// Khớp với demo_data.json (orderItems): { id, orderId, productId, price, quantity }
const orderItemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    orderId: { type: Number, required: true, index: true },
    productId: { type: Number, required: true, index: true },
    productName: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

orderItemSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
