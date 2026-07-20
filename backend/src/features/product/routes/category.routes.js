const express = require('express');
const { ROUTES } = require('../../../constants/routes.constants');

function createCategoryRouter() {
    const router = express.Router();
    const {
        getAllCategories,
        getCategoryById,
    } = require('../../../controllers/categoryController');

    // GET /api/categories
    router.get(ROUTES.CATEGORY.NULL, getAllCategories);
    // GET /api/categories/:id
    router.get(ROUTES.CATEGORY.GET_CATEGORY_BY_ID, getCategoryById);

    return router;
}

module.exports = { createCategoryRouter };