const mongoose = require("mongoose");

// Khớp với InventoryManagementScreen.js bên Admin:
// row.productId, row.warehouseId, row.quantity, row.criticalThreshold,
// row.lowStockThreshold, row.lastUpdated, row.updatedBy
const stockSchema = new mongoose.Schema(
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
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    criticalThreshold: {
      type: Number,
      default: 5,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 15,
      min: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Mỗi sản phẩm chỉ có 1 dòng tồn kho trên mỗi kho
stockSchema.index({ productId: 1, warehouseId: 1 }, { unique: true });

stockSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Stock", stockSchema);
