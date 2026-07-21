const crypto = require("crypto");

// Băm mật khẩu bằng scrypt (built-in Node.js crypto, không cần cài thêm package)
function hashPassword(plainPassword) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(plainPassword), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(plainPassword, storedHash) {
  if (!storedHash) return false;
  const strPlain = String(plainPassword);
  const strStored = String(storedHash);

  // Plain text match fallback
  if (strStored === strPlain) return true;

  // Bcrypt hash fallback ($2a$, $2b$, $2y$)
  if (strStored.startsWith("$2a$") || strStored.startsWith("$2b$") || strStored.startsWith("$2y$")) {
    try {
      const bcrypt = require("bcryptjs");
      return bcrypt.compareSync(strPlain, strStored);
    } catch (e) {
      return false;
    }
  }

  // Scrypt hash (salt:hash)
  if (strStored.includes(":")) {
    const [salt, hash] = strStored.split(":");
    const hashToVerify = crypto.scryptSync(strPlain, salt, 64).toString("hex");
    const hashBuffer = Buffer.from(hash, "hex");
    const verifyBuffer = Buffer.from(hashToVerify, "hex");
    if (hashBuffer.length !== verifyBuffer.length) return false;
    return crypto.timingSafeEqual(hashBuffer, verifyBuffer);
  }

  return false;
}

function generateTempPassword() {
  return crypto.randomBytes(6).toString("base64url");
}

module.exports = { hashPassword, verifyPassword, generateTempPassword };
