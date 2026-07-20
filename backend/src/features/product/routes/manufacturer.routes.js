const express = require('express');
const { ROUTES } = require('../../../constants/routes.constants');

function createManufacturerRouter() {
    const router = express.Router();
    const {
        getAllManufacturers,
        getManufacturerById,
    } = require('../../../controllers/manufacturerController');

    // GET /api/manufacturers
    router.get(ROUTES.MANUFACTURER.NULL, getAllManufacturers);
    // GET /api/manufacturers/:id
    router.get(ROUTES.MANUFACTURER.GET_MANUFACTURER_BY_ID, getManufacturerById);

    return router;
}

module.exports = { createManufacturerRouter };