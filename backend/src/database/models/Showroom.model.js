const mongoose = require("mongoose");

const showroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, require: true },
    website: { type: String, require: true },
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
  },
  {
    timestamps: true,
  },
);

// Enable virtual id mapping for the frontend
showroomSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

showroomSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Showroom", showroomSchema);
