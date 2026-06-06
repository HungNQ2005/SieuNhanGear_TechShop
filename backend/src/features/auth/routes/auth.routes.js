const express = require('express');

// STUB: auth routes (chưa có DB/JWT)
function createAuthRouter() {
  const router = express.Router();

  // Example endpoints (will be implemented later)
  // POST /api/auth/login
  router.post('/login', (req, res) => {
    res.status(501).json({ code: 'NOT_IMPLEMENTED', message: 'Auth login not implemented yet' });
  });

  // POST /api/auth/register
  router.post('/register', (req, res) => {
    res.status(501).json({ code: 'NOT_IMPLEMENTED', message: 'Auth register not implemented yet' });
  });

  return router;
}

module.exports = { createAuthRouter };

