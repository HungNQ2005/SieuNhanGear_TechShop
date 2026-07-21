const express = require("express");
const { commentController } = require("../controllers/comment.controller");
const { authenticate } = require("../middlewares/auth.middleware");

// UC-07 Comment Product (Create/Delete)
function createCommentRouter() {
  const router = express.Router();

  // GET /api/comments?productId=1 (public - ai cũng xem được)
  router.get("/", commentController.getByProduct);

  // POST /api/comments (cần đăng nhập)
  router.post("/", authenticate, commentController.create);

  // DELETE /api/comments/:id (chủ comment hoặc system_admin)
  router.delete("/:id", authenticate, commentController.delete);

  return router;
}

module.exports = { createCommentRouter };
