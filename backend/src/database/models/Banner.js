const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    id: Number,

    img_URL: String
});

module.exports = mongoose.model(
    "Banner",
    bannerSchema
);