const crypto = require("crypto");
const { env } = require("../config/env");

// JWT (HS256) tối giản, chỉ dùng Node.js "crypto" built-in (không cần cài thêm package,
// theo đúng phong cách của utils/password.js).

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlJSON(obj) {
  return base64url(JSON.stringify(obj));
}

function sign(payload, { expiresInSec = env.JWT_EXPIRES_IN_SEC } = {}) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = { ...payload, iat: now, exp: now + expiresInSec };

  const headerEncoded = base64urlJSON(header);
  const payloadEncoded = base64urlJSON(fullPayload);
  const data = `${headerEncoded}.${payloadEncoded}`;

  const signature = crypto
    .createHmac("sha256", env.JWT_SECRET)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${data}.${signature}`;
}

function verify(token) {
  if (!token || typeof token !== "string" || token.split(".").length !== 3) {
    return null;
  }
  const [headerEncoded, payloadEncoded, signature] = token.split(".");
  const data = `${headerEncoded}.${payloadEncoded}`;

  const expectedSignature = crypto
    .createHmac("sha256", env.JWT_SECRET)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    sigBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadEncoded, "base64").toString("utf8"));
  } catch (e) {
    return null;
  }

  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
    return null; // expired
  }

  return payload;
}

module.exports = { sign, verify };
