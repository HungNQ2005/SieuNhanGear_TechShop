const mongoose = require("mongoose");

// Khớp với demo_data.json (accounts) và Admin System > AccountManagement:
// { id, name, email, phone, role }, role: user | product_manager | sales_staff | system_admin | customer
const accountSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    avatarURL: {
      type: String,
      trim: true,
      default: "",
    },
    // Lưu dạng "salt:hash" (xem src/utils/password.js), không bao giờ trả về cho client
    passwordHash: {
      type: String,
      select: false,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "product_manager", "sales_staff", "system_admin", "customer"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("Account", accountSchema);
