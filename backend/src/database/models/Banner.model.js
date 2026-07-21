const mongoose = require("mongoose");

// UC-22 Manage Banners (CRUD). Khớp với demo_data.json (banners): { id, img_URL, link }
const bannerSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    title: { type: String, default: "" },
    img_URL: { type: String, required: true, trim: true },
    link: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

bannerSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
