const express = require('express');
const { cartController } = require('../controllers/cart.controller');
const { optionalAuthenticate } = require('../../../middlewares/auth.middleware');

function createCartRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/cart:
   *   get:
   *     tags:
   *       - Cart
   *     summary: Lấy thông tin giỏ hàng hiện tại
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Chi tiết giỏ hàng
   */
  router.get('/', optionalAuthenticate, cartController.getCart);

  /**
   * @openapi
   * /api/cart:
   *   post:
   *     tags:
   *       - Cart
   *     summary: Đồng bộ hoặc thêm sản phẩm vào giỏ hàng
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               items:
   *                 type: array
   *                 items:
   *                   type: object
   *                   required:
   *                     - productId
   *                     - quantity
   *                   properties:
   *                     productId:
   *                       type: string
   *                       example: PROD-101
   *                     quantity:
   *                       type: integer
   *                       example: 1
   *     responses:
   *       200:
   *         description: Thành công
   */
  router.post('/', optionalAuthenticate, cartController.syncOrAddItem);

  /**
   * @openapi
   * /api/cart/{id}:
   *   put:
   *     tags:
   *       - Cart
   *     summary: Cập nhật giỏ hàng theo ID
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
   *               items:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     productId:
   *                       type: string
   *                       example: PROD-101
   *                     quantity:
   *                       type: integer
   *                       example: 2
   *     responses:
   *       200:
   *         description: Cập nhật thành công
   */
  router.put('/:id', optionalAuthenticate, cartController.updateCart);

  /**
   * @openapi
   * /api/cart/{id}:
   *   delete:
   *     tags:
   *       - Cart
   *     summary: Xóa giỏ hàng theo ID
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
  router.delete('/:id', optionalAuthenticate, cartController.deleteCart);

  /**
   * @openapi
   * /api/cart:
   *   delete:
   *     tags:
   *       - Cart
   *     summary: Xóa toàn bộ giỏ hàng
   *     responses:
   *       200:
   *         description: Đã xóa toàn bộ giỏ hàng
   */
  router.delete('/', optionalAuthenticate, cartController.clearCart);

  /**
   * @openapi
   * /api/cart/items:
   *   post:
   *     tags:
   *       - Cart
   *     summary: Thêm sản phẩm vào giỏ hàng
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - productId
   *               - quantity
   *             properties:
   *               productId:
   *                 type: string
   *                 example: PROD-101
   *               quantity:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: Thêm thành công
   */
  router.post('/items', optionalAuthenticate, cartController.addItem);

  /**
   * @openapi
   * /api/cart/items/{itemId}:
   *   put:
   *     tags:
   *       - Cart
   *     summary: Cập nhật số lượng item trong giỏ hàng
   *     parameters:
   *       - in: path
   *         name: itemId
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
   *               quantity:
   *                 type: integer
   *                 example: 3
   *     responses:
   *       200:
   *         description: Cập nhật item thành công
   */
  router.put('/items/:itemId', optionalAuthenticate, cartController.updateItem);

  /**
   * @openapi
   * /api/cart/items/{itemId}:
   *   delete:
   *     tags:
   *       - Cart
   *     summary: Xóa item khỏi giỏ hàng
   *     parameters:
   *       - in: path
   *         name: itemId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Xóa item thành công
   */
  router.delete('/items/:itemId', optionalAuthenticate, cartController.removeItem);

  return router;
}

module.exports = { createCartRouter };
