const { Router } = require("express");

const {
  getServicios,
  getServicio,
  CreateServicio,
  updateServicio,
  deleteServicio,
} = require("../controllers/servicio.controller");

const router = Router();

router.get("/servicios", getServicios);
router.get("/servicios/:id", getServicio);
router.post("/servicios/", CreateServicio);
router.put("/servicios/:id", updateServicio);
router.delete("/servicios/:id", deleteServicio);

module.exports = router;
