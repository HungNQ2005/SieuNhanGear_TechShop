const express = require('express');
const { chatWithAssistant } = require('./ai.controller');

function createAIRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/ai/chat:
   *   post:
   *     tags:
   *       - AI
   *     summary: Trò chuyện với Trợ lý AI
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - message
   *             properties:
   *               message:
   *                 type: string
   *                 example: Tư vấn cho tôi laptop gaming dưới 20 triệu
   *     responses:
   *       200:
   *         description: Phản hồi từ trợ lý AI
   */
  router.post('/chat', chatWithAssistant);
  return router;
}

module.exports = { createAIRouter };