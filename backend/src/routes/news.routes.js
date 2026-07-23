const express = require("express");
const { ROUTES } = require("../constants/routes.constants");
const { getAllNews, getNewsById, createNews, updateNews, deleteNews } = require("../controllers/newsController");

function createNewsRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/news:
   *   get:
   *     tags:
   *       - News
   *     summary: Lấy danh sách bài viết / tin tức
   *     responses:
   *       200:
   *         description: Danh sách bài viết
   */
  router.get(ROUTES.NEWS.NULL, getAllNews);

  /**
   * @openapi
   * /api/news/{id}:
   *   get:
   *     tags:
   *       - News
   *     summary: Lấy thông tin bài viết theo ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chi tiết bài viết
   */
  router.get(ROUTES.NEWS.GET_NEWS_BY_ID, getNewsById);
  
  /**
   * @openapi
   * /api/news:
   *   post:
   *     tags:
   *       - News
   *     summary: Tạo bài viết tin tức mới
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - content
   *             properties:
   *               title:
   *                 type: string
   *                 example: Đánh giá RTX 5090 - Đỉnh cao công nghệ đồ họa 2026
   *               slug:
   *                 type: string
   *                 example: danh-gia-rtx-5090
   *               summary:
   *                 type: string
   *                 example: Tổng quan chi tiết về hiệu năng và trải nghiệm RTX 5090
   *               content:
   *                 type: string
   *                 example: NỘI DUNG BÀI VIẾT CHI TIẾT...
   *               author:
   *                 type: string
   *                 example: Tech Reviewer
   *               thumbnail:
   *                 type: string
   *                 example: https://example.com/images/rtx5090.jpg
   *     responses:
   *       201:
   *         description: Tạo thành công
   */
  router.post(ROUTES.NEWS.NULL, createNews);

  /**
   * @openapi
   * /api/news/{id}:
   *   put:
   *     tags:
   *       - News
   *     summary: Cập nhật bài viết
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: Đánh giá RTX 5090 (Cập nhật điểm benchmark)
   *               summary:
   *                 type: string
   *                 example: Bổ sung biểu đồ nhiệt độ và tiêu thụ điện năng
   *               content:
   *                 type: string
   *                 example: NỘI DUNG CẬP NHẬT...
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   */
  router.put(ROUTES.NEWS.GET_NEWS_BY_ID, updateNews);

  /**
   * @openapi
   * /api/news/{id}:
   *   delete:
   *     tags:
   *       - News
   *     summary: Xóa bài viết
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Xóa thành công
   */
  router.delete(ROUTES.NEWS.GET_NEWS_BY_ID, deleteNews);

  return router;
}

module.exports = { createNewsRouter };
