const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: Number,

    name: String,

    rating: Number,

    price: Number,

    category_id: Number,

    manufacturer_id: Number,

    img_URL: String
});

// Tránh lỗi OverwriteModelError khi file được require nhiều lần
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);