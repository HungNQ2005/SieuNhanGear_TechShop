const express = require("express");
const { showroomController } = require("../controllers/showroom.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

function createShowroomRouter() {
  const router = express.Router();

  // GET /api/showroom (public for viewing showrooms)
  router.get("/", showroomController.getAll);

  // GET /api/showroom/:id
  router.get("/:id", showroomController.getById);

  // POST /api/showroom (System Admin only)
  router.post("/", authenticate, authorize("system_admin"), showroomController.create);

  // PUT /api/showroom/:id (System Admin only)
  router.put("/:id", authenticate, authorize("system_admin"), showroomController.update);

  // DELETE /api/showroom/:id (System Admin only)
  router.delete("/:id", authenticate, authorize("system_admin"), showroomController.delete);

  return router;
}

module.exports = { createShowroomRouter };
