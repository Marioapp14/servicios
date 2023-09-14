const { Router } = require("express");

const {
  getServicioReservaciones,
  getServicioReservacion,
  CreateServicioReservacion,
  updateServicioReservacion,
  deleteServicioReservacion,
} = require("../controllers/servicio_reservacion.controller");

const router = Router();

router.get("/servicio_reservacion", getServicioReservaciones);
router.get("/servicio_reservacion/:id", getServicioReservacion);
router.post("/servicio_reservacion/", CreateServicioReservacion);
router.put("/servicio_reservacion/:id", updateServicioReservacion);
router.delete("/servicio_reservacion/:id", deleteServicioReservacion);

module.exports = router;
