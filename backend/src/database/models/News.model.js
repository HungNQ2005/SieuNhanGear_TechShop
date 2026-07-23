const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

module.exports = { News };
