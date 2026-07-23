const express = require('express');

// STUB: home endpoints (tùy chọn, nếu frontend cần aggregate)
function createHomeRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/home:
   *   get:
   *     tags:
   *       - Catalog
   *     summary: Lấy dữ liệu tổng hợp cho trang chủ
   *     responses:
   *       501:
   *         description: Tính năng chưa được triển khai
   */
  router.get('/', (req, res) => {
    res.status(501).json({ code: 'NOT_IMPLEMENTED', message: 'Home aggregate not implemented yet' });
  });

  return router;
}

module.exports = { createHomeRouter };

