const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    },

    dateOfBirth: {
      type: Date
    },

    address: {
      type: String
    },

    role: {
      type: String,
      default: 'customer'
    },

    avatarURL: {
      type: String
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Account', accountSchema);