const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require("dotenv").config();

const parseOrigins = (raw) => {
  if (!raw || raw === '*') return '*';
  const list = raw.split(',').map((s) => s.trim()).filter(Boolean);
  return list.length ? list : '*';
};

const env = {
  PORT: Number(process.env.PORT) || 3521,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/SieuNhanGearDB",
  CORS_ORIGINS: parseOrigins(process.env.CORS_ORIGINS),

  // Auth (JWT) - đổi JWT_SECRET trong .env khi deploy thật
  JWT_SECRET: process.env.JWT_SECRET || "sieunhangearstore-dev-secret-change-me",
  JWT_EXPIRES_IN_SEC: Number(process.env.JWT_EXPIRES_IN_SEC) || 7 * 24 * 60 * 60, // 7 ngày
};

module.exports = { env };
