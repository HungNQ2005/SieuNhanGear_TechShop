const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema({
    id: Number,

    name: String,

    description_vi: String,

    description_en: String
});

module.exports = mongoose.model(
    "Manufacturer",
    manufacturerSchema
);