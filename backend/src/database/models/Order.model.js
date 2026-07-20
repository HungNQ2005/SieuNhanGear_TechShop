const mongoose = require("mongoose");

// Khớp với demo_data.json (orders):
// { id, code, customerId, customerName, phone, address, statusId, paymentMethod,
//   paymentStatus, shippingCompanyId, trackingCode, total, createdAt }
const orderSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    code: { type: String, required: true, unique: true, trim: true },
    customerId: { type: Number, required: true, index: true },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    statusId: { type: Number, required: true, default: 1 },
    paymentMethod: { type: String, default: "COD" },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    shippingCompanyId: { type: Number, default: null },
    trackingCode: { type: String, default: "" },
    voucherCode: { type: String, default: "" },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

orderSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Order", orderSchema);
