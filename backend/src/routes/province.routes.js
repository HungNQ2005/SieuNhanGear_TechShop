const express = require('express');
const https = require('https');

const PROVINCE_API_BASE = 'https://provinces.open-api.vn/api/v2';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', (err) => reject(err));
  });
}

function createProvinceRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/provinces:
   *   get:
   *     tags:
   *       - Orders
   *     summary: Lấy danh sách tỉnh/thành phố Việt Nam
   *     responses:
   *       200:
   *         description: Danh sách tỉnh/thành phố
   */
  router.get('/provinces', async (req, res) => {
    try {
      const json = await fetchJson(`${PROVINCE_API_BASE}/p/`);
      return res.json(json);
    } catch (error) {
      console.error('Province proxy error:', error);
      return res.status(502).json({ error: 'Failed to fetch provinces' });
    }
  });

  /**
   * @openapi
   * /api/provinces/{code}/wards:
   *   get:
   *     tags:
   *       - Orders
   *     summary: Lấy danh sách phường/xã theo mã tỉnh thành
   *     parameters:
   *       - in: path
   *         name: code
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Danh sách phường/xã
   */
  router.get('/provinces/:code/wards', async (req, res) => {
    try {
      const { code } = req.params;
      const json = await fetchJson(`${PROVINCE_API_BASE}/p/${code}?depth=2`);
      return res.json(json.wards || []);
    } catch (error) {
      console.error('Wards proxy error:', error);
      return res.status(502).json({ error: 'Failed to fetch wards' });
    }
  });

  return router;
}

module.exports = { createProvinceRouter };
