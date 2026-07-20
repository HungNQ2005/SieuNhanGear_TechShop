const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

// Middleware kiểm tra token JWT trong header Authorization: Bearer <token>
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized: missing token' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(401).json({ message: 'Unauthorized: invalid token format' });

    const scheme = parts[0];
    const token = parts[1];
    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Unauthorized: invalid token scheme' });

    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; // chứa { id, email, ... }
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
}

module.exports = { authMiddleware };
