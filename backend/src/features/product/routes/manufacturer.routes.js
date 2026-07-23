const express = require('express');
const { ROUTES } = require('../../../constants/routes.constants');

function createManufacturerRouter() {
    const router = express.Router();
    const {
        getAllManufacturers,
        getManufacturerById,
    } = require('../../../controllers/manufacturerController');

    /**
     * @openapi
     * /api/manufacturers:
     *   get:
     *     tags:
     *       - Manufacturers
     *     summary: Lấy danh sách thương hiệu / nhà sản xuất
     *     responses:
     *       200:
     *         description: Danh sách nhà sản xuất
     */
    router.get(ROUTES.MANUFACTURER.NULL, getAllManufacturers);

    /**
     * @openapi
     * /api/manufacturers/{id}:
     *   get:
     *     tags:
     *       - Manufacturers
     *     summary: Lấy thông tin nhà sản xuất theo ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Chi tiết nhà sản xuất
     */
    router.get(ROUTES.MANUFACTURER.GET_MANUFACTURER_BY_ID, getManufacturerById);

    return router;
}

module.exports = { createManufacturerRouter };