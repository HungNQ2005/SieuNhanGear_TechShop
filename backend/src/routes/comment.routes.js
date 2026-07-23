const express = require("express");
const { commentController } = require("../controllers/comment.controller");
const { authenticate } = require("../middlewares/auth.middleware");

// UC-07 Comment Product (Create/Delete)
function createCommentRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/comments:
   *   get:
   *     tags:
   *       - Comments
   *     summary: Lấy danh sách bình luận theo sản phẩm
   *     parameters:
   *       - in: query
   *         name: productId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID của sản phẩm cần lấy bình luận
   *     responses:
   *       200:
   *         description: Danh sách bình luận
   */
  router.get("/", commentController.getByProduct);

  /**
   * @openapi
   * /api/comments:
   *   post:
   *     tags:
   *       - Comments
   *     summary: Thêm bình luận / đánh giá mới cho sản phẩm
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - productId
   *               - content
   *             properties:
   *               productId:
   *                 type: string
   *               content:
   *                 type: string
   *               rating:
   *                 type: number
   *     responses:
   *       201:
   *         description: Đăng bình luận thành công
   */
  router.post("/", authenticate, commentController.create);

  /**
   * @openapi
   * /api/comments/{id}:
   *   delete:
   *     tags:
   *       - Comments
   *     summary: Xóa bình luận
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
   *         description: Xóa bình luận thành công
   */
  router.delete("/:id", authenticate, commentController.delete);

  return router;
}

module.exports = { createCommentRouter };
