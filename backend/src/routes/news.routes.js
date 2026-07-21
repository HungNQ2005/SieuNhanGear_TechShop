const express = require("express");
const { ROUTES } = require("../constants/routes.constants");
const { getAllNews, getNewsById } = require("../controllers/newsController");

function createNewsRouter() {
  const router = express.Router();

  // GET /api/news
  router.get(ROUTES.NEWS.NULL, getAllNews);

  // GET /api/news/:id
  router.get(ROUTES.NEWS.GET_NEWS_BY_ID, getNewsById);

  return router;
}

module.exports = { createNewsRouter };
