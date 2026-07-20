const crypto = require("crypto");

// Băm mật khẩu bằng scrypt (built-in Node.js crypto, không cần cài thêm package)
function hashPassword(plainPassword) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(plainPassword), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(plainPassword, storedHash) {
  if (!storedHash || !storedHash.includes(":")) return false;
  const [salt, hash] = storedHash.split(":");
  const hashToVerify = crypto.scryptSync(String(plainPassword), salt, 64).toString("hex");
  const hashBuffer = Buffer.from(hash, "hex");
  const verifyBuffer = Buffer.from(hashToVerify, "hex");
  if (hashBuffer.length !== verifyBuffer.length) return false;
  return crypto.timingSafeEqual(hashBuffer, verifyBuffer);
}

function generateTempPassword() {
  return crypto.randomBytes(6).toString("base64url");
}

module.exports = { hashPassword, verifyPassword, generateTempPassword };
