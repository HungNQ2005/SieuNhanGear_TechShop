const mongoose = require('mongoose');

// STUB: User model (chưa dùng ngay trong codebase hiện tại)
// Team có thể thay/extend schema theo auth requirement.
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String },
    role: { type: String, enum: ['CUSTOMER', 'ADMIN'], default: 'CUSTOMER' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);

