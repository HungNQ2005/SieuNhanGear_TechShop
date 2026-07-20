require('dotenv').config();

const parseOrigins = (raw) => {
  if (!raw) return '*';
  const list = raw.split(',').map((s) => s.trim()).filter(Boolean);
  return list.length ? list : '*';
};

const env = {
  PORT: Number(process.env.PORT) || 3521,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SNGDB',
  CORS_ORIGINS: parseOrigins(process.env.CORS_ORIGINS),
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_abc'
};

module.exports = { env };