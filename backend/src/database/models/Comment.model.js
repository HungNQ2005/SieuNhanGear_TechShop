const mongoose = require("mongoose");

// UC-07 Comment Product (Create/Delete): { id, productId, accountId, customerName, content, rating }
const commentSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    productId: { type: Number, required: true, index: true },
    accountId: { type: Number, required: true, index: true },
    customerName: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  { timestamps: true }
);

commentSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
