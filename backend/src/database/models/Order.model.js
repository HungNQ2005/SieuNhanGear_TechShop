const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.Mixed, required: true },
    name: { type: String, default: "" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageURL: { type: String, default: "" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: { type: Number, index: true, required: true },
    code: { type: String, required: true, trim: true },
    customerId: { type: Number, index: true },
    accountId: { type: mongoose.Schema.Types.Mixed, index: true },
    customerName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    province: { type: String, default: "" },
    provinceCode: { type: String, default: "" },
    ward: { type: String, default: "" },
    wardCode: { type: String, default: "" },
    items: [orderItemSchema],
    statusId: { type: Number, default: 1 },
    status: { type: String, default: "Processing" },
    paymentMethod: { type: String, default: "COD" },
    paymentStatus: { type: String, default: "Pending" },
    shippingCompanyId: { type: Number, default: null },
    trackingCode: { type: String, default: "" },
    voucherCode: { type: String, default: "" },
    discountCode: { type: String, default: "" },
    discountAmount: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  if (this.total === undefined && this.totalPrice !== undefined) {
    this.total = this.totalPrice;
  } else if (this.totalPrice === undefined && this.total !== undefined) {
    this.totalPrice = this.total;
  }
  next();
});

orderSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Order", orderSchema);
