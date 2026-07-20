const mongoose = require("mongoose");

// Khớp với demo_data.json (orderStatus): { id, name, color }
// Pending(0) | Processing(1) | Shipping(2) | Delivered(3) | Cancelled(4) - team seed theo nhu cầu
const orderStatusSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true, unique: true },
    color: { type: String, default: "#2563EB" },
  },
  { timestamps: true }
);

orderStatusSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("OrderStatus", orderStatusSchema);
