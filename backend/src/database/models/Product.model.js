const mongoose = require("mongoose");

// Khớp với dữ liệu thật trong MongoDB (xem data/demo_data.json):
// { id, name, rating, price, category_id, manufacturer_id, img_URL, stock }
const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category_id: {
      type: Number,
      required: true,
      index: true,
    },
    manufacturer_id: {
      type: Number,
      index: true,
    },
    img_URL: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Dùng cho Admin (ProductsScreen): active | drafting | out_of_stock
    status: {
      type: String,
      enum: ["active", "drafting", "out_of_stock"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Trả về trường id dạng Number giống dữ liệu gốc, ẩn _id và __v
productSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Product", productSchema);
