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

module.exports = mongoose.model(
    "Product",
    productSchema
);