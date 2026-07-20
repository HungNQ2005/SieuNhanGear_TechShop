const mongoose = require("mongoose");

// Khớp với demo_data.json (cart): { id, accountId, productId, quantity }
const cartItemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    accountId: { type: Number, required: true, index: true },
    productId: { type: Number, required: true, index: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { timestamps: true }
);

cartItemSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
