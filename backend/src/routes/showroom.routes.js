const express = require("express");
const { showroomController } = require("../controllers/showroom.controller");

function createShowroomRouter() {
  const router = express.Router();

  // GET /api/showroom
  router.get("/", showroomController.getAll);

  // GET /api/showroom/:id
  router.get("/:id", showroomController.getById);

  // POST /api/showroom
  router.post("/", showroomController.create);

  // PUT /api/showroom/:id
  router.put("/:id", showroomController.update);

  // DELETE /api/showroom/:id
  router.delete("/:id", showroomController.delete);

  return router;
}

module.exports = { createShowroomRouter };
