const express = require("express");
const { specificationController } = require("../controllers/specification.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createSpecificationRouter() {
  const router = express.Router();

  router.get("/groups", specificationController.getAllGroups);
  router.post("/groups", specificationController.createGroup);
  router.put("/groups/:id", specificationController.updateGroup);
  router.patch("/groups/:id", specificationController.updateGroup);
  router.delete("/groups/:id", specificationController.deleteGroup);

  router.get("/attributes", specificationController.getAllAttributes);
  router.post("/attributes", specificationController.createAttribute);
  router.put("/attributes/:id", specificationController.updateAttribute);
  router.patch("/attributes/:id", specificationController.updateAttribute);
  router.delete("/attributes/:id", specificationController.deleteAttribute);

  return router;
}

function createAttributeGroupRouter() {
  const router = express.Router();

  router.get("/", specificationController.getAllGroups);
  router.post("/", specificationController.createGroup);
  router.put("/:id", specificationController.updateGroup);
  router.patch("/:id", specificationController.updateGroup);
  router.delete("/:id", specificationController.deleteGroup);

  return router;
}

function createAttributeRouter() {
  const router = express.Router();

  router.get("/", specificationController.getAllAttributes);
  router.post("/", specificationController.createAttribute);
  router.put("/:id", specificationController.updateAttribute);
  router.patch("/:id", specificationController.updateAttribute);
  router.delete("/:id", specificationController.deleteAttribute);

  return router;
}

module.exports = { createSpecificationRouter, createAttributeGroupRouter, createAttributeRouter };
