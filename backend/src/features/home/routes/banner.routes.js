const express = require('express');
const { ROUTES } = require('../../../constants/routes.constants');

function createBannerRouter() {
    const router = express.Router();
    const {
        getAllBanners,
        getBannerById,
    } = require('../../../controllers/bannerController');

    // GET /api/banners
    router.get(ROUTES.BANNER.NULL, getAllBanners);
    // GET /api/banners/:id
    router.get(ROUTES.BANNER.GET_BANNER_BY_ID, getBannerById);

    return router;
}

module.exports = { createBannerRouter };