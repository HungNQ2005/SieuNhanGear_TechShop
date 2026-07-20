const mongoose = require('mongoose');

// STUB: Product model
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { type: String, index: true },
    manufacturerId: { type: String, index: true },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Tránh lỗi OverwriteModelError khi file được require nhiều lần
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);

