const express = require('express');
const { chatWithAssistant } = require('./ai.controller');

function createAIRouter() {
  const router = express.Router();
  router.post('/chat', chatWithAssistant);
  return router;
}

module.exports = { createAIRouter };