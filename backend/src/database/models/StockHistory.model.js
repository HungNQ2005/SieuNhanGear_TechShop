const mongoose = require("mongoose");

// Nhật ký nhập/xuất kho — khớp với payload createStockHistory() bên Admin:
// { productId, warehouseId, type, change, quantityAfter, date, updatedBy, note }
const stockHistorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    productId: {
      type: Number,
      required: true,
      index: true,
    },
    warehouseId: {
      type: Number,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["import", "export"],
      required: true,
    },
    change: {
      type: Number,
      required: true,
    },
    quantityAfter: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

stockHistorySchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("StockHistory", stockHistorySchema);
