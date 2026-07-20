const mongoose = require("mongoose");

// UC-12 Manage Promotion (Flash Sale, CRUD)
const promotionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    discountPercent: { type: Number, required: true, min: 0, max: 100 },
    productIds: { type: [Number], default: [] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["upcoming", "active", "ended"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

promotionSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Promotion", promotionSchema);
