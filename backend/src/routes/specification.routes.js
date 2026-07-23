const express = require("express");
const { specificationController } = require("../controllers/specification.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createSpecificationRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/specifications:
   *   get:
   *     tags:
   *       - Specifications
   *     summary: Lấy toàn bộ thông số kỹ thuật sản phẩm
   *     responses:
   *       200:
   *         description: Danh sách thông số
   */
  router.get("/", specificationController.getAllSpecifications);

  /**
   * @openapi
   * /api/specifications/groups:
   *   get:
   *     tags:
   *       - Specifications
   *     summary: Lấy danh sách nhóm thuộc tính thông số
   *     responses:
   *       200:
   *         description: Danh sách nhóm thuộc tính
   */
  router.get("/groups", specificationController.getAllGroups);
  router.post("/groups", specificationController.createGroup);
  router.put("/groups/:id", specificationController.updateGroup);
  router.patch("/groups/:id", specificationController.updateGroup);
  router.delete("/groups/:id", specificationController.deleteGroup);

  /**
   * @openapi
   * /api/specifications/attributes:
   *   get:
   *     tags:
   *       - Specifications
   *     summary: Lấy danh sách thuộc tính chi tiết
   *     responses:
   *       200:
   *         description: Danh sách thuộc tính
   */
  router.get("/attributes", specificationController.getAllAttributes);
  router.post("/attributes", specificationController.createAttribute);
  router.put("/attributes/:id", specificationController.updateAttribute);
  router.patch("/attributes/:id", specificationController.updateAttribute);
  router.delete("/attributes/:id", specificationController.deleteAttribute);

  return router;
}

function createAttributeGroupRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/attributeGroups:
   *   get:
   *     tags:
   *       - Specifications
   *     summary: Lấy danh sách nhóm thuộc tính
   *     responses:
   *       200:
   *         description: Thành công
   *   post:
   *     tags:
   *       - Specifications
   *     summary: Tạo mới nhóm thuộc tính
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               name:
   *                 type: string
   *                 example: Cấu hình CPU & RAM
   *               displayOrder:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       201:
   *         description: Tạo nhóm thuộc tính thành công
   */
  router.get("/", specificationController.getAllGroups);
  router.post("/", specificationController.createGroup);
  router.put("/:id", specificationController.updateGroup);
  router.patch("/:id", specificationController.updateGroup);
  router.delete("/:id", specificationController.deleteGroup);

  return router;
}

function createAttributeRouter() {
  const router = express.Router();

  /**
   * @openapi
   * /api/attributes:
   *   get:
   *     tags:
   *       - Specifications
   *     summary: Lấy danh sách các thuộc tính
   *     responses:
   *       200:
   *         description: Thành công
   *   post:
   *     tags:
   *       - Specifications
   *     summary: Tạo mới thuộc tính
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               name:
   *                 type: string
   *                 example: Dung lượng RAM
   *               groupId:
   *                 type: string
   *                 example: GRP-01
   *               dataType:
   *                 type: string
   *                 example: text
   *     responses:
   *       201:
   *         description: Tạo thuộc tính thành công
   */
  router.get("/", specificationController.getAllAttributes);
  router.post("/", specificationController.createAttribute);
  router.put("/:id", specificationController.updateAttribute);
  router.patch("/:id", specificationController.updateAttribute);
  router.delete("/:id", specificationController.deleteAttribute);

  return router;
}

module.exports = { createSpecificationRouter, createAttributeGroupRouter, createAttributeRouter };
