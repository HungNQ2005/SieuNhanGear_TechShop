const mongoose = require("mongoose");

// Khớp với demo_data.json (shippingAddresses)
const shippingAddressSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    accountId: { type: Number, required: true, index: true },
    receiverName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: "" },
    phone: { type: String, required: true, trim: true },
    province: { type: String, default: "" },
    provinceCode: { type: String, default: "" },
    ward: { type: String, default: "" },
    wardCode: { type: String, default: "" },
    address: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

shippingAddressSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("ShippingAddress", shippingAddressSchema);
