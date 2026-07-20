const mongoose = require("mongoose");

// UC-20 Manage Product Specifications (CRUD)
// Nhóm thuộc tính, ví dụ: "Kích thước", "Kết nối"...
const specificationGroupSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "mouse" },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

specificationGroupSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Từng thuộc tính cụ thể thuộc 1 nhóm, ví dụ: "Chiều dài dây" (dataType: text/number/boolean/select)
const specificationAttributeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    groupId: { type: Number, required: true, index: true },
    groupName: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    dataType: {
      type: String,
      enum: ["text", "number", "boolean", "select"],
      default: "text",
    },
    usageCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

specificationAttributeSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const SpecificationGroup = mongoose.model("SpecificationGroup", specificationGroupSchema);
const SpecificationAttribute = mongoose.model("SpecificationAttribute", specificationAttributeSchema);

module.exports = { SpecificationGroup, SpecificationAttribute };
