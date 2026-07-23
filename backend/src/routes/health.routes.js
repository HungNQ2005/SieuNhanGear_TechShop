const express = require('express');

const { ROUTES } = require('../constants/routes.constants');

function createHealthRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /health:
   *   get:
   *     tags:
   *       - Health
   *     summary: Kiểm tra sức khỏe hệ thống backend
   *     description: Trả về trạng thái hoạt động của ứng dụng backend.
   *     responses:
   *       200:
   *         description: Hệ thống hoạt động bình thường
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: up
   */
  router.get(ROUTES.HEALTH.STATUS, (req, res) => {
    res.json({ status: 'up' });
  });

  return router;
}

module.exports = { createHealthRouter };


