const { Router } = require("express");

const {
  getEstadoReservaciones,
  getEstadoReservacion,
  CreateEstadoReservacion,
  updateEstadoReservacion,
  deleteEstadoReservacion,
} = require("../controllers/../controllers/estado_reservacion.controller");

const router = Router();

router.get("/estado_reservacion", getEstadoReservaciones);
router.get("/estado_reservacion/:id", getEstadoReservacion);
router.post("/estado_reservacion/", CreateEstadoReservacion);
router.put("/estado_reservacion/:id", updateEstadoReservacion);
router.delete("/estado_reservacion/:id", deleteEstadoReservacion);

// export default router;
module.exports = router;
