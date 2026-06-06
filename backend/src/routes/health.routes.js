const express = require('express');

const { ROUTES } = require('../constants/routes.constants');

function createHealthRouter() {
  const router = express.Router();

  router.get(ROUTES.HEALTH.STATUS, (req, res) => {
    res.json({ status: 'up' });
  });

  return router;
}

module.exports = { createHealthRouter };


